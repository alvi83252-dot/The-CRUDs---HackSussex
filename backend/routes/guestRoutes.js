import express from "express";
import { startGuest, getGuest } from "../controllers/guestController.js";

const router = express.Router();

// start a guest session
router.post("/start", startGuest);

// get Guest progress
router.get("/:guestId", getGuest);

export default router;