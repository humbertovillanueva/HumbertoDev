import Link from "next/link";
import { DesktopProjects } from "./desktop-projects";
import { spectaHighlights, spectaArticle } from "./specta";

export function DesktopHome() {
  return <div className="desktop-home"><a className="page-skip" href="#desktop-content">Skip to content</a>
    <aside className="desktop-directory"><Link className="desktop-owner" href="/">HV<span>Personal desktop</span></Link><p>MY DESKTOP</p><nav aria-label="Desktop directory"><Link href="/" aria-current="page">Welcome</Link><Link href="/projects">Projects</Link><Link href="/experience">Experience</Link><Link href="/about">About me</Link><Link href="/writing">Notebook</Link><Link href="#contact">Contact</Link></nav><div className="desktop-sidebar-note">Utah, USA<br />Software Engineer<br /><strong>kW Engineering</strong></div></aside>
    <div className="desktop-workspace" id="desktop-content" tabIndex={-1}>
      <nav className="desktop-menubar" aria-label="Workspace shortcuts"><Link href="/projects">Projects</Link><Link href="/about">Profile</Link><Link href="/writing">Notebook</Link><Link href="#contact">Contact</Link></nav><div className="desktop-path"><span>Address</span><code>C:\Humberto\Welcome</code></div>
      <section className="desktop-welcome"><div className="desktop-titlebar"><span>Welcome.txt</span><span className="desktop-document-type">Text document</span></div><div className="desktop-intro"><div><span className="desktop-eyebrow">WELCOME TO MY WEBSITE</span><h1>Humberto Villanueva</h1><p>I build web applications, connect AI tools, and help people make sense of building data.</p><div className="desktop-actions"><Link href="/projects">Browse my projects →</Link><Link href="#contact">Get in touch</Link></div></div></div><div className="desktop-status"><span>● Currently at kW Engineering</span><span>AI + Full stack</span></div></section>
      <section className="desktop-current"><span>AT WORK</span><h2>Specta</h2><p>At kW Engineering, I work on Specta’s AI integrations, document processing, data reliability, and interfaces for building operators.</p><ul className="specta-highlights">{spectaHighlights.map(item => <li key={item.title}><strong>{item.title}</strong> {item.text}</li>)}</ul><div className="specta-links"><Link href={spectaArticle.href}>{spectaArticle.label} →</Link><Link href="/experience">My role and experience →</Link></div></section>
      <DesktopProjects />
      <div className="desktop-bottom"><Link href="/writing"><strong>From my notebook</strong><span>Notes on software and decisions behind the work →</span></Link><Link href="/about"><strong>Outside the code</strong><span>Family, football, and the person behind this website →</span></Link></div>
    </div>
  </div>;
}
