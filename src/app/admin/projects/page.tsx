"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddNew = () => {
    setCurrentProject({
      title: "",
      slug: "",
      subtitle: "",
      category: "Web App",
      description: "",
      techStack: [],
      content: "",
      githubUrl: "",
      liveUrl: "",
      startDate: "",
      endDate: "",
      featured: false,
      order: projects.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (project: any) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !currentProject._id;
    const url = isNew ? "/api/projects" : `/api/projects/${currentProject._id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProject),
      });

      if (res.ok) {
        setIsEditing(false);
        fetchProjects();
      } else {
        let errorMsg = `Failed to save project (Status: ${res.status})`;
        try {
          const errorData = await res.clone().json();
          errorMsg = `${errorMsg} - ${errorData.error || "Unknown"}`;
        } catch (e) {
          const text = await res.text();
          errorMsg = `${errorMsg} - ${text || "Empty response body"}`;
        }
        alert(`Error: ${errorMsg}`);
      }
    } catch (err: any) {
      alert(`Network Error: ${err.message}`);
      console.error(err);
    }
  };

  if (loading && !isEditing && projects.length === 0) {
    return <div className="text-muted-foreground">Loading projects...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/40 border border-border/50 rounded-2xl p-6 md:p-8 relative"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects Manager</h1>
          <p className="text-muted-foreground">Add, edit, or reorder your portfolio projects.</p>
        </div>
        {!isEditing && (
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus size={18} /> Add Project
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-background/50 border border-border/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{currentProject._id ? "Edit Project" : "New Project"}</h2>
            <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL path)</Label>
                <Input
                  value={currentProject.slug}
                  onChange={(e) => setCurrentProject({ ...currentProject, slug: e.target.value })}
                  placeholder="leave empty to auto-generate"
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  value={currentProject.subtitle || ""}
                  onChange={(e) => setCurrentProject({ ...currentProject, subtitle: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={currentProject.category || ""}
                  onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input
                  value={currentProject.githubUrl || ""}
                  onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input
                  value={currentProject.liveUrl || ""}
                  onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={currentProject.startDate || ""}
                  onChange={(e) => setCurrentProject({ ...currentProject, startDate: e.target.value })}
                  placeholder="e.g. Jan 2024"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date (Use 'Ongoing' for WIP)</Label>
                <Input
                  value={currentProject.endDate || ""}
                  onChange={(e) => setCurrentProject({ ...currentProject, endDate: e.target.value })}
                  placeholder="e.g. Ongoing"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                value={currentProject.description}
                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                required
                rows={3}
                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack (comma separated)</Label>
              <Input
                value={Array.isArray(currentProject.techStack) ? currentProject.techStack.join(", ") : currentProject.techStack}
                onChange={(e) => setCurrentProject({ 
                  ...currentProject, 
                  techStack: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) 
                })}
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="featured"
                checked={currentProject.featured}
                onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit">Save Project</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="p-3 text-sm font-semibold text-muted-foreground">Title</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground">Status</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground">Featured</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-border/20 hover:bg-white/5 transition-colors">
                  <td className="p-3 font-medium">{project.title}</td>
                  <td className="p-3">
                    {project.endDate === "Ongoing" ? (
                      <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded">WIP</span>
                    ) : (
                      <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">Completed</span>
                    )}
                  </td>
                  <td className="p-3">
                    {project.featured ? "Yes" : "No"}
                  </td>
                  <td className="p-3 flex justify-end gap-2">
                    <button onClick={() => handleEdit(project)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">No projects found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
