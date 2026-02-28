import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("Missing GEMINI_API_KEY in backend/.env");

const genAI = new GoogleGenerativeAI(apiKey);

// Vision-capable + fast for hackathon
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

  // Parse JSON robustly
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Gemini returned non-JSON: ${raw}`);
    json = JSON.parse(match[0]);
  }

  // basic cleanup
  json.confidence = Math.max(0, Math.min(1, Number(json.confidence ?? 0)));
  if (typeof json.has_bin !== "boolean") json.has_bin = false;

  return json;
}