import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/writing/make-document-pipelines-fail-loudly";

export const metadata: Metadata = {
  title: "Make Document Pipelines Fail Loudly",
  description: "Humberto Villanueva on designing document-ingestion pipelines that surface failures: a small failure vocabulary, visible reasons, retries that survive restarts, and tests that catch silent data loss.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    title: "Make Document Pipelines Fail Loudly",
    description: "Why silent failures are the most expensive bugs in a document pipeline, and the patterns I use to make them visible.",
    url: pageUrl,
    publishedTime: "2026-10-02T00:00:00-06:00",
    authors: ["Humberto Villanueva"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Make Document Pipelines Fail Loudly",
    description: "A small failure vocabulary, visible reasons, retries that survive restarts, and tests that catch silent data loss.",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${pageUrl}/#article`,
  headline: "Make Document Pipelines Fail Loudly",
  description: "Why silent failures are the most expensive bugs in a document pipeline, and the patterns I use to make them visible.",
  url: pageUrl,
  datePublished: "2026-10-02",
  dateModified: "2026-10-02",
  inLanguage: "en-US",
  image: `${pageUrl}/opengraph-image`,
  mainEntityOfPage: pageUrl,
  isPartOf: { "@id": "https://humbertovillanueva.dev/#website" },
  author: { "@id": "https://humbertovillanueva.dev/#person" },
  publisher: { "@id": "https://humbertovillanueva.dev/#person" },
  about: [
    { "@type": "Thing", name: "Data pipelines" },
    { "@type": "Thing", name: "Software reliability" },
    { "@type": "Thing", name: "Document processing" },
  ],
  keywords: ["document ingestion", "data reliability", "error handling", "retries", "software engineering"],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://humbertovillanueva.dev" },
    { "@type": "ListItem", position: 2, name: "Engineering Writing", item: "https://humbertovillanueva.dev/writing" },
    { "@type": "ListItem", position: 3, name: "Make Document Pipelines Fail Loudly", item: pageUrl },
  ],
};

export default function FailLoudlyArticle() {
  return (
    <SeoPageShell stage="FIELD NOTE · 02" eyebrow="DATA RELIABILITY · DOCUMENT PROCESSING" title="Fail Loudly" intro="The worst bug in a document pipeline is the one that looks like success. Here is how I make failures impossible to miss.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      <article className="seo-panel seo-article">
        <div className="seo-article-byline"><span>BY HUMBERTO VILLANUEVA</span><span>OCTOBER 2, 2026</span><span>6 MIN READ</span></div>

        <p className="seo-lede">A document pipeline takes PDFs, drawings, and reports, pulls out text and metadata, and makes them searchable. When it crashes, someone notices. When it quietly skips a page, drops a field, or gives up on a file without saying so, nobody notices until a person asks a question and gets a confident, incomplete answer.</p>
        <p>Most of my reliability work has been about that second kind of failure. These are the patterns I keep coming back to.</p>

        <h2>Give failures a small, honest vocabulary</h2>
        <p>&ldquo;Something went wrong&rdquo; is not a state. Every failed document should land in one of a few named states, and the most important split is simple: can this fix itself, or does a person need to act?</p>
        <p>A rate limit from an AI provider is retryable. A missing API key is not, and retrying it a hundred times just hides the real problem behind noise. If the code that records a failure cannot tell those apart, the system will eventually retry the unfixable and give up on the fixable.</p>
        <pre tabIndex={0} aria-label="Failure states example"><code>{`ingested        everything extracted
provisional     usable, but something was missing
retrying        temporary problem, will try again
failed          a person needs to act (with a reason)`}</code></pre>

        <h2>Show the reason where people look</h2>
        <p>A failure that only exists in a server log is invisible to the people who depend on the data. The interface should say which documents are incomplete and why, in plain words. A warning badge with an empty tooltip is worse than no badge: it tells people something is wrong and then refuses to explain.</p>
        <p>One subtle trap: if health reasons are only ever appended, an old problem can keep showing after it has been fixed. Each check should own its reasons and replace them on every run, so the badge always reflects the current state.</p>

        <h2>Retries have to survive a restart</h2>
        <p>Retry logic usually works fine until the server restarts. Then work that was waiting for a retry is simply forgotten, or it comes back with its attempt counter reset to one, so the retry limit never kicks in.</p>
        <p>Persist the retry state with the document: how many attempts, why it is waiting, and when to try next. On startup, look for anything that was mid-retry and pick it back up. Then add a check for documents stuck in limbo, neither finished nor failed, because that is exactly where silent losses hide.</p>
        <div className="seo-callout"><strong>ENGINEERING RULE</strong><p>If a document can enter a state, there should be a way to find every document in that state. &ldquo;Stuck&rdquo; is a state too.</p></div>

        <h2>Watch the boring code paths</h2>
        <p>Some of the worst bugs I have found were not in the clever parts. They were in plumbing: an update function with an allow-list of fields that silently dropped a new one, or a log message that said a step succeeded and failed at the same time. Plumbing like that deserves small, focused tests, because nobody reads it closely once it works.</p>

        <h2>Characterize before you fix</h2>
        <p>When a number looks wrong, my first instinct used to be to change the code. Now I write a test that captures what the code does today, wrong answer included. That test proves the bug exists, shows how big it is, and tells me exactly when my fix changes behavior and when it does not.</p>

        <h2>What I would build first</h2>
        <ol>
          <li>Name the failure states and split retryable from permanent.</li>
          <li>Store a human-readable reason with every failure.</li>
          <li>Surface incomplete documents in the interface, not just the logs.</li>
          <li>Persist retry state and resume it on startup.</li>
          <li>Add a query for anything stuck between states.</li>
        </ol>

        <h2>The result</h2>
        <p>A pipeline that fails loudly is less impressive in a demo, because it admits what it could not do. It is far more useful in production, because the people relying on it know which answers they can trust.</p>

        <aside className="seo-author-card" aria-label="About the author">
          <Image src="/humberto-villanueva.jpg" alt="Humberto Villanueva" width={112} height={112} sizes="112px" />
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
      <div className="seo-next-links"><Link href="/writing">← All engineering notes</Link><Link href="/writing/designing-portable-ai-integrations">Read: portable AI integrations →</Link></div>
    </SeoPageShell>
  );
}
