import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/posts";

/** Article-grid card matching the reference exactly: a fixed-size thumbnail
 * with the title beside it on mobile, below it (left-aligned) on desktop —
 * no category tag, no excerpt. */
export function ArticleGridCard({
  post,
  categorySlug,
}: {
  post: Post;
  categorySlug: string;
}) {
  return (
    <Link
      href={`/blog/${categorySlug}/${post.slug}`}
      className="group flex w-full flex-row no-underline md:w-52 md:flex-col xl:w-[16.3rem]"
    >
      {post.coverImageUrl ? (
        <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-ananta-cream md:h-[9.3rem] md:w-52 xl:h-[11.375rem] xl:w-[16.3rem]">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 768px) 260px, 72px"
          />
        </div>
      ) : null}

      <p className="self-center text-sm font-bold leading-relaxed tracking-[-0.03em] text-ananta-text ml-4 max-w-60 md:ml-0 md:mt-4 md:self-start md:text-base">
        {post.title}
      </p>
    </Link>
  );
}
