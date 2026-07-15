"use client";

import { motion } from "framer-motion";

export function Skills({ skills }: { skills: any[] }) {
  const categories = ["Languages", "Frameworks & Libraries", "Databases & Tools", "Core Fundamentals", "Soft Skills"];
  
  const groupedSkills = categories.map(category => ({
    category,
    items: skills?.filter(s => s.category === category) || []
  })).filter(g => g.items.length > 0);

  // Fallback if DB is empty
  const displaySkills = groupedSkills.length > 0 ? groupedSkills : [
    { category: "Languages", items: [{ name: "Python" }, { name: "JavaScript" }, { name: "C++" }, { name: "HTML" }, { name: "CSS" }] },
    { category: "Frameworks & Libraries", items: [{ name: "React.js" }, { name: "Next.js" }, { name: "Node.js" }, { name: "NumPy" }, { name: "Pandas" }, { name: "TensorFlow" }] },
    { category: "Databases & Tools", items: [{ name: "PostgreSQL" }, { name: "MongoDB" }, { name: "Git" }, { name: "Figma" }] }
  ];

  // Flat list for marquee
  const allSkills = displaySkills.flatMap(g => g.items.map((s: any) => s.name));
  const marqueeItems = [...allSkills, ...allSkills, ...allSkills, ...allSkills];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-24">
      <div className="container px-4 md:px-8 mx-auto">
        <motion.div 
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold"><span className="text-primary font-mono text-xl mr-2">02.</span>Skills & Technologies</h2>
          <div className="h-[1px] bg-border flex-1 max-w-sm"></div>
        </motion.div>

        <div className="mb-16 w-full overflow-hidden mask-edges py-4">
          <div className="flex w-max animate-marquee space-x-6 shrink-0">
            {marqueeItems.map((item, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-card/60 backdrop-blur-md border border-border/50 rounded-xl text-lg font-bold text-foreground/90 whitespace-nowrap shadow-[0_0_15px_rgba(14,165,233,0.05)] hover:border-primary/50 hover:text-primary transition-colors cursor-default"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displaySkills.map((group, i) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/40 backdrop-blur-sm border border-border/40 p-6 rounded-2xl hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(14,165,233,0.1)]"
            >
              <h3 className="font-mono text-primary mb-5 text-sm font-semibold uppercase tracking-wider">{group.category}</h3>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {group.items.map((skill: any) => (
                  <motion.span 
                    key={skill.name}
                    variants={itemVariants}
                    className="px-3 py-1.5 bg-background border border-border/60 rounded-md text-sm text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
