"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import binPin from "@/public/bin-pin.png";

// Fix Leaflet default icon issues in Next.js
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

type Bin = {
  _id?: string;
  type?: string;
  postcode?: string;
  location?: { lat: number; lng: number };
  lat?: number;
  lng?: number;
  capacityPct?: number;
  photo?: string; // ✅ Correctly added here
};

type LatLng = { lat: number; lng: number };

function haversineMeters(a: LatLng, b: LatLng) {
  const R = 6371000;
  const toRad = (x: number) => (x * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

function formatDistance(m: number | null) {
  if (m == null) return "—";
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(2)} km`;
}

// Custom bin icon
const binIcon =
  typeof window !== "undefined"
    ? new L.Icon({
        iconUrl: binPin.src,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -30],
      })
    : undefined;

export default function MapClient({ darkMode }: { darkMode: boolean }) {
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPos, setUserPos] = useState<LatLng | null>(null);

  const defaultCenter = useMemo<LatLng>(
    () => ({ lat: 50.8225, lng: -0.1372 }),
    []
  );

  const center = userPos ?? defaultCenter;

  // 🔥 9 bins (5 real + 4 dummy)
  useEffect(() => {
    const mockBins: Bin[] = [
      // REAL BINS
      {
        _id: "bin11",
        type: "general",
        postcode: "BN2",
        location: { lat: 50.865280, lng: -0.086300 },
        capacityPct: 42,
        photo: "/bin11.jpg",
      },
      {
        _id: "bin22",
        type: "recycling",
        postcode: "BN2",
        location: { lat: 50.865363, lng: -0.085586 },
        capacityPct: 65,
        photo: "/bin22.jpg",
      },
      {
        _id: "bin33",
        type: "general",
        postcode: "BN2",
        location: { lat: 50.865126, lng: -0.084569 },
        capacityPct: 20,
        photo: "/bin33.jpg",
      },
      {
        _id: "bin44",
        type: "recycling",
        postcode: "BN2",
        location: { lat: 50.864949, lng: -0.084793 },
        capacityPct: 75,
        photo: "/bin44.jpg",
      },
      {
        _id: "bin55",
        type: "general",
        postcode: "BN2",
        location: { lat: 50.864899, lng: -0.085291 },
        capacityPct: 90,
        photo: "/bin55.jpg",
      },

      // DUMMY BINS
      {
        _id: "bin66",
        type: "general",
        postcode: "BN1",
        location: { lat: 50.8229, lng: -0.1373 },
        capacityPct: 35,
        photo: "/bin66.png",
      },
      {
        _id: "bin77",
        type: "recycling",
        postcode: "BN1",
        location: { lat: 50.8236, lng: -0.1358 },
        capacityPct: 72,
        photo: "/bin77.png",
      },
      {
        _id: "bin88",
        type: "general",
        postcode: "BN1",
        location: { lat: 50.8218, lng: -0.1390 },
        capacityPct: 18,
        photo: "/bin88.png",
      },
      {
        _id: "bin99",
        type: "recycling",
        postcode: "BN1",
        location: { lat: 50.8209, lng: -0.1362 },
        capacityPct: 60,
        photo: "/bin99.png",
      },
    ];

    setBins(mockBins);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => {},
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <div className="absolute left-3 top-3 z-[1000] rounded-xl border bg-background/90 px-3 py-2 shadow">
        <div className="font-semibold">Map View</div>
        <div className="text-xs text-muted-foreground">
          {loading ? "Loading bins…" : `${bins.length} bins`}
        </div>
      </div>

      <MapContainer center={center} zoom={15} className="h-full w-full">
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url={
            darkMode
              ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              : "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          }
        />

        {bins.map((b) => {
          const lat = b.location?.lat ?? b.lat;
          const lng = b.location?.lng ?? b.lng;
          if (!lat || !lng) return null;

          return (
            <Marker
              key={b._id}
              position={{ lat, lng }}
              icon={binIcon as any}
            >
              <Popup>
                <div className="font-semibold">
                  {b.type} • {b.postcode}
                </div>
                <div className="text-xs text-muted-foreground">
                  Fill: {b.capacityPct}%
                </div>

                {b.photo && (
                  <img
                    src={b.photo}
                    alt="Bin"
                    style={{
                      width: "160px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginTop: "6px",
                    }}
                  />
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}