"use client";

import { useState } from "react";

interface AccountModalProps {
  mode: "login" | "signup" | null;
  onClose: () => void;
  onLogin: (username: string) => void;
  darkMode: boolean;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AccountModal({ mode, onClose, onLogin, darkMode }: AccountModalProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  if (!mode) return null;

  function validate(): boolean {
    const e: FormErrors = {};

    if (mode === "signup") {
      if (!email || !email.includes("@")) {
        e.email = "Please enter a valid email address";
      }
      if (!confirmPassword) {
        e.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        e.confirmPassword = "Passwords do not match";
      }
    }

    if (!username || username.length < 2) {
      e.username = "Username is required";
    }
    if (!password || password.length < 8) {
      e.password = "Password must be at least 8 characters";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) {
      setSuccess(true);
      onLogin(username);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
      }, 1500);
    }
  }

  const inputClass = `w-full px-4 py-2.5 rounded-xl text-sm transition-colors duration-200 outline-none
    ${darkMode
      ? "bg-[#1b2735] text-[#C7D2A4] border border-[#243040] placeholder-[#8a9a6e] focus:border-[#8A6F4E]"
      : "bg-[#E6ECD0] text-[#4A4F1E] border border-[#C7D2A4] placeholder-[#6B7034]/60 focus:border-[#D1A676]"
    }`;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      >
        {/* Modal */}
        <div
          className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: darkMode
              ? "linear-gradient(135deg, #151d2a 0%, #1b2735 100%)"
              : "linear-gradient(135deg, #F3E9D2 0%, #E6ECD0 100%)",
            animation: "sprout-grow 0.3s ease-out",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg transition-colors hover:bg-muted/30"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <h2 className="text-lg font-bold text-foreground mb-5">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>

          {success ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">
                <svg width="48" height="48" viewBox="0 0 24 24" className="mx-auto text-accent" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-foreground font-medium">
                {mode === "login" ? "Logged in successfully!" : "Account created!"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className={inputClass}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="text-xs mt-1" style={{ color: "#c44" }}>{errors.email}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  className={inputClass}
                  autoComplete="username"
                />
                {errors.username && (
                  <p className="text-xs mt-1" style={{ color: "#c44" }}>{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className={inputClass}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
                {errors.password && (
                  <p className="text-xs mt-1" style={{ color: "#c44" }}>{errors.password}</p>
                )}
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className={inputClass}
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs mt-1" style={{ color: "#c44" }}>{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="mt-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: darkMode ? "#C7D2A4" : "#4A4F1E",
                  color: darkMode ? "#0d1117" : "#F3E9D2",
                }}
              >
                {mode === "login" ? "Log In" : "Sign Up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
