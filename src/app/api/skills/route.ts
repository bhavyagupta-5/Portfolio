import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Skill } from "@/models/Skill";

export async function GET() {
  await dbConnect();
  try {
    const data = await Skill.find({}).sort({ order: 1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const newSkill = await Skill.create(data);
    return NextResponse.json({ success: true, skill: newSkill }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating skill:", error);
    return NextResponse.json({ error: error.message || "Failed to create skill", stack: error.stack }, { status: 500 });
  }
}
