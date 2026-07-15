import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { resolve } from "path";
import bcrypt from "bcryptjs";

import { Profile } from "../models/Profile";
import { Education } from "../models/Education";
import { Skill } from "../models/Skill";
import { Experience } from "../models/Experience";
import { Project } from "../models/Project";
import { Achievement } from "../models/Achievement";
import { AdminUser } from "../models/AdminUser";

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be defined in .env.local to run the seed script.");
}

async function runSeed() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB.");

    // Clear existing data
    await Profile.deleteMany({});
    await Education.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Achievement.deleteMany({});
    await AdminUser.deleteMany({});
    console.log("Cleared existing collections.");

    // Profile
    await Profile.create({
      name: "Bhavya Gupta",
      title: "Full-Stack Developer & AI/ML Enthusiast",
      location: "Kanpur, U.P., India",
      email: "bhavyagupta561@gmail.com",
      phone: "+91 9569461013",
      linkedin: "https://linkedin.com/in/bhavya-gupta5",
      github: "https://github.com/bhavyagupta-5",
      bio: "[PLACEHOLDER: expanded bio]",
      careerObjective: "Aspiring Computer Science (AI) student with strong expertise in full-stack development and a solid foundation in data structures, algorithms and system design. Skilled in building scalable, high-performance applications and applying AI/ML techniques to solve real-world problems. Seeking an opportunity to apply and showcase technical skills while continuously learning and contributing to meaningful solutions.",
      resumeUrl: "/resume.pdf",
      profileImageUrl: ""
    });

    // Education
    await Education.insertMany([
      {
        institution: "Pranveer Singh Institute of Technology",
        degree: "B.Tech, Computer Science and Engineering (AI)",
        startYear: "2023",
        endYear: "Pursuing",
        location: "Kanpur, Uttar Pradesh",
        score: "CGPA 7.67 / 77.61% (till Sem 6)",
        order: 1
      },
      {
        institution: "Heliger Borden Education Centre",
        degree: "Class XII",
        board: "CISCE Board",
        startYear: "2022",
        endYear: "2023",
        location: "Kanpur, Uttar Pradesh",
        score: "76.8%",
        order: 2
      },
      {
        institution: "Heliger Borden Education Centre",
        degree: "Class X",
        board: "CISCE Board",
        startYear: "2020",
        endYear: "2021",
        location: "Kanpur, Uttar Pradesh",
        score: "88%",
        order: 3
      }
    ]);

    // Skills
    const skills = [
      { category: "Languages", name: "Python", order: 1 },
      { category: "Languages", name: "JavaScript", order: 2 },
      { category: "Languages", name: "C++", order: 3 },
      { category: "Languages", name: "HTML", order: 4 },
      { category: "Languages", name: "CSS", order: 5 },
      
      { category: "Frameworks & Libraries", name: "React.js", order: 1 },
      { category: "Frameworks & Libraries", name: "Node.js", order: 2 },
      { category: "Frameworks & Libraries", name: "NumPy", order: 3 },
      { category: "Frameworks & Libraries", name: "Pandas", order: 4 },
      { category: "Frameworks & Libraries", name: "Matplotlib", order: 5 },
      { category: "Frameworks & Libraries", name: "Seaborn", order: 6 },
      { category: "Frameworks & Libraries", name: "OpenCV", order: 7 },
      { category: "Frameworks & Libraries", name: "Scikit-learn", order: 8 },
      { category: "Frameworks & Libraries", name: "TensorFlow", order: 9 },
      { category: "Frameworks & Libraries", name: "Keras", order: 10 },
      
      { category: "Databases & Tools", name: "PostgreSQL", order: 1 },
      { category: "Databases & Tools", name: "MongoDB", order: 2 },
      { category: "Databases & Tools", name: "Postman", order: 3 },
      { category: "Databases & Tools", name: "Git", order: 4 },
      { category: "Databases & Tools", name: "GitHub", order: 5 },
      { category: "Databases & Tools", name: "Vercel", order: 6 },
      { category: "Databases & Tools", name: "Figma", order: 7 },
      
      { category: "Core Fundamentals", name: "Data Structures & Algorithms", order: 1 },
      { category: "Core Fundamentals", name: "OOP", order: 2 },
      { category: "Core Fundamentals", name: "Database Management Systems", order: 3 },
      { category: "Core Fundamentals", name: "Operating Systems", order: 4 },
      { category: "Core Fundamentals", name: "Computer Networks", order: 5 },
      
      { category: "Soft Skills", name: "Strong analytical & problem-solving abilities", order: 1 },
      { category: "Soft Skills", name: "effective communication", order: 2 },
      { category: "Soft Skills", name: "cross-functional team collaboration", order: 3 },
      { category: "Soft Skills", name: "social media management", order: 4 }
    ];
    await Skill.insertMany(skills);

    // Experience
    await Experience.create({
      role: "Operations Lead",
      organization: "MeetKats Creations Private Limited",
      type: "Internship",
      location: "Remote",
      startDate: "Apr 2025",
      endDate: "Jun 2025",
      bullets: [
        "Oversaw daily operations to streamline workflows and optimize resource allocation across teams.",
        "Implemented process improvements to enhance productivity and reduce operational bottlenecks."
      ],
      order: 1
    });

    // Projects
    await Project.insertMany([
      {
        slug: "aurix",
        title: "AURIX: An Agentic Unified Risk Intelligence Platform",
        subtitle: "Major Project",
        category: "Major Project",
        description: "Platform that autonomously detects vulnerabilities across code, dependencies and infrastructure.",
        longDescription: "Platform that autonomously detects vulnerabilities across code, dependencies and infrastructure using Semgrep, Trivy and Gitleaks, then deploys Red/Blue LangGraph agents to generate verified exploit PoCs and self-healing patches via a Docker sandbox.",
        bullets: [
          "Architected the Backend API Gateway with JWT auth, async scan queuing, Redis-backed rate limiting and core REST endpoints — reducing overall development time by 50%."
        ],
        techStack: ["FastAPI", "PostgreSQL", "Redis", "Supabase", "React", "Node.js"],
        githubUrl: "",
        liveUrl: "",
        images: [],
        startDate: "Feb 2026",
        endDate: "Ongoing",
        featured: true,
        order: 1
      },
      {
        slug: "annaseva",
        title: "AnnaSeva – Food Donation Platform",
        subtitle: "Web platform connecting food donors",
        category: "Web Application",
        description: "Web platform connecting food donors with distribution centres to enable real-time donations.",
        longDescription: "Web platform connecting food donors with distribution centres to enable real-time donations. Intuitive interface designed to streamline the donation process and reduce food waste.",
        bullets: [],
        techStack: ["React", "Node.js", "JavaScript", "HTML", "CSS", "MongoDB"],
        githubUrl: "",
        liveUrl: "",
        images: [],
        startDate: "Feb 2026",
        endDate: "Mar 2026",
        featured: true,
        order: 2
      },
      {
        slug: "agroshield",
        title: "Agroshield – Crop Disease Detection",
        subtitle: "Crop Disease Detection and Recommendation",
        category: "Machine Learning / Web App",
        description: "Machine learning models achieving 99.78% accuracy for plant disease detection and crop recommendation.",
        longDescription: "Machine learning models achieving 99.78% accuracy for plant disease detection and crop recommendation using real agro-climatic data. Integrated into a full-stack web application delivering real-time predictions.",
        bullets: [],
        techStack: ["React", "Next.js", "Node.js", "TypeScript", "TensorFlow", "Keras", "NumPy", "Pandas", "OpenCV", "Scikit-learn", "Tailwind", "Vercel"],
        githubUrl: "",
        liveUrl: "",
        images: [],
        startDate: "Apr 2025",
        endDate: "May 2025",
        featured: true,
        order: 3
      }
    ]);

    // Achievements
    await Achievement.insertMany([
      { type: "Certification", title: "Artificial Intelligence Program", issuer: "Infosys Springboard", date: "May 2026", order: 1 },
      { type: "Certification", title: "Python for Data Science", issuer: "Infosys Springboard", date: "May 2026", order: 2 },
      { type: "Certification", title: "SQL (Intermediate)", issuer: "HackerRank", date: "May 2026", order: 3 },
      { type: "Achievement", title: "Secretary", issuer: "Google Developer Group on Campus PSIT", date: "2024 - Present", order: 4 },
      { type: "Achievement", title: "Social Media Coordinator", issuer: "Magnanimous Foundation", date: "2024 - Present", order: 5 },
      { type: "Achievement", title: "ByteBattle Hackathon (MeetKats) — Event Coordinator", date: "June 2025", order: 6 },
      { type: "Achievement", title: "HACKEMON Hackathon (SheBuilds) — Top 100 out of 600+ teams nationwide", date: "April 2025", order: 7 },
    ]);

    // Admin User
    const passwordHash = await bcrypt.hash("admin123", 10);
    await AdminUser.create({
      username: "admin",
      passwordHash
    });

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

runSeed();
