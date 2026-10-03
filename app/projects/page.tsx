import type { Metadata } from "next";
import Link from "next/link";
import { ProjectPreview, ProjectEvidence } from "../project-evidence";
import { ProjectLinks } from "../project-links";
import projectData from "../projects.json";
import { SeoPageShell } from "../seo-page-shell";
import { JsonLd, breadcrumbs, personRef } from "../json-ld";
import { demos } from "../project-links";
import { spectaHighlights, spectaArticle } from "../specta";

const pageUrl = "https://humbertovillanueva.dev/projects";

export const metadata: Metadata = {
  title: "Software Projects",
  description: "Selected software engineering projects by Humberto Villanueva across React Native, Java, AWS, APIs, BLE, AI systems, and full-stack product development.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Software Projects | Humberto Villanueva", description: "Mobile, cloud, API, AI, and full-stack software projects by Humberto Villanueva.", url: pageUrl },
};

const projects = [
  { number: "01", title: "Specta at kW Engineering", type: "CURRENT PRODUCT WORK", summary: "I work on Specta’s AI integrations, document processing, data reliability, ontology tools, and interfaces for building operators.", stack: "AI SYSTEMS · DOCUMENT INTELLIGENCE · FULL-STACK PRODUCT", repo: "", note: "Built at kW Engineering. My role: Software Engineer.", highlights: true },
  ...projectData.map((project, index) => ({
    number: String(index + 2).padStart(2, "0"), title: project.title,
    repo: project.repo, type: project.type, summary: project.text, stack: project.stack, note: undefined, highlights: false,
  })),
];

const projectsData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}/#page`,
      url: pageUrl,
      name: "Projects by Humberto Villanueva",
      about: personRef,
      author: personRef,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": project.repo ? "SoftwareSourceCode" : "CreativeWork",
            name: project.title,
            description: project.summary,
            author: personRef,
            ...(project.repo ? { codeRepository: `https://github.com/humbertovillanueva/${project.repo}`, ...(demos[project.repo] ? { url: demos[project.repo] } : {}) } : {}),
            keywords: project.stack.split("·").map(item => item.trim()).join(", "),
          },
        })),
      },
    },
    breadcrumbs([["Projects", "/projects"]]),
  ],
};

export default function ProjectsPage() {
  return (
    <SeoPageShell stage="STAGE 01" eyebrow="SELECTED SOFTWARE ENGINEERING WORK" title="Projects" stats={[{ label: "Projects", value: String(projects.length).padStart(2, "0") }, { label: "Case studies", value: "02" }, { label: "Built with", value: "React · TypeScript · Java · AWS · AI" }]} intro="My work includes web applications, mobile apps, APIs, and AI integrations. Each project below explains my role and its current scope.">
      <JsonLd data={projectsData} />
      <section className="seo-project-list">
        {projects.map((project) => <article className="seo-panel seo-project" key={project.title}><span className="seo-number">{project.number}</span><span className="seo-label">{project.type}</span><h2>{project.title}</h2><ProjectPreview repo={project.repo} /><p>{project.summary}</p>{project.note && <p className="seo-note">{project.note}</p>}{project.highlights && <><ul className="specta-highlights">{spectaHighlights.map(item => <li key={item.title}><strong>{item.title}</strong> {item.text}</li>)}</ul><div className="specta-links"><Link href={spectaArticle.href}>{spectaArticle.label} →</Link></div></>}<ProjectEvidence repo={project.repo} /><strong>{project.stack}</strong><ProjectLinks repo={project.repo} /></article>)}
      </section>
      <div className="seo-next-links"><Link href="/experience">Continue to experience →</Link><Link href="/writing">Read engineering notes →</Link></div>
    </SeoPageShell>
  );
}
