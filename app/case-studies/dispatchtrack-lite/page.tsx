import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/case-studies/dispatchtrack-lite";

export const metadata: Metadata = {
  title: "DispatchTrack Lite Case Study — React, Java & AWS",
  description: "A software engineering case study by Humberto Villanueva covering a delivery workflow built with React, Java, AWS Lambda, API Gateway, and serverless architecture.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "DispatchTrack Lite — Software Engineering Case Study",
    description: "How Humberto Villanueva connected a React interface, Java APIs, and AWS serverless infrastructure into a delivery workflow.",
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
    <SeoPageShell stage="CASE STUDY · 01" eyebrow="INDEPENDENT FULL-STACK PROJECT" title="DISPATCHTRACK LITE" intro="A delivery workflow that connects a React interface, Java services, and AWS serverless infrastructure into one understandable system.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyData).replace(/</g, "\\u003c") }} />
      <section className="seo-case-summary">
        <article className="seo-panel"><span className="seo-label">ROLE</span><h2>Full-stack engineer</h2><p>Product flow, interface, API contracts, serverless deployment, and end-to-end troubleshooting.</p></article>
        <article className="seo-panel"><span className="seo-label">STACK</span><h2>React · Java · AWS</h2><p>React, Java, AWS Lambda, API Gateway, REST APIs, and serverless infrastructure.</p></article>
        <article className="seo-panel"><span className="seo-label">DOMAIN</span><h2>Delivery operations</h2><p>A practical workflow shaped by first-hand familiarity with logistics and time-sensitive delivery work.</p></article>
      </section>

      <article className="seo-panel seo-article seo-case-body">
        <h2>Challenge</h2>
        <p>Delivery operations involve several moving parts: customers, stops, statuses, routes, and exceptions. The project needed a clear interface while keeping the backend small enough to deploy and reason about independently.</p>

        <h2>Approach</h2>
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
        <p>The difficult work was at the boundaries: browser-to-API communication, cross-origin configuration, environment differences, permissions, and turning cloud errors into something actionable. Those problems reinforced that full-stack engineering is often less about isolated code and more about making several systems agree.</p>

        <h2>Result and lessons</h2>
        <p>The finished project demonstrated an end-to-end delivery workflow and gave me deeper experience with API design, Java services, AWS deployment, and systematic debugging. If I extended it, I would add stronger automated contract tests, persistent event history, role-based access, and observability around operational failures.</p>

        <p className="seo-disclosure">DispatchTrack Lite is an independent portfolio project. It is not affiliated with DispatchTrack, Ryder, or kW Engineering.</p>
      </article>
      <div className="seo-next-links"><Link href="/projects">← All projects</Link><Link href="/writing">Read engineering notes →</Link></div>
    </SeoPageShell>
  );
}
