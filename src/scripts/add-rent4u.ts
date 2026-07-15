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
  
  const rent4uRepo = repos.find((r: any) => r.name.toLowerCase().includes("rent4u"));
  
  if (!rent4uRepo) {
    console.error("Could not find a repo matching 'rent4u' in your GitHub account.");
    process.exit(1);
  }

  // Create the new project in MongoDB
  const existingProject = await Project.findOne({ slug: "rent4u" });
  if (existingProject) {
    console.log("rent4u already exists in the database. Updating it instead.");
    existingProject.title = rent4uRepo.name;
    existingProject.description = rent4uRepo.description || "A platform to rent items.";
    existingProject.githubUrl = rent4uRepo.html_url;
    existingProject.liveUrl = rent4uRepo.homepage || "";
    existingProject.techStack = rent4uRepo.topics && rent4uRepo.topics.length > 0 ? rent4uRepo.topics : ["JavaScript", "React", "Node.js", "MongoDB"];
    await existingProject.save();
    console.log("Updated rent4u project successfully!");
  } else {
    console.log("Creating new rent4u project...");
    
    // determine tech stack from repo topics if available, else defaults
    const techStack = rent4uRepo.topics && rent4uRepo.topics.length > 0 
      ? rent4uRepo.topics.map((t: string) => t.charAt(0).toUpperCase() + t.slice(1))
      : ["MERN Stack", "React", "Node.js", "MongoDB"];

    await Project.create({
      slug: "rent4u",
      title: "Rent4U",
      subtitle: "Rental Platform",
      category: "Web Application",
      description: rent4uRepo.description || "A complete rental management platform allowing users to easily rent products.",
      longDescription: rent4uRepo.description || "Rent4U is a web platform designed to streamline renting items. Built with a full stack architecture, it features an intuitive interface.",
      bullets: [
        "Implemented seamless user experience",
        "Secure authentication and data handling"
      ],
      techStack: techStack,
      githubUrl: rent4uRepo.html_url,
      liveUrl: rent4uRepo.homepage || "",
      images: [],
      startDate: "2024",
      endDate: "2024",
      featured: true,
      order: 4
    });
    
    console.log(`Added Rent4U -> Github: ${rent4uRepo.html_url}, Live: ${rent4uRepo.homepage || ""}`);
  }
  
  process.exit(0);
}

run();
