import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";
import { BrandIcon } from "../../brand-icon";
import { professionalProfiles } from "../../social-profiles";

const pageUrl = "https://humbertovillanueva.dev/writing/a-spanish-first-phone-app-from-one-codebase";

export const metadata: Metadata = {
  title: "A Spanish-First Phone App From One Codebase",
  description: "Humberto Villanueva on making Garu work in Spanish end to end: one rule for every sentence in the interface, a test that fails on a missing translation, agents that write to their owner in their language, and one Svelte codebase on the desktop, Android and iPhone.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    title: "A Spanish-First Phone App From One Codebase",
    description: "My family reads email in Spanish. Translating the buttons was the easy part; the agents had to write in Spanish too.",
    url: pageUrl,
    publishedTime: "2026-10-15T00:00:00-06:00",
    authors: ["Humberto Villanueva"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Spanish-First Phone App From One Codebase",
    description: "One rule for every sentence, a test that fails on a missing translation, and agents that answer in the language of the email.",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${pageUrl}/#article`,
  headline: "A Spanish-First Phone App From One Codebase",
  description: "Making an AI agent runtime work in Spanish end to end: the interface, the terminal, the guides, and the agents’ own writing, from one codebase on three screens.",
  url: pageUrl,
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  inLanguage: "en-US",
  image: `${pageUrl}/opengraph-image`,
  mainEntityOfPage: pageUrl,
  isPartOf: { "@id": "https://humbertovillanueva.dev/#website" },
  author: { "@id": "https://humbertovillanueva.dev/#person" },
  publisher: { "@id": "https://humbertovillanueva.dev/#person" },
  about: [
    { "@type": "Thing", name: "Localization" },
    { "@type": "Thing", name: "Mobile applications" },
    { "@type": "Thing", name: "AI agents" },
  ],
  keywords: ["localization", "Spanish", "Svelte", "Capacitor", "AI agents", "software engineering"],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://humbertovillanueva.dev" },
    { "@type": "ListItem", position: 2, name: "Engineering Writing", item: "https://humbertovillanueva.dev/writing" },
    { "@type": "ListItem", position: 3, name: "A Spanish-First Phone App From One Codebase", item: pageUrl },
  ],
};

export default function SpanishFirstArticle() {
  return (
    <SeoPageShell stage="FIELD NOTE · 05" eyebrow="PRODUCT · LOCALIZATION" title="Spanish First, One Codebase" intro="My family reads their email in Spanish. For Garu’s phone app to be useful to them, the buttons were the easy part. The agents had to write in Spanish too, and so did the terminal and the guides.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      <article className="seo-panel seo-article">
        <div className="seo-article-byline"><span>BY HUMBERTO VILLANUEVA</span><span>OCTOBER 15, 2026</span><span>6 MIN READ</span></div>

        <p className="seo-lede">The first people I wanted to put <Link href="/case-studies/garu">Garu</Link> in front of were my family, and they live on Gmail in Spanish. An agent that sorts their inbox and drafts replies in English would be worse than no agent. So “add Spanish” could not mean a language menu. It had to mean that every sentence a person reads, every note an agent writes, every line in the terminal and every guide comes out in Spanish, and that it stays that way as the product grows.</p>

        <h2>One rule for every sentence</h2>
        <p>Every sentence in the interface goes through one function, with the English sentence as the key and the Spanish in a dictionary next to it. The key is a whole sentence, never a fragment, because fragments glue together differently in each language. Plurals get one key per form. Agent names, tool ids, file paths and commands are never wrapped, so they read the same in both languages and never get “translated” by accident.</p>
        <pre tabIndex={0} aria-label="One sentence, one key"><code>{`t("Waiting for you to approve one action")
t("{n} new since yesterday", { n })

// es.ts
"Waiting for you to approve one action": "Esperando que apruebes una acción",
"{n} new since yesterday": "{n} nuevos desde ayer",`}</code></pre>

        <h2>The test that fails on a missing sentence</h2>
        <p>A dictionary drifts the day after it is finished. So a test scans the source for every call to that function and fails on three things: a sentence with no Spanish, a Spanish entry whose English no longer exists, and a translation that lost a placeholder. The same test runs against the terminal’s own dictionary. A new feature cannot ship in English only, because the build says no.</p>
        <div className="seo-callout"><strong>ENGINEERING RULE</strong><p>A translation is not done when the buttons change. It is done when the agent writes to you in your language, and when the test fails the first time someone forgets.</p></div>

        <h2>Agents that write in Spanish</h2>
        <p>The part that mattered most was not in the interface. An agent’s file can say <code>language: es</code>. The runtime then hands the model the date spelled out in that language and tells it to write everything meant for its owner in Spanish, and to answer an email in the language the email was written in. Tomay, the morning brief, and Bea, the inbox sorter, ship a Spanish edition beside the English one, with Gmail labels in Spanish and the words that mark an automated sender in Spanish too: <code>no-responder</code>, <code>notificaciones</code>, <code>avisos</code>. A rule that blocks replies to addresses nobody reads has to know what those addresses are called.</p>

        <h2>The terminal and the guides</h2>
        <p>The command line has the same layer, following the computer’s language unless told otherwise, and the same test. Each guide has a Spanish twin with a link at the top of both, so nobody lands on a page in the wrong language with no way out. Even the setup for Google, the longest guide, exists twice.</p>

        <h2>One codebase, three screens</h2>
        <p>The control room is a Svelte application. The same code, built once more with a phone flag, is packaged with Capacitor as the Android and iPhone app. The phone keeps its own preferences, including the language, so a parent can pin Spanish on their phone without changing anything on the computer that runs the agents. Phone screens never show a command; they say “this needs setup on your computer” and leave the commands to the desktop.</p>
        <p>Times are human in both languages, “in 25 min” rather than a timestamp, and dates come out in the person’s language. The one exception is the run timeline, which is the log of one run and keeps its exact stamps.</p>

        <h2>What I would build first</h2>
        <ol>
          <li>Route every sentence through one function, keyed by the whole English sentence.</li>
          <li>Write the test that fails on a missing, stale or broken translation, and run it in the build.</li>
          <li>Give the agent’s file a language, and let the runtime brief the model in it.</li>
          <li>Translate the vocabulary your rules depend on, not just the screens.</li>
          <li>Build the phone app from the same code, with its preferences on the phone.</li>
        </ol>

        <h2>Limits</h2>
        <p>The Spanish is mine, and my family has not reviewed all of it yet. The agents write well in Spanish on the model I use, but a different model may need a firmer instruction. And the phone app is still being prepared for its first closed test, so the people this was built for have not held it yet. That is the next thing.</p>

        <aside className="seo-author-card" aria-label="About the author">
          <Image src="/humberto-villanueva.jpg" alt="Humberto Villanueva" width={112} height={112} sizes="112px" />
          <div>
            <span className="seo-label">ABOUT THE AUTHOR</span>
            <h2>Humberto Villanueva</h2>
            <p>Software engineer in Utah building AI agents people can trust to run unattended, applied AI integrations, and smart-building technology.</p>
            <nav aria-label="Author links">
              <Link href="/about">About Humberto</Link>
              {professionalProfiles.map(profile => <a key={profile.name} className="author-icon-link" href={profile.url} rel="me" aria-label={profile.name} title={profile.name}><BrandIcon name={profile.icon} /></a>)}
            </nav>
          </div>
        </aside>

        <p className="seo-disclosure">Garu is an independent open-source project under the Apache-2.0 license, unrelated to my employer. Everything in this note comes from its public repository.</p>
      </article>
      <div className="seo-next-links"><Link href="/writing">← All engineering notes</Link><Link href="/case-studies/garu">Read the Garu case study →</Link></div>
    </SeoPageShell>
  );
}
