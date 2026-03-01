import express from "express";
import multer from "multer";
import { createReport } from "../controllers/reportController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), createReport);

export default router;