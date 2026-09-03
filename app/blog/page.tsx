import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CategoryIcon } from "@/components/CategoryIcon";
import { CategorySection } from "@/components/CategorySection";
import { PromoBanner } from "@/components/PromoBanner";
import { PromoBannerLarge } from "@/components/PromoBannerLarge";
import { getAllPosts, getPostCategorySlug } from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Blog | Ananta",
  description: "Ideas, notes, and write-ups from the Ananta team.",
};

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  // Group each post under its single canonical category (the first of its
  // tags that matches a known category) so its URL is always predictable.
  const sections = CATEGORIES.map((category) => ({
    category,
    posts: allPosts.filter((post) => getPostCategorySlug(post) === category.slug),
  })).filter((section) => section.posts.length > 0);

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <div className="mx-auto w-full max-w-[1200px] px-[0.54rem] pt-12 pb-20 sm:pt-20 sm:pb-28">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1 text-sm text-ananta-text-secondary"
        >
          <span className="font-semibold text-ananta-text">Blog</span>
        </nav>

        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold leading-[1.15] tracking-[-0.03em] text-ananta-text-title sm:text-5xl">
              Ananta Blog
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ananta-text-body sm:text-lg">
              Ideas captured mid-flow and compiled into writing - notes on
              Jetpack Compose, Android, the web, and how the team works.
            </p>
            <a href="#latest-posts" className="btn-pill btn-pill-primary mt-8">
              Explore posts
            </a>
          </div>
          <div
            className="relative z-0 mt-10 flex w-full shrink-0 min-h-[20rem] max-w-none items-center justify-center overflow-hidden [transform:translate3d(0,0,0)] md:max-h-[50rem] md:max-w-[26.28923077rem] md:min-h-[24rem] min-[90rem]:max-w-[33.95692308rem] min-[90rem]:min-h-[27rem]"
          >
            <Image
              src="/hero.svg"
              alt=""
              fill
              priority
              className="object-contain p-10"
            />
          </div>
        </div>
      </div>

      {/* Category tiles */}
      <div className="mx-auto w-full max-w-[1200px] px-[0.54rem] pb-20">
        <h2 className="mb-8 text-[2rem] font-bold tracking-[-0.02em] text-ananta-text-title">
          Explore posts by category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/${category.slug}`}
              className="group flex flex-col items-start gap-2"
            >
              <div
                className="flex aspect-square w-full items-center justify-center rounded-2xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: category.color }}
              >
                <CategoryIcon slug={category.slug} />
              </div>
              <span className="text-left text-base font-bold text-ananta-text sm:text-lg">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Per-category article grids */}
      <div id="latest-posts" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-[0.54rem] pb-4">
        {sections.length === 0 ? (
          <p className="pb-16 text-ananta-text-secondary">
            No posts published yet.
          </p>
        ) : (
          sections.map(({ category, posts }, i) => (
            <div key={category.slug}>
              <CategorySection
                id={`category-${category.slug}`}
                title={`Latest ${category.label} posts`}
                posts={posts}
                categorySlug={category.slug}
                viewAllHref={`/blog/${category.slug}`}
              />
              {category.slug === "android" && i < sections.length - 1 && (
                <PromoBanner />
              )}
            </div>
          ))
        )}
      </div>

      {sections.length > 0 && <PromoBannerLarge />}
    </div>
  );
}
