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
  
  const res = await fetch("https://api.github.com/users/bhavyagupta-5/repos");
  const repos = await res.json();
  
  const projects = await Project.find({});
  
  for (const proj of projects) {
    const repo = repos.find((r: any) => 
      r.name.toLowerCase().includes(proj.slug) || 
      proj.slug.includes(r.name.toLowerCase()) ||
      r.name.toLowerCase().replace("-", "") === proj.slug
    );
    
    if (repo) {
      proj.githubUrl = repo.html_url;
      proj.liveUrl = repo.homepage || "";
      await proj.save();
      console.log(`Updated ${proj.slug} -> Github: ${proj.githubUrl}, Live: ${proj.liveUrl}`);
    } else {
      console.log(`Could not find repo for ${proj.slug}`);
    }
  }
  
  console.log("Projects updated!");
  process.exit(0);
}

run();
