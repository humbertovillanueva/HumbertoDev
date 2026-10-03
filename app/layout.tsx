import { socialProfileUrls } from "./social-profiles";
import type { Metadata } from "next";
import "./globals.css";
import "./eras.css";
import "./studio.css";
import "./polish.css";
import { DesktopTaskbar } from "./desktop-taskbar";
import { PortfolioSearch } from "./portfolio-search";
import { EraSelector } from "./era-selector";

const siteUrl = "https://humbertovillanueva.dev";

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
      url: siteUrl,
      image: `${siteUrl}/humbertopic.jpeg`,
      jobTitle: "Software Engineer",
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
        "@type": "State",
        name: "Utah",
      },
      knowsAbout: [
        "Software engineering",
        "Artificial intelligence",
        "Document intelligence",
        "Data reliability",
        "Full-stack development",
        "Cloud computing",
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
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{const e=localStorage.getItem("portfolio-era");document.documentElement.dataset.era=e==="2000"||e==="2026"?e:"1986"}catch{}` }} /></head>
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
