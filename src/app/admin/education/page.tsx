"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function AdminEducation() {
  const [education, setEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdu, setCurrentEdu] = useState<any>(null);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/education");
      const data = await res.json();
      setEducation(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleAddNew = () => {
    setCurrentEdu({
      institution: "",
      degree: "",
      board: "",
      startYear: "",
      endYear: "",
      location: "",
      score: "",
      order: education.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (edu: any) => {
    setCurrentEdu(edu);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;
    try {
      const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEducation();
      } else {
        alert("Failed to delete education");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !currentEdu._id;
    const url = isNew ? "/api/education" : `/api/education/${currentEdu._id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentEdu),
      });

      if (res.ok) {
        setIsEditing(false);
        fetchEducation();
      } else {
        let errorMsg = `Failed to save education (Status: ${res.status})`;
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

  if (loading && !isEditing && education.length === 0) {
    return <div className="text-muted-foreground">Loading education...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/40 border border-border/50 rounded-2xl p-6 md:p-8 relative"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Education Manager</h1>
          <p className="text-muted-foreground">Manage your academic background and degrees.</p>
        </div>
        {!isEditing && (
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus size={18} /> Add Education
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-background/50 border border-border/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{currentEdu._id ? "Edit Education" : "New Education"}</h2>
            <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Institution / University</Label>
                <Input
                  value={currentEdu.institution}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, institution: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Degree (e.g. B.Tech in CSE)</Label>
                <Input
                  value={currentEdu.degree}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, degree: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Board (Optional)</Label>
                <Input
                  value={currentEdu.board || ""}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, board: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={currentEdu.location}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, location: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Start Year</Label>
                <Input
                  value={currentEdu.startYear}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, startYear: e.target.value })}
                  required
                  placeholder="e.g. 2021"
                />
              </div>
              <div className="space-y-2">
                <Label>End Year</Label>
                <Input
                  value={currentEdu.endYear}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, endYear: e.target.value })}
                  required
                  placeholder="e.g. 2025"
                />
              </div>
              <div className="space-y-2">
                <Label>Score / GPA</Label>
                <Input
                  value={currentEdu.score}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, score: e.target.value })}
                  required
                  placeholder="e.g. 8.5 CGPA"
                />
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  value={currentEdu.order}
                  onChange={(e) => setCurrentEdu({ ...currentEdu, order: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border/50">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button type="submit">Save Education</Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="p-3 text-sm font-semibold text-muted-foreground">Institution</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground">Degree</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground">Years</th>
                <th className="p-3 text-sm font-semibold text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {education.sort((a: any, b: any) => a.order - b.order).map((edu) => (
                <tr key={edu._id} className="border-b border-border/20 hover:bg-white/5 transition-colors">
                  <td className="p-3 font-medium">{edu.institution}</td>
                  <td className="p-3">{edu.degree}</td>
                  <td className="p-3 text-sm text-muted-foreground">{edu.startYear} - {edu.endYear}</td>
                  <td className="p-3 flex justify-end gap-2">
                    <button onClick={() => handleEdit(edu)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(edu._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {education.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-muted-foreground">No education entries found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
