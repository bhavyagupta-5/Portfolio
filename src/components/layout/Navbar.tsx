"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const links = [
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#experience", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-heading font-bold text-xl tracking-tight text-primary">BG.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary text-foreground/80 font-mono text-xs uppercase tracking-wider">
              {link.label}
            </Link>
          ))}
          {/* <Button variant="outline" asChild className="ml-4 font-mono text-xs">
            <Link href="/resume">Resume</Link>
          </Button> */}
        </nav>
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background p-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-sm font-medium transition-colors hover:text-primary font-mono uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* <Button variant="outline" asChild className="w-full justify-center font-mono text-xs">
            <Link href="/resume">Resume</Link>
          </Button> */}
        </div>
      )}
    </header>
  )
}
