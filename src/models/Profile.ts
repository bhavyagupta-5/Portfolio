import mongoose from "mongoose";

export interface IProfile extends mongoose.Document {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  bio: string;
  careerObjective: string;
  resumeUrl: string;
  profileImageUrl: string;
  updatedAt: Date;
}

const profileSchema = new mongoose.Schema<IProfile>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: "" },
  linkedin: { type: String, required: true },
  github: { type: String, required: true },
  bio: { type: String, default: "" },
  careerObjective: { type: String, required: true },
  resumeUrl: { type: String, default: "" },
  profileImageUrl: { type: String, default: "" },
}, { timestamps: true });

export const Profile = mongoose.models.Profile || mongoose.model<IProfile>("Profile", profileSchema);
