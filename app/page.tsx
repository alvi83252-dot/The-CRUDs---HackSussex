"use client";

import { useState, useCallback, useRef } from "react";
import Home from "@/components/Home";
import AccountModal from "@/components/AccountModal";
import ReportActions from "@/components/ReportActions";

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup" | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  const handleAccountAction = useCallback(
    (action: "login" | "signup" | "guest") => {
      if (action === "guest") {
        setUser("Guest");
      } else {
        setModalMode(action);
      }
    },
    []
  );

  const handleContactUs = useCallback(() => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main>
      <Home
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onAccountAction={handleAccountAction}
        onContactUs={handleContactUs}
        user={user}
        footerRef={footerRef}
      />

      <ReportActions darkMode={darkMode} />

      <AccountModal
        mode={modalMode}
        onClose={() => setModalMode(null)}
        onLogin={(username) => setUser(username)}
        darkMode={darkMode}
      />
    </main>
  );
}
