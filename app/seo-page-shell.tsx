import { PageNavigation } from "./page-navigation";
import Link from "next/link";
import type { CSSProperties } from "react";
import { StudioNav } from "./studio-chrome";
import { StudioMotion } from "./studio-motion";
import { StudioShader } from "./studio-shader";

type SeoPageShellProps = {
  stage: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Small facts shown under the title in the 2026 edition, like the homepage hero. */
  stats?: { label: string; value: string }[];
  children: React.ReactNode;
};

// One shell for every subpage in every era. The classic header and footer keep the 1986 and 2000
// looks; the 2026 edition swaps in the shared studio nav, a shader-lit hero with the same kinetic
// title as the homepage, and the same closing call to action.
function KineticTitle({ text }: { text: string }) {
  let index = 0;
  const words = text.split(" ");
  return <span className="seo-title-words" aria-hidden="true">
    {words.map((word, wordIndex) => <span key={wordIndex}>
      <span className="seo-title-word">{[...word].map(letter => <span key={index} className="kinetic-letter" style={{ "--i": index++ } as CSSProperties}>{letter}</span>)}</span>
      {wordIndex < words.length - 1 ? " " : null}
    </span>)}
  </span>;
}

export function SeoPageShell({ stage, eyebrow, title, intro, stats, children }: SeoPageShellProps) {
  return (
    <main className="seo-page">
      <a className="page-skip" href="#page-content">Skip to content</a>
      <header className="seo-page-header">
        <Link href="/" className="seo-home-link" aria-label="Humberto Villanueva home">HV · 07</Link>
        <PageNavigation />
      </header>
      <StudioNav />
      <section className="seo-page-hero">
        <StudioShader />
        <span>{stage}</span>
        <p><span className="studio-dot" aria-hidden="true" />{eyebrow}</p>
        <h1 aria-label={title}><KineticTitle text={title} /></h1>
        <p className="seo-page-intro">{intro}</p>
        {stats && <dl className="hero-hud seo-page-stats">{stats.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>}
      </section>
      <div className="seo-page-content" id="page-content" tabIndex={-1}>{children}</div>
      <section className="studio-only seo-page-cta" aria-labelledby="seo-page-cta-title">
        <p className="studio-label"><span className="studio-label-index">Next</span>Let’s talk</p>
        <h2 id="seo-page-cta-title">Have something <em>worth building?</em></h2>
        <div className="hero-actions">
          <Link className="studio-button studio-button-glow fx-magnetic" href="/#contact"><span>Get in touch</span><span aria-hidden="true">↗</span></Link>
          <Link className="studio-button studio-button-ghost fx-magnetic" href="/projects"><span>See the work</span><span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <footer className="seo-page-footer">
        <span>HUMBERTO VILLANUEVA · SOFTWARE ENGINEER · UTAH</span>
        <nav className="studio-only" aria-label="Footer"><Link href="/about">About</Link><Link href="/projects">Projects</Link><Link href="/experience">Experience</Link><Link href="/writing">Writing</Link></nav>
        <Link href="/">BACK TO HOME →</Link>
      </footer>
      <StudioMotion
        root=".seo-page"
        reveal=".seo-page-content > :not(script, .seo-project-list, .seo-timeline, .seo-card-grid, .seo-writing-list), .seo-project-list > *, .seo-timeline > *, .seo-card-grid > *, .seo-writing-list > *, .seo-page-cta"
        spot=".fx-spot, .seo-panel:not(.seo-article), .seo-next-links a"
        tilt=".seo-project .project-preview"
      />
    </main>
  );
}
