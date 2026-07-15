"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Briefcase, Code, GraduationCap, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Hide sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { name: "Profile", href: "/admin", icon: <User size={20} /> },
    { name: "Projects", href: "/admin/projects", icon: <Briefcase size={20} /> },
    { name: "Experience", href: "/admin/experience", icon: <LayoutDashboard size={20} /> },
    { name: "Skills", href: "/admin/skills", icon: <Code size={20} /> },
    { name: "Education", href: "/admin/education", icon: <GraduationCap size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card/30 border-r border-border/50 p-6 flex flex-col md:min-h-screen">
        <div className="mb-10 flex items-center justify-between md:justify-start">
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
            <span className="text-primary">Admin</span>Panel
          </h2>
        </div>

        <nav className="flex-1 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-visible pb-4 md:pb-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20 font-medium" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors mt-auto w-full text-left"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
