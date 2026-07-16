import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-heading font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="text-primary">Bhavya</span>.dev
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/bhavyagupta-5"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://leetcode.com/u/bhavyagupta-5/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.541l5.967 5.68c.8.705 2.072.705 2.872 0l.02-.019a2.05 2.05 0 0 0 .004-2.735l-.014-.015-3.92-3.733-1.87-1.782a1.31 1.31 0 0 1-.365-.705 1.3 1.3 0 0 1 .129-.861 1.316 1.316 0 0 1 .741-.661 1.325 1.325 0 0 1 .907.039l6.19 2.046c.801.264 1.69-.138 1.947-.942l.024-.076a1.996 1.996 0 0 0-.616-2.128l-.023-.017-5.968-5.68a1.298 1.298 0 0 1-.361-.741 1.292 1.292 0 0 1 .151-.884 1.31 1.31 0 0 1 .763-.615 1.332 1.332 0 0 1 .927.086l4.135 1.921c.8.372 1.765-.008 2.1-.822l.02-.05a1.996 1.996 0 0 0-.74-2.22l-.022-.014L14.444.438A1.374 1.374 0 0 0 13.483 0zm0 0"/></svg>
            <span className="sr-only">LeetCode</span>
          </a>
          <a
            href="https://linkedin.com/in/bhavya-gupta5"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=bhavyagupta561@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
          <Link
            href="/admin"
            className="p-2 text-muted-foreground/50 hover:text-primary hover:bg-muted rounded-full transition-colors ml-4"
            title="Admin Login"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span className="sr-only">Admin Login</span>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Bhavya Gupta. All rights reserved.</p>
      </div>
    </footer>
  );
}
