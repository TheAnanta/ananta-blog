import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Marked } from "marked";
import {
  getAllPosts,
  getPostBySlug,
  getPostCategorySlug,
  readingTime,
  formatDate,
  extractHeadings,
  slugify,
} from "@/lib/posts";
import { CATEGORIES } from "@/lib/categories";
import ArticleToc from "@/components/ArticleToc";
import ArticleShare from "@/components/ArticleShare";
import SetHeaderBreadcrumb from "@/components/SetHeaderBreadcrumb";

const SITE_URL = "https://blogs.theananta.in";

// Give each `##` heading an id matching lib/posts.ts's slugify so the
// "In this article" nav links scroll to the right place.
const marked = new Marked({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const plain = tokens.map((t) => ("raw" in t ? t.raw : "")).join("");
      return `<h${depth} id="${slugify(plain)}">${text}</h${depth}>`;
    },
  },
});

export function generateStaticParams() {
  return getAllPosts()
    .map((post) => {
      const category = getPostCategorySlug(post);
      return category ? { category, slug: post.slug } : null;
    })
    .filter((params): params is { category: string; slug: string } => params !== null);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Ananta`,
    description: post.excerpt ?? undefined,
  };
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // The category segment is canonical — a post reached via the wrong
  // category in the URL doesn't resolve, so links always match the slug.
  const actualCategorySlug = getPostCategorySlug(post);
  if (actualCategorySlug !== categorySlug) notFound();
  const category = CATEGORIES.find((c) => c.slug === categorySlug);

  const minutes = readingTime(post.bodyMarkdown);
  const html = post.bodyMarkdown ? await marked.parse(post.bodyMarkdown) : "";
  const headings = extractHeadings(post.bodyMarkdown);
  const shareUrl = `${SITE_URL}/blog/${categorySlug}/${post.slug}`;

  return (
    <div className="w-full bg-white">
      <SetHeaderBreadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          ...(category ? [{ label: category.label, href: `/blog/${category.slug}` }] : []),
          { label: post.title },
        ]}
      />
      <article className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pt-12 pb-12 sm:pt-20 lg:grid-cols-[200px_1fr_56px]">
        <aside className="order-2 lg:order-1">
          <div className="lg:sticky lg:top-24">
            <ArticleToc headings={headings} />
          </div>
        </aside>

        <div className="order-1 mx-auto w-full max-w-3xl lg:order-2">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-1 text-sm text-ananta-text-secondary"
          >
            <Link href="/blog" className="hover:text-ananta-text">
              Blog
            </Link>
            {category && (
              <>
                <span aria-hidden className="px-1 text-ananta-border-dark">
                  &gt;
                </span>
                <Link href={`/blog/${category.slug}`} className="hover:text-ananta-text">
                  {category.label}
                </Link>
              </>
            )}
            <span aria-hidden className="px-1 text-ananta-border-dark">
              &gt;
            </span>
            <span className="truncate font-semibold text-ananta-text">
              {post.title}
            </span>
          </nav>

          <h1 className="text-4xl font-bold leading-[1.2] tracking-[-0.04em] text-ananta-text-title sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-[0.625rem] font-medium text-ananta-text sm:text-xs">
              {post.publishedAt ? `Published ${formatDate(post.publishedAt)}` : "Draft"}
              {` · ${minutes} min read`}
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex w-full max-w-sm items-center gap-4 rounded-xl bg-ananta-cream p-3 lg:w-1/2 lg:max-w-full">
              <div className="flex shrink-0 -space-x-3">
                {post.authors.map((author, i) => (
                  <div
                    key={author.name + i}
                    className="relative h-[50px] w-[50px] overflow-hidden rounded-full border-2 border-ananta-cream bg-ananta-blue"
                    style={{ zIndex: post.authors.length - i }}
                  >
                    {author.avatarUrl ? (
                      <Image
                        src={author.avatarUrl}
                        alt={author.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="50px"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                        {initials(author.name)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-base font-bold text-ananta-text-secondary">
                Written by{" "}
                {post.authors.map((author, i) => (
                  <span key={author.name + i}>
                    {i > 0 &&
                      (i === post.authors.length - 1
                        ? post.authors.length > 2
                          ? ", and "
                          : " and "
                        : ", ")}
                    <span className="text-ananta-blue">{author.name}</span>
                  </span>
                ))}
              </p>
            </div>
            <div className="lg:hidden">
              <ArticleShare url={shareUrl} title={post.title} />
            </div>
          </div>

          {post.coverImageUrl && (
            <div className="relative mt-8 aspect-[1200/630] w-full overflow-hidden rounded-lg bg-ananta-cream">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ananta-cream px-3.5 py-1.5 text-xs font-semibold text-ananta-text"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className="prose prose-ananta mt-8 w-full max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <aside className="order-3 hidden lg:block">
          <div className="sticky top-24">
            <ArticleShare url={shareUrl} title={post.title} />
          </div>
        </aside>
      </article>
    </div>
  );
}
