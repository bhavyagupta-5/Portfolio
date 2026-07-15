import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Education } from "@/models/Education";

export async function GET() {
  await dbConnect();
  try {
    const data = await Education.find({}).sort({ order: 1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const newEdu = await Education.create(data);
    return NextResponse.json({ success: true, education: newEdu }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating education:", error);
    return NextResponse.json({ error: error.message || "Failed to create education", stack: error.stack }, { status: 500 });
  }
}
