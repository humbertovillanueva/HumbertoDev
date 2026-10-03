import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "./seo-page-shell";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist. Find Humberto Villanueva’s projects, experience, and writing from here.",
  alternates: { canonical: null },
  robots: { index: false, follow: true },
  // Without this the 404 page inherits the homepage og:url, and link previews of a mistyped
  // address silently turn into the homepage.
  openGraph: { title: "Page not found | Humberto Villanueva", description: "This page does not exist. Find Humberto Villanueva’s projects, experience, and writing from here." },
};

export default function NotFound() {
  return <SeoPageShell stage="404" eyebrow="PAGE NOT FOUND" title="Off the Pitch" intro="This link may be outdated, or the page may have moved. Your next stop is still here."><div className="seo-panel"><h2>Find your way back</h2><p>Explore the current projects, read engineering notes, or get in touch.</p><div className="seo-next-links"><Link href="/">Return home →</Link><Link href="/projects">Browse projects →</Link><Link href="/#contact">Contact Humberto →</Link></div></div></SeoPageShell>;
}
