import mongoose from "mongoose";

// Represents a physical bin on the map
const BinSchema = new mongoose.Schema({
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number], // [lng, lat]
    },
    postcode: String,
    binType: String,
    latestImageUrl: String,
    latestFillPercent: Number,
    createdByUserId: String,
    adminApproved: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Bin", BinSchema);