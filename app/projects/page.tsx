import type { Metadata } from "next";
import Link from "next/link";
import projectData from "../projects.json";
import { SeoPageShell } from "../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/projects";

export const metadata: Metadata = {
  title: "Software Projects — Humberto Villanueva",
  description: "Selected software engineering projects by Humberto Villanueva across React Native, Java, AWS, APIs, BLE, AI systems, and full-stack product development.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Software Projects — Humberto Villanueva", description: "Mobile, cloud, API, AI, and full-stack software projects by Humberto Villanueva.", url: pageUrl },
};

const projects = [
  { number: "01", title: "Specta at kW Engineering", type: "CURRENT PRODUCT WORK", summary: "Contributing to a production building-intelligence product across AI integration, document intelligence, data reliability, ontology tooling, and product experiences for building operators.", stack: "AI SYSTEMS · DOCUMENT INTELLIGENCE · FULL-STACK PRODUCT", href: undefined, note: "Specta is a kW Engineering product. It is not my personal software." },
  ...projectData.map((project, index) => ({
    number: String(index + 2).padStart(2, "0"), title: project.title,
    type: project.type, summary: project.text, stack: project.stack, note: undefined,
    href: project.repo ? `https://github.com/humbertovillanueva/${project.repo}` : project.title === "DispatchTrack Lite" ? "/case-studies/dispatchtrack-lite" : undefined,
  })),
];

export default function ProjectsPage() {
  return (
    <SeoPageShell stage="STAGE 01" eyebrow="SELECTED SOFTWARE ENGINEERING WORK" title="PROJECTS" intro="Product work and independent builds spanning AI, mobile development, cloud infrastructure, APIs, and reliable full-stack systems.">
      <section className="seo-project-list">
        {projects.map((project) => <article className="seo-panel seo-project" key={project.title}><span className="seo-number">{project.number}</span><span className="seo-label">{project.type}</span><h2>{project.title}</h2><p>{project.summary}</p>{project.note && <p className="seo-note">{project.note}</p>}<strong>{project.stack}</strong>{project.href && <Link className="seo-inline-link" href={project.href}>{project.href.startsWith("https://github.com/") ? "View project ↗" : "Read the case study →"}</Link>}</article>)}
      </section>
      <div className="seo-next-links"><Link href="/experience">Continue to experience →</Link><Link href="/writing">Read engineering notes →</Link></div>
    </SeoPageShell>
  );
}
