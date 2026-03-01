"use client";

import { useState, useCallback } from "react";

/* ── Autumn leaf colours ── */
const LEAF_COLORS = [
  "#6B7034", // olive green
  "#B45309", // burnt orange
  "#DC2626", // red
  "#D97706", // amber
  "#92400E", // brown
  "#CA8A04", // golden yellow
  "#9A3412", // rust
  "#A16207", // dark gold
];

/* ── Falling Leaf ── */
function FallingLeaf({ index }: { index: number }) {
  const left = 5 + Math.random() * 90;
  const delay = index * 0.15 + Math.random() * 0.3;
  const size = 10 + Math.random() * 10;
  const color = LEAF_COLORS[index % LEAF_COLORS.length];
  const drift = (Math.random() - 0.5) * 120;

  return (
    <div
      className="fixed pointer-events-none z-40"
      style={{
        left: `${left}%`,
        top: "-30px",
        animation: `leaf-fall ${3.5 + Math.random() * 2.5}s ease-in ${delay}s forwards`,
        opacity: 0.75,
        transform: `translateX(${drift}px)`,
      }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 20 20" style={{ transform: `rotate(${Math.random() * 360}deg)` }}>
        <path
          d="M10 2 Q15 6 14 12 Q12 16 10 18 Q8 16 6 12 Q5 6 10 2Z"
          fill={color}
          opacity="0.7"
        />
        <line x1="10" y1="4" x2="10" y2="16" stroke={color} strokeWidth="0.5" opacity="0.5" />
        <line x1="8" y1="8" x2="10" y2="10" stroke={color} strokeWidth="0.3" opacity="0.4" />
        <line x1="12" y1="7" x2="10" y2="9" stroke={color} strokeWidth="0.3" opacity="0.4" />
      </svg>
    </div>
  );
}

/* ── Report Panel ── */
function ReportPanel({
  open,
  onClose,
  darkMode,
}: {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
}) {
  const [activeReport, setActiveReport] = useState<
    null | "add-bin" | "missing" | "littering" | "council"
  >(null);
  const [missingChecks, setMissingChecks] = useState({ missing: false, unusable: false });

  if (!open) return null;

  const panelBg = darkMode
    ? "linear-gradient(135deg, #151d2a 0%, #1b2735 100%)"
    : "linear-gradient(135deg, #F3E9D2 0%, #E6ECD0 100%)";

  const cardStyle = `w-full text-left px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 cursor-pointer`;
  const cardActive = darkMode
    ? "bg-[#243040] text-[#C7D2A4]"
    : "bg-[#D9E3B8] text-[#4A4F1E]";
  const cardInactive = darkMode
    ? "bg-[#1b2735] text-[#8a9a6e] hover:bg-[#243040]/60"
    : "bg-[#E6ECD0] text-[#6B7034] hover:bg-[#D9E3B8]/60";

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed bottom-24 right-5 z-50 w-72 rounded-2xl p-5 shadow-xl"
        style={{
          background: panelBg,
          animation: "sprout-grow 0.35s ease-out",
          boxShadow: darkMode
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 32px rgba(74,79,30,0.15)",
        }}
      >
        <h3 className="text-base font-bold text-foreground mb-3">Report Actions</h3>

        <div className="flex flex-col gap-2">
          {/* Report / Add Bin */}
          <button
            className={`${cardStyle} ${activeReport === "add-bin" ? cardActive : cardInactive}`}
            onClick={() => setActiveReport(activeReport === "add-bin" ? null : "add-bin")}
          >
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              Report / Add Bin
            </span>
          </button>
          {activeReport === "add-bin" && (
            <div className="pl-4 flex flex-col gap-2 py-1" style={{ animation: "sprout-grow 0.25s ease-out" }}>
              <label
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground cursor-pointer transition-colors hover:bg-muted/30"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                </svg>
                Upload image (required)
                <input type="file" accept="image/*" className="hidden" />
              </label>
              <p className="text-xs text-muted-foreground/60 px-3">Photo of the bin location</p>
            </div>
          )}

          {/* Missing / Unusable Bin */}
          <button
            className={`${cardStyle} ${activeReport === "missing" ? cardActive : cardInactive}`}
            onClick={() => setActiveReport(activeReport === "missing" ? null : "missing")}
          >
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
              </svg>
              Report Missing / Unusable
            </span>
          </button>
          {activeReport === "missing" && (
            <div className="pl-4 flex flex-col gap-2 py-1" style={{ animation: "sprout-grow 0.25s ease-out" }}>
              <label className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                <input
                  type="checkbox"
                  checked={missingChecks.missing}
                  onChange={() =>
                    setMissingChecks((p) => ({ ...p, missing: !p.missing }))
                  }
                  className="accent-accent w-4 h-4"
                />
                Missing
              </label>
              <label className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground cursor-pointer hover:bg-muted/30 transition-colors">
                <input
                  type="checkbox"
                  checked={missingChecks.unusable}
                  onChange={() =>
                    setMissingChecks((p) => ({ ...p, unusable: !p.unusable }))
                  }
                  className="accent-accent w-4 h-4"
                />
                Unusable
              </label>
            </div>
          )}

          {/* Report Littering */}
          <button
            className={`${cardStyle} ${activeReport === "littering" ? cardActive : cardInactive}`}
            onClick={() => setActiveReport(activeReport === "littering" ? null : "littering")}
          >
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" strokeLinecap="round" />
                <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
              </svg>
              Report Littering
            </span>
          </button>
          {activeReport === "littering" && (
            <div className="pl-4 flex flex-col gap-2 py-1" style={{ animation: "sprout-grow 0.25s ease-out" }}>
              <label
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground cursor-pointer transition-colors hover:bg-muted/30"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                </svg>
                Upload image (required)
                <input type="file" accept="image/*" className="hidden" />
              </label>
              <p className="text-xs text-muted-foreground/60 px-3">Photo of the littered area</p>
            </div>
          )}

          {/* Contact Council */}
          <button
            className={`${cardStyle} ${activeReport === "council" ? cardActive : cardInactive}`}
            onClick={() => setActiveReport(activeReport === "council" ? null : "council")}
          >
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contact Local Council
            </span>
          </button>
          {activeReport === "council" && (
            <p className="pl-4 px-3 py-2 text-xs text-muted-foreground/60" style={{ animation: "sprout-grow 0.25s ease-out" }}>
              This will redirect to your local council website (coming soon).
            </p>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Main Seed/Sprout FAB ── */
export default function ReportActions({ darkMode }: { darkMode: boolean }) {
  const [sprouted, setSprouted] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [leaves, setLeaves] = useState<number[]>([]);

  const handleClick = useCallback(() => {
    if (!sprouted) {
      setSprouted(true);
      // Trigger falling leaves
      const newLeaves = Array.from({ length: 20 }, (_, i) => Date.now() + i);
      setLeaves(newLeaves);
      setTimeout(() => setLeaves([]), 7000);
    }
    setShowPanel((p) => !p);
  }, [sprouted]);

  return (
    <>
      {/* Falling leaves */}
      {leaves.map((id, i) => (
        <FallingLeaf key={id} index={i} />
      ))}

      {/* Report Panel */}
      <ReportPanel open={showPanel} onClose={() => setShowPanel(false)} darkMode={darkMode} />

      {/* Seed / Sprout FAB */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-5 z-30 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer"
        style={{
          background: darkMode
            ? "radial-gradient(circle, #243040 0%, #1b2735 100%)"
            : "radial-gradient(circle, #D9E3B8 0%, #C7D2A4 100%)",
          boxShadow: sprouted
            ? darkMode
              ? "0 0 20px 6px rgba(199,210,164,0.3)"
              : "0 0 20px 6px rgba(74,79,30,0.15)"
            : undefined,
          animation: sprouted ? undefined : "seed-pulse 2s ease-in-out infinite",
        }}
        aria-label="Open report actions"
      >
        {sprouted ? (
          /* Sprout */
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            style={{ animation: "sprout-grow 0.5s ease-out" }}
          >
            <path
              d="M12 22V10"
              stroke={darkMode ? "#C7D2A4" : "#4A4F1E"}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 10c-3-4-8-3-8-3s0 5 4 7c1.5.75 3 .9 4 1"
              fill={darkMode ? "#8a9a6e" : "#6B7034"}
              opacity="0.7"
            />
            <path
              d="M12 10c3-4 8-3 8-3s0 5-4 7c-1.5.75-3 .9-4 1"
              fill={darkMode ? "#C7D2A4" : "#4A4F1E"}
              opacity="0.5"
            />
          </svg>
        ) : (
          /* Seed */
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <ellipse
              cx="12"
              cy="13"
              rx="5"
              ry="7"
              fill={darkMode ? "#8A6F4E" : "#B48E65"}
            />
            <path
              d="M12 6c0 0-2 3-2 5s1 3 2 3 2-1 2-3-2-5-2-5z"
              fill={darkMode ? "#C7D2A4" : "#4A4F1E"}
              opacity="0.5"
            />
          </svg>
        )}
      </button>
    </>
  );
}
