import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("Missing GEMINI_API_KEY in backend/.env");

// AI Studio direct API (works without Cloud billing setup)
const genAI = new GoogleGenerativeAI(apiKey);

// Use a vision-capable model (fast + cheap)
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

export async function verifyBinImage({ mimeType, base64Data }) {
  const prompt = `
You are a strict visual inspector for a civic reporting app.
Task: decide if the image contains a PUBLIC WASTE BIN (street litter bin, wheelie bin, recycling bin).
Reject: mailboxes, buckets, storage boxes, planters, random containers, trash bags with no bin visible.

Return ONLY valid JSON (no markdown, no extra text) with this schema:
{
  "has_bin": boolean,
  "confidence": number,
  "bin_type_guess": "street_litter"|"wheelie"|"recycling"|"other"|"unknown",
  "reason_short": string
}
`;

  const result = await model.generateContent([
    { text: prompt },
    {
      inlineData: {
        mimeType,
        data: base64Data
      }
    }
  ]);

  const raw = result.response.text().trim();

  // Parse JSON robustly (handles occasional extra text)
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Gemini returned non-JSON: ${raw}`);
    json = JSON.parse(match[0]);
  }

  // Cleanup
  json.confidence = Math.max(0, Math.min(1, Number(json.confidence ?? 0)));
  if (typeof json.has_bin !== "boolean") json.has_bin = false;

  return json;
}

export async function validateLitterImage({ mimeType, base64Data, note = "" }) {
  const prompt = `
You are a strict visual inspector for a civic reporting app.

Task: Determine if the image shows LITTERING in a public area (trash on ground, scattered waste, dumped bags, messy spill).
If litter is present, classify severity:
- mild: 1-5 small items, localized
- medium: noticeable pile(s) or scattered across a small area
- high: large amounts, widespread dumping, bags/overflow causing a big mess

User note (may be empty): "${note}"

Return ONLY valid JSON (no markdown, no extra text) with this schema:
{
  "is_litter": boolean,
  "severity": "mild"|"medium"|"high"|"unknown",
  "confidence": number,
  "reason_short": string
}

Reject: clean scenes, indoor trash cans, storage boxes, organized recycling piles, or anything not clearly public litter.
`;

  const result = await model.generateContent([
    { text: prompt },
    {
      inlineData: {
        mimeType,
        data: base64Data
      }
    }
  ]);

  const raw = result.response.text().trim();

  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Gemini returned non-JSON: ${raw}`);
    json = JSON.parse(match[0]);
  }

  json.confidence = Math.max(0, Math.min(1, Number(json.confidence ?? 0)));
  if (typeof json.is_litter !== "boolean") json.is_litter = false;

  const allowed = new Set(["mild", "medium", "high", "unknown"]);
  if (!allowed.has(json.severity)) json.severity = "unknown";

  return json;
}