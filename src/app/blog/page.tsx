import Link from "next/link";
import { allPosts } from "contentlayer/generated";

const POSTS_PER_PAGE = 5;

export default function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page ?? "1", 10);
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginated = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );
  return (
    <section>
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-4 space-y-4">
        {paginated.map((post) => (
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
            <div className="mt-1 flex flex-wrap gap-2">
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
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-between">
        {page > 1 ? (
          <Link href={`/blog?page=${page - 1}`}>Previous</Link>
        ) : (
          <span />
        )}
        {page < totalPages && (
          <Link href={`/blog?page=${page + 1}`}>Next</Link>
        )}
      </div>
    </section>
  );
}
