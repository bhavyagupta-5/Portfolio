import mongoose from "mongoose";

export interface IExperience extends mongoose.Document {
  role: string;
  organization: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  order: number;
}

const experienceSchema = new mongoose.Schema<IExperience>({
  role: { type: String, required: true },
  organization: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  bullets: [{ type: String }],
  order: { type: Number, default: 0 },
});

export const Experience = mongoose.models.Experience || mongoose.model<IExperience>("Experience", experienceSchema);
