import mongoose from "mongoose";

export interface ISkill extends mongoose.Document {
  category: "Languages" | "Frameworks & Libraries" | "Databases & Tools" | "Core Fundamentals" | "Soft Skills";
  name: string;
  order: number;
}

const skillSchema = new mongoose.Schema<ISkill>({
  category: { 
    type: String, 
    enum: ["Languages", "Frameworks & Libraries", "Databases & Tools", "Core Fundamentals", "Soft Skills"],
    required: true
  },
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>("Skill", skillSchema);
