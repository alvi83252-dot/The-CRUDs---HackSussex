import Report from "../models/Report.js";
import { isDuplicateReport } from "../utils/duplicateCheck.js";

// Handles creation of reports using the new Schema
export async function createReportService(userId, data) {
    // check duplicates (same user, same location)
    const existing = await Report.find({ userId });

    const duplicate = isDuplicateReport(existing, {
        coordinates: [data.location.lng, data.location.lat]
    });

    // build report object
    const report = await Report.create({
        type: data.type,
        binId: data.type || null,
        userId,
        imageUrl: data.imageUrl,
        
        ai: {
            model: data.ai?.model || null,
            isValid: data.ai?.isValid || false,
            confidence: data.ai?.confidence || 0,
            labels: data.ai?.labels || [],
            reason_short: data.ai?.reason_short || ""
        },

        location: {
            lat: data.location.lat,
            lng: data.location.lng
        },

        createdAt: new Date()
    });

    return { report, duplicate };
}