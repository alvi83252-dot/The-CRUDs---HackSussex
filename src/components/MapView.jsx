import React, { useEffect, useState } from "react";
import { getBins, getLitterReports, createReport } from "../lib/api.js";

function MapView() {
  const [bins, setBins] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    refreshData();
  }, []);

  async function refreshData() {
    try {
      const [binsData, reportsData] = await Promise.all([
        getBins(),
        getLitterReports()
      ]);
      setBins(binsData);
      setReports(reportsData);
    } catch (err) {
      console.error(err);
      setMessage("Error loading data");
    }
  }

  async function handleReportLitter() {
    if (cooldown) {
      setMessage("Please wait a bit before sending another report.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const file = await pickImage();
      const { lat, lng } = await getLocation();

      const result = await createReport({
        type: "litter",
        file,
        lat,
        lng,
        note: ""
      });

      setMessage(
        result.success
          ? `Valid report. XP +${result.xpAwarded}`
          : "Report not valid"
      );

      await refreshData();
      setCooldown(true);
      setTimeout(() => setCooldown(false), 15000);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Error creating report");
    } finally {
      setLoading(false);
    }
  }

  function pickImage() {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.capture = "environment";

      input.onchange = () => {
        const file = input.files[0];
        if (!file) return reject(new Error("No file selected"));
        resolve(file);
      };

      input.click();
    });
  }

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error("Geolocation not supported"));
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err) => reject(err)
      );
    });
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>BinFinder</h1>

      <button onClick={handleReportLitter} disabled={loading || cooldown}>
        {loading ? "Submitting..." : "Report Litter"}
      </button>

      {message && <p>{message}</p>}

      <h2>Bins</h2>
      <ul>
        {bins.map((b) => (
          <li key={b._id}>
            {b.name} ({b.type}) — {b.lat.toFixed(4)}, {b.lng.toFixed(4)}
          </li>
        ))}
      </ul>

      <h2>Litter Reports</h2>
      <ul>
        {reports.map((r) => (
          <li key={r._id}>
            {r.type} — {r.lat.toFixed(4)}, {r.lng.toFixed(4)} —{" "}
            {r.ai?.severity || "n/a"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapView;