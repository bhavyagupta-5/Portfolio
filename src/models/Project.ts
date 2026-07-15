import mongoose from "mongoose";

export interface IProject extends mongoose.Document {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  bullets: string[];
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  images: string[];
  startDate: string;
  endDate: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, default: "" },
  bullets: [{ type: String }],
  techStack: [{ type: String }],
  githubUrl: { type: String, default: null },
  liveUrl: { type: String, default: null },
  images: [{ type: String }],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
