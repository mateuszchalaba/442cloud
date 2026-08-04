"use client";

/** Re-opens the cookie notice (dispatches an event CookieConsent listens for). */
export default function CookieSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("cookie:open"))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
