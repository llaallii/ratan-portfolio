import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface ValidationProps {
  iq: ReactNode;
  oq: ReactNode;
  pq: ReactNode;
  grr: ReactNode;
}

interface CaseStudyProps {
  context: ReactNode;
  requirements: ReactNode;
  approach: ReactNode;
  validation: ValidationProps;
  results: ReactNode;
  lessons: ReactNode;
}

export function CaseStudy({
  context,
  requirements,
  approach,
  validation,
  results,
  lessons,
}: CaseStudyProps) {
  const toc = [
    { id: "context", title: "Context" },
    { id: "requirements", title: "Requirements" },
    { id: "approach", title: "Approach" },
    {
      id: "validation",
      title: "Validation",
      children: [
        { id: "validation-iq", title: "IQ" },
        { id: "validation-oq", title: "OQ" },
        { id: "validation-pq", title: "PQ" },
        { id: "validation-grr", title: "GRR" },
      ],
    },
    { id: "results-metrics", title: "Results & Metrics" },
    { id: "lessons", title: "Lessons" },
  ];

  return (
    <div className="flex gap-8">
      <aside className="sticky top-20 hidden w-48 shrink-0 lg:block">
        <nav className="space-y-2 text-sm">
          {toc.map((item) => (
            <div key={item.id}>
              <a href={`#${item.id}`} className="block hover:underline">
                {item.title}
              </a>
              {item.children && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.children.map((child) => (
                    <a
                      key={child.id}
                      href={`#${child.id}`}
                      className="block hover:underline"
                    >
                      {child.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <article className="prose dark:prose-invert max-w-none flex-1">
        <div className="mb-4 flex gap-2">
          <Badge>ISO 13485</Badge>
          <Badge>ISO 14971</Badge>
        </div>
        <section id="context">
          <h2>Context</h2>
          {context}
        </section>
        <section id="requirements">
          <h2>Requirements</h2>
          {requirements}
        </section>
        <section id="approach">
          <h2>Approach</h2>
          {approach}
        </section>
        <section id="validation">
          <h2>Validation</h2>
          <section id="validation-iq">
            <h3>IQ</h3>
            {validation.iq}
          </section>
          <section id="validation-oq">
            <h3>OQ</h3>
            {validation.oq}
          </section>
          <section id="validation-pq">
            <h3>PQ</h3>
            {validation.pq}
          </section>
          <section id="validation-grr">
            <h3>GRR</h3>
            {validation.grr}
          </section>
        </section>
        <section id="results-metrics">
          <h2>Results &amp; Metrics</h2>
          {results}
        </section>
        <section id="lessons">
          <h2>Lessons</h2>
          {lessons}
        </section>
      </article>
    </div>
  );
}

export default CaseStudy;

