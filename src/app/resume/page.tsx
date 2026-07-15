import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Resume | Bhavya Gupta",
  description: "View the resume of Bhavya Gupta, Full-Stack Developer",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col">
      <div className="container px-4 md:px-8 mx-auto mb-8 flex-shrink-0">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-mono text-sm">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
      </div>
      <div className="container px-4 md:px-8 mx-auto flex-1 flex flex-col items-center">
        <div className="w-full max-w-5xl flex-1 bg-card border border-border/50 rounded-xl overflow-hidden min-h-[75vh] relative shadow-[0_10px_30px_-15px_rgba(14,165,233,0.2)]">
          {/* This iframe embeds the PDF directly on the page */}
          <iframe 
            src="/resume.pdf" 
            className="w-full h-full absolute inset-0 z-10"
            title="Resume PDF"
          />
          
          {/* This shows behind the iframe in case the file is missing or blocked */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-background z-0">
            <h2 className="text-xl font-bold mb-2">Resume Not Found</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              The PDF could not be loaded. Please ensure you have placed your <code className="bg-muted px-1.5 py-0.5 rounded text-primary">resume.pdf</code> file inside the <code className="bg-muted px-1.5 py-0.5 rounded text-primary">public</code> folder.
            </p>
            <a 
              href="/resume.pdf" 
              download 
              className="px-6 py-2 bg-primary/10 text-primary border border-primary/50 hover:bg-primary hover:text-primary-foreground transition-colors rounded-md font-mono text-sm font-semibold"
            >
              Attempt Manual Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
