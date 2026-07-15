import mongoose from "mongoose";

export interface IAchievement extends mongoose.Document {
  type: "Certification" | "Achievement";
  title: string;
  issuer?: string;
  date: string;
  order: number;
}

const achievementSchema = new mongoose.Schema<IAchievement>({
  type: { type: String, enum: ["Certification", "Achievement"], required: true },
  title: { type: String, required: true },
  issuer: { type: String },
  date: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export const Achievement = mongoose.models.Achievement || mongoose.model<IAchievement>("Achievement", achievementSchema);
