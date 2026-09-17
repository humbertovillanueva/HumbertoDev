import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/writing";

export const metadata: Metadata = {
  title: "Engineering Writing — AI, Full Stack & Smart Buildings",
  description: "First-hand engineering notes from Humberto Villanueva about applied AI, reliable software systems, full-stack development, and smart-building technology.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Engineering Writing — Humberto Villanueva",
    description: "Practical notes about applied AI, software architecture, reliable systems, and smart-building technology.",
    url: pageUrl,
  },
};

const collectionData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${pageUrl}/#collection`,
  url: pageUrl,
  name: "Engineering Writing by Humberto Villanueva",
  description: "First-hand engineering notes about applied AI, full-stack systems, and smart-building technology.",
  author: { "@id": "https://humbertovillanueva.dev/#person" },
  hasPart: [{
    "@type": "Article",
    headline: "Designing Portable AI Integrations Without Locking the Product to One Model",
    url: "https://humbertovillanueva.dev/writing/designing-portable-ai-integrations",
  }],
};

const articles = [{
  category: "APPLIED AI · ARCHITECTURE",
  date: "SEPTEMBER 16, 2026",
  title: "Designing Portable AI Integrations Without Locking the Product to One Model",
  summary: "A practical architecture for separating product behavior from model providers, handling capability differences, and keeping reliability visible.",
  href: "/writing/designing-portable-ai-integrations",
  readingTime: "8 MIN READ",
}];

export default function WritingPage() {
  return (
    <SeoPageShell stage="STAGE 03" eyebrow="FIELD NOTES FROM THE BUILD" title="WRITING" intro="Practical lessons from building software across AI integration, APIs, product interfaces, cloud systems, and the physical world.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionData).replace(/</g, "\\u003c") }} />
      <section className="seo-writing-list">
        {articles.map((article, index) => (
          <article className="seo-panel seo-writing-card" key={article.href}>
            <span className="seo-number">0{index + 1}</span>
            <span className="seo-label">{article.category}</span>
            <h2><Link href={article.href}>{article.title}</Link></h2>
            <p>{article.summary}</p>
            <div className="seo-article-meta"><span>{article.date}</span><span>{article.readingTime}</span></div>
            <Link className="seo-inline-link" href={article.href}>Open field note →</Link>
          </article>
        ))}
      </section>
      <section className="seo-panel seo-panel-wide">
        <span className="seo-label">EDITORIAL PROMISE</span>
        <h2>Experience before volume</h2>
        <p>These notes document problems I have actually explored, systems I have built, and lessons I can explain. Employer-specific implementation details remain private; the engineering principles are shared so other builders can use them.</p>
      </section>
      <div className="seo-next-links"><Link href="/case-studies/dispatchtrack-lite">Read a project case study →</Link><Link href="/projects">Explore all projects →</Link></div>
    </SeoPageShell>
  );
}
