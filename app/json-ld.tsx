// Structured data helpers shared by every page, so search engines connect each page to the same person.
export const siteUrl = "https://humbertovillanueva.dev";
export const personRef = { "@id": `${siteUrl}/#person` };

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function breadcrumbs(items: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Home", ""] as [string, string], ...items].map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${siteUrl}${path}`,
    })),
  };
}
