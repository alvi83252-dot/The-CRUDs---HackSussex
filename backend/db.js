import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI in backend/.env");

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri, {
    // These options are safe defaults; mongoose ignores unknown ones if not needed
    serverSelectionTimeoutMS: 10000
  });

  console.log("✅ MongoDB connected");
}