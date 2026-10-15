import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";
import { JsonLd, breadcrumbs, personRef } from "../../json-ld";

const pageUrl = "https://humbertovillanueva.dev/case-studies/garu";
export const metadata: Metadata = {
  title: "Garu Case Study",
  description: "How Humberto Villanueva built Garu, an open-source runtime for always-on AI agents: one YAML file per agent, a policy kernel in front of every tool call, a flight recorder, budget caps, and approvals from your phone.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "Garu | Always-on AI agents you can actually trust", url: pageUrl, description: "A runtime that keeps agents running on a schedule and puts a policy you wrote between the model and every tool." },
};

const caseStudyData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      "@id": `${pageUrl}/#case-study`,
      name: "Garu Software Engineering Case Study",
      url: pageUrl,
      datePublished: "2026-10-14",
      inLanguage: "en-US",
      creator: personRef,
      image: "https://humbertovillanueva.dev/projects/garu.webp",
      about: ["TypeScript", "Svelte", "Node.js", "Model Context Protocol", "AI agents", "Policy enforcement"],
    },
    breadcrumbs([["Projects", "/projects"], ["Garu", "/case-studies/garu"]]),
  ],
};

export default function GaruCaseStudy() {
  return <SeoPageShell stage="CASE STUDY · 04" eyebrow="INDEPENDENT PROJECT · OPEN SOURCE" title="Garu" intro="An agent that works all night with access to my email and files should be able to answer three questions: what can it touch, who decided that, and where is the record. I built Garu so the answers are a file I own.">
    <JsonLd data={caseStudyData} />
    <section className="seo-panel seo-panel-wide">
      <span className="seo-label">TYPESCRIPT · SVELTE 5 · NODE.JS · MCP · CAPACITOR</span>
      <h2>A runtime for agents, not another agent</h2>
      <p>Garu keeps AI agents running on a schedule on your own computer and puts a policy in front of every tool call. An agent is one YAML file: which model, which tools, when it wakes up, how much it may spend, and what it may do. The control room shows each agent, what it is waiting on and what it did. A phone app shows the same inbox, so a yes or a no can come from anywhere.</p>
      <div className="project-links"><a href="https://garuagents.com/">Visit garuagents.com ↗</a><a href="https://github.com/humbertovillanueva/garu">View source code ↗</a></div>
      <figure className="case-study-image"><Image src="/projects/garu.webp" alt="Garu control room with one decision waiting: the agent Bea asks to draft an email reply, with approve, approve for 24 hours and decline buttons" width={1280} height={850} sizes="(max-width: 760px) 100vw, 1100px" /><figcaption>The control room with one decision waiting. The agents and their rules are the real ones in the repository; the people, meetings and emails are made up.</figcaption></figure>
    </section>
    <article className="seo-panel seo-article">
      <h2>What happens on every tool call</h2>
      <div className="seo-architecture" aria-label="Garu architecture">
        <span>MODEL</span><i>→</i><span>POLICY KERNEL</span><i>→</i><span>MCP TOOL</span><i>→</i><span>FLIGHT RECORDER</span>
      </div>
      <ol>
        <li><strong>Decide:</strong> the model asks for a tool with arguments. The kernel reads the policy top to bottom, and the first rule that matches wins: allow, ask, or block. Rules see the tool name and the arguments, so a file write can be allowed for one folder and blocked everywhere else.</li>
        <li><strong>Ask:</strong> when a rule says ask, the run pauses and a review card appears in the inbox and on the phone. The card shows the thing itself: an email looks like an email, a file write shows the file. Approve once, approve for 24 hours, or decline with a note the agent reads before its next step.</li>
        <li><strong>Record:</strong> every model turn, tool call, decision and approval goes into an append-only log for that run, and the control room replays it as a timeline. There is no database. The record is a folder.</li>
        <li><strong>Stop:</strong> cost is estimated from real token counts, and the run stops the moment it would cross the budget in its file. An ask nobody answers in thirty minutes is a no.</li>
      </ol>
      <h2>Three decisions that make it a kernel instead of a filter</h2>
      <p>The policy is code between the model and the tools, not an instruction in the prompt, so the model cannot talk its way past it. Nothing matching means ask, never a silent allow. And a tool that no rule could ever allow is never shown to the model at all: GitHub’s hosted server offers 46 tools, and the agent that watches this repository sees three.</p>
      <div className="seo-callout"><strong>THE QUESTION I KEPT ASKING</strong><p>Would I let this run overnight? If the answer is yes because of the policy, the recorder and the cap, Garu is doing its job.</p></div>
      <h2>Approvals that write the policy</h2>
      <p>The complaint people had about the first always-on agents was that approving everything became the bottleneck. So asks are meant to be rare and specific: reads are allowed, writes to the agent’s own folder are allowed, and the things that leave the machine are what ask. Approve the same thing three times with no declines and Garu proposes the narrowest rule that covers what you actually approved, then writes it into the file when you say so.</p>
      <p>A decline teaches too. One of my agents, told to watch “the Garu repo” without the owner’s name, found someone else’s project with the same name and tried to log its numbers. I declined, and it then tried to post the same wrong numbers to Slack, because nothing had told it why. Now a decline carries a note that goes back to the model before its next step.</p>
      <h2>Agents that run on my own mail</h2>
      <p>Two agents in the repository work on Gmail and Google Calendar through a small MCP server that ships with Garu. Tomay reads the calendar every weekday at seven and writes a prep note for each meeting; it can only read, so it never pauses. Bea files the last day’s mail under four labels and drafts replies that wait for a tap. The server has no send tool, so she cannot send even if a rule were wrong. Both have a Spanish edition, and the app, the terminal and the guides are in Spanish end to end.</p>
      <h2>Why MCP, and why files</h2>
      <p>Garu ships no integrations. Every tool, local or hosted, arrives through the Model Context Protocol, so one policy language covers a folder on a laptop, GitHub’s hosted server, a Linear workspace or a company API. Remote servers connect over HTTP and sign in with OAuth once. And because an agent is a file, it can be diffed, reviewed and shared. Someone else’s agent is a file you can read before you run it.</p>
      <h2>What works today</h2>
      <p>The kernel, a scheduler that catches up after a closed laptop, the inbox, 24-hour grants, rule suggestions, the flight recorder, budget caps, Docker sandboxing, a chat thread with each agent, and a control room that is also a phone app for Android and iPhone, paired over a private network with no account and no cloud. Gemini, Claude and local models through Ollama are supported, and the free Gemini tier runs all of it. Thirty-one test files and 257 tests cover the kernel, the inbox, grants, suggestions, the scheduler, remote servers, OAuth and the Google server.</p>
      <h2>Limits</h2>
      <p>Everything runs on your own computer, so the agents run only while it is on; a schedule missed in the last six hours runs once on wake. The phone app is a companion: it needs Garu on a computer and a private network between the two, and approvals reach it only while that computer is awake. There is no hosted version. And the kernel stops a blocked tool, not a bad argument inside an allowed rule, which is why the rules are written narrow.</p>
      <h2>What I would add next</h2>
      <p>Push notifications through a small relay, so a phone hears about an ask without the laptop open. A hosted Garu for people who do not want to keep a computer on. A registry, so a Garufile someone else wrote is one command away. And the phone app in the stores.</p>
      <p className="seo-disclosure">Garu is an independent open-source project under the Apache-2.0 license, unrelated to my employer. The sample meetings and emails in the screenshots are made up.</p>
    </article>
    <div className="seo-next-links"><Link href="/projects">← All projects</Link><Link href="/#contact">Talk about a project →</Link></div>
  </SeoPageShell>;
}
