import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  type: String,

  // Store image directly in Mongo (hackathon version)
  imageBase64: String,

  lat: Number,
  lng: Number,

  note: String,

  ai: {
    isValid: Boolean,
    severity: String,
    confidence: Number
  }

}, { timestamps: true });

export default mongoose.model("Report", reportSchema);