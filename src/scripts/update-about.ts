import mongoose from "mongoose";
import { Profile } from "../models/Profile";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

const newBio = `Computer Science Engineer (AI) | Full-Stack Developer | Building intelligent, real-world solutions

Currently pursuing my B.Tech in CS(AI), working on projects that sit at the intersection of software engineering and machine learning.

I enjoy solving meaningful problems whether through building scalable web applications, training ML models or designing systems that actually hold up under pressure.

Driven by curiosity, ownership and a desire to keep building things that matter. I thrive in environments where learning never stops and good work speaks for itself.

Let's connect and build something impactful.`;

async function updateAbout() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  
  await Profile.findOneAndUpdate({}, { bio: newBio }, { upsert: true });
  
  console.log("About text updated successfully!");
  process.exit(0);
}

updateAbout();
