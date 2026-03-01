import Report from "../models/Report.js";
import { verifyBinImage, validateLitterImage } from "../gemini.js";

/* -----------------------------------------------------------
   SUBMIT BIN REPORT (Local Mongo version)
----------------------------------------------------------- */
export async function submitBinReport(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Missing image file" });
    }

    const lat = Number(req.body.lat);
    const lng = Number(req.body.lng);

   if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return res.status(400).json({ error: "Missing lat/lng" });
    }

    // Convert image to base64
    const base64Image = req.file.buffer.toString("base64");

    // Gemini validation
    const aiResult = await verifyBinImage({
      mimeType: req.file.mimetype,
      base64Data: base64Image
    });

    // Save report in MongoDB
const report = await Report.create({
  type: "bin",
  imageBase64: base64Image,
  lat,
  lng,
  ai: aiResult,
  createdAt: new Date()
});

    return res.json({ success: true, report });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


/* -----------------------------------------------------------
   SUBMIT LITTER REPORT (Local Mongo version)
----------------------------------------------------------- */
export async function submitLitterReport(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Missing image file" });
    }

    const lat = Number(req.body.lat);
    const lng = Number(req.body.lng);

    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing lat/lng" });
    }

    const note = req.body.note || "";

    // Convert image to base64
    const base64Image = req.file.buffer.toString("base64");

    // Gemini litter validation
    const aiResult = await validateLitterImage({
      mimeType: req.file.mimetype,
      base64Data: base64Image,
      note
    });

    // Save report in MongoDB
   const report = await Report.create({
  type: "litter",
  imageBase64: base64Image,
  lat,
  lng,
  note,
  ai: aiResult,
  createdAt: new Date()
});

    return res.json({ success: true, report });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}