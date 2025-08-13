import Link from "next/link";
import Image from "next/image";
import { allPosts, allProjects } from "contentlayer/generated";

export default function HomePage() {
  const posts = allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  const projects = allProjects;
  return (
    <div className="space-y-16">
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold">Ratan Lal Bunkar</h1>
        <p className="mt-2 text-xl text-muted-foreground">Full Stack Developer</p>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          I craft responsive web applications and share insights on modern
          development.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/projects"
            prefetch
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View Projects
          </Link>
          <Link
            href="/blog"
            prefetch
            className="inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            Read Blog
          </Link>
        </div>
        <div className="mt-8 flex justify-center gap-6">
          <a
            href="https://www.shl-medical.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/shl-medical.svg" alt="SHL Medical" width={120} height={40} />
          </a>
          <a
            href="https://linkedin.com/in/ratanlalbunkar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
          </a>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Featured Projects</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              prefetch
              className="block rounded-lg border p-4 hover:shadow"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.timeline}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-bold">Latest Blog Posts</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              prefetch
              className="block rounded-lg border p-4 hover:shadow"
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
