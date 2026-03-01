/**
 * storageService.js
 *
 * Handles image uploads to DigitalOcean Spaces (S3-compatible storage).
 * This file is responsible ONLY for file storage.
 * It does NOT know about Gemini or MongoDB.
 */

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

// Load required environment variables
const {
  DO_SPACES_KEY,
  DO_SPACES_SECRET,
  DO_SPACES_ENDPOINT,   // e.g. https://fra1.digitaloceanspaces.com
  DO_SPACES_BUCKET,     // e.g. binfinder
  DO_SPACES_REGION,     // e.g. fra1
  DO_SPACES_CDN_BASE    // optional CDN URL
} = process.env;

// Safety check to prevent silent failure
if (!DO_SPACES_KEY || !DO_SPACES_SECRET || !DO_SPACES_ENDPOINT || !DO_SPACES_BUCKET) {
  throw new Error("Missing DigitalOcean Spaces environment variables.");
}

/**
 * Create S3-compatible client for DigitalOcean Spaces.
 * DO Spaces uses AWS S3 protocol.
 */
const s3 = new S3Client({
  region: DO_SPACES_REGION || "us-east-1",
  endpoint: DO_SPACES_ENDPOINT,
  credentials: {
    accessKeyId: DO_SPACES_KEY,
    secretAccessKey: DO_SPACES_SECRET
  }
});

/**
 * Small helper to determine file extension from MIME type.
 */
function guessExtension(mimeType) {
  if (mimeType === "image/jpeg") return "jpg";
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  return "bin";
}

/**
 * Upload image buffer to DigitalOcean Spaces.
 *
 * @param {Buffer} buffer - image file buffer
 * @param {String} mimeType - file MIME type
 * @param {String} folder - logical folder in bucket
 *
 * @returns {Object} { key, url }
 */
export async function uploadImageToSpaces({ buffer, mimeType, folder = "uploads" }) {

  // Generate random filename to avoid collisions
  const randomName = crypto.randomBytes(16).toString("hex");
  const ext = guessExtension(mimeType);

  // Example key: reports/litter/1700000000-abc123.jpg
  const key = `${folder}/${Date.now()}-${randomName}.${ext}`;

  // Upload file to DO Spaces
  await s3.send(
    new PutObjectCommand({
      Bucket: DO_SPACES_BUCKET,
      Key: key,
      Body: buffer,
      ACL: "public-read",      // makes file publicly accessible
      ContentType: mimeType
    })
  );

  // Generate public URL
  const publicUrl = DO_SPACES_CDN_BASE
    ? `${DO_SPACES_CDN_BASE.replace(/\/$/, "")}/${key}`
    : `${DO_SPACES_ENDPOINT.replace(/\/$/, "")}/${DO_SPACES_BUCKET}/${key}`;

  return { key, url: publicUrl };
}