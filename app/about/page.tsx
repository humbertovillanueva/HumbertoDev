import { SoccerGame } from "../soccer-game";
import Image from "next/image";
import { SocialProfileLinks } from "../social-profile-links";
import { socialProfileUrls } from "../social-profiles";
import type { Metadata } from "next";
import Link from "next/link";
import { SeoPageShell } from "../seo-page-shell";

const pageUrl = "https://humbertovillanueva.dev/about";

export const metadata: Metadata = {
  title: "About | Software Engineer in Utah",
  description:
    "Meet Humberto Villanueva, a software engineer based in Utah and focused on AI systems, full-stack products, cloud software, and building intelligence.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "About Humberto Villanueva | Software Engineer in Utah",
    description: "Software engineer in Utah building dependable AI, data, cloud, and full-stack products.",
    url: pageUrl,
  },
};

const profileData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${pageUrl}/#profile-page`,
  url: pageUrl,
  name: "About Humberto Villanueva",
  dateModified: "2026-09-27",
  mainEntity: {
    "@type": "Person",
    "@id": "https://humbertovillanueva.dev/#person",
    name: "Humberto Villanueva",
    jobTitle: "Software Engineer",
    url: "https://humbertovillanueva.dev",
    image: "https://humbertovillanueva.dev/humbertopic.jpeg",
    description: "Software engineer based in Utah, working across AI systems, full-stack products, data reliability, and building intelligence.",
    sameAs: socialProfileUrls,
  },
};

export default function AboutPage() {
  return (
    <SeoPageShell
      stage="PLAYER PROFILE · 07"
      eyebrow="SOFTWARE ENGINEER · UTAH, USA"
      title="ABOUT HUMBERTO VILLANUEVA"
      intro="I’m a software engineer in Utah. I like understanding how things work, finding the problem, and building a fix."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileData).replace(/</g, "\\u003c") }} />
      <section className="seo-panel seo-panel-wide">
        <Image className="profile-portrait" src="/humbertopic.jpeg" width={160} height={160} sizes="160px" alt="Humberto Villanueva, software engineer based in Utah" />
        <span className="seo-label">THE PERSON BEHIND THE WORK</span>
        <h2>What I work on</h2>
        <p>I’m a software engineer based in Utah, where I work across product interfaces, AI integration, document intelligence, data reliability, and software for the built environment.</p>
        <p>When something breaks, I want to know why. I trace the issue through the interface, API, and data, then check that the fix holds up.</p>
      </section>
      <section className="seo-card-grid">
        <article className="seo-panel"><span className="seo-label">CURRENT ROLE</span><h2>Software Engineer</h2><p>I contribute to kW Engineering’s Specta product. Specta is a kW Engineering product, not my personal software.</p></article>
        <article className="seo-panel"><span className="seo-label">EDUCATION</span><h2>Software Engineering</h2><p>B.S. Software Engineering from Ensign College and a Computer Science Certificate from Weber State University.</p></article>
        <article className="seo-panel"><span className="seo-label">FOCUS</span><h2>AI + Full Stack</h2><p>AI systems, document intelligence, cloud services, reliable APIs, product interfaces, and building data.</p></article>
        <article className="seo-panel"><span className="seo-label">BEYOND CODE</span><h2>Family · Football</h2><p>Family and faith keep me grounded. Football keeps me competitive. I follow Real Madrid, and number 7 is my favorite.</p><SoccerGame /></article>
      </section>
      <section className="seo-panel seo-panel-wide"><h2>Find Humberto Villanueva online</h2><p>Professional work and personal interests, each in their own place.</p><SocialProfileLinks /></section>
      <div className="seo-next-links"><Link href="/projects">Explore selected projects →</Link><Link href="/experience">View career and education →</Link></div>
    </SeoPageShell>
  );
}
