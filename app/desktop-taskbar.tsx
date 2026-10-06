"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Unknown paths share one label so the prerendered 404 page matches the browser (avoids a hydration mismatch).
const knownPaths = new Set(["/about", "/projects", "/experience", "/writing", "/writing/designing-portable-ai-integrations", "/writing/make-document-pipelines-fail-loudly", "/case-studies/reality-commit", "/case-studies/dispatchtrack-lite", "/case-studies/aws-cloud-quest"]);

export function DesktopTaskbar() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const interval = setInterval(tick, 60000);
    const dismiss = (event: PointerEvent) => { if (menu.current && !menu.current.contains(event.target as Node)) menu.current.open = false; };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape" && menu.current?.open) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); } };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { clearInterval(interval); document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, []);
  const title = pathname === "/" ? "Welcome" : knownPaths.has(pathname) ? pathname.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") : "Page not found";
  return <aside className="desktop-taskbar" aria-label="Desktop taskbar">
    <details ref={menu} className="desktop-start"><summary><span className="desktop-mark" aria-hidden="true"><i /><i /><i /><i /></span>Start</summary><nav aria-label="Start menu" onClick={() => { if (menu.current) menu.current.open = false; }}><strong>Humberto / Personal desktop</strong><Link href="/">My desktop</Link><Link href="/projects">Project folder</Link><Link href="/experience">Work experience</Link><Link href="/writing">Notebook</Link><Link href="/about">About Humberto</Link><Link href="/#contact">Write a message</Link></nav></details>
    <span className="desktop-active-window">{title}</span><span className="desktop-tray"><span aria-hidden="true">◈</span><time>{time || "Local time"}</time></span>
  </aside>;
}
