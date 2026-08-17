"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const projects = [
  {
    title: "HumbertoDev",
    type: "Portfolio / Frontend",
    description:
      "The site you are looking at — a fast, interactive portfolio built with Next.js, TypeScript, and a custom futuristic interface.",
    tags: ["Next.js", "TypeScript", "UI/UX"],
    href: "https://github.com/humbertovillanueva/HumbertoDev",
    featured: true,
  },
  {
    title: "Specta",
    type: "Smart Buildings",
    description:
      "Product work around building analytics, health visibility, and modern interfaces for operational data.",
    tags: ["Svelte", "Analytics", "Buildings"],
    href: "https://github.com/kW-Labs/kw.specta",
    featured: true,
  },
  {
    title: "STEDI",
    type: "Full Stack",
    description:
      "Application work spanning web experiences and data-driven product flows, built as part of a larger engineering project.",
    tags: ["Web", "APIs", "Product"],
    href: "https://github.com/STEDI-Balance/stedi-web",
    featured: false,
  },
  {
    title: "Peru Earth Science",
    type: "Web Experience",
    description:
      "An earlier web project focused on presenting earth-science content through a visual, approachable interface.",
    tags: ["Frontend", "Design", "Web"],
    href: "https://github.com/humbertovillanueva/peru-earth-science-website",
    featured: false,
  },
];

const skills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Svelte",
  "Python",
  "Java",
  "AWS",
  "Docker",
  "Git",
  "REST APIs",
  "SQL",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" stroke="none" d="M12 2.75a9.25 9.25 0 0 0-2.93 18.02c.46.09.63-.2.63-.45v-1.8c-2.56.56-3.1-1.09-3.1-1.09-.42-1.06-1.02-1.34-1.02-1.34-.83-.57.06-.56.06-.56.92.07 1.4.95 1.4.95.82 1.4 2.14 1 2.66.76.08-.59.32-1 .58-1.23-2.04-.23-4.19-1.02-4.19-4.57 0-1.01.36-1.83.95-2.48-.1-.23-.41-1.17.09-2.44 0 0 .77-.25 2.54.95A8.8 8.8 0 0 1 12 7.1a8.8 8.8 0 0 1 2.31.31c1.76-1.2 2.54-.95 2.54-.95.5 1.27.19 2.21.1 2.44.59.65.94 1.47.94 2.48 0 3.56-2.15 4.33-4.2 4.56.33.29.62.85.62 1.72v2.65c0 .25.17.54.64.45A9.25 9.25 0 0 0 12 2.75Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" />
    </svg>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((project) =>
      [project.title, project.type, project.description, ...project.tags]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-layer" />
      <div className="noise-layer" />

      <nav className="nav-wrap">
        <a className="brand" href="#top" aria-label="Humberto Villanueva home">
          <span className="brand-mark">HV</span>
          <span className="brand-text">Humberto Villanueva</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <a
          className="nav-icon"
          href="https://github.com/humbertovillanueva"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <GithubIcon />
        </a>
      </nav>

      <section className="hero section" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            SOFTWARE ENGINEER · SALT LAKE CITY
          </div>

          <h1>
            I build software
            <span>with signal.</span>
          </h1>

          <p className="hero-lede">
            I&apos;m Humberto Villanueva — a software engineer focused on
            thoughtful products, intelligent tools, cloud systems, and
            interfaces that feel as good as they work.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <ArrowIcon />
            </a>
            <a className="button button-ghost" href="#contact">
              Let&apos;s connect
            </a>
          </div>

          <div className="hero-meta">
            <span>Next.js</span>
            <i />
            <span>TypeScript</span>
            <i />
            <span>AWS</span>
            <i />
            <span>AI</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="portrait-card">
            <div className="portrait-topbar">
              <span>PROFILE://HUMBERTO</span>
              <span>01</span>
            </div>
            <div className="portrait-window">
              <Image
                src="/humbertopic.jpeg"
                alt="Humberto Villanueva"
                width={800}
                height={800}
                priority
              />
              <div className="scanline" />
            </div>
            <div className="portrait-footer">
              <span><b>STATUS</b> ONLINE</span>
              <span><b>FOCUS</b> BUILDING</span>
            </div>
          </div>

          <div className="floating-chip chip-one">
            <span className="chip-icon">⌘</span>
            <span>
              <small>CURRENT MODE</small>
              SHIPPING
            </span>
          </div>

          <div className="floating-chip chip-two">
            <span className="chip-icon">↗</span>
            <span>
              <small>PORTFOLIO</small>
              2026 EDITION
            </span>
          </div>
        </div>
      </section>

      <section className="widget-strip section">
        <article className="widget">
          <span className="widget-label">01 / STACK</span>
          <strong>FULL STACK</strong>
          <p>Interfaces, APIs, cloud, and everything between.</p>
        </article>
        <article className="widget">
          <span className="widget-label">02 / FOCUS</span>
          <strong>PRODUCT + AI</strong>
          <p>Useful software first. Intelligence where it earns its place.</p>
        </article>
        <article className="widget">
          <span className="widget-label">03 / CLOUD</span>
          <strong>AWS</strong>
          <p>Deploying, connecting, and learning systems end to end.</p>
        </article>
        <article className="widget widget-accent">
          <span className="widget-label">04 / STATUS</span>
          <strong>BUILDING</strong>
          <p>This portfolio is alive — new work keeps landing here.</p>
        </article>
      </section>

      <section className="section about" id="about">
        <div className="section-kicker">ABOUT / 02</div>
        <div className="about-grid">
          <h2>
            Engineer mindset.
            <span>Designer&apos;s eye.</span>
          </h2>
          <div className="about-copy">
            <p>
              I like software that feels intentional. The best products are not
              just functional — they are clear, fast, useful, and memorable.
            </p>
            <p>
              My work has crossed web development, cloud infrastructure, smart
              buildings, data, and AI. I care about understanding the system,
              not just the screen.
            </p>
          </div>
        </div>

        <div className="skill-marquee">
          <div className="skill-track">
            {[...skills, ...skills].map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section experience" id="experience">
        <div className="section-heading">
          <div>
            <span className="section-kicker">EXPERIENCE / 03</span>
            <h2>Where I&apos;ve been building.</h2>
          </div>
          <span className="section-number">03</span>
        </div>

        <div className="timeline">
          <article className="timeline-row">
            <div className="timeline-date">2026</div>
            <div className="timeline-main">
              <span>kW Engineering</span>
              <h3>Software Engineering Intern</h3>
            </div>
            <p>
              Product engineering across smart-building software, analytics,
              cloud infrastructure, and AI-assisted workflows.
            </p>
            <span className="timeline-arrow">↗</span>
          </article>

          <article className="timeline-row">
            <div className="timeline-date">2024–26</div>
            <div className="timeline-main">
              <span>Ensign College</span>
              <h3>Software Engineering</h3>
            </div>
            <p>
              Full-stack development, cloud systems, APIs, databases,
              architecture, and practical engineering projects.
            </p>
            <span className="timeline-arrow">↗</span>
          </article>

          <article className="timeline-row">
            <div className="timeline-date">2024</div>
            <div className="timeline-main">
              <span>Weber State University</span>
              <h3>Computer Science</h3>
            </div>
            <p>
              Core computer science foundation with programming, data
              structures, and problem solving.
            </p>
            <span className="timeline-arrow">↗</span>
          </article>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-heading">
          <div>
            <span className="section-kicker">SELECTED WORK / 04</span>
            <h2>Projects with a pulse.</h2>
          </div>
          <span className="section-number">04</span>
        </div>

        <div className="search-panel">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, technologies, ideas..."
            aria-label="Search projects"
          />
          <kbd>⌘ K</kbd>
        </div>

        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <a
              className={`project-card ${project.featured ? "featured" : ""}`}
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="project-card-top">
                <span>0{index + 1}</span>
                <ArrowIcon />
              </div>
              <div>
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </a>
          ))}

          {filteredProjects.length === 0 && (
            <div className="empty-state">
              <CodeIcon />
              <h3>No signal found.</h3>
              <p>Try another search term.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section command-center">
        <div className="terminal-card">
          <div className="terminal-bar">
            <div>
              <i />
              <i />
              <i />
            </div>
            <span>humberto@dev ~ portfolio</span>
            <span>⌘_</span>
          </div>
          <div className="terminal-body">
            <p><span>$</span> whoami</p>
            <strong>Humberto Villanueva</strong>
            <p><span>$</span> cat focus.txt</p>
            <strong>software · cloud · AI · product</strong>
            <p><span>$</span> echo $MINDSET</p>
            <strong className="terminal-accent">
              learn fast. build clean. ship useful.
            </strong>
            <p className="terminal-cursor"><span>$</span> <b>_</b></p>
          </div>
        </div>

        <div className="command-copy">
          <span className="section-kicker">COMMAND CENTER / 05</span>
          <h2>Curious by default.</h2>
          <p>
            I like taking systems apart, understanding why they work, and
            rebuilding them better. New tools are interesting; solving the
            right problem is better.
          </p>
          <a href="#contact" className="text-link">
            Start a conversation <ArrowIcon />
          </a>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-inner">
          <span className="section-kicker">CONTACT / 06</span>
          <h2>
            Have something
            <span>worth building?</span>
          </h2>
          <p>
            I&apos;m always interested in strong teams, interesting problems,
            and ambitious software.
          </p>

          <div className="contact-actions">
            <a
              className="button button-primary"
              href="https://www.linkedin.com/in/humberto-villanueva-753084347"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn <ArrowIcon />
            </a>
            <a
              className="button button-ghost"
              href="https://github.com/humbertovillanueva"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <span className="brand-mark">HV</span>
          <span>Humberto Villanueva</span>
        </div>
        <p>Designed &amp; engineered from scratch.</p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
