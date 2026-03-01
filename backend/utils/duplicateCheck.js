// prevent users from submittng multiple reports at the same location

export function isDuplicateReport(existingReports, newLocation) {
    return existingReports.some((r) => {
        const [lng, lat] = r.location.coordinates;
        const [newLng, newlat] = newLocation.coordinates;

        // Simple distance check 
        const distance = Math.sqrt(
            Math.pow(lng - newLng, 2) + Math.pow(lat - newlat, 2)
        );

        return distance < 0.0001;
    });
}