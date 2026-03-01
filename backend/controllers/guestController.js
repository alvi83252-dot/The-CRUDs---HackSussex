import GuestUser from "../models/GuestUser.js";
import { randomUUID } from "crypto";

// POST /api/guest/start
// creates a new guest session
export async function startGuest(req, res) {
    try {
        const guestId = randomUUID();

        const guest = await GuestUser.create({
            guestId,
            xp: 0,
            league: "bronze"
        });

        res.json({
            guestId,
            xp: guest.xp,
            league: guest.league
        });
    } catch (err) {
        console.error("Guest creation error:", err);
        res.status(500).json({ error: "Failed to create guest" });
    }
}

// GET /api/guest
// Fetch guest progress
export async function getGuest(req, res) {
    try {
        const guest = await GuestUser.findOne({ guestId: req.params.guestId });

        if (!guest) return res.status(404).json({ error: "Guest not found" });

        res.json(guest);
    } catch (err) {
        console.error("Guest fetch error", err);
        res.status(500).json({ error: "Faield to fecth guest "});
    }
}