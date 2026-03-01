import mongoose from "mongoose";

// store each user submission
const ReportSchema = new mongoose.Schema({
    tyoe: {
        type: String,
        enum: ["bin_fill", "litter"],
        required: true
    },

    binId: {
        type: String,
        required: false
    },

    userId: {
        type: String, // Auth0 sub
        required: true
    },

    imageUrl: {
        type: String, 
        required: true
    },

    ai: {
        mode: String,
        isValid: Boolean,
        confidence: Number,
        labels: [String],
        reason_short: String
    },

    location: {
        lat: Number,
        lng: Number
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Report", ReportSchema);