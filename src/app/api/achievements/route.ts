import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Achievement } from "@/models/Achievement";

export async function GET() {
  await dbConnect();
  try {
    const data = await Achievement.find({}).sort({ order: 1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}
