import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { CategoryIcon } from "@/components/CategoryIcon";
import { CategorySection } from "@/components/CategorySection";
import { PromoBannerLarge } from "@/components/PromoBannerLarge";
import { getAllPosts, getPostCategorySlug } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";

const BANNER_VARIANT: Record<string, "yellow" | "orange" | "green" | "blue"> = {
  android: "orange",
  meta: "blue",
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return {};
  return {
    title: `${category.label} posts | Ananta Blog`,
    description: `Ideas and write-ups tagged ${category.label} from the Ananta team.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const posts = getAllPosts().filter(
    (post) => getPostCategorySlug(post) === category.slug
  );

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <div className="mx-auto w-full max-w-[1200px] px-[0.54rem] pt-12 pb-16 sm:pt-20 sm:pb-20">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1 text-sm text-ananta-text-secondary"
        >
          <Link href="/blog" className="hover:text-ananta-text">
            Blog
          </Link>
          <span aria-hidden className="px-1 text-ananta-border-dark">
            &gt;
          </span>
          <span className="font-semibold text-ananta-text">{category.label}</span>
        </nav>

        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-ananta-text-title sm:text-5xl">
              {category.label} posts
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ananta-text-body sm:text-lg">
              Everything the team has written and tagged {category.label} -
              browse the latest first.
            </p>
            <Link href="/blog" className="btn-pill btn-pill-secondary mt-8">
              All categories
            </Link>
          </div>
          <div
            className="flex aspect-square w-40 shrink-0 items-center justify-center rounded-2xl sm:w-56"
            style={{ backgroundColor: category.color }}
          >
            <CategoryIcon slug={category.slug} />
          </div>
        </div>
      </div>

      {/* Article grid */}
      <div className="mx-auto w-full max-w-[1200px] px-[0.54rem] pb-4">
        {posts.length === 0 ? (
          <p className="pb-16 text-ananta-text-secondary">
            No posts tagged &ldquo;{category.label}&rdquo; yet.
          </p>
        ) : (
          <CategorySection
            id={`category-${category.slug}`}
            title={`${category.label} posts`}
            posts={posts}
            categorySlug={category.slug}
            pageSize={8}
          />
        )}
      </div>

      {posts.length > 0 && (
        <PromoBannerLarge variant={BANNER_VARIANT[category.slug] ?? "green"} />
      )}
    </div>
  );
}
