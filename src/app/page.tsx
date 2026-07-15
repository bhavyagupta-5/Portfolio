import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

import dbConnect from "@/lib/db";
import { Profile } from "@/models/Profile";
import { Skill } from "@/models/Skill";
import { Experience as ExperienceModel } from "@/models/Experience";
import { Education } from "@/models/Education";
import { Project } from "@/models/Project";

export default async function Home() {
  let profile = null;
  let skills = [];
  let experience = [];
  let education = [];
  let projects = [];

  try {
    const conn = await dbConnect();
    if (conn) {
      profile = await Profile.findOne({}).lean();
      skills = await Skill.find({}).sort({ order: 1 }).lean();
      experience = await ExperienceModel.find({}).sort({ order: 1 }).lean();
      education = await Education.find({}).sort({ order: 1 }).lean();
      projects = await Project.find({ featured: true }).sort({ order: 1 }).lean();
      
      // Serialize ObjectIds to strings to pass to Client Components
      if (profile) profile._id = profile._id.toString();
      skills = skills.map(s => ({ ...s, _id: s._id.toString() }));
      experience = experience.map(e => ({ ...e, _id: e._id.toString() }));
      education = education.map(e => ({ ...e, _id: e._id.toString() }));
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
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Experience experience={experience} education={education} />
      <Projects projects={projects} />
      <Contact />
    </div>
  );
}
