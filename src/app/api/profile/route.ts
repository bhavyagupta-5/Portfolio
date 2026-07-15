import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Profile } from "@/models/Profile";

export async function GET() {
  await dbConnect();
  const profile = await Profile.findOne().lean();
  return NextResponse.json(profile || {});
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    await dbConnect();

    // Since there's only one profile, we just update the first one or create it if missing
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(data);
    } else {
      profile.name = data.name;
      profile.title = data.title;
      profile.careerObjective = data.careerObjective;
      if (data.resumeUrl !== undefined) profile.resumeUrl = data.resumeUrl;
    }
    
    await profile.save();

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
