import { Projects } from "@/components/sections/Projects";
import dbConnect from "@/lib/db";
import { Project } from "@/models/Project";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "All Projects | Bhavya Gupta",
  description: "A complete list of projects built by Bhavya Gupta."
};

export default async function ProjectsPage() {
  let projects = [];

  try {
    const conn = await dbConnect();
    if (conn) {
      projects = await Project.find({}).sort({ order: 1 }).lean();
      projects = projects.map(p => ({ 
        ...p, 
        _id: p._id.toString(), 
        createdAt: p.createdAt?.toISOString(), 
        updatedAt: p.updatedAt?.toISOString() 
      }));
    }
  } catch (error) {
    console.error("Database fetch failed:", error);
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container px-4 md:px-8 mx-auto mb-[-80px] relative z-20">
        <Link href="/#projects" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-mono text-sm">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
      </div>
      <Projects projects={projects} />
    </div>
  );
}
