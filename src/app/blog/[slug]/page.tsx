import { notFound } from "next/navigation";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { MDXComponents } from "@/components/mdx-components";
import { useMDXComponent } from "next-contentlayer/hooks";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  const url = absoluteUrl(`/blog/${post.slug}`);
  const ogImage = absoluteUrl(`/blog/${post.slug}/opengraph-image`);
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <article className="prose dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        {new Date(post.date).toDateString()} · {post.readingTime}
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${tag}`}
            className="text-xs text-blue-600 hover:underline"
          >
            #{tag}
          </Link>
        ))}
      </div>
      {post.toc.length > 0 && (
        <nav className="mb-8 border-l pl-4">
          <h2 className="text-lg font-semibold">Table of Contents</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {post.toc.map((item) => (
              <li key={item.slug} style={{ marginLeft: (item.level - 1) * 16 }}>
                <a href={`#${item.slug}`} className="hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <MDXContent components={MDXComponents} />
    </article>
  );
}
