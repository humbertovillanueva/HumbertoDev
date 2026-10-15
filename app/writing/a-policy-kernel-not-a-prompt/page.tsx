import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";
import { BrandIcon } from "../../brand-icon";
import { professionalProfiles } from "../../social-profiles";

const pageUrl = "https://humbertovillanueva.dev/writing/a-policy-kernel-not-a-prompt";

export const metadata: Metadata = {
  title: "A Policy Kernel, Not a Prompt",
  description: "Humberto Villanueva on why the rules for an AI agent belong in code between the model and its tools, not in the prompt: allow, ask or block by tool and by argument, hidden tools, and what that does and does not protect.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    title: "A Policy Kernel, Not a Prompt",
    description: "Telling a model “never delete files” is a wish. A rule lives where the model can’t argue with it.",
    url: pageUrl,
    publishedTime: "2026-10-15T00:00:00-06:00",
    authors: ["Humberto Villanueva"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Policy Kernel, Not a Prompt",
    description: "Allow, ask or block by tool and by argument, hidden tools, a sandbox, and the one thing none of it stops.",
  },
};

const articleData = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": `${pageUrl}/#article`,
  headline: "A Policy Kernel, Not a Prompt",
  description: "Why the rules for an AI agent belong in code between the model and its tools, how Garu evaluates them, and what that does and does not protect.",
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
    { "@type": "Thing", name: "Policy enforcement" },
    { "@type": "Thing", name: "Model Context Protocol" },
  ],
  keywords: ["AI agents", "policy", "tool calling", "Model Context Protocol", "sandboxing", "software engineering"],
};

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://humbertovillanueva.dev" },
    { "@type": "ListItem", position: 2, name: "Engineering Writing", item: "https://humbertovillanueva.dev/writing" },
    { "@type": "ListItem", position: 3, name: "A Policy Kernel, Not a Prompt", item: pageUrl },
  ],
};

export default function PolicyKernelArticle() {
  return (
    <SeoPageShell stage="FIELD NOTE · 03" eyebrow="AI AGENTS · RUNTIME DESIGN" title="A Policy Kernel, Not a Prompt" intro="Telling a model “never delete files” is a wish. I wanted a rule. Here is where the rules live in Garu, how they are read, and the one thing they cannot do.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />
      <article className="seo-panel seo-article">
        <div className="seo-article-byline"><span>BY HUMBERTO VILLANUEVA</span><span>OCTOBER 15, 2026</span><span>7 MIN READ</span></div>

        <p className="seo-lede">An agent that runs all night with access to my email, my files and my repositories has to answer one question before anything else: what exactly can it touch? If the answer is a paragraph in the prompt, the honest reply is “whatever it decides.” A model can be talked out of an instruction. It cannot be talked past a function that never calls the tool.</p>
        <p>That is the whole idea behind the policy kernel in <Link href="/case-studies/garu">Garu</Link>, the open-source runtime I built for always-on agents. These are the decisions that shaped it.</p>

        <h2>The rules live in the agent’s file, and the kernel reads them</h2>
        <p>An agent is one YAML file. Next to its model, its tools and its schedule sits a list of rules. Each rule names a tool, optionally a condition on the arguments, and one of three actions: allow, ask, or block. This is a trimmed version of the rules for Bea, the agent that sorts my inbox every weekday morning:</p>
        <pre tabIndex={0} aria-label="Policy rules example"><code>{`policy:
  - tool: gmail.search_threads      # reading: always fine
    action: allow
  - tool: gmail.label_thread        # filing: one click undoes it
    action: allow
  - tool: gmail.create_draft        # a reply to an address nobody reads
    when: { to: { matches: "no-?reply|notifications?", ignoreCase: true } }
    action: block
  - tool: gmail.create_draft        # words in my name: I see each one first
    action: ask
  - tool: "*"
    action: block`}</code></pre>
        <p>Every tool call the model wants to make goes to the kernel first. The kernel reads the list top to bottom, and the first rule that matches decides. The model never sees this list. It only sees the result: the tool ran, the tool is waiting for a person, or the tool was refused.</p>

        <h2>Nothing matching means ask</h2>
        <p>The default matters more than any single rule. If no rule matches a call, the kernel does not allow it quietly and it does not refuse it quietly. It asks. A card appears in the inbox and on my phone, and the run waits. If nobody answers within thirty minutes, the answer is no.</p>
        <p>That last part took me a while to accept. An unattended agent that gets a yes by default is not unattended; it is unsupervised. Silence has to be a deny, even when the thing it was asking for was probably fine.</p>

        <h2>Hide what can never be allowed</h2>
        <p>If a rule blocks a tool for every possible argument, the model should not know the tool exists. Garu removes it from the list the model is offered. Rook, the agent that watches this repository through GitHub’s hosted server, is offered three of that server’s forty-six tools. It cannot waste a turn trying to open a pull request, and there is nothing to inject a request into.</p>
        <div className="seo-callout"><strong>ENGINEERING RULE</strong><p>A rule the model cannot see is a rule it cannot argue with. Hide the tool, not just the permission.</p></div>

        <h2>Arguments are the real boundary</h2>
        <p>Tool names are too coarse. “Write a file” is harmless in the agent’s own folder and dangerous everywhere else. So rules match on arguments too: a write is allowed when the path matches <code>briefs/</code> followed by today’s date, a fetch is allowed for four named hosts, a draft is blocked when the recipient looks like an automated sender. Tomay, the agent that writes my morning brief, has exactly one write rule and never pauses, because the one thing it may write is the one thing it does.</p>
        <p>The kernel also says why. Each rule can carry a reason, and the reason is what the inbox card shows and what the model reads when a call is refused. “Blocked: a reply to an automated sender goes nowhere” teaches more than a bare error.</p>

        <h2>A sandbox for the rest</h2>
        <p>Policy decides whether a tool runs. It does not decide what a tool server can reach while it runs. For that, each tool server can run in its own container: no network, a read-only root, only the agent’s workspace mounted, destroyed after the run. The policy and the sandbox answer different questions, and an agent I would leave alone overnight needs both.</p>

        <h2>What none of this stops</h2>
        <p>The kernel stops a blocked tool. It does not stop a model from choosing a bad argument for a tool it is allowed to use. Text in an email or a web page can still talk the model into something, and if that something is inside an allowed rule, it happens. The defense is the shape of the rules: allow reads, allow writes to the agent’s own folder, and make everything that leaves the machine ask. Narrow allows are the design, not a workaround.</p>

        <h2>What I would build first</h2>
        <ol>
          <li>Put the decision in code between the model and the tools, never in the prompt.</li>
          <li>Make “nothing matched” mean ask, and make an unanswered ask a no.</li>
          <li>Hide every tool the rules could never allow.</li>
          <li>Match on arguments, and attach a reason to every rule.</li>
          <li>Record every decision, so a 3 a.m. action can be replayed in the morning.</li>
        </ol>

        <h2>The result</h2>
        <p>The test I keep applying is simple: would I let this run while I sleep? With the rules in code, the record on disk and a cost cap on every run, the answer became yes. That is the only feature that matters.</p>

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
      <div className="seo-next-links"><Link href="/writing">← All engineering notes</Link><Link href="/writing/what-a-decline-should-teach">Read: what a decline should teach →</Link></div>
    </SeoPageShell>
  );
}
