import { createReportService } from "../services/reportService.js";

// Handle POST /api/reports
export async function createReport(req, res) {
    try {
        const userId = req.auth.sub; // Auth0 user ID

        const { report, duplicate } = await createReportService(userId, req.body);

        res.json({
            success: true,
            duplicate,
            report
        });
    } catch (err) {
        console.error("Rport creation error:", err);
        res.status(500).json({ error: "Failed to create report" });
    }
}