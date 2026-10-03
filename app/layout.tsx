import { socialProfileUrls } from "./social-profiles";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "./eras.css";
import "./studio.css";
import "./polish.css";
import { DesktopTaskbar } from "./desktop-taskbar";
import { PortfolioSearch } from "./portfolio-search";
import { EraSelector } from "./era-selector";

const siteUrl = "https://humbertovillanueva.dev";

// Fonts for the 2026 edition only. Not preloaded, so the 1986 and 2000 editions never download them.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap", preload: false });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  title: {
    default: "Humberto Villanueva | Software Engineer in Utah",
    template: "%s | Humberto Villanueva",
  },
  description:
    "Humberto Villanueva is a software engineer based in Utah, building web applications, AI integrations, and software for building data at kW Engineering.",
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Humberto Villanueva", url: siteUrl }],
  creator: "Humberto Villanueva",
  publisher: "Humberto Villanueva",
  category: "technology",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/writing/feed.xml", title: "Humberto Villanueva · Field notes" }] },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "192x192" }],
  },
  openGraph: {
    title: "Humberto Villanueva | Software Engineer in Utah",
    description:
      "Portfolio of Humberto Villanueva, a software engineer in Utah building web applications, AI integrations, and software for building data.",
    url: "/",
    siteName: "Humberto Villanueva | Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Humberto Villanueva | Software Engineer in Utah",
    description:
      "Portfolio of Humberto Villanueva, a software engineer in Utah building web applications, AI integrations, and software for building data.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Humberto Villanueva",
      givenName: "Humberto",
      familyName: "Villanueva",
      url: siteUrl,
      image: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#portrait`,
        url: `${siteUrl}/humberto-villanueva.jpg`,
        caption: "Humberto Villanueva, software engineer in Salt Lake City, Utah",
      },
      jobTitle: "Software Engineer",
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Engineer",
        occupationLocation: { "@type": "State", name: "Utah" },
        skills: "TypeScript, React, Svelte, Java, Python, AWS, AI integrations, document processing",
      },
      description:
        "Software engineer based in Utah, building web applications, AI integrations, and software for building data.",
      sameAs: socialProfileUrls,
      worksFor: {
        "@type": "Organization",
        name: "kW Engineering",
        url: "https://kw-engineering.com/",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Ensign College",
          url: "https://www.ensign.edu/",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Weber State University",
          url: "https://www.weber.edu/",
        },
      ],
      homeLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: "Salt Lake City", addressRegion: "UT", addressCountry: "US" },
      },
      knowsAbout: [
        "Software engineering",
        "Artificial intelligence",
        "Document intelligence",
        "Data reliability",
        "Full-stack development",
        "Cloud computing",
        "TypeScript",
        "React",
        "Svelte",
        "Java",
        "Python",
        "Amazon Web Services",
        "Large language models",
        "Building intelligence",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Humberto Villanueva | Software Engineer Portfolio",
      description:
        "The software engineering portfolio of Humberto Villanueva.",
      inLanguage: "en-US",
      author: { "@id": `${siteUrl}/#person` },
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.js="1";try{const e=localStorage.getItem("portfolio-era");document.documentElement.dataset.era=e==="2000"||e==="2026"?e:"1986"}catch{}` }} /></head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <EraSelector />
        {children}
        <DesktopTaskbar />
        <PortfolioSearch />
      </body>
    </html>
  );
}
