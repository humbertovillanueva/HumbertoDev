import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/writing/designing-portable-ai-integrations";

export const metadata: Metadata = {
  title: "Designing Portable AI Integrations Without Model Lock-In",
  description: "Humberto Villanueva explains a practical architecture for portable AI integrations: provider boundaries, normalized capabilities, reliability, evaluation, and local-model support.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    title: "Designing Portable AI Integrations Without Model Lock-In",
    description: "A practical engineering approach to AI provider portability, capability differences, observability, and reliable product behavior.",
    url: pageUrl,
    publishedTime: "2026-09-16T00:00:00-06:00",
    authors: ["Humberto Villanueva"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Designing Portable AI Integrations Without Model Lock-In",
    description: "A practical architecture for provider portability, local models, reliability, and measurable AI product behavior.",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${pageUrl}/#article`,
  headline: "Designing Portable AI Integrations Without Locking the Product to One Model",
  description: "A practical engineering approach to AI provider portability, capability differences, observability, and reliable product behavior.",
  url: pageUrl,
  datePublished: "2026-09-16",
  dateModified: "2026-09-17",
  inLanguage: "en-US",
  image: `${pageUrl}/opengraph-image`,
  mainEntityOfPage: pageUrl,
  isPartOf: { "@id": "https://humbertovillanueva.dev/#website" },
  author: { "@id": "https://humbertovillanueva.dev/#person" },
  publisher: { "@id": "https://humbertovillanueva.dev/#person" },
  about: [
    { "@type": "Thing", name: "Artificial intelligence architecture" },
    { "@type": "Thing", name: "Large language model integration" },
    { "@type": "Thing", name: "Software portability" },
  ],
  keywords: ["AI integration", "LLM architecture", "software engineering", "model portability", "local AI models"],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://humbertovillanueva.dev" },
    { "@type": "ListItem", position: 2, name: "Engineering Writing", item: "https://humbertovillanueva.dev/writing" },
    { "@type": "ListItem", position: 3, name: "Portable AI Integrations", item: pageUrl },
  ],
};

export default function PortableAiArticle() {
  return (
    <SeoPageShell stage="FIELD NOTE · 01" eyebrow="APPLIED AI · SOFTWARE ARCHITECTURE" title="PORTABLE AI INTEGRATIONS" intro="How to make model providers replaceable without pretending they are identical—and without spreading provider-specific logic through the product.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      <article className="seo-panel seo-article">
        <div className="seo-article-byline"><span>BY HUMBERTO VILLANUEVA</span><span>SEPTEMBER 16, 2026</span><span>8 MIN READ</span></div>

        <p className="seo-lede">The first AI integration in a product often looks deceptively simple: send a prompt, receive text, display the answer. The architecture becomes harder when the product must support different hosted providers, local models, changing capabilities, enterprise constraints, and predictable behavior.</p>

        <h2>The real boundary is product behavior</h2>
        <p>A useful abstraction does more than rename one provider&apos;s API methods. It defines what the product needs: generate a response, stream tokens, call tools, produce structured data, or create embeddings. Provider SDKs belong behind that boundary.</p>
        <p>This keeps the rest of the application focused on user workflows. A document assistant should ask for a grounded answer with citations; it should not need to know which provider names its token limit field differently.</p>

        <pre><code>{`Product workflow
  → AI capability interface
    → provider adapter
      → hosted API or local model

Shared layers
  → policy and validation
  → observability
  → evaluation
  → fallback and error handling`}</code></pre>

        <h2>Normalize the contract, not every feature</h2>
        <p>Providers differ in tool calling, structured output, streaming, context limits, safety behavior, and error semantics. Hiding all differences behind one enormous interface usually produces a misleading lowest common denominator.</p>
        <p>A better approach is capability-aware design. Keep the common contract small, advertise optional capabilities explicitly, and let the product choose a supported path. The system can remain portable while still using stronger provider features when they matter.</p>

        <h2>Configuration should select adapters</h2>
        <p>Provider choice should come from configuration, not conditionals distributed across controllers and interface components. A central factory or dependency-injection boundary can validate credentials, select an adapter, and expose a stable application-level interface.</p>
        <p>This design also makes local or air-gapped deployments realistic. The application behavior stays recognizable even when the underlying model endpoint changes.</p>

        <h2>Reliability belongs outside the provider SDK</h2>
        <p>Retries, timeouts, rate limits, response validation, tracing, and cost reporting are product concerns. If each adapter implements them independently, behavior drifts. Shared middleware can apply consistent policies while adapters translate provider-specific errors into a small internal vocabulary.</p>
        <div className="seo-callout"><strong>ENGINEERING RULE</strong><p>Log enough to debug the system, but never treat prompts, documents, or model responses as harmless telemetry. Privacy and retention need deliberate policies.</p></div>

        <h2>Evaluation makes portability measurable</h2>
        <p>Swapping models safely requires a representative evaluation set. For a document workflow, that can include answer quality, citation correctness, structured-output validity, latency, and failure recovery. The goal is not to declare one model universally best. It is to know whether a change preserves the behavior users depend on.</p>

        <h2>What I would build first</h2>
        <ol>
          <li>Define two or three product-level capabilities instead of copying a provider API.</li>
          <li>Implement one adapter and a deterministic fake for tests.</li>
          <li>Add schema validation, timeouts, and structured error translation.</li>
          <li>Create a small evaluation set before adding a second provider.</li>
          <li>Add capability negotiation only when a real workflow needs it.</li>
        </ol>

        <h2>The result</h2>
        <p>Good portability is not the ability to change an environment variable and hope. It is the ability to replace an AI dependency while keeping product behavior understandable, observable, and testable. That architecture creates room for hosted models, local deployments, and whatever provider arrives next.</p>

        <aside className="seo-author-card" aria-label="About the author">
          <img src="/humbertopic.jpeg" alt="Humberto Villanueva" width="112" height="112" />
          <div>
            <span className="seo-label">ABOUT THE AUTHOR</span>
            <h2>Humberto Villanueva</h2>
            <p>Software engineer in Utah building applied AI integrations, reliable data systems, APIs, and smart-building technology.</p>
            <nav aria-label="Author links">
              <Link href="/about">About Humberto</Link>
              <a href="https://github.com/humbertovillanueva" rel="me">GitHub</a>
              <a href="https://www.linkedin.com/in/humberto-villanueva-dev/" rel="me">LinkedIn</a>
            </nav>
          </div>
        </aside>

        <p className="seo-disclosure">This article describes general engineering principles from my experience and independent study. It does not disclose proprietary architecture, source code, customer information, or confidential details from kW Engineering.</p>
      </article>
      <div className="seo-next-links"><Link href="/writing">← All engineering notes</Link><Link href="/projects">Explore related projects →</Link></div>
    </SeoPageShell>
  );
}
