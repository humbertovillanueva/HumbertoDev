import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../seo-page-shell";
import { JsonLd, breadcrumbs, personRef } from "../json-ld";

const pageUrl = "https://humbertovillanueva.dev/experience";

export const metadata: Metadata = {
  title: "Software Engineering Experience",
  description: "Professional experience and education for Humberto Villanueva, a software engineer at kW Engineering based in Utah.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Experience | Humberto Villanueva", description: "Software engineering, technical support, and education across kW Engineering, Ryder Last Mile, Weber State University, and Ensign College.", url: pageUrl },
};

const roles = [
  { years: "2026 to present", company: "kW Engineering", role: "Software Engineer", detail: "Contributing to Specta across AI architecture, document intelligence, data reliability, ontology tooling, and production interfaces." },
  { years: "2024 to May 2026", company: "Ryder Last Mile", role: "IT & Customer Specialist", detail: "Troubleshot logistics systems and helped customers resolve technical issues." },
  { years: "2023 to 2024", company: "Weber State University", role: "IT Support Specialist", detail: "Helped students and faculty with technical issues and supported campus computer labs." },
];

const experienceData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}/#page`,
      url: pageUrl,
      name: "Experience · Humberto Villanueva",
      about: personRef,
      mainEntity: personRef,
    },
    breadcrumbs([["Experience", "/experience"]]),
  ],
};

export default function ExperiencePage() {
  return (
    <SeoPageShell stage="STAGE 02" eyebrow="CAREER + EDUCATION" title="Experience" stats={[{ label: "Now", value: `${roles[0].role}, ${roles[0].company}` }, { label: "Degree", value: "B.S. Software Engineering · 2026" }, { label: "Started in", value: `IT support · ${roles[roles.length - 1].years.slice(0, 4)}` }]} intro="I started in IT support, helping people troubleshoot their systems. Today I work as a software engineer at kW Engineering.">
      <JsonLd data={experienceData} />
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
