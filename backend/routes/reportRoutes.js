import express from "express";
import { checkJwt } from "../middleware/auth.js";
import { createReport } from "../controllers/reportController.js";

const router = express.Router();

router.post("/", checkJwt, createReport);

export default router;