import mongoose from "mongoose";

export interface IEducation extends mongoose.Document {
  institution: string;
  degree: string;
  board?: string;
  startYear: string;
  endYear: string;
  location: string;
  score: string;
  order: number;
}

const educationSchema = new mongoose.Schema<IEducation>({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  board: { type: String },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
  location: { type: String, required: true },
  score: { type: String, required: true },
  order: { type: Number, default: 0 },
});

export const Education = mongoose.models.Education || mongoose.model<IEducation>("Education", educationSchema);
