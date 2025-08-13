import { allPosts } from "contentlayer/generated";
import { siteConfig } from "@/lib/site";

export async function GET() {
  const siteUrl = siteConfig.url;
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const items = posts
    .map(
      (post) => `\n    <item>\n      <title>${post.title}</title>\n      <link>${siteUrl}/blog/${post.slug}</link>\n      <guid>${siteUrl}/blog/${post.slug}</guid>\n      <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n      <description>${post.summary}</description>\n    </item>`
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Ratan Portfolio Blog</title>\n    <link>${siteUrl}/blog</link>\n    <description>Blog posts</description>${items}\n  </channel>\n</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}
