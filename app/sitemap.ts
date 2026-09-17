import type { MetadataRoute } from "next";

const siteUrl = "https://humbertovillanueva.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-09-16",
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl}/humbertopic.jpeg`],
    },
  ];
}
