// backend/services/geminiService.js
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("Missing GEMINI_API_KEY in backend/.env");

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

// ✅ Verify if image contains a bin
export async function verifyBinImage({ mimeType, base64Data }) {
  const prompt = `
You are a strict visual inspector for a civic reporting app.
Task: decide if the image contains a PUBLIC WASTE BIN (street litter bin, wheelie bin, recycling bin).
Reject: mailboxes, buckets, storage boxes, planters, random containers, trash bags with no bin visible.

Return ONLY valid JSON (no markdown, no extra text):
{
  "has_bin": boolean,
  "confidence": number,
  "bin_type_guess": "street_litter"|"wheelie"|"recycling"|"other"|"unknown",
  "reason_short": string
}`;

  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType, data: base64Data } }
  ]);

  const raw = result.response.text().trim();
  let json;
  try { json = JSON.parse(raw); } 
  catch { json = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]); }

  json.confidence = Math.max(0, Math.min(1, Number(json.confidence ?? 0)));
  if (typeof json.has_bin !== "boolean") json.has_bin = false;
  return json;
}

// ✅ Assess bin fill level
export async function assessBinFill({ mimeType, base64Data }) {
  const prompt = `
You are a visual inspector for civic reporting.
Task: Look at the bin image and determine fill level: "empty", "half", "full", "missing".
Return ONLY valid JSON:
{
  "status": "empty"|"half"|"full"|"missing",
  "confidence": number,
  "reason_short": string
}`;
  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType, data: base64Data } }
  ]);

  const raw = result.response.text().trim();
  let json;
  try { json = JSON.parse(raw); } 
  catch { json = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]); }

  json.confidence = Math.max(0, Math.min(1, Number(json.confidence ?? 0)));
  const allowed = new Set(["empty","half","full","missing"]);
  if (!allowed.has(json.status)) json.status = "missing";
  return json;
}

// ✅ Validate litter
export async function validateLitterImage({ mimeType, base64Data, note = "" }) {
  const prompt = `
You are a strict visual inspector for a civic reporting app.
Task: Determine if the image shows LITTERING in a public area.
If litter is present, classify severity: mild, medium, high.
User note: "${note}"
Return ONLY valid JSON:
{
  "is_litter": boolean,
  "severity": "mild"|"medium"|"high"|"unknown",
  "confidence": number,
  "reason_short": string
}`;

  const result = await model.generateContent([
    { text: prompt },
    { inlineData: { mimeType, data: base64Data } }
  ]);

  const raw = result.response.text().trim();
  let json;
  try { json = JSON.parse(raw); } 
  catch { json = JSON.parse(raw.match(/\{[\s\S]*\}/)[0]); }

  json.confidence = Math.max(0, Math.min(1, Number(json.confidence ?? 0)));
  if (typeof json.is_litter !== "boolean") json.is_litter = false;
  const allowed = new Set(["mild","medium","high","unknown"]);
  if (!allowed.has(json.severity)) json.severity = "unknown";
  return json;
}