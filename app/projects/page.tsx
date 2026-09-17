import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/projects";

export const metadata: Metadata = {
  title: "Software Projects — Humberto Villanueva",
  description: "Selected software engineering projects by Humberto Villanueva across React Native, Java, AWS, APIs, BLE, AI systems, and full-stack product development.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Software Projects — Humberto Villanueva", description: "Mobile, cloud, API, AI, and full-stack software projects by Humberto Villanueva.", url: pageUrl },
};

const projects = [
  { number: "01", title: "Specta at kW Engineering", type: "CURRENT PRODUCT WORK", summary: "Contributing to a production building-intelligence product across AI integration, document intelligence, data reliability, ontology tooling, and product experiences for building operators.", stack: "AI SYSTEMS · DOCUMENT INTELLIGENCE · FULL-STACK PRODUCT", note: "Specta is a kW Engineering product. It is not my personal software." },
  { number: "02", title: "STEDI Mobile", type: "CLOUD-CONNECTED MOBILE APP", summary: "React Native onboarding, interface workflows, BLE integration, input reliability, and EAS delivery pipelines.", stack: "REACT NATIVE · EXPO · JAVASCRIPT · BLE" },
  { number: "03", title: "DispatchTrack Lite", type: "FULL-STACK DELIVERY SYSTEM", summary: "A logistics application connecting a React interface, Java APIs, and an AWS serverless backend.", stack: "REACT · JAVA · AWS LAMBDA · API GATEWAY" },
  { number: "04", title: "Serverless API", type: "AWS CLOUD PROJECT", summary: "A deployed REST API with infrastructure, endpoints, authentication, and troubleshooting handled end to end.", stack: "JAVA · AWS SAM · AWS LAMBDA · API GATEWAY" },
];

export default function ProjectsPage() {
  return (
    <SeoPageShell stage="STAGE 01" eyebrow="SELECTED SOFTWARE ENGINEERING WORK" title="PROJECTS" intro="Product work and independent builds spanning AI, mobile development, cloud infrastructure, APIs, and reliable full-stack systems.">
      <section className="seo-project-list">
        {projects.map((project) => <article className="seo-panel seo-project" key={project.title}><span className="seo-number">{project.number}</span><span className="seo-label">{project.type}</span><h2>{project.title}</h2><p>{project.summary}</p>{project.note && <p className="seo-note">{project.note}</p>}<strong>{project.stack}</strong></article>)}
      </section>
      <div className="seo-next-links"><Link href="/experience">Continue to experience →</Link><Link href="/about">Meet Humberto →</Link></div>
    </SeoPageShell>
  );
}
