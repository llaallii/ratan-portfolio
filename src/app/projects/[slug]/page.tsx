import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { MDXComponents } from "@/components/mdx-components";
import { useMDXComponent } from "@/lib/mdx";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) return {};
  const url = absoluteUrl(`/projects/${project.slug}`);
  const ogImage = absoluteUrl(`/projects/${project.slug}/opengraph-image`);
  return {
    title: project.title,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      images: [ogImage],
    },
    other: {
      "pagefind:meta:tags": project.tags.join(","),
    },
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  const MDXContent = useMDXComponent(project.body.code);
  return (
    <article className="prose dark:prose-invert">
      <h1>{project.title}</h1>
      <MDXContent components={MDXComponents} />
    </article>
  );
}
