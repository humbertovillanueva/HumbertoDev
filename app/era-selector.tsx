"use client";

import { useEffect, useState } from "react";

type Era = "1986" | "2000";
export function EraSelector() {
  const [era, setEra] = useState<Era>("1986");
  useEffect(() => {
    const sync = () => setEra(document.documentElement.dataset.era === "2000" ? "2000" : "1986");
    sync();
    const storage = (event: StorageEvent) => {
      if (event.key === "portfolio-era") {
        document.documentElement.setAttribute("data-era", event.newValue === "2000" ? "2000" : "1986");
        sync();
      }
    };
    window.addEventListener("storage", storage);
    return () => window.removeEventListener("storage", storage);
  }, []);
  function choose(next: Era) {
    const section = [...document.querySelectorAll<HTMLElement>("main section[id], .seo-page-hero, .seo-page-content")].reverse().find(el => el.getBoundingClientRect().top <= 180);
    const offset = section?.getBoundingClientRect().top;
    document.documentElement.setAttribute("data-era", next);
    setEra(next);
    try { localStorage.setItem("portfolio-era", next); } catch { /* Switching still works without storage. */ }
    if (section && offset !== undefined) {
      const restore = () => window.scrollBy({top:section.getBoundingClientRect().top-offset,behavior:"instant"});
      restore();
      void document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(restore)));
    }
  }
  return <div className="era-selector" role="group" aria-label="Choose your era"><span>CHOOSE YOUR ERA</span>{(["1986", "2000"] as const).map(value => <button key={value} type="button" aria-pressed={era === value} onClick={() => choose(value)}>{value}<span className="era-description"> {value === "1986" ? "Arcade" : "Desktop"}</span></button>)}</div>;
}
