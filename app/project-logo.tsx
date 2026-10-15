import { useId, type ReactNode } from "react";
import { faBolt } from "@fortawesome/free-solid-svg-icons/faBolt";
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons/faMobileScreenButton";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { SpectaMark } from "./specta-mark";

// Each project's own mark, drawn beside its title in every era and in the current text color.
// Garu and Reality Commit use the logos from their repositories. The projects without a logo get a
// Font Awesome Free solid icon (CC BY 4.0, https://fontawesome.com/license/free) that says what
// they are: a truck for deliveries, a cloud for the cloud study game, a phone, a bolt for serverless.

// Garu: a ninja cat inside a ring with one opening (docs/brand/mark.svg in the Garu repository).
function GaruMark() {
  const id = useId();
  return <svg viewBox="0 0 100 100" fill="none">
    <defs><mask id={id}><g fill="#fff"><ellipse cx="48.5" cy="52" rx="23" ry="20.7" /><polygon points="44.82,42.34 29.64,40.96 27.80,19.34" /><polygon points="52.18,42.34 67.36,40.96 69.20,19.34" /></g><g fill="#000"><rect x="25.04" y="41.42" width="46.92" height="4.6" rx="2.3" transform="rotate(6 48.5 43.72)" /><ellipse cx="39.3" cy="53.38" rx="5.98" ry="2.07" transform="rotate(12 39.30 53.38)" /><ellipse cx="57.7" cy="53.38" rx="5.98" ry="2.07" transform="rotate(-12 57.70 53.38)" /><polygon points="46.66,60.28 50.34,60.28 48.5,62.58" /></g><g fill="#fff"><rect x="38.61" y="51.66" width="1.38" height="3.45" rx="0.69" /><rect x="57.01" y="51.66" width="1.38" height="3.45" rx="0.69" /></g></mask></defs>
    <path d="M 91.77 54.39 A 42 42 0 1 1 84.82 26.51" fill="none" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
    <rect width="100" height="100" fill="currentColor" mask={`url(#${id})`} />
    <g stroke="currentColor" strokeWidth="3.91" strokeLinecap="round" strokeLinejoin="round"><polyline points="71.04,44.18 83.98,36.13 98.35,39.01" /><polyline points="71.04,44.18 83.11,47.63 96.34,53.95" /></g>
    <circle cx="71.04" cy="44.18" r="3.22" fill="currentColor" />
  </svg>;
}

// Reality Commit: the R from its mark (public/mark.svg in that repository), without the tile.
function RealityCommitMark() {
  return <svg viewBox="0 0 64 64" fill="none"><path d="M18 18h19a10 10 0 0 1 0 20H18zm0 0v31m17-11 12 11" stroke="currentColor" strokeWidth="6" /><circle cx="48" cy="16" r="6" fill="currentColor" /></svg>;
}

function SolidIcon({ icon }: { icon: IconDefinition }) {
  const [width, height, , , path] = icon.icon;
  return <svg viewBox={`0 0 ${width} ${height}`}><path fill="currentColor" d={Array.isArray(path) ? path.join(" ") : path} /></svg>;
}

const marks: Record<string, () => ReactNode> = {
  Garu: () => <GaruMark />,
  "Reality Commit": () => <RealityCommitMark />,
  "DispatchTrack Lite": () => <SolidIcon icon={faTruck} />,
  "AWS Cloud Quest": () => <SolidIcon icon={faCloud} />,
  "STEDI Mobile": () => <SolidIcon icon={faMobileScreenButton} />,
  "Serverless API": () => <SolidIcon icon={faBolt} />,
  "Specta at kW Engineering": () => <SpectaMark />,
};

/** The mark for a project title, or nothing for a title without one. Decorative: the title next to it carries the name. */
export function ProjectLogo({ title }: { title: string }) {
  const Mark = marks[title];
  if (!Mark) return null;
  return <span className="project-logo" aria-hidden="true"><Mark /></span>;
}
