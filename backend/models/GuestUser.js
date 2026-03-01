import mongoose from "mongoose";
import { type } from "os";

const GuestUserSchema = new mongoose.Schema({
    guestId: {
        type: String, // random
        required: true
    },
    xp: {
        type: Number,
        default: 0
    },
    league: {
        type: String,
        enum: ["bronze", "silver", "gold"],
        default: "bronze"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("GuestUser", GuestUserSchema);