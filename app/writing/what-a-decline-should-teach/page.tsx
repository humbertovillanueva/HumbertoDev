import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";
import { BrandIcon } from "../../brand-icon";
import { professionalProfiles } from "../../social-profiles";

const pageUrl = "https://humbertovillanueva.dev/writing/what-a-decline-should-teach";

export const metadata: Metadata = {
  title: "What a Decline Should Teach an Agent",
  description: "Humberto Villanueva on approvals for unattended AI agents: why a decline has to carry a reason back to the model, how approvals can write the policy, and the morning two asks arrived one at a time.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    title: "What a Decline Should Teach an Agent",
    description: "My agent found the wrong repository, I said no, and it posted the wrong numbers anyway. What a no has to carry.",
    url: pageUrl,
    publishedTime: "2026-10-15T00:00:00-06:00",
    authors: ["Humberto Villanueva"],
  },
  twitter: {
    card: "summary_large_image",
    title: "What a Decline Should Teach an Agent",
    description: "A decline with a note, approvals that write the policy, and an approval flow that assumes the owner is asleep.",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${pageUrl}/#article`,
  headline: "What a Decline Should Teach an Agent",
  description: "Why a decline has to carry a reason back to the model, how approvals can write the policy, and what an approval flow owes an owner who is asleep.",
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
    { "@type": "Thing", name: "AI agents" },
    { "@type": "Thing", name: "Human-in-the-loop" },
    { "@type": "Thing", name: "Approval workflows" },
  ],
  keywords: ["AI agents", "approvals", "human in the loop", "feedback", "policy", "software engineering"],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://humbertovillanueva.dev" },
    { "@type": "ListItem", position: 2, name: "Engineering Writing", item: "https://humbertovillanueva.dev/writing" },
    { "@type": "ListItem", position: 3, name: "What a Decline Should Teach an Agent", item: pageUrl },
  ],
};

export default function DeclineArticle() {
  return (
    <SeoPageShell stage="FIELD NOTE · 04" eyebrow="AI AGENTS · APPROVALS" title="What a Decline Should Teach" intro="My agent found the wrong repository, I said no, and it posted the wrong numbers anyway. A no that only stops one call is not enough. Here is what it has to carry.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      <article className="seo-panel seo-article">
        <div className="seo-article-byline"><span>BY HUMBERTO VILLANUEVA</span><span>OCTOBER 15, 2026</span><span>6 MIN READ</span></div>

        <p className="seo-lede">Rook is a small agent in <Link href="/case-studies/garu">Garu</Link> that checks this project’s repository every Monday and posts a line to Slack when something changed. Early on, I told it to watch “the Garu repo” without giving it the owner’s name. It searched, found somebody else’s project called garu, and asked to log that project’s stars and forks. The review card showed the wrong numbers, so I declined.</p>
        <p>Then it tried to post the same wrong numbers to Slack. Of course it did. My no had stopped one tool call and said nothing about why. As far as the model knew, the numbers were fine and the log was the problem.</p>

        <h2>A decline carries a note</h2>
        <p>The fix was small and changed how I think about every approval screen. Declining a call in Garu now takes a note, and the note goes back to the model before its next step, as part of the refused call’s result:</p>
        <pre tabIndex={0} aria-label="What the model reads after a decline"><code>{`DENIED by humberto: a message to the team
The person who declined said: "wrong repo, use humbertovillanueva/garu".
Act on this before doing anything else — correct the mistake if there is one,
and do not repeat it in later calls.`}</code></pre>
        <p>With that sentence in front of it, the model searched again, found the right repository and finished the run. A decline became a correction instead of a wall.</p>

        <h2>Approvals should write the policy</h2>
        <p>The complaint people had about the first always-on agents was that approving everything made the person the bottleneck. So a yes has to do more than let one call through.</p>
        <p>In Garu, “approve for 24 hours” creates a grant scoped to this agent, this tool and this exact argument, a recipient or a path, until tomorrow. And when the same agent asks for the same tool three times and never hears a no, Garu proposes the narrowest rule that covers what was actually approved and offers to write it into the agent’s file, comments preserved. The policy converges toward what the owner does, instead of staying a document written once.</p>
        <div className="seo-callout"><strong>ENGINEERING RULE</strong><p>Every answer a person gives an agent should change what the agent does next, not just whether this one call runs.</p></div>

        <h2>Silence is a no</h2>
        <p>An ask nobody answers expires after thirty minutes as a deny. I resisted this at first; most of what my agents ask for is fine. But an agent that gets a yes by default while its owner is away is not being supervised, and the whole design depends on supervision meaning something.</p>

        <h2>The morning two asks arrived one at a time</h2>
        <p>This morning showed me a gap in my own rules. Bea, the agent that sorts my inbox, ran at 7:15 and wanted to draft two replies. The kernel ran the calls of that step one after another, so it asked about the first draft and waited. Nobody was up. At 7:45 that ask expired, and only then did the second card appear. When I opened my phone at 8:14, I found one draft waiting and one that had quietly never been made.</p>
        <p>Two fixes went out the same morning. Every call in a step now goes out together, so when two things need a yes, both cards are in the inbox at once; a test holds every answer until both asks are up, which the old one-at-a-time kernel could never pass. And Bea now runs at 8, when the phone is actually in my hand. The lesson is the same as the decline: an approval flow has to assume the owner is asleep, busy or wrong, and still leave the agent somewhere sensible.</p>

        <h2>What I would build first</h2>
        <ol>
          <li>Let a decline carry a reason, and put the reason in the model’s context before its next step.</li>
          <li>Scope every temporary approval to the exact argument it was given for.</li>
          <li>Turn repeated approvals into a proposed rule the owner can accept.</li>
          <li>Make an unanswered ask a no, with a timeout that fits the owner’s day.</li>
          <li>Post every ask from one step at the same time.</li>
        </ol>

        <h2>The result</h2>
        <p>My agents ask about one or two things per run, not twenty. When I say no, the next step is better, not just blocked. And when I say yes three times, I stop being asked. That is what trusting an agent to run unattended turned out to mean in practice.</p>

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

        <p className="seo-disclosure">Garu is an independent open-source project under the Apache-2.0 license, unrelated to my employer. The repository names and the numbers in this note are from my own runs.</p>
      </article>
      <div className="seo-next-links"><Link href="/writing">← All engineering notes</Link><Link href="/writing/a-spanish-first-phone-app-from-one-codebase">Read: a Spanish-first phone app →</Link></div>
    </SeoPageShell>
  );
}
