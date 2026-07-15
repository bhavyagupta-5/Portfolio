"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export function Experience({ experience, education }: { experience: any[], education: any[] }) {
  // Use mock data if none provided
  const exp = experience?.length > 0 ? experience : [
    {
      _id: "1",
      role: "Operations Lead",
      organization: "MeetKats Creations Private Limited",
      type: "Internship",
      location: "Remote",
      startDate: "Apr 2025",
      endDate: "Jun 2025",
      bullets: [
        "Oversaw daily operations to streamline workflows and optimize resource allocation across teams.",
        "Implemented process improvements to enhance productivity and reduce operational bottlenecks."
      ]
    }
  ];

  const edu = education?.length > 0 ? education : [
    {
      _id: "1",
      institution: "Pranveer Singh Institute of Technology",
      degree: "B.Tech, Computer Science and Engineering (AI)",
      startYear: "2023",
      endYear: "Pursuing",
      location: "Kanpur, Uttar Pradesh",
      score: "CGPA 7.67 / 77.61% (till Sem 6)"
    },
    {
      _id: "2",
      institution: "Heliger Borden Education Centre",
      degree: "Class XII",
      board: "CISCE Board",
      startYear: "2022",
      endYear: "2023",
      location: "Kanpur, Uttar Pradesh",
      score: "76.8%"
    }
  ];

  return (
    <section id="experience" className="py-24 bg-muted/10 relative">
      <div className="container px-4 md:px-8 mx-auto">
        <motion.div 
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold"><span className="text-primary font-mono text-xl mr-2">03.</span>Experience & Education</h2>
          <div className="h-[1px] bg-border flex-1 max-w-sm"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8 text-xl font-bold">
              <Briefcase className="text-primary" />
              <h3>Work Experience</h3>
            </div>
            
            <div className="space-y-12 border-l border-border ml-3 pl-8 relative">
              {exp.map((item, i) => (
                <motion.div 
                  key={item._id}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(14,165,233,0.5)] z-10"></div>
                  
                  <TiltCard className="bg-card/30 border border-border/30 p-6 rounded-2xl hover:border-primary/40 hover:shadow-[0_10px_30px_-15px_rgba(14,165,233,0.2)] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h4 className="text-xl font-bold text-foreground">{item.role}</h4>
                    <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                  
                  <div className="text-muted-foreground font-medium mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-primary/70" /> {item.organization} ({item.type})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary/70" /> {item.location}
                    </span>
                  </div>
                  
                  <ul className="space-y-2 text-muted-foreground/90">
                    {item.bullets.map((bullet: string, j: number) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5 text-xs">▹</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Education Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-8 text-xl font-bold">
              <GraduationCap className="text-primary" />
              <h3>Education</h3>
            </div>
            
            <div className="space-y-12 border-l border-border ml-3 pl-8 relative">
              {edu.map((item, i) => (
                <motion.div 
                  key={item._id}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(14,165,233,0.5)] z-10"></div>
                  
                  <TiltCard className="bg-card/30 border border-border/30 p-6 rounded-2xl hover:border-primary/40 hover:shadow-[0_10px_30px_-15px_rgba(14,165,233,0.2)] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                    <h4 className="text-xl font-bold text-foreground">{item.degree}</h4>
                    <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                      {item.startYear} - {item.endYear}
                    </span>
                  </div>
                  
                  <div className="text-muted-foreground font-medium mb-2 text-sm">
                    {item.institution} {item.board ? `(${item.board})` : ""}
                  </div>
                  
                  <div className="inline-block border border-border/60 bg-background/50 px-3 py-1.5 rounded-md text-sm text-foreground/80 mt-2">
                    <span className="font-semibold text-foreground">Score:</span> {item.score}
                  </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
