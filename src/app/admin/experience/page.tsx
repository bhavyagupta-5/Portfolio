"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<any>(null);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/experience");
      const data = await res.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleAddNew = () => {
    setCurrentExp({
      role: "",
      organization: "",
      type: "Full-time",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [],
      order: experiences.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (exp: any) => {
    setCurrentExp(exp);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchExperience();
      } else {
        alert("Failed to delete experience");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !currentExp._id;
    const url = isNew ? "/api/experience" : `/api/experience/${currentExp._id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentExp),
      });

      if (res.ok) {
        setIsEditing(false);
        fetchExperience();
      } else {
        let errorMsg = `Failed to save experience (Status: ${res.status})`;
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

  if (loading && !isEditing && experiences.length === 0) {
    return <div className="text-muted-foreground">Loading experience...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/40 border border-border/50 rounded-2xl p-6 md:p-8 relative"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Experience Manager</h1>
          <p className="text-muted-foreground">Manage your work history and roles.</p>
        </div>
        {!isEditing && (
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus size={18} /> Add Experience
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-background/50 border border-border/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{currentExp._id ? "Edit Experience" : "New Experience"}</h2>
            <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={currentExp.role}
                  onChange={(e) => setCurrentExp({ ...currentExp, role: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Organization (Company)</Label>
                <Input
                  value={currentExp.organization}
                  onChange={(e) => setCurrentExp({ ...currentExp, organization: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Type (e.g. Full-time, Internship)</Label>
                <Input
                  value={currentExp.type}
                  onChange={(e) => setCurrentExp({ ...currentExp, type: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={currentExp.location}
                  onChange={(e) => setCurrentExp({ ...currentExp, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={currentExp.startDate}
                  onChange={(e) => setCurrentExp({ ...currentExp, startDate: e.target.value })}
                  required
                  placeholder="e.g. Jan 2024"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  value={currentExp.endDate}
                  onChange={(e) => setCurrentExp({ ...currentExp, endDate: e.target.value })}
                  required
                  placeholder="e.g. Present"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bullets (Separate each bullet with a new line)</Label>
              <textarea
                value={Array.isArray(currentExp.bullets) ? currentExp.bullets.join("\n") : currentExp.bullets}
                onChange={(e) => setCurrentExp({ 
                  ...currentExp, 
                  bullets: e.target.value.split("\n").filter(Boolean) 
                })}
                rows={5}
                className="flex w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit">Save Experience</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="p-3 text-sm font-semibold text-muted-foreground">Role</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground">Organization</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground">Dates</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp._id} className="border-b border-border/20 hover:bg-white/5 transition-colors">
                  <td className="p-3 font-medium">{exp.role}</td>
                  <td className="p-3">{exp.organization}</td>
                  <td className="p-3 text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</td>
                  <td className="p-3 flex justify-end gap-2">
                    <button onClick={() => handleEdit(exp)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(exp._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {experiences.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">No experience entries found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
