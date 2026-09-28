import Link from "next/link";
import { SeoPageShell } from "./seo-page-shell";

export default function NotFound() {
  return <SeoPageShell stage="404" eyebrow="PAGE NOT FOUND" title="OFF THE PITCH" intro="This link may be outdated, or the page may have moved. Your next stop is still here."><div className="seo-panel"><h2>Find your way back</h2><p>Explore the current projects, read engineering notes, or get in touch.</p><div className="seo-next-links"><Link href="/">Return home →</Link><Link href="/projects">Browse projects →</Link><Link href="/#contact">Contact Humberto →</Link></div></div></SeoPageShell>;
}
