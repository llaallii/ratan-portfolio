import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">About Me</h1>
      <p className="mt-4">This page contains information about me.</p>
    </section>
  );
}
