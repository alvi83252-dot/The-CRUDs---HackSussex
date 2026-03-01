import express from "express";
import { checkJwt } from "../middleware/auth.js";

const router = express.Router();

// TEMP route so server does not crash
router.get("/", (req, res) => {
    res.json({ message: "Bin routes working!" });
});

export default router;