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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
