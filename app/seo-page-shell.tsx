import Link from "next/link";

type SeoPageShellProps = {
  stage: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function SeoPageShell({ stage, eyebrow, title, intro, children }: SeoPageShellProps) {
  return (
    <main className="seo-page">
      <header className="seo-page-header">
        <Link href="/" className="seo-home-link">HV · 07</Link>
        <nav aria-label="Portfolio pages">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </header>
      <section className="seo-page-hero">
        <span>{stage}</span>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <p className="seo-page-intro">{intro}</p>
      </section>
      <div className="seo-page-content">{children}</div>
      <footer className="seo-page-footer">
        <span>HUMBERTO VILLANUEVA · SOFTWARE ENGINEER · UTAH</span>
        <Link href="/">RETURN TO STADIUM →</Link>
      </footer>
    </main>
  );
}
