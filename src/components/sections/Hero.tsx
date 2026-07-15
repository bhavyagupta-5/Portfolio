"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero({ profile }: { profile: any }) {
  const name = profile?.name || "Bhavya Gupta";
  const title = profile?.title || "Full-Stack Developer & AI/ML Enthusiast";
  const objective = profile?.careerObjective || "Aspiring Computer Science (AI) student with strong expertise in full-stack development and a solid foundation in data structures, algorithms and system design.";

  return (
    <section id="hero" className="min-h-[85vh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
      {/* Animated floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Floating Badges */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[5%] lg:left-[15%] px-5 py-2.5 bg-card/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg shadow-primary/5 text-primary font-mono text-sm hidden md:flex items-center gap-2 z-0"
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        &lt;React /&gt;
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[30%] right-[5%] lg:right-[15%] px-5 py-2.5 bg-card/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg shadow-blue-500/5 text-blue-400 font-mono text-sm hidden md:flex items-center gap-2 z-0"
      >
        <span className="text-blue-400">🐍</span> Python
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[25%] left-[10%] lg:left-[20%] px-5 py-2.5 bg-card/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg shadow-cyan-500/5 text-cyan-400 font-mono text-sm hidden md:flex items-center gap-2 z-0"
      >
        <span>🤖</span> AI/ML Models
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[35%] right-[10%] lg:right-[20%] px-5 py-2.5 bg-card/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg shadow-green-500/5 text-green-400 font-mono text-sm hidden md:flex items-center gap-2 z-0"
      >
        <span className="text-green-400">🟢</span> Node.js
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[15%] right-[25%] lg:right-[35%] px-5 py-2.5 bg-card/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg shadow-amber-500/5 text-amber-400 font-mono text-sm hidden md:flex items-center gap-2 z-0"
      >
        <span>🧩</span> DSA
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute top-[50%] left-[5%] lg:left-[10%] px-5 py-2.5 bg-card/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg shadow-indigo-500/5 text-indigo-400 font-mono text-sm hidden md:flex items-center gap-2 z-0"
      >
        <span>⚙️</span> C++
      </motion.div>
      
      <div className="container px-4 md:px-8 mx-auto flex flex-col items-center text-center space-y-6 z-10 mt-10">
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-blue-500">{name}</span>
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-mono">
              <span className="text-primary/70">{">"}</span> {title}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-3 h-6 bg-primary ml-1 align-middle"
              />
            </p>
          </motion.div>
        </motion.div>
        
        <motion.p 
          className="max-w-[700px] text-muted-foreground/80 leading-relaxed text-lg flex flex-wrap justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.02, delayChildren: 0.4 }
            }
          }}
        >
          {objective.split(" ").map((word: string, i: number) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em] mb-1"
              variants={{
                hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" }
              }}
              transition={{ duration: 0.4 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button size="lg" asChild className="group relative overflow-hidden">
            <Link href="#projects">
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="group border-primary/50 hover:bg-primary/10 transition-colors">
            <Link href="#contact">
              Contact Me
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
