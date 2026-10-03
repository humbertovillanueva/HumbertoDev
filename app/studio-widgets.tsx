"use client";
import { useEffect, useState, useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

// Live Utah time. Rendered after mount so the static HTML never disagrees with the browser.
export function StudioClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () => setTime(new Date().toLocaleTimeString("en-US", { timeZone: "America/Denver", hour: "numeric", minute: "2-digit" }));
    format();
    const timer = window.setInterval(format, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return <span className="studio-clock">{time ? `${time} MT` : "Mountain Time"}</span>;
}

export function StudioSearchButton() {
  const shortcut = useSyncExternalStore(noSubscribe, () => /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K", () => "⌘K");
  return <button type="button" className="studio-search" aria-label="Search the portfolio" aria-keyshortcuts="Meta+K Control+K" onClick={() => window.dispatchEvent(new Event("portfolio-search:open"))}>
    <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="m13.2 13.2 3.6 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
    <span>Search</span><kbd>{shortcut}</kbd>
  </button>;
}
