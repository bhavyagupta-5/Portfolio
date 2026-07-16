import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
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
      return NextResponse.json({ success: true, message: "Mock submission successful." });
    }

    const message = await ContactMessage.create(validatedData);

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("Zod Validation Error:", error.errors);
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    console.error("Contact Form Error:", error);
    return NextResponse.json({ error: "Failed to submit message", details: error?.message || error }, { status: 500 });
  }
}
