// load environment variables
import dotenv from "dotenv";
dotenv.config();

// core dependencies
import mongoose from "mongoose";
import express from "express";
import { connectDB } from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { verifyBinImage } from "./gemini.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

// Simple health check route
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

app.post("/ai/verify-bin", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image file" });

    const mimeType = req.file.mimetype;
    const base64Data = req.file.buffer.toString("base64");

    const verdict = await verifyBinImage({ mimeType, base64Data });
    return res.json(verdict);
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});