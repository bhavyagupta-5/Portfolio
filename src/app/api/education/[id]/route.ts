import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Education } from "@/models/Education";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const data = await request.json();
    
    const updated = await Education.findByIdAndUpdate(id, data, { new: true });
    
    if (!updated) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, education: updated });
  } catch (error: any) {
    console.error("Error updating education:", error);
    return NextResponse.json({ error: error.message || "Failed to update education" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await context.params;
    const deleted = await Education.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: "Education not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Education deleted" });
  } catch (error) {
    console.error("Error deleting education:", error);
    return NextResponse.json({ error: "Failed to delete education" }, { status: 500 });
  }
}
