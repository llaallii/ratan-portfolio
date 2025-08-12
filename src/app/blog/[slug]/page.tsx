import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { MDXComponents } from "@/components/mdx-components";
import { useMDXComponent } from "next-contentlayer/hooks";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
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
      <MDXContent components={MDXComponents} />
    </article>
  );
}
