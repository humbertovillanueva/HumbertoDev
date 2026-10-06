import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SeoPageShell } from "../../seo-page-shell";
import { JsonLd, breadcrumbs, personRef } from "../../json-ld";

const pageUrl = "https://humbertovillanueva.dev/case-studies/aws-cloud-quest";
export const metadata: Metadata = {
  title: "AWS Cloud Quest Case Study",
  description: "How Humberto Villanueva built AWS Cloud Quest, a dependency-free browser game for practicing AWS Cloud Practitioner concepts with shuffled questions, instant feedback, and streaks.",
  alternates: { canonical: pageUrl },
  openGraph: { title: "AWS Cloud Quest | A study game for AWS Cloud Practitioner review", url: pageUrl, description: "50 shuffled questions, instant feedback, score and streak tracking, in a single HTML file with no dependencies." },
};

const caseStudyData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      "@id": `${pageUrl}/#case-study`,
      name: "AWS Cloud Quest Software Engineering Case Study",
      url: pageUrl,
      datePublished: "2026-10-06",
      inLanguage: "en-US",
      creator: personRef,
      image: "https://humbertovillanueva.dev/projects/cloud-quest.webp",
      about: ["JavaScript", "HTML", "CSS", "AWS Cloud Practitioner", "Active recall"],
    },
    breadcrumbs([["Projects", "/projects"], ["AWS Cloud Quest", "/case-studies/aws-cloud-quest"]]),
  ],
};

export default function AwsCloudQuestCaseStudy() {
  return <SeoPageShell stage="CASE STUDY · 03" eyebrow="COURSE PROJECT · LIVE DEMO" title="AWS Cloud Quest" intro="Rereading notes felt like studying without proving anything. I built AWS Cloud Quest so every review session asks for an answer and shows right away whether it was right.">
    <JsonLd data={caseStudyData} />
    <section className="seo-panel seo-panel-wide">
      <span className="seo-label">HTML · CSS · JAVASCRIPT · GITHUB PAGES</span>
      <h2>A study game instead of another pass through the notes</h2>
      <p>AWS Cloud Quest is a browser game for reviewing AWS Cloud Practitioner concepts: cloud economics, security, compute, storage, networking, databases, monitoring, messaging, and the Well-Architected Framework. It runs from one HTML file with no framework, no build step, and no dependencies.</p>
      <div className="project-links"><a href="https://humbertovillanueva.github.io/aws-cloud-quest/">Play AWS Cloud Quest ↗</a><a href="https://github.com/humbertovillanueva/aws-cloud-quest">View source code ↗</a></div>
      <figure className="case-study-image"><Image src="/projects/cloud-quest.webp" alt="AWS Cloud Quest start screen with 50 questions, randomized choices, and streak tracking" width={1280} height={850} sizes="(max-width: 760px) 100vw, 1100px" /><figcaption>The live start screen. Questions are practice material for review, not official AWS exam questions.</figcaption></figure>
    </section>
    <article className="seo-panel seo-article">
      <h2>How a run works</h2>
      <ol>
        <li><strong>Start:</strong> the 50 questions are shuffled into a new order, and the answer choices inside each question are shuffled too.</li>
        <li><strong>Answer:</strong> choosing an option locks the question. A correct answer adds to the score and the streak; a wrong one resets the streak and highlights the right choice.</li>
        <li><strong>Keep going:</strong> a progress bar, score, and current streak stay on screen, so every question has a small, visible stake.</li>
        <li><strong>Finish:</strong> the results screen shows the final score, accuracy, best streak, and a rank from Cloud Trainee to AWS Cloud Master.</li>
      </ol>
      <h2>Shuffling without breaking the answer key</h2>
      <p>If a question stored its answer as “option B” and the options were then shuffled, the game would mark the wrong choice as correct. So each question is prepared before it is shown: every option carries its own correct-or-not flag, and only then is the list shuffled. Grading reads the flag on the button that was clicked, never its position.</p>
      <p>The shuffle itself is a Fisher–Yates shuffle on a copy of the array, so every order is equally likely and the original question bank is never changed.</p>
      <div className="seo-callout"><strong>THE RULE I FOLLOWED</strong><p>Keep the fact that decides the outcome attached to the thing being shuffled. Then the order can change freely without changing the answer.</p></div>
      <h2>Small guards that keep the score honest</h2>
      <p>After an answer is chosen, every option is disabled and a lock flag is set, so a quick double click cannot count one question twice. Answer text is escaped before it is placed on the page, and the buttons are real buttons, so the game works with a keyboard as well as a mouse.</p>
      <h2>Why one file and no build</h2>
      <p>The whole game is a single HTML file with its styles and script inside. Anyone can clone the repository and open the file, and GitHub Pages can serve it as-is. For a study tool with one screen and one data set, a framework would have added setup without adding much for the person studying.</p>
      <h2>Limits</h2>
      <p>Progress is not saved between visits, and there is no account or history of past runs. The questions are practice material for review. They are not official AWS exam questions, and a high score does not predict a certification result. The project is not affiliated with Amazon Web Services.</p>
      <h2>What I would add next</h2>
      <p>A short explanation after each answer, so a wrong answer teaches the concept instead of only revealing the letter. Then a review screen at the end that lists the missed questions, and a saved best score so a learner can see progress across sessions.</p>
    </article>
    <div className="seo-next-links"><Link href="/projects">← All projects</Link><Link href="/#contact">Talk about a project →</Link></div>
  </SeoPageShell>;
}
