"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Folder } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

const GithubIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export function Projects({ projects }: { projects: any[] }) {
  // Use mock data if none
  const projs = projects?.length > 0 ? projects : [
    {
      _id: "1",
      slug: "aurix",
      title: "AURIX",
      description: "Platform that autonomously detects vulnerabilities across code, dependencies and infrastructure using Semgrep, Trivy and Gitleaks, then deploys LangGraph agents.",
      techStack: ["FastAPI", "PostgreSQL", "React", "Node.js"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      _id: "2",
      slug: "annaseva",
      title: "AnnaSeva",
      description: "Web platform connecting food donors with distribution centres to enable real-time donations. Intuitive interface designed to streamline the donation process.",
      techStack: ["React", "Node.js", "MongoDB"],
      githubUrl: "#"
    },
    {
      _id: "3",
      slug: "agroshield",
      title: "Agroshield",
      description: "Machine learning models achieving 99.78% accuracy for plant disease detection and crop recommendation using real agro-climatic data.",
      techStack: ["Next.js", "TensorFlow", "Python"],
      githubUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 md:px-8 mx-auto">
        <motion.div 
          className="flex items-center justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-4 w-full">
            <h2 className="font-heading text-3xl md:text-4xl font-bold whitespace-nowrap"><span className="text-primary font-mono text-xl mr-2">04.</span>Featured Projects</h2>
            <div className="h-[1px] bg-border flex-1 max-w-sm hidden sm:block"></div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projs.map((project, i) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ perspective: 1000 }}
              className="h-full"
            >
              <TiltCard className="bg-card/40 border border-border/40 p-6 rounded-2xl flex flex-col h-full hover:border-primary/50 hover:shadow-[0_10px_30px_-15px_rgba(14,165,233,0.2)] transition-colors duration-300 group relative">
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Folder size={24} />
                </div>
                <div className="flex gap-3 z-10 relative">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <GithubIcon size={20} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              {project.endDate === "Ongoing" && (
                <div className="mb-3">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono font-bold rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    Work in Progress
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.liveUrl || project.githubUrl ? (
                  <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" className="before:absolute before:inset-0">
                    {project.title}
                  </a>
                ) : (
                  <Link href={`/projects/${project.slug}`} className="before:absolute before:inset-0">
                    {project.title}
                  </Link>
                )}
              </h3>
              
              <p className="text-muted-foreground mb-6 flex-grow text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="font-mono text-xs text-primary/80">
                    {tech}
                  </span>
                ))}
              </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
