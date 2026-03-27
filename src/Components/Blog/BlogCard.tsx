import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { BlogItem } from "../../Types";
import { formatRelativeTime } from "../common";

type BlogCardGridProps = {
  posts?: BlogItem[];
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// show blog upload time 
const BlogCardGrid = ({ posts = [] }: BlogCardGridProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((post, index) => (
        <article
          key={post._id ?? `${post.title}-${index}`}
          className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] transition hover:-translate-y-1"
        >
          <Link to={`${ROUTES.BLOG}/${post._id}`} className="block h-full">
            <div className="relative h-64 w-full">
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${post.image ?? ""}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
            <div className="space-y-3 p-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[color:var(--color-text-muted)]">
                {formatDate(post.createdAt)}
              </p>
              <h2 className="text-base font-semibold leading-6">{post.title}</h2>
              <p className="line-clamp-3 text-sm leading-6 text-[color:var(--color-text-muted)]">
                {post.content}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--color-accent)]">
                  Read More
                </span>
                <span className="text-xs text-[color:var(--color-text-muted)]">
                  {formatRelativeTime(post.createdAt)}
                </span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogCardGrid;
