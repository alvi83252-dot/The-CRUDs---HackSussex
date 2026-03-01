import mongoose from "mongoose";

// stores user profile 
const UserSchema = new mongoose.Schema({
    auth0sub: {
        type: String,
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
    }
});

export default mongoose.model("User", UserSchema);