import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";
import { JsonLd, breadcrumbs, personRef } from "../../json-ld";

const pageUrl = "https://humbertovillanueva.dev/case-studies/reality-commit";
export const metadata: Metadata = {
  title: "Reality Commit Case Study",
  description: "How Humberto Villanueva built a browser prototype for comparing site visits, reviewing changes, and keeping an asset history.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Reality Commit | Reviewing changes between site visits", url: pageUrl, description: "Photo comparisons, manual observations, and review history built with React, TypeScript, and IndexedDB." },
};

const caseStudyData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      "@id": `${pageUrl}/#case-study`,
      name: "Reality Commit Software Engineering Case Study",
      url: pageUrl,
      datePublished: "2026-09-30",
      inLanguage: "en-US",
      creator: personRef,
      image: "https://humbertovillanueva.dev/projects/reality-commit.webp",
      about: ["React", "TypeScript", "IndexedDB", "Site visit review", "Change history"],
    },
    breadcrumbs([["Projects", "/projects"], ["Reality Commit", "/case-studies/reality-commit"]]),
  ],
};

export default function RealityCommitCaseStudy() {
  return <SeoPageShell stage="CASE STUDY · 02" eyebrow="INDEPENDENT PROJECT · WORKING PROTOTYPE" title="Reality Commit" intro="A photo shows a moment. I built Reality Commit to compare visits and keep a record of what a reviewer can actually confirm.">
    <JsonLd data={caseStudyData} />
    <section className="seo-panel seo-panel-wide">
      <span className="seo-label">REACT · TYPESCRIPT · VITE · INDEXEDDB</span>
      <h2>From two photographs to a reviewed change</h2>
      <p>My work on this prototype covers the capture interface, comparison rules, review flow, and browser storage. The goal is to connect observations about an asset across visits, with a reason attached to each accepted change.</p>
      <div className="project-links"><a href="https://reality-commit.vercel.app/">Try Reality Commit ↗</a><a href="https://github.com/humbertovillanueva/reality-commit">View source code ↗</a></div>
      <figure className="case-study-image"><Image src="/projects/reality-commit.webp" alt="Reality Commit sample workspace comparing pump photographs before and after cleaning" width={1280} height={850} sizes="(max-width: 760px) 100vw, 1100px" /><figcaption>The pump-cleaning sample uses public-domain photographs and manually written educational observations. It is not a customer inspection.</figcaption></figure>
    </section>
    <article className="seo-panel seo-article">
      <h2>The problem I wanted to explore</h2>
      <p>Two site photographs can show a difference without explaining it. An asset may be outside the frame, hidden behind equipment, or labeled differently on the next visit. A useful history needs the observation, the supporting capture, and the reviewer’s decision together.</p>
      <h2>One small workflow</h2>
      <ol>
        <li><strong>Capture:</strong> upload dated photographs and manually mark assets, reusing the same asset IDs across visits.</li>
        <li><strong>Compare:</strong> choose a baseline and a later capture. The app compares recorded IDs and condition notes to propose changes.</li>
        <li><strong>Review:</strong> accept or reject each proposal. An accepted change needs a verification note.</li>
        <li><strong>Save:</strong> add a review message and reviewer name. The saved record keeps the proposals and decisions alongside both capture references.</li>
      </ol>
      <h2>The distinction that shaped the design</h2>
      <p>I used “not observed” for an asset missing from the next capture. Calling it “removed” would claim more than the photograph establishes. The same rule applies to “newly observed”: first sighting does not tell us when something was installed.</p>
      <div className="seo-callout"><strong>AN EXAMPLE</strong><p>In the pump sample, the after photograph shows cleaning. A reviewer can describe the visible surface change while leaving the remaining pitting for further assessment. The app does not diagnose the equipment from the image.</p></div>
      <h2>How I kept the review rules separate</h2>
      <p>The comparison and commit rules live in a TypeScript domain module, separate from React. Observations are matched by asset ID. A changed condition note produces a proposal; image appearance and marker position do not establish identity.</p>
      <p>Before creating a commit, the domain layer checks the capture order, requires every proposal to be resolved, and requires notes for accepted changes. It also blocks a second commit for the same capture pair. These checks can be tested without clicking through the interface.</p>
      <h2>Why browser storage came first</h2>
      <p>IndexedDB lets the prototype save captures and completed reviews without a backend or account setup. That keeps the first version focused on the review workflow. It also means work stays in that browser, rather than syncing between people or devices.</p>
      <p>JSON export makes the workspace readable outside the app, but import is not implemented. Browser storage can be cleared, and uploaded images are resized rather than preserved as original files. Export is useful, but it is not yet a complete backup and restore workflow.</p>
      <h2>What works today</h2>
      <p>The prototype supports photo uploads, manual asset annotations, capture comparisons, accepted and rejected proposals, saved review history, an asset register, and JSON export. The pump and bridge samples let visitors try the review process without uploading their own photos.</p>
      <p>There is no automated image recognition, shared workspace, authenticated reviewer identity, or tamper-resistant audit trail. Reviewer names and capture times are self-reported. This is a working prototype, with no customer adoption or inspection-accuracy results claimed.</p>
      <h2>What I would work on next</h2>
      <p>First, I would make export and import round-trip reliably and preserve original captures. Then I would test the review flow against a consented set of photographs from two visits to the same room. That would help identify where asset matching and review notes need more context before adding image analysis or collaboration.</p>
      <p className="seo-disclosure">Reality Commit is an independent project. The sample observations are educational and do not establish equipment safety or compliance. <a href="https://github.com/humbertovillanueva/reality-commit/blob/main/docs/image-sources.md">Photo sources and sample limitations ↗</a></p>
    </article>
    <div className="seo-next-links"><Link href="/projects">← All projects</Link><Link href="/#contact">Talk about a project →</Link></div>
  </SeoPageShell>;
}
