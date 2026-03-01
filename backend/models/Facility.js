import mongoose from "mongoose";
import { describe } from "node:test";

// static data, such as landfills, research centers, inceinerators
const FacilitySchema = new mongoose.Schema({
    name: String,
    type: String,
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number],
    },
    description: String,
});

export default mongoose.model("Facility", FacilitySchema);