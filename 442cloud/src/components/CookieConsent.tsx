"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "442cloud-cookie-consent";

/**
 * Lightweight, design-matched cookie notice.
 * 442 Cloud uses no tracking/marketing cookies, so this is informational:
 * it shows once, records the user's choice in localStorage (not a cookie),
 * and can be reopened via the window "cookie:open" event (see CookieSettingsButton).
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable (private mode etc.) — show anyway
      setVisible(true);
    }

    const open = () => setVisible(true);
    window.addEventListener("cookie:open", open);
    return () => window.removeEventListener("cookie:open", open);
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
    >
      <div className="anim-cookie-in glass mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl p-5 shadow-2xl shadow-black/60 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/12 text-brand-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
              <path d="M8.5 8.5h.01M15 9.5h.01M9 14h.01M14.5 14.5h.01M12 17h.01" />
            </svg>
          </span>
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-display font-semibold text-white">We keep it clean. </span>
            442 Cloud uses only what&apos;s essential to run this site — no tracking and no
            marketing cookies. The choice is yours.
          </p>
        </div>

        <div className="flex shrink-0 gap-3 sm:ml-auto">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="btn btn-ghost flex-1 text-sm sm:flex-none"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="btn btn-primary flex-1 text-sm sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
