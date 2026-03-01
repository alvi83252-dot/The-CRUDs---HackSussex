import express from "express";
import { checkJwt } from "../middleware/auth.js";
import { getMe } from "../controllers/userController.js";

const router = express.Router();

router.post("/me", checkJwt, getMe);

export default router;