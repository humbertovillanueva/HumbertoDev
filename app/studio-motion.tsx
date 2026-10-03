"use client";
import { useEffect } from "react";

// Interaction layer for the 2026 edition:
// - .fx-reveal elements get .studio-in-view once they reach the viewport
// - .fx-spot elements receive --mx/--my so CSS can draw a light that follows the cursor
// - .fx-tilt elements lean toward the cursor in 3D
// - .fx-magnetic buttons drift slightly toward the cursor
// Everything is skipped outside 2026, and tilt/magnetic are skipped for touch and reduced motion.
// Subpages reuse it with their own root and selectors so every page moves the same way.
type StudioMotionProps = { root?: string; reveal?: string; spot?: string; tilt?: string };

export function StudioMotion({ root: rootSelector = ".studio-home", reveal: revealSelector = ".fx-reveal", spot: spotSelector = ".fx-spot", tilt: tiltSelector = ".fx-tilt" }: StudioMotionProps) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(rootSelector);
    if (!root) return;
    const html = document.documentElement;
    const active = () => html.dataset.era === "2026";
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    // Reveal anything that has reached the lower part of the viewport, including elements a fast
    // scroll or an anchor jump skipped past, so nothing is ever left hidden.
    let pending = [...root.querySelectorAll<HTMLElement>(revealSelector)];
    pending.forEach(element => element.classList.add("fx-reveal"));
    let revealFrame = 0;
    const reveal = () => {
      revealFrame = 0;
      const line = window.innerHeight * .92;
      pending = pending.filter(element => {
        if (element.getBoundingClientRect().top > line) return true;
        element.classList.add("studio-in-view");
        return false;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => { if (!revealFrame) revealFrame = requestAnimationFrame(reveal); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reveal();

    let frame = 0;
    let last: PointerEvent | null = null;
    const update = () => {
      frame = 0;
      const event = last;
      if (!event || !active()) return;
      const target = event.target instanceof Element ? event.target : null;
      const spot = target?.closest<HTMLElement>(spotSelector);
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        spot.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }
      if (calm.matches || !finePointer.matches) return;
      const tilt = target?.closest<HTMLElement>(tiltSelector);
      if (tilt) {
        const rect = tilt.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        tilt.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
      }
      const magnet = target?.closest<HTMLElement>(".fx-magnetic");
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        magnet.style.setProperty("--tx", `${((event.clientX - rect.left - rect.width / 2) * .18).toFixed(1)}px`);
        magnet.style.setProperty("--ty", `${((event.clientY - rect.top - rect.height / 2) * .28).toFixed(1)}px`);
      }
    };
    const onMove = (event: PointerEvent) => { last = event; if (!frame) frame = requestAnimationFrame(update); };
    const onLeave = (event: PointerEvent) => {
      const element = event.target instanceof HTMLElement ? event.target : null;
      if (!element) return;
      if (element.matches(tiltSelector)) { element.style.setProperty("--rx", "0deg"); element.style.setProperty("--ry", "0deg"); }
      if (element.matches(".fx-magnetic")) { element.style.setProperty("--tx", "0px"); element.style.setProperty("--ty", "0px"); }
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave, { capture: true, passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(revealFrame);
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave, { capture: true });
    };
  }, [rootSelector, revealSelector, spotSelector, tiltSelector]);
  return null;
}
