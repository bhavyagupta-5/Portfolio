import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import nodemailer from "nodemailer";
import { ContactMessage } from "@/models/ContactMessage";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const conn = await dbConnect();
    
    // Fallback if DB is not connected
    if (!conn) {
      console.log("Mock contact submission (No DB connection):", validatedData);
    } else {
      await ContactMessage.create(validatedData);
    }

    // Send Email using Nodemailer
    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bhavyagupta561@gmail.com",
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: '"Portfolio Contact Form" <bhavyagupta561@gmail.com>',
        to: "bhavyagupta561@gmail.com",
        replyTo: validatedData.email,
        subject: `New Portfolio Message from ${validatedData.name}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
        html: `<p><strong>Name:</strong> ${validatedData.name}</p>
               <p><strong>Email:</strong> ${validatedData.email}</p>
               <p><strong>Message:</strong></p>
               <p>${validatedData.message.replace(/\n/g, "<br>")}</p>`,
      });
    } else {
      console.warn("GMAIL_APP_PASSWORD is not set. Email notification skipped.");
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("Zod Validation Error:", error.errors);
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    console.error("Contact Form Error:", error);
    return NextResponse.json({ error: "Failed to submit message", details: error?.message || error }, { status: 500 });
  }
}
