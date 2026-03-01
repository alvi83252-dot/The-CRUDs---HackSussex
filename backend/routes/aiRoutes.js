// backend/routes/aiRoutes.js
import express from "express";
import multer from "multer";
import { verifyBinImage, validateLitterImage } from "../gemini.js"; // your gemini service

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Helper: ensure correct MIME for Gemini
function fixMime(file) {
  let mimeType = file.mimetype;
  if (file.originalname.endsWith(".webp")) mimeType = "image/webp";
  if (file.originalname.endsWith(".png")) mimeType = "image/png";
  if (file.originalname.endsWith(".jpg") || file.originalname.endsWith(".jpeg"))
    mimeType = "image/jpeg";
  return mimeType;
}

// POST /ai/verify-bin
router.post("/verify-bin", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image file" });

    const mimeType = fixMime(req.file);
    const base64Data = req.file.buffer.toString("base64");

    const verdict = await verifyBinImage({ mimeType, base64Data });
    return res.json(verdict);
  } catch (err) {
    return res.status(500).json({ error: `[GoogleGenerativeAI Error]: ${err.message}` });
  }
});

// POST /ai/validate-litter
router.post("/validate-litter", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Missing image file" });

    const mimeType = fixMime(req.file);
    const base64Data = req.file.buffer.toString("base64");
    const note = req.body?.note || "";

    const verdict = await validateLitterImage({ mimeType, base64Data, note });
    return res.json(verdict);
  } catch (err) {
    return res.status(500).json({ error: `[GoogleGenerativeAI Error]: ${err.message}` });
  }
});

export default router;