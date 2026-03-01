import dotenv from "dotenv";
dotenv.config();

// ✅ DEMO/STUB VERSION (works without Gemini network)
export async function verifyBinImage({ mimeType, base64Data }) {
  await new Promise(r => setTimeout(r, 500));
  return { isValid: true, severity: "N/A", confidence: 0.9 };
}

export async function validateLitterImage({ mimeType, base64Data, note }) {
  await new Promise(r => setTimeout(r, 700));
  const severities = ["LOW", "MEDIUM", "HIGH"];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  return { isValid: true, severity, confidence: 0.85 + Math.random() * 0.14 };
}