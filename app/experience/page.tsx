import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../seo-page-shell";
import { JsonLd, breadcrumbs, personRef } from "../json-ld";
import { experience } from "../experience-data";

const pageUrl = "https://humbertovillanueva.dev/experience";

export const metadata: Metadata = {
  title: "Software Engineering Experience",
  description: "Professional experience, education and training for Humberto Villanueva, a software engineer at kW Engineering in Salt Lake City, Utah.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Experience | Humberto Villanueva", description: "Software engineering, technical support, and education across kW Engineering, Ryder Last Mile, Weber State University, and Ensign College.", url: pageUrl },
};

const roles = experience;

const training = [
  { label: "SKYFOUNDRY · FANTOM FACTORY · 2026", title: "SkySpark Engineer, SkySpark Analyst & Haystack Essentials", detail: "Training in SkySpark and its Axon language for real-time building data, automation and analytics, plus Project Haystack tagging and data modeling." },
  { label: "LINKEDIN LEARNING · 2025 TO 2026", title: "Java, Spring Boot & AWS", detail: "Docker on AWS, Spring 6 with Spring Boot 3, Java design patterns, Lombok, IntelliJ IDEA, and Git and GitHub." },
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
      <section className="seo-card-grid seo-education seo-training" aria-label="Training and certifications">
        {training.map(item => <article className="seo-panel" key={item.title}><span className="seo-label">{item.label}</span><h2>{item.title}</h2><p>{item.detail}</p></article>)}
      </section>
      <div className="seo-next-links"><Link href="/projects">Explore software projects →</Link><Link href="/about">Read the full profile →</Link></div>
    </SeoPageShell>
  );
}
