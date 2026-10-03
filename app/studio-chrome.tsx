"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ViewTransition } from "react";
import { StudioSearchButton } from "./studio-widgets";

// Shared 2026 chrome: the same floating glass nav on the homepage and on every subpage, so the
// site feels like one product as you move around. The ViewTransition name lets the nav stay put
// while the page underneath changes.

export function StudioMark() {
  return <svg className="studio-mark" viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#d9ff57" />
    <path d="M15 14h12v14h10V14h12v36H37V37H27v13H15z" fill="#0a0a0b" />
    <path d="M28 28h10l-4 9H24z" fill="#e54848" />
  </svg>;
}

const sections = [
  { label: "Projects", page: "/projects", anchor: "#studio-work", match: ["/projects", "/case-studies"] },
  { label: "Experience", page: "/experience", match: ["/experience"] },
  { label: "Writing", page: "/writing", match: ["/writing"] },
  { label: "About", page: "/about", match: ["/about"] },
];

export function StudioNav({ home = false }: { home?: boolean }) {
  const pathname = usePathname();
  return <ViewTransition name="studio-nav" share="studio-nav" default="none">
    <header className={home ? "studio-nav" : "studio-nav studio-only"}>
      <div className="studio-nav-inner">
        <nav aria-label={home ? "Studio navigation" : "Portfolio pages"}>
          <Link className="studio-signature" href="/" aria-label="Humberto Villanueva home"><StudioMark /><span>Humberto Villanueva</span></Link>
          <div className="studio-nav-links">
            {sections.map(item => {
              const current = !home && item.match.some(path => pathname === path || pathname.startsWith(path + "/"));
              return <Link key={item.label} href={home && item.anchor ? item.anchor : item.page} aria-current={current ? "page" : undefined}>{item.label}</Link>;
            })}
          </div>
          <StudioSearchButton />
          <Link className="studio-nav-cta" href={home ? "#contact" : "/#contact"}>Contact</Link>
        </nav>
      </div>
    </header>
  </ViewTransition>;
}
