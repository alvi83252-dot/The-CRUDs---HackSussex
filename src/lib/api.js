const API = import.meta.env.VITE_API_BASE_URL;

export async function createReport({ type, file, lat, lng, note, binId }) {
  const fd = new FormData();
  fd.append("type", type);
  fd.append("lat", String(lat));
  fd.append("lng", String(lng));
  if (note) fd.append("note", note);
  if (binId) fd.append("binId", binId);
  fd.append("image", file);

  const res = await fetch(`${API}/api/reports`, {
    method: "POST",
    body: fd
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getBins() {
  const res = await fetch(`${API}/api/bins`);
  if (!res.ok) throw new Error("Failed to fetch bins");
  return res.json();
}

export async function getLitterReports() {
  const res = await fetch(`${API}/api/reports?type=litter`);
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
}