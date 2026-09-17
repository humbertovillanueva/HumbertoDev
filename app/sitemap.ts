import type { MetadataRoute } from "next";

const siteUrl = "https://humbertovillanueva.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/experience", priority: 0.8 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: "2026-09-16",
    changeFrequency: "monthly",
    priority,
    ...(path === "" ? { images: [`${siteUrl}/humbertopic.jpeg`] } : {}),
  }));
}
