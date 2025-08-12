import Link from "next/link";
import { allProjects } from "contentlayer/generated";

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Projects</h1>
      <ul className="mt-4 space-y-4">
        {allProjects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="text-xl font-semibold"
            >
              {project.title}
            </Link>
            <p className="text-sm text-gray-600">{project.timeline}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
