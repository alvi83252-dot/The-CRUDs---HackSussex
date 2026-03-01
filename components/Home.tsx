"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

/* ── Types ── */
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  brightness: number;
}

interface ConstellationStar {
  x: number;
  y: number;
}

/* ── Cute Bird Mascot SVG ── */
function CrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Round body */}
      <ellipse cx="24" cy="28" rx="14" ry="12" fill="currentColor" opacity="0.85" />
      {/* Round head */}
      <circle cx="24" cy="16" r="11" fill="currentColor" opacity="0.9" />
      {/* Cheek blush */}
      <circle cx="16" cy="18" r="3" fill="#D1A676" opacity="0.45" />
      <circle cx="32" cy="18" r="3" fill="#D1A676" opacity="0.45" />
      {/* Eyes - big white */}
      <circle cx="19" cy="14" r="3.5" fill="#F3E9D2" />
      <circle cx="29" cy="14" r="3.5" fill="#F3E9D2" />
      {/* Pupils */}
      <circle cx="20" cy="13.5" r="1.8" fill="#4A4F1E" />
      <circle cx="30" cy="13.5" r="1.8" fill="#4A4F1E" />
      {/* Eye shine */}
      <circle cx="21" cy="12.5" r="0.7" fill="#fff" />
      <circle cx="31" cy="12.5" r="0.7" fill="#fff" />
      {/* Little beak */}
      <path d="M22 19l2 3 2-3" fill="#D1A676" />
      {/* Wing left */}
      <ellipse cx="13" cy="28" rx="5" ry="4" fill="currentColor" opacity="0.5" transform="rotate(-10 13 28)" />
      {/* Wing right */}
      <ellipse cx="35" cy="28" rx="5" ry="4" fill="currentColor" opacity="0.5" transform="rotate(10 35 28)" />
      {/* Feet */}
      <path d="M19 39l-2 3M21 39l0 3M23 39l2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M25 39l-2 3M27 39l0 3M29 39l2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* Tiny tail */}
      <ellipse cx="24" cy="39" rx="4" ry="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* ── Stars Background (dark mode) ── */
function StarsBackground() {
  const stars = useMemo<Star[]>(() => {
    const s: Star[] = [];
    for (let i = 0; i < 120; i++) {
      s.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
        brightness: Math.random() * 0.7 + 0.3,
      });
    }
    return s;
  }, []);

  const constellations = useMemo(() => {
    const orion: ConstellationStar[] = [
      { x: 72, y: 22 },
      { x: 74, y: 24 },
      { x: 76, y: 26 },
    ];
    const bigDipper: ConstellationStar[] = [
      { x: 15, y: 12 },
      { x: 18, y: 10 },
      { x: 22, y: 11 },
      { x: 25, y: 13 },
      { x: 27, y: 17 },
      { x: 30, y: 20 },
      { x: 28, y: 23 },
    ];
    const littleDipper: ConstellationStar[] = [
      { x: 50, y: 8 },
      { x: 53, y: 10 },
      { x: 55, y: 12 },
      { x: 57, y: 10 },
      { x: 60, y: 11 },
    ];
    return [...orion, ...bigDipper, ...littleDipper];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: `rgba(199, 210, 164, ${star.brightness})`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite, drift ${star.duration * 4}s ease-in-out ${star.delay}s infinite alternate`,
          }}
        />
      ))}
      {constellations.map((cs, i) => (
        <div
          key={`c-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${cs.x}%`,
            top: `${cs.y}%`,
            width: "3px",
            height: "3px",
            backgroundColor: "rgba(199, 210, 164, 0.9)",
            boxShadow: "0 0 8px 3px rgba(199, 210, 164, 0.4)",
            animation: `pulse-glow 4s ease-in-out ${i * 0.5}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Light-mode Ambient Elements ── */
function LightAmbient() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Sun */}
      <div
        className="absolute top-6 right-12 w-16 h-16 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(209,166,118,0.6) 0%, rgba(209,166,118,0) 70%)",
        }}
      />

      {/* Mountains */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 opacity-15"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 L120 80 L240 140 L400 40 L560 120 L720 60 L880 130 L1040 50 L1200 110 L1360 70 L1440 120 L1440 200 Z"
          fill="#4A4F1E"
        />
      </svg>

      {/* Clouds */}
      {[0, 1, 2].map((i) => (
        <div
          key={`cloud-${i}`}
          className="absolute opacity-40"
          style={{
            top: `${8 + i * 6}%`,
            animation: `float-cloud ${30 + i * 12}s linear ${i * 8}s infinite`,
          }}
        >
          <svg width="100" height="40" viewBox="0 0 100 40">
            <ellipse cx="50" cy="25" rx="40" ry="12" fill="#F3E9D2" />
            <ellipse cx="35" cy="20" rx="24" ry="14" fill="#F3E9D2" />
            <ellipse cx="65" cy="18" rx="20" ry="12" fill="#F3E9D2" />
          </svg>
        </div>
      ))}

      {/* Butterflies */}
      {[0, 1].map((i) => (
        <div
          key={`bfly-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 40}%`,
            top: `${30 + i * 15}%`,
            animation: `flutter-butterfly ${3 + i}s ease-in-out infinite`,
          }}
        >
          <svg width="16" height="12" viewBox="0 0 16 12" opacity="0.35">
            <path
              d="M8 6 Q4 0 1 3 Q4 6 8 6 Z"
              fill="#D1A676"
            />
            <path
              d="M8 6 Q12 0 15 3 Q12 6 8 6 Z"
              fill="#D1A676"
            />
            <path
              d="M8 6 Q5 8 2 10 Q5 7 8 6 Z"
              fill="#B48E65"
            />
            <path
              d="M8 6 Q11 8 14 10 Q11 7 8 6 Z"
              fill="#B48E65"
            />
          </svg>
        </div>
      ))}

      {/* Bee */}
      <div
        className="absolute opacity-30"
        style={{
          right: "15%",
          top: "40%",
          animation: "buzz-bee 2s ease-in-out infinite",
        }}
      >
        <svg width="14" height="10" viewBox="0 0 14 10">
          <ellipse cx="7" cy="5" rx="5" ry="4" fill="#B48E65" />
          <line x1="3" y1="4" x2="11" y2="4" stroke="#4A4F1E" strokeWidth="0.6" />
          <line x1="3" y1="6" x2="11" y2="6" stroke="#4A4F1E" strokeWidth="0.6" />
          <ellipse cx="3" cy="3" rx="3" ry="2" fill="#F3E9D2" opacity="0.5" />
          <ellipse cx="11" cy="3" rx="3" ry="2" fill="#F3E9D2" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

/* ── Side Menu (paper-fold) ── */
function SideMenu({
  open,
  onClose,
  darkMode,
  onContactUs,
  onAccountAction,
}: {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
  onContactUs: () => void;
  onAccountAction: (action: "login" | "signup" | "guest") => void;
}) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [fontSize, setFontSize] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (fontSize) {
      document.documentElement.style.fontSize = "18px";
    } else {
      document.documentElement.style.fontSize = "";
    }
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Menu Panel */}
      <nav
        className="fixed left-0 top-0 bottom-0 z-50 w-72 p-6 flex flex-col gap-2 overflow-y-auto"
        style={{
          background: darkMode
            ? "linear-gradient(135deg, #151d2a 0%, #1b2735 100%)"
            : "linear-gradient(135deg, #F3E9D2 0%, #E6ECD0 100%)",
          borderTopRightRadius: "30% 12%",
          borderBottomRightRadius: "30% 12%",
          boxShadow: "6px 0 24px rgba(0,0,0,0.15)",
          animation: "menu-fold-in 0.4s ease-out",
          transformOrigin: "left center",
        }}
        aria-label="Main menu"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="self-end p-2 rounded-lg transition-colors hover:bg-muted/50"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 4l12 12M16 4L4 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Brand */}
        <div className="flex items-center gap-3 mb-6">
          <CrowIcon className="w-10 h-10 text-foreground" />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            BinBuddy
          </span>
        </div>

        {/* Menu Items */}
        <button
          onClick={() => {
            onClose();
          }}
          className="w-full text-left px-4 py-3 rounded-xl text-foreground font-medium transition-colors hover:bg-muted/60"
        >
          Home
        </button>

        {/* Account */}
        <div>
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            className="w-full text-left px-4 py-3 rounded-xl text-foreground font-medium transition-colors hover:bg-muted/60 flex items-center justify-between"
          >
            Account
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className={`transition-transform duration-300 ${accountOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: accountOpen ? "160px" : "0px",
              opacity: accountOpen ? 1 : 0,
            }}
          >
            <div className="flex flex-col gap-1 pl-4 pt-1">
              {(["login", "signup", "guest"] as const).map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    onAccountAction(action);
                    onClose();
                  }}
                  className="text-left px-4 py-2 rounded-lg text-muted-foreground text-sm transition-colors hover:bg-muted/40 hover:text-foreground"
                >
                  {action === "login"
                    ? "Log In"
                    : action === "signup"
                      ? "Sign Up"
                      : "Continue as Guest"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onContactUs();
            onClose();
          }}
          className="w-full text-left px-4 py-3 rounded-xl text-foreground font-medium transition-colors hover:bg-muted/60"
        >
          Contact Us
        </button>

        {/* Accessibility */}
        <div>
          <button
            onClick={() => setA11yOpen(!a11yOpen)}
            className="w-full text-left px-4 py-3 rounded-xl text-foreground font-medium transition-colors hover:bg-muted/60 flex items-center justify-between"
          >
            Accessibility
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className={`transition-transform duration-300 ${a11yOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: a11yOpen ? "200px" : "0px",
              opacity: a11yOpen ? 1 : 0,
            }}
          >
            <div className="flex flex-col gap-2 pl-4 pt-2">
              <label className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={fontSize}
                  onChange={() => setFontSize(!fontSize)}
                  className="accent-accent w-4 h-4"
                />
                Increase Font Size
              </label>
              <label className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={() => setHighContrast(!highContrast)}
                  className="accent-accent w-4 h-4"
                />
                High Contrast
              </label>
              <span className="px-4 py-2 text-sm text-muted-foreground/60">
                Text-to-Speech (coming soon)
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

/* ── Dark/Light Toggle ── */
function ThemeToggle({
  darkMode,
  onToggle,
}: {
  darkMode: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full transition-colors duration-400 flex items-center px-1 cursor-pointer"
      style={{
        backgroundColor: darkMode ? "#1b2735" : "#D9E3B8",
        border: `1.5px solid ${darkMode ? "#243040" : "#C7D2A4"}`,
      }}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      role="switch"
      aria-checked={darkMode}
    >
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-400"
        style={{
          transform: darkMode ? "translateX(26px)" : "translateX(0)",
          backgroundColor: darkMode ? "#C7D2A4" : "#D1A676",
        }}
      >
        {darkMode ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#1b2735">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#4A4F1E">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              stroke="#4A4F1E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

/* ── Main Home Component ── */
export default function Home({
  darkMode,
  setDarkMode,
  onAccountAction,
  onContactUs,
  user,
  footerRef,
}: {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  onAccountAction: (action: "login" | "signup" | "guest") => void;
  onContactUs: () => void;
  user: string | null;
  footerRef: React.RefObject<HTMLElement | null>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDark = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode, setDarkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-500 bin-cursor"
      style={{
        background: darkMode
          ? "radial-gradient(ellipse at 20% 50%, #1b2735 0%, #090a0f 100%)"
          : "linear-gradient(180deg, #E6ECD0 0%, #D9E3B8 60%, #C7D2A4 100%)",
      }}
    >
      {/* Background layers */}
      {darkMode ? <StarsBackground /> : <LightAmbient />}

      {/* Header */}
      <header className="relative z-30 flex items-center justify-between px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-1 rounded-lg transition-colors hover:bg-muted/30"
            aria-label="Open menu"
          >
            <CrowIcon className="w-9 h-9 text-foreground" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            BinBuddy
          </h1>
        </div>
        <ThemeToggle darkMode={darkMode} onToggle={toggleDark} />
      </header>

      {/* Side Menu */}
      <SideMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        darkMode={darkMode}
        onContactUs={onContactUs}
        onAccountAction={onAccountAction}
      />

      {/* Banner */}
      <section className="relative z-10 text-center px-5 pt-2 pb-6">
        {user && (
          <p className="text-sm text-accent font-medium mb-2">
            {"Welcome, "}{user}{"!"}
          </p>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance leading-relaxed">
          Plant change. Grow cleaner cities.
        </h2>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Find, report, and maintain public bins in your area
        </p>
      </section>

      {/* Map Placeholder */}
      <section className="relative z-10 px-5 md:px-8 pb-6">
        <div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            height: "clamp(280px, 45vh, 480px)",
            background: darkMode
              ? "linear-gradient(135deg, #151d2a 0%, #1b2735 100%)"
              : "linear-gradient(135deg, #F3E9D2 0%, #E6ECD0 100%)",
            boxShadow: darkMode
              ? "0 8px 32px rgba(0,0,0,0.3)"
              : "0 8px 32px rgba(74,79,30,0.1)",
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/50">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm font-medium">Map View</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="relative z-10 mt-8 border-t border-border"
        style={{
          background: darkMode
            ? "linear-gradient(135deg, #0d1117 0%, #151d2a 100%)"
            : "linear-gradient(135deg, #E6ECD0 0%, #F3E9D2 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-5 py-8">
          <h3 className="text-base font-bold text-foreground mb-4">Developers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "Laranaya Pandit", email: "laranayap@gmail.com" },
              { name: "Maria Eduarda Mendes Reis", email: "mariaeduardamendesr@gmail.com" },
              { name: "Faizan Alvi", email: "alvifaizan695@gmail.com" },
              { name: "Tahmid Al Sifat", email: "tahmid66cs@gmail.com" },
            ].map((dev) => (
              <div key={dev.email} className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">{dev.name}</span>
                <a
                  href={`mailto:${dev.email}`}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                >
                  {dev.email}
                </a>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              BinBuddy &mdash; Plant change. Grow cleaner cities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
