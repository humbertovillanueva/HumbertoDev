import type { MetadataRoute } from "next";

const siteUrl = "https://humbertovillanueva.dev";

// lastModified is the date each page's content last changed. Update it when you edit a page.
const pages: { path: string; priority: number; lastModified: string }[] = [
  { path: "", priority: 1, lastModified: "2026-10-03" },
  { path: "/about", priority: 0.9, lastModified: "2026-10-03" },
  { path: "/projects", priority: 0.9, lastModified: "2026-10-06" },
  { path: "/experience", priority: 0.8, lastModified: "2026-10-03" },
  { path: "/writing", priority: 0.8, lastModified: "2026-10-03" },
  { path: "/writing/make-document-pipelines-fail-loudly", priority: 0.8, lastModified: "2026-10-02" },
  { path: "/writing/designing-portable-ai-integrations", priority: 0.8, lastModified: "2026-10-02" },
  { path: "/case-studies/reality-commit", priority: 0.8, lastModified: "2026-10-02" },
  { path: "/case-studies/dispatchtrack-lite", priority: 0.8, lastModified: "2026-10-02" },
  { path: "/case-studies/aws-cloud-quest", priority: 0.8, lastModified: "2026-10-06" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, lastModified }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
    ...(path === "" || path === "/about" ? { images: [`${siteUrl}/humberto-villanueva.jpg`] } : {}),
  }));
}
