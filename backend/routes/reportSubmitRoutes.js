/**
 * reportSubmitRoutes.js
 *
 * Defines endpoints for submitting reports.
 */

import { Router } from "express";
import multer from "multer";
import { submitBinReport, submitLitterReport } from "../controllers/reportSubmitController.js";

const router = Router();

// Store uploaded file in memory (we send it to DO directly)
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/reports/bin
router.post("/bin", upload.single("image"), submitBinReport);

// POST /api/reports/litter
router.post("/litter", upload.single("image"), submitLitterReport);

export default router;