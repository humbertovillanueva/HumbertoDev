"use client";
import { useEffect } from "react";

// Cards fade up once as they enter the viewport (skipped for reduced motion in CSS).
export function StudioMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".studio-home");
    if (!root) return;
    const targets = root.querySelectorAll(".bento-card,.section-head");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("studio-in-view");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return null;
}
