import mongoose from "mongoose";

export interface IAdminUser extends mongoose.Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const adminUserSchema = new mongoose.Schema<IAdminUser>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

export const AdminUser = mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", adminUserSchema);
