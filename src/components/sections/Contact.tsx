"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/10 relative">
      <div className="container px-4 md:px-8 mx-auto max-w-3xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4"><span className="text-primary font-mono text-xl mr-2">05.</span>Get In Touch</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-card/50 backdrop-blur-md border border-border/60 p-8 md:p-12 rounded-2xl shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Decorative glow */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10"></div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium font-mono text-primary/80">Name</label>
                <input 
                  id="name"
                  {...register("name")}
                  className="bg-background/80 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name.message}</span>}
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium font-mono text-primary/80">Email</label>
                <input 
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-background/80 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" 
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium font-mono text-primary/80">Message</label>
              <textarea 
                id="message"
                {...register("message")}
                rows={5} 
                className="bg-background/80 border border-border rounded-lg p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                placeholder="Hello Bhavya, I'd like to talk about..."
              ></textarea>
              {errors.message && <span className="text-red-400 text-xs mt-1">{errors.message.message}</span>}
            </div>
            
            <Button 
              size="lg" 
              className="mt-4 font-mono w-full sm:w-auto self-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            
            {submitStatus === "success" && (
              <p className="text-green-400 text-center text-sm mt-4">Thank you! Your message has been sent successfully.</p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-400 text-center text-sm mt-4">Oops! Something went wrong. Please try again later.</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
