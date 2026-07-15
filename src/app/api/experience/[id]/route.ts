import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Experience } from "@/models/Experience";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const data = await request.json();
    
    const updated = await Experience.findByIdAndUpdate(id, data, { new: true });
    
    if (!updated) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, experience: updated });
  } catch (error: any) {
    console.error("Error updating experience:", error);
    return NextResponse.json({ error: error.message || "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const deleted = await Experience.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: "Experience not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
