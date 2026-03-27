import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import type { BlogItem } from "../../Types";

type BlogDetailsProps = {
  post: BlogItem;
  onBack?: () => void;
  backTo?: string;
};

const BlogDetails = ({ post, onBack, backTo = ROUTES.BLOG }: BlogDetailsProps) => {
  const createdLabel = post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", }) : "—";

  return (
    <section className="delvoura-container py-10">
      <div className="mt-6 overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card)]">
        <div className="relative h-[52vh] w-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${post.image ?? ""}')` }}   />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute left-4 top-4 z-20">
            {onBack ? (
              <button type="button" className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white backdrop-blur" onClick={onBack} >
                Back to Blog
              </button>
            ) : (
              <Link to={backTo} className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white backdrop-blur" >
                Back to Blog
              </Link>
            )}
          </div>
          <div className="relative z-10 flex h-full items-end p-8">
            <div className="max-w-2xl text-white">
              <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-3 text-sm uppercase tracking-[0.35em] text-white/70">
                {createdLabel} · 4 min read
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5 px-8 py-10 text-[color:var(--color-text-muted)]">
          {post.content ? (
            <p className="text-base leading-7">{post.content}</p>
          ) : (
            <p className="text-base leading-7">Content coming soon.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
