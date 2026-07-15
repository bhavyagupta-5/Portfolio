import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Experience } from "@/models/Experience";

export async function GET() {
  await dbConnect();
  try {
    const data = await Experience.find({}).sort({ order: 1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const newExp = await Experience.create(data);
    return NextResponse.json({ success: true, experience: newExp }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating experience:", error);
    return NextResponse.json({ error: error.message || "Failed to create experience", stack: error.stack }, { status: 500 });
  }
}
