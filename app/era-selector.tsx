"use client";

import { useEffect, useState } from "react";

type Era = "1986" | "2000" | "2026";
const parseEra = (value: string | null | undefined): Era => value === "2000" || value === "2026" ? value : "1986";
export function EraSelector() {
  const [era, setEra] = useState<Era>("1986");
  useEffect(() => {
    const sync = () => setEra(parseEra(document.documentElement.dataset.era));
    sync();
    const storage = (event: StorageEvent) => {
      if (event.key === "portfolio-era") {
        document.documentElement.setAttribute("data-era", parseEra(event.newValue));
        sync();
      }
    };
    window.addEventListener("storage", storage);
    return () => window.removeEventListener("storage", storage);
  }, []);
  function choose(next: Era) {
    const section = [...document.querySelectorAll<HTMLElement>("main section[id], .seo-page-hero, .seo-page-content")].reverse().find(el => el.getBoundingClientRect().height > 0 && el.getBoundingClientRect().top <= 180);
    const offset = section?.getBoundingClientRect().top;
    document.documentElement.setAttribute("data-era", next);
    setEra(next);
    try { localStorage.setItem("portfolio-era", next); } catch { /* Switching still works without storage. */ }
    if (section && offset !== undefined && section.getBoundingClientRect().height > 0) {
      const restore = () => window.scrollBy({top:section.getBoundingClientRect().top-offset,behavior:"instant"});
      restore();
      void document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(restore)));
    } else if (section) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }
  return <aside className="era-selector" aria-label="Site design"><span className="era-caption" aria-hidden="true">YEAR</span><select aria-label="Choose website year" title="Switch the site between its 1986, 2000 and 2026 designs" value={era} onChange={event => choose(event.target.value as Era)}><option value="1986">1986</option><option value="2000">2000</option><option value="2026">2026</option></select></aside>;
}
