import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("Missing GEMINI_API_KEY in backend/.env");

// IMPORTANT: model must match /ai/list-models exactly
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

/* -------------------- BIN DETECTION -------------------- */
export async function verifyBinImage({ mimeType, base64Data }) {
  const prompt = `
You are a strict visual inspector for a civic reporting app.
Task: decide if the image contains a PUBLIC WASTE BIN (street litter bin, wheelie bin, recycling bin).
Reject: mailboxes, buckets, storage boxes, planters, random containers, trash bags with no bin visible.

Return ONLY valid JSON with this schema:
{
  "has_bin": boolean,
  "confidence": number,
  "bin_type_guess": "street_litter"|"wheelie"|"recycling"|"other"|"unknown",
  "reason_short": string
}
`.trim();

  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType, data: base64Data } }
  ]);

  return cleanJson(result.response.text(), "has_bin");
}

/* -------------------- LITTER DETECTION -------------------- */
export async function validateLitterImage({ mimeType, base64Data, note = "" }) {
  const prompt = `
You are a strict visual inspector for a civic reporting app.

Task: Determine if the image shows LITTERING in a public area (trash on ground, scattered waste, dumped bags, messy spill).
If litter is present, classify severity:
- mild: 1-5 small items, localised
- medium: noticeable pile(s) or scattered across a small area
- high: large amounts, widespread dumping, bags/overflow causing a big mess

User note: "${note}"

Return ONLY valid JSON:
{
  "is_litter": boolean,
  "severity": "mild"|"medium"|"high"|"unknown",
  "confidence": number,
  "reason_short": string
}
`.trim();

  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType, data: base64Data } }
  ]);

  return cleanJson(result.response.text(), "is_litter");
}

/* -------------------- JSON CLEANER -------------------- */
function cleanJson(raw, boolField) {
  const text = String(raw ?? "").trim();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Gemini returned non-JSON: ${text}`);
    json = JSON.parse(match[0]);
  }

  json.confidence = Math.max(0, Math.min(1, Number(json.confidence ?? 0)));
  if (typeof json[boolField] !== "boolean") json[boolField] = false;

  return json;
}