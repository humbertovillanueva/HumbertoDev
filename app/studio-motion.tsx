"use client";
import { useEffect } from "react";

export function StudioMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".studio-home");
    if (!root) return;
    const targets = root.querySelectorAll(".studio-employer,.studio-project,.studio-person,.studio-section-heading");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("studio-in-view", entry.isIntersecting));
    }, { threshold: 0.08 });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return null;
}
