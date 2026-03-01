import dotenv from "dotenv";
dotenv.config();

console.log("Server starting...");
console.log("Mongo URI:", process.env.MONGODB_URI);
console.log("Gemini Key exists?", !!process.env.GEMINI_API_KEY);

import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

import express from "express";
import cors from "cors";
import multer from "multer";
import { verifyBinImage, validateLitterImage } from "./gemini.js";
import reportSubmitRoutes from "./routes/reportSubmitRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

// BIN CHECK
app.post("/ai/verify-bin", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image file" });

    const mimeType = req.file.mimetype;
    const base64Data = req.file.buffer.toString("base64");

    const verdict = await verifyBinImage({ mimeType, base64Data });
    res.json(verdict);
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

// LITTER CHECK
app.post("/ai/validate-litter", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image file" });

    const mimeType = req.file.mimetype;
    const base64Data = req.file.buffer.toString("base64");
    const note = req.body?.note || "";

    const verdict = await validateLitterImage({ mimeType, base64Data, note });
    res.json(verdict);
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

// LIST MODELS (debug helper)
app.get("/ai/list-models", async (req, res) => {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const r = await fetch(url);
    const data = await r.json();

    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
});

app.use("/api/reports", reportSubmitRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});