import mongoose from "mongoose";
import { Project } from "../models/Project";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
  if (!MONGODB_URI) {
    console.error("No MongoDB URI found.");
    process.exit(1);
  }
  
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await Project.updateOne({ slug: "aurix" }, { order: 1 });
  await Project.updateOne({ slug: "annaseva" }, { order: 2 });
  await Project.updateOne({ slug: "rent4u" }, { order: 3 });
  await Project.updateOne({ slug: "agroshield" }, { order: 4 });

  console.log("Projects reordered successfully!");
  process.exit(0);
}

run();
