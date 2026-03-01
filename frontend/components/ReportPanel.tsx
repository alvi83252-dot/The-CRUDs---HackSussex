"use client";

import { useState } from "react";

export default function LitterUploader() {
  const [litterFile, setLitterFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submitLitter = async () => {
    if (!litterFile) return alert("Take a photo first");

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const formData = new FormData();
          formData.append("image", litterFile);
          formData.append("lat", String(lat));
          formData.append("lng", String(lng));
          formData.append("note", "near campus walkway");

          const res = await fetch(
            "http://localhost:8080/api/reports/litter",
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await res.json();

          console.log("Saved report:", data);

          alert(
            `AI Severity: ${data?.report?.ai?.severity ?? "unknown"}`
          );
        } catch (err) {
          console.error(err);
          alert("Upload failed");
        } finally {
          setLoading(false);
        }
      },
      () => {
        alert("Location denied");
        setLoading(false);
      }
    );
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) =>
          setLitterFile(e.target.files?.[0] || null)
        }
      />

      <button onClick={submitLitter} disabled={loading}>
        {loading ? "Submitting..." : "Submit Litter Report"}
      </button>
    </div>
  );
}