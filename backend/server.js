import express from "express";
import { connectDB } from "./db.js";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { verifyBinImage, validateLitterImage } from "./gemini.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

// Verify bin image (multipart form-data: image)
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

app.post("/ai/validate-litter", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image file" });

    const mimeType = req.file.mimetype;
    const base64Data = req.file.buffer.toString("base64");

    // Optional text note from frontend
    const note = req.body?.note || "";

    const verdict = await validateLitterImage({ mimeType, base64Data, note });
    return res.json(verdict);
  } catch (err) {
    return res.status(500).json({ error: String(err.message || err) });
  }
});

// List models available for this API key (REST)
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

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });