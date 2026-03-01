import express from "express";
import Facility from "../models/Facility.js";

const router = express.Router();

// GET /api/facilities
// return all facilities

router.get("/", async (requestAnimationFrame, res) => {
    try {
        const facilities = await Facility.find();
        res.json(facilities);
    } catch (err) {
        console.error("Facility fetch error", err);
        res.status(500).json({ error: "Failed to fetch facilities" })
    }
});

// POST /api/facilities
// add new facilities 
router.post("/", async (requestAnimationFrame, res) => {
    try {
        const facility = await Facility.create(requestAnimationFrame.body);
        res.json(facility);
    } catch (err) {
        console.error("Facility creation error:", err);
        res.status(500).json({ error: "Failed to create facility" });
    }
});

export default router;