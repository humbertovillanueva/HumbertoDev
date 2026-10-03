import Link from "next/link";
import projects from "./projects.json";
import { ProjectPreview } from "./project-evidence";
import { ProjectLinks } from "./project-links";
import { spectaHighlights, spectaArticle } from "./specta";
import { skillGroups } from "./skills";
import { articles } from "./articles";
import { professionalProfiles } from "./social-profiles";
import { StudioMotion } from "./studio-motion";
import { StudioClock, StudioSearchButton } from "./studio-widgets";

const levelLabels: Record<string, string> = {
  "DAILY AT WORK": "Daily at work",
  "SHIPPED IN PROJECTS": "Shipped in projects",
  "COMFORTABLE": "Comfortable",
};

const shortDate = (date: string) => date.replace(/^(\w{3})\w*\s(\d+),\s(\d{4})$/, "$1 $2, $3");

function StudioMark() {
  return <svg className="studio-mark" viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="12" fill="#d9ff57" />
    <path d="M15 14h12v14h10V14h12v36H37V37H27v13H15z" fill="#0a0a0b" />
    <path d="M28 28h10l-4 9H24z" fill="#e54848" />
  </svg>;
}

export function StudioHome() {
  const featured = projects.filter(project => project.repo);
  return <div className="studio-home">
    <StudioMotion />
    <a className="page-skip" href="#studio-content">Skip to content</a>

    <header className="studio-nav">
      <Link className="studio-signature" href="/" aria-label="Humberto Villanueva home"><StudioMark /><span>Humberto Villanueva</span></Link>
      <nav aria-label="Studio navigation">
        <Link href="#studio-work">Work</Link>
        <Link href="/writing">Writing</Link>
        <Link href="/about">About</Link>
        <StudioSearchButton />
        <Link className="studio-nav-cta" href="#contact">Contact</Link>
      </nav>
    </header>

    <section className="bento bento-hero" id="studio-content" tabIndex={-1} aria-label="Introduction">
      <article className="bento-card card-intro">
        <p className="studio-label"><span className="studio-dot" aria-hidden="true" />Software engineer · Utah</p>
        <h1>Humberto Villanueva</h1>
        <p className="intro-lede">I build web applications, connect AI tools, and help people make sense of building data.</p>
        <div className="intro-actions">
          <Link className="studio-button studio-button-accent" href="#studio-work">View my work <span aria-hidden="true">↓</span></Link>
          <Link className="studio-button" href="#contact">Get in touch</Link>
        </div>
      </article>
      <aside className="bento-card card-now" aria-label="Right now">
        <p className="studio-label">Now</p>
        <p className="now-role">Software Engineer</p>
        <p className="now-org">kW Engineering</p>
        <Link className="now-latest" href={articles[0].href}><span>Latest note</span><strong>{articles[0].title} <span aria-hidden="true">↗</span></strong></Link>
        <dl className="now-meta">
          <div><dt>Local time</dt><dd><StudioClock /></dd></div>
          <div><dt>Based in</dt><dd>Utah, USA</dd></div>
          <div><dt>Focus</dt><dd>AI + full stack</dd></div>
        </dl>
      </aside>
    </section>

    <section className="bento bento-now" aria-label="Current work and toolkit">
      <article className="bento-card card-specta" aria-labelledby="studio-current">
        <div className="card-head"><p className="studio-label">01 · Current work</p><span className="studio-pill">at kW Engineering</span></div>
        <h2 id="studio-current">Specta</h2>
        <p className="card-lede">I contribute to AI integrations, document processing, data reliability, and interfaces for building operators.</p>
        <ol className="specta-grid">
          {spectaHighlights.map((item, index) => <li key={item.title}><span aria-hidden="true">0{index + 1}</span><strong>{item.title}</strong><p>{item.text}</p></li>)}
        </ol>
        <div className="card-links"><Link href={spectaArticle.href}>{spectaArticle.label} <span aria-hidden="true">↗</span></Link><Link href="/experience">My role <span aria-hidden="true">↗</span></Link></div>
      </article>
      <article className="bento-card card-stack" aria-labelledby="studio-stack">
        <p className="studio-label">02 · Toolkit</p>
        <h2 id="studio-stack">Stack</h2>
        {skillGroups.map(group => <div className="stack-group" key={group.level}>
          <h3>{levelLabels[group.level]}</h3>
          <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
        </div>)}
        <div className="card-links"><Link href="/experience">Career and education <span aria-hidden="true">↗</span></Link></div>
      </article>
    </section>

    <section id="studio-work" className="studio-work" aria-labelledby="studio-work-title">
      <div className="section-head">
        <div><p className="studio-label">03 · Selected projects</p><h2 id="studio-work-title">From idea to working software.</h2></div>
        <Link href="/projects">All projects <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="studio-projects">
        {featured.map((project, index) => <article className="bento-card studio-project" key={project.repo}>
          <div className="studio-project-top"><span>0{index + 1} · {project.type}</span><span className="studio-pill">{project.status}</span></div>
          <ProjectPreview repo={project.repo} />
          <div className="studio-project-copy">
            <h3>{project.title}</h3>
            <p>{project.text}</p>
            <ul className="studio-chips" aria-label="Built with">{project.stack.split("·").map(item => <li key={item.trim()}>{item.trim()}</li>)}</ul>
            <ProjectLinks repo={project.repo} />
          </div>
        </article>)}
      </div>
    </section>

    <section className="bento bento-bottom" aria-label="Writing and background">
      <article className="bento-card card-writing" aria-labelledby="studio-writing">
        <div className="card-head"><p className="studio-label">04 · Writing</p><Link href="/writing">All notes <span aria-hidden="true">↗</span></Link></div>
        <h2 id="studio-writing">Field notes</h2>
        <ul className="writing-list">
          {articles.map(article => <li key={article.href}><Link href={article.href}>
            <span className="writing-meta">{shortDate(article.date)} · {article.readingTime.toLowerCase()}</span>
            <strong>{article.title}</strong>
            <span className="writing-summary">{article.summary}</span>
          </Link></li>)}
        </ul>
      </article>
      <article className="bento-card card-person" aria-labelledby="studio-person">
        <p className="studio-label">05 · Behind the work</p>
        <h2 id="studio-person">Curious by nature. Engineer by practice.</h2>
        <p>I like finding the reason something broke, working through a fix, and making sure it holds up. Away from the screen, it’s family and football.</p>
        <div className="card-links">
          <Link href="/about">More about me <span aria-hidden="true">↗</span></Link>
          {professionalProfiles.map(profile => <a key={profile.name} href={profile.url} target="_blank" rel="me noopener noreferrer">{profile.name} <span aria-hidden="true">↗</span><span className="social-sr-only"> (opens in a new tab)</span></a>)}
        </div>
      </article>
    </section>
  </div>;
}
