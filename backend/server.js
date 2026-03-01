import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import multer from "multer";

import { verifyBinImage, validateLitterImage } from "./gemini.js";
import reportSubmitRoutes from "./routes/reportSubmitRoutes.js";

/* ---------------------------
   1️⃣ CONNECT TO MONGODB
---------------------------- */

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop server if DB fails
  });

/* ---------------------------
   2️⃣ CREATE EXPRESS APP
---------------------------- */

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

/* ---------------------------
   3️⃣ HEALTH CHECK
---------------------------- */

app.get("/health", (req, res) => {
  res.json({ status: "Backend running 🚀" });
});

/* ---------------------------
   4️⃣ GEMINI TEST ROUTES
---------------------------- */

app.post("/api/ai/verify-bin", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image file" });

    const result = await verifyBinImage({
      mimeType: req.file.mimetype,
      base64Data: req.file.buffer.toString("base64")
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/ai/validate-litter", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image file" });

    const result = await validateLitterImage({
      mimeType: req.file.mimetype,
      base64Data: req.file.buffer.toString("base64"),
      note: req.body?.note || ""
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------------------
   5️⃣ REPORT ROUTES (Mongo Save)
---------------------------- */

app.use("/api/reports", reportSubmitRoutes);

/* ---------------------------
   6️⃣ START SERVER
---------------------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});