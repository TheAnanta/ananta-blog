"use client";

import { useState } from "react";
import Link from "next/link";

import { ArticleGridCard } from "./ArticleGridCard";
import { Pagination } from "./Pagination";
import type { Post } from "@/lib/posts";

const DEFAULT_PAGE_SIZE = 4;

/** One "Latest {category} posts" grid + pager, mirroring the reference's
 * per-category article-grid sections. */
export function CategorySection({
  id,
  title,
  posts,
  categorySlug,
  viewAllHref,
  pageSize = DEFAULT_PAGE_SIZE,
}: {
  id: string;
  title: string;
  posts: Post[];
  categorySlug: string;
  /** When set, shows a "View all" link (used on the /blog overview page). */
  viewAllHref?: string;
  /** Posts per page - 8 (two rows of 4) on a category page's lead section, 4 elsewhere. */
  pageSize?: number;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / pageSize);
  const start = (page - 1) * pageSize;
  const visible = posts.slice(start, start + pageSize);

  return (
    <div id={id} className="scroll-mt-24 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-[2rem] font-bold tracking-[-0.02em] text-ananta-text-title">
          {title}
        </h3>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm font-bold text-ananta-blue hover:text-ananta-blue-hover"
          >
            View all
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-y-6 md:flex-row md:flex-wrap md:justify-start md:gap-6">
        {visible.map((post) => (
          <ArticleGridCard key={post.slug} post={post} categorySlug={categorySlug} />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => {
          setPage(p);
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />
    </div>
  );
}
