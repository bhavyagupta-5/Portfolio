"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function AdminSkills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<any>(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddNew = () => {
    setCurrentSkill({
      category: "Languages",
      name: "",
      order: skills.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (skill: any) => {
    setCurrentSkill(skill);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchSkills();
      } else {
        alert("Failed to delete skill");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !currentSkill._id;
    const url = isNew ? "/api/skills" : `/api/skills/${currentSkill._id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSkill),
      });

      if (res.ok) {
        setIsEditing(false);
        fetchSkills();
      } else {
        let errorMsg = `Failed to save skill (Status: ${res.status})`;
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

  if (loading && !isEditing && skills.length === 0) {
    return <div className="text-muted-foreground">Loading skills...</div>;
  }

  // Group skills by category for display
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/40 border border-border/50 rounded-2xl p-6 md:p-8 relative"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Skills Manager</h1>
          <p className="text-muted-foreground">Manage your technical and soft skills.</p>
        </div>
        {!isEditing && (
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus size={18} /> Add Skill
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-background/50 border border-border/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{currentSkill._id ? "Edit Skill" : "New Skill"}</h2>
            <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={currentSkill.category}
                onChange={(e) => setCurrentSkill({ ...currentSkill, category: e.target.value })}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="Languages">Languages</option>
                <option value="Frameworks & Libraries">Frameworks & Libraries</option>
                <option value="Databases & Tools">Databases & Tools</option>
                <option value="Core Fundamentals">Core Fundamentals</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Skill Name</Label>
              <Input
                value={currentSkill.name}
                onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                required
                placeholder="e.g. React, TypeScript, Node.js"
              />
            </div>
            <div className="space-y-2">
              <Label>Order (Lower number appears first)</Label>
              <Input
                type="number"
                value={currentSkill.order}
                onChange={(e) => setCurrentSkill({ ...currentSkill, order: parseInt(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit">Save Skill</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.keys(groupedSkills).length === 0 ? (
            <div className="p-6 text-center text-muted-foreground border border-border/20 rounded-lg">No skills found. Add one!</div>
          ) : (
            Object.entries(groupedSkills).map(([category, catSkills]: [string, any]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catSkills.sort((a: any, b: any) => a.order - b.order).map((skill: any) => (
                    <div key={skill._id} className="flex justify-between items-center p-4 bg-background/50 border border-border/20 rounded-lg hover:border-primary/50 transition-colors">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(skill)} className="text-blue-400 hover:text-blue-300">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(skill._id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}
