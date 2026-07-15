import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Skill } from "@/models/Skill";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const data = await request.json();
    
    const updated = await Skill.findByIdAndUpdate(id, data, { new: true });
    
    if (!updated) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, skill: updated });
  } catch (error: any) {
    console.error("Error updating skill:", error);
    return NextResponse.json({ error: error.message || "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const deleted = await Skill.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Skill deleted" });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
