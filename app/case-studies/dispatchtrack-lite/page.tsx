import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/case-studies/dispatchtrack-lite";

export const metadata: Metadata = {
  title: "DispatchTrack Lite Case Study | React, Java & AWS",
  description: "Try Humberto Villanueva’s browser-based delivery demo and explore its React workflows, separate Java API, and original AWS architecture.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "DispatchTrack Lite | Software Engineering Case Study",
    description: "An interactive delivery demo with driver assignments, exception recovery, and a case study of the separate Java API and original AWS architecture.",
    url: pageUrl,
  },
};

const caseStudyData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "@id": `${pageUrl}/#case-study`,
  name: "DispatchTrack Lite Software Engineering Case Study",
  url: pageUrl,
  datePublished: "2026-09-16",
  inLanguage: "en-US",
  creator: { "@id": "https://humbertovillanueva.dev/#person" },
  about: ["Full-stack development", "Serverless architecture", "Delivery operations software", "AWS Lambda", "Java", "React"],
};

export default function DispatchTrackCaseStudy() {
  return (
    <SeoPageShell stage="CASE STUDY · 01" eyebrow="INDEPENDENT FULL-STACK PROJECT" title="DispatchTrack Lite" intro="Create deliveries, assign drivers, and resolve exceptions in a browser demo. This case study also covers the separate Java API.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyData).replace(/</g, "\\u003c") }} />
      <section className="seo-case-summary">
        <article className="seo-panel"><span className="seo-label">ROLE</span><h2>Full-stack engineer</h2><p>Product flow, interface, API contracts, serverless deployment, and end-to-end troubleshooting.</p></article>
        <article className="seo-panel"><span className="seo-label">STACK</span><h2>React · Java · AWS</h2><p>React, Java, AWS Lambda, API Gateway, REST APIs, and serverless infrastructure.</p></article>
        <article className="seo-panel"><span className="seo-label">DOMAIN</span><h2>Delivery operations</h2><p>A practical workflow shaped by first-hand familiarity with logistics and time-sensitive delivery work.</p></article>
      </section>

      <article className="seo-panel seo-article seo-case-body">
        <h2>Try the current demo</h2>
        <p><a className="seo-inline-link" href="https://humbertovillanueva.github.io/dispatchtrack-demo/">Open the delivery workspace ↗</a></p>
        <p>Create a fictional delivery, assign a driver, move it into transit, and record a completion or exception note. Each delivery keeps a history of its status changes.</p>
        <p>The public GitHub Pages demo stores records only in your browser. It does not connect to the Java API, share records between devices, or provide customer accounts. Use fictional data only.</p>

        <h2>Challenge</h2>
        <p>Delivery operations involve several moving parts: customers, stops, statuses, routes, and exceptions. The project needed a clear interface while keeping the backend small enough to deploy and reason about independently.</p>

        <h2>Original full-stack approach</h2>
        <p>I separated the system into a browser interface, explicit REST contracts, Java request handlers, and serverless infrastructure. That boundary kept presentation concerns out of the API and made each endpoint easier to test and troubleshoot.</p>

        <div className="seo-architecture" aria-label="DispatchTrack Lite architecture">
          <span>REACT CLIENT</span><i>→</i><span>API GATEWAY</span><i>→</i><span>JAVA LAMBDA</span><i>→</i><span>DELIVERY DATA</span>
        </div>

        <h2>Important engineering decisions</h2>
        <ul>
          <li><strong>Explicit contracts:</strong> request and response shapes were treated as a shared interface rather than incidental JSON.</li>
          <li><strong>Small handlers:</strong> serverless functions stayed focused on one workflow so deployment and failures remained understandable.</li>
          <li><strong>Operational feedback:</strong> the interface surfaced loading, success, empty, and error states instead of assuming every network call would work.</li>
          <li><strong>Deployability:</strong> infrastructure choices were evaluated as part of the product, not as an afterthought.</li>
        </ul>

        <h2>Hard parts</h2>
        <p>The difficult work was at the boundaries: browser-to-API communication, cross-origin configuration, environment differences, permissions, and turning cloud errors into something actionable. I had to trace requests across those boundaries to find where they failed.</p>

        <h2>Result and lessons</h2>
        <p>The current browser demo supports driver assignments, guarded status transitions, exception recovery, and saved event history. The separate Java API implements persistent records, validation, and conflict handling. Turning this into a shared service still requires a hosted backend, authentication, company-level data isolation, backups, and operational monitoring.</p>

        <p className="seo-disclosure">DispatchTrack Lite is an independent portfolio project. It is not affiliated with DispatchTrack, Ryder, or kW Engineering.</p>
      </article>
      <div className="seo-next-links"><Link href="/projects">← All projects</Link><Link href="/writing">Read engineering notes →</Link></div>
    </SeoPageShell>
  );
}
