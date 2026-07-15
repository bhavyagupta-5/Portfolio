import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import dbConnect from "../lib/db";
import { AdminUser } from "../models/AdminUser";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

async function run() {
  await dbConnect();
  
  const username = "admin";
  const password = "admin123";
  const passwordHash = await bcrypt.hash(password, 10);
  
  // Try to find the existing admin
  let admin = await AdminUser.findOne({ username });
  
  if (admin) {
    admin.passwordHash = passwordHash;
    await admin.save();
    console.log("Admin password updated successfully.");
  } else {
    await AdminUser.create({
      username,
      passwordHash
    });
    console.log("Admin user created successfully.");
  }
  
  mongoose.disconnect();
}

run().catch(console.error);
