import { articles } from "../../articles";

// RSS feed of field notes. Feed readers and blog platforms (dev.to, Hashnode, Medium imports)
// can follow it, and every item points back to the original page on this site.
export const dynamic = "force-static";

const siteUrl = "https://humbertovillanueva.dev";
const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = articles.map(article => `    <item>
      <title>${escape(article.title)}</title>
      <link>${siteUrl}${article.href}</link>
      <guid isPermaLink="true">${siteUrl}${article.href}</guid>
      <pubDate>${new Date(`${article.published}T12:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>Humberto Villanueva</dc:creator>
      <category>${escape(article.category)}</category>
      <description>${escape(article.summary)}</description>
    </item>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Humberto Villanueva · Field notes</title>
    <link>${siteUrl}/writing</link>
    <atom:link href="${siteUrl}/writing/feed.xml" rel="self" type="application/rss+xml" />
    <description>Notes by Humberto Villanueva, a software engineer in Utah, on software he is building and the decisions behind it.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(`${articles[0].published}T12:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
