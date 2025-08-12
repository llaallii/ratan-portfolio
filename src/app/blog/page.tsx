import Link from "next/link";
import { allPosts } from "contentlayer/generated";

export default function BlogPage() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return (
    <section>
      <h1 className="text-3xl font-bold">Blog</h1>
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
          </li>
        ))}
      </ul>
    </section>
  );
}
