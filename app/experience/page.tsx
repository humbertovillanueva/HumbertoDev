import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/experience";

export const metadata: Metadata = {
  title: "Experience — Humberto Villanueva, Software Engineer",
  description: "Professional experience and education for Humberto Villanueva, a software engineer at kW Engineering based in Utah.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Experience — Humberto Villanueva", description: "Software engineering, technical support, and education across kW Engineering, Ryder Last Mile, Weber State University, and Ensign College.", url: pageUrl },
};

const roles = [
  { years: "2026—NOW", company: "kW Engineering", role: "Software Engineer", detail: "Contributing to Specta across AI architecture, document intelligence, data reliability, ontology tooling, and production interfaces." },
  { years: "2024—MAY 2026", company: "Ryder Last Mile", role: "IT & Customer Specialist", detail: "Provided technical support and troubleshooting for logistics systems in a fast-moving, customer-facing environment." },
  { years: "2023—2024", company: "Weber State University", role: "IT Support Specialist", detail: "Supported students, faculty, computer labs, and service operations while building a foundation in practical IT." },
];

export default function ExperiencePage() {
  return (
    <SeoPageShell stage="STAGE 02" eyebrow="CAREER + EDUCATION" title="EXPERIENCE" intro="A path from hands-on IT support to production software engineering, shaped by practical troubleshooting and continued learning.">
      <section className="seo-timeline">
        {roles.map((item, index) => <article className="seo-panel seo-role" key={item.company}><span className="seo-number">0{index + 1}</span><span className="seo-label">{item.years}</span><h2>{item.role}</h2><h3>{item.company}</h3><p>{item.detail}</p></article>)}
      </section>
      <section className="seo-card-grid seo-education">
        <article className="seo-panel"><span className="seo-label">ENSIGN COLLEGE · 2026</span><h2>B.S. Software Engineering</h2><p>Software engineering degree with a 3.5 GPA.</p></article>
        <article className="seo-panel"><span className="seo-label">WEBER STATE UNIVERSITY · 2024</span><h2>Computer Science Certificate</h2><p>Computer science foundations alongside practical campus IT experience.</p></article>
      </section>
      <div className="seo-next-links"><Link href="/projects">Explore software projects →</Link><Link href="/about">Read the full profile →</Link></div>
    </SeoPageShell>
  );
}
