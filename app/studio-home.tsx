import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import projects from "./projects.json";
import { ProjectPreview } from "./project-evidence";
import { ProjectLinks, demos } from "./project-links";
import { spectaHighlights, spectaArticle } from "./specta";
import { skillGroups } from "./skills";
import { articles } from "./articles";
import { BrandIcon } from "./brand-icon";
import { professionalProfiles } from "./social-profiles";
import { StudioMotion } from "./studio-motion";
import { StudioShader } from "./studio-shader";
import { StudioClock } from "./studio-widgets";
import { StudioNav } from "./studio-chrome";

const shortDate = (date: string) => date.replace(/^(\w{3})\w*\s(\d+),\s(\d{4})$/, "$1 $2, $3");
const host = (url?: string) => url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "github.com/humbertovillanueva";
const ticker = ["AI systems", "Document intelligence", "Full-stack product", "Building intelligence", ...skillGroups.flatMap(group => group.items)];
const chunk = <T,>(items: T[], size: number) => Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, index * size + size));
const toolkitKeys: Record<string, string> = { "DAILY AT WORK": "dailyAtWork", "SHIPPED IN PROJECTS": "shippedInProjects", "COMFORTABLE": "comfortable" };

// Each letter animates in on its own; screen readers get the plain name from aria-label.
function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return <span className="kinetic-line" aria-hidden="true">
    {[...text].map((letter, index) => <span key={index} className="kinetic-letter" style={{ "--i": index + offset } as CSSProperties}>{letter}</span>)}
  </span>;
}

function Label({ index, children }: { index: string; children: ReactNode }) {
  return <p className="studio-label"><span className="studio-label-index">{index}</span>{children}</p>;
}

// The toolkit card renders this as syntax-highlighted TypeScript, one array item group per line.
const codeLines: ReactNode[] = [
  <span key="c" className="tok-comment">{"// one scale for everything"}</span>,
  <><span className="tok-key">export const</span> <span className="tok-var">humberto</span> = {"{"}</>,
  ...skillGroups.flatMap(group => [
    <>{"  "}<span className="tok-prop">{toolkitKeys[group.level]}</span>: [</>,
    ...chunk(group.items, 3).map(row => <>{"    "}{row.map(item => <span key={item}><span className="tok-string">&quot;{item}&quot;</span>, </span>)}</>),
    <>{"  "}],</>,
  ]),
  <>{"}"} <span className="tok-key">satisfies</span> <span className="tok-type">Engineer</span>;<span className="code-caret" aria-hidden="true" /></>,
];

export function StudioHome() {
  const featured = projects.filter(project => project.repo);
  return <div className="studio-home">
    <StudioMotion />
    <div className="studio-progress" aria-hidden="true" />
    <a className="page-skip" href="#studio-content">Skip to content</a>

    <StudioNav home />

    <section className="studio-hero" id="studio-content" tabIndex={-1} aria-labelledby="studio-name">
      <StudioShader />
      <div className="studio-hero-inner">
        <div className="hero-chips">
          <span className="hero-chip"><span className="studio-dot" aria-hidden="true" />Building at kW Engineering</span>
          <span className="hero-chip hero-chip-quiet">Utah · <StudioClock /></span>
        </div>
        <h1 id="studio-name" aria-label="Humberto Villanueva">
          <Letters text="Humberto" />
          <Letters text="Villanueva" offset={8} />
        </h1>
        <p className="hero-statement">Software engineer. I build web applications, connect <em>AI</em> to real work, and help people make sense of <em>building data</em>.</p>
        <div className="hero-actions">
          <Link className="studio-button studio-button-glow fx-magnetic" href="#studio-work"><span>Explore the work</span><span aria-hidden="true">↓</span></Link>
          <Link className="studio-button studio-button-ghost fx-magnetic" href="#contact"><span>Get in touch</span><span aria-hidden="true">↗</span></Link>
        </div>
        <dl className="hero-hud">
          <div><dt>Now</dt><dd>Software Engineer, kW Engineering</dd></div>
          <div><dt>Daily stack</dt><dd>Fantom · Svelte 5 · TypeScript · LLMs</dd></div>
          <div><dt>Latest note</dt><dd><Link href={articles[0].href}>{articles[0].title} <span aria-hidden="true">↗</span></Link></dd></div>
        </dl>
      </div>
    </section>

    <div className="studio-ticker" aria-hidden="true">
      <div className="studio-ticker-track">
        {[0, 1].map(copy => <div key={copy}>{ticker.map(item => <span key={item}>{item}<i>✦</i></span>)}</div>)}
      </div>
    </div>

    <section className="studio-section studio-now" aria-labelledby="studio-current">
      <div className="now-intro fx-reveal">
        <Label index="01">Current work</Label>
        <h2 id="studio-current">Specta <em>at kW Engineering</em></h2>
        <p>I contribute to AI integrations, document processing, data reliability, and interfaces for building operators.</p>
        <div className="studio-links">
          <Link href={spectaArticle.href}>{spectaArticle.label} <span aria-hidden="true">↗</span></Link>
          <Link href="/experience">My role <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <ol className="now-cards">
        {spectaHighlights.map((item, index) => <li key={item.title} className="glass-card fx-spot fx-reveal" style={{ "--d": index } as CSSProperties}>
          <span className="now-number" aria-hidden="true">0{index + 1}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>)}
      </ol>
    </section>

    <section id="studio-work" className="studio-section studio-work" aria-labelledby="studio-work-title">
      <div className="section-head fx-reveal">
        <div><Label index="02">Selected projects</Label><h2 id="studio-work-title">From idea to <em>working software.</em></h2></div>
        <Link className="studio-button studio-button-ghost" href="/projects">All projects <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="studio-projects">
        {featured.map((project, index) => <article className="studio-project fx-reveal" key={project.repo}>
          <div className="project-visual fx-tilt">
            <div className="browser-frame fx-spot">
              <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{host(demos[project.repo])}</span></div>
              <ProjectPreview repo={project.repo} />
            </div>
          </div>
          <div className="project-copy">
            <span className="project-index" aria-hidden="true">0{index + 1}</span>
            <p className="studio-label">{project.type}<span className="studio-pill">{project.status}</span></p>
            <h3>{project.title}</h3>
            <p className="project-text">{project.text}</p>
            <ul className="studio-chips" aria-label="Built with">{project.stack.split("·").map(item => <li key={item.trim()}>{item.trim()}</li>)}</ul>
            <ProjectLinks repo={project.repo} />
          </div>
        </article>)}
      </div>
    </section>

    <section className="studio-section studio-toolkit" aria-labelledby="studio-stack">
      <div className="toolkit-intro fx-reveal">
        <Label index="03">Toolkit</Label>
        <h2 id="studio-stack">The stack, <em>honestly rated.</em></h2>
        <p>What I use every day at work, what I have shipped in my own projects, and what I am comfortable picking up.</p>
      </div>
      <figure className="code-window glass-card fx-spot fx-reveal" aria-labelledby="toolkit-caption">
        <div className="code-tabs" aria-hidden="true"><i /><i /><i /><span className="code-tab">toolkit.ts</span><span className="code-tab code-tab-quiet">README.md</span></div>
        <pre tabIndex={0} aria-label="Toolkit written as TypeScript"><code>{codeLines.map((line, index) => <span className="code-line" key={index} style={{ "--l": index } as CSSProperties}>{line}</span>)}</code></pre>
        <figcaption id="toolkit-caption" className="code-status"><span><i className="studio-dot" aria-hidden="true" />TypeScript</span><span>Daily at work · Shipped in projects · Comfortable</span></figcaption>
      </figure>
    </section>

    <section className="studio-section studio-writing" aria-labelledby="studio-writing-title">
      <div className="section-head fx-reveal">
        <div><Label index="04">Writing</Label><h2 id="studio-writing-title">Field notes from <em>the build.</em></h2></div>
        <Link className="studio-button studio-button-ghost" href="/writing">All notes <span aria-hidden="true">↗</span></Link>
      </div>
      <ul className="writing-rows">
        {articles.map(article => <li key={article.href} className="fx-reveal"><Link className="writing-row fx-spot" href={article.href}>
          <span className="writing-meta"><span>{shortDate(article.date)}</span><span>{article.readingTime.toLowerCase()}</span></span>
          <span className="writing-main"><strong>{article.title}</strong><span>{article.summary}</span></span>
          <span className="writing-arrow" aria-hidden="true">↗</span>
        </Link></li>)}
      </ul>
    </section>

    <section className="studio-section studio-person fx-reveal" aria-labelledby="studio-person-title">
      <Label index="05">Behind the work</Label>
      <h2 id="studio-person-title">Curious by nature. <em>Engineer by practice.</em></h2>
      <div className="person-body">
        <p>I like finding the reason something broke, working through a fix, and making sure it holds up. Away from the screen, it’s family and football.</p>
        <div className="studio-links">
          <Link href="/about">More about me <span aria-hidden="true">↗</span></Link>
          {professionalProfiles.map(profile => <a key={profile.name} className="studio-icon-link" href={profile.url} target="_blank" rel="me noopener noreferrer" aria-label={`${profile.name} (opens in a new tab)`} title={profile.name}><BrandIcon name={profile.icon} className="brand-icon studio-brand-icon" /></a>)}
        </div>
      </div>
    </section>
  </div>;
}
