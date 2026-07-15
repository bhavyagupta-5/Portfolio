import mongoose from "mongoose";

export interface IContactMessage extends mongoose.Document {
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const contactMessageSchema = new mongoose.Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model<IContactMessage>("ContactMessage", contactMessageSchema);
