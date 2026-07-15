"use client";

import { motion } from "framer-motion";

export function About({ profile }: { profile: any }) {
  const bio = profile?.bio || "A passionate full-stack developer who loves building scalable applications and exploring AI/ML technologies. I am always looking for an opportunity to apply and showcase technical skills while continuously learning and contributing to meaningful solutions.";

  return (
    <section id="about" className="py-24 bg-muted/10">
      <div className="container px-4 md:px-8 mx-auto">
        <motion.div 
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold"><span className="text-primary font-mono text-xl mr-2">01.</span>About Me</h2>
          <div className="h-[1px] bg-border flex-1 max-w-sm"></div>
        </motion.div>
        
        <motion.div 
          className="text-muted-foreground leading-relaxed max-w-3xl text-lg space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
        >
          {bio.split('\n').map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
