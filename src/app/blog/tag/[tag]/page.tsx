import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  return {
    title: `Tag: ${params.tag}`,
    alternates: { canonical: absoluteUrl(`/blog/tag/${params.tag}`) },
  };
}

export default function TagPage({
  params,
}: {
  params: { tag: string };
}) {
  const posts = allPosts
    .filter((p) => p.tags.includes(params.tag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <section>
      <h1 className="text-3xl font-bold">Tag: {params.tag}</h1>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-semibold"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-600">{post.summary}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.date).toDateString()} · {post.readingTime}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
