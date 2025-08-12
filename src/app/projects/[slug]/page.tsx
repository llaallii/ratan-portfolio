import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { MDXComponents } from "@/components/mdx-components";
import { useMDXComponent } from "next-contentlayer/hooks";

export async function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
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
