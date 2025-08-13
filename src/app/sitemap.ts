import { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date,
  }));
  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: absoluteUrl("/about"), lastModified: new Date() },
    { url: absoluteUrl("/contact"), lastModified: new Date() },
    { url: absoluteUrl("/projects"), lastModified: new Date() },
    { url: absoluteUrl("/blog"), lastModified: new Date() },
    ...posts,
  ];
}
