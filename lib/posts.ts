import fs from "fs";
import path from "path";

import { CATEGORIES } from "./categories";

// Content pipeline: the Supabase `publish-post` Edge Function commits one
// JSON file per published post to content/posts/<slug>.json in this repo
// (see ananta_ideas/supabase/functions/publish-post/index.ts). Unpublishing
// deletes the file. This module just reads whatever is on disk at build
// time - there is no dynamic Supabase fetch on the site side. Field names
// here match the JSON the Edge Function writes.
export interface PostAuthor {
  name: string;
  avatarUrl: string | null;
}

// Raw shape as written to disk by the Edge Function. `authors` supports
// co-written posts (multiple contributors); `authorName` is kept for
// backward compatibility with posts published before multi-author support.
interface RawPost {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  tags: string[];
  authorName?: string;
  authors?: PostAuthor[];
  publishedAt: string | null;
  bodyMarkdown: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  tags: string[];
  authors: PostAuthor[];
  publishedAt: string | null;
  bodyMarkdown: string;
}

function normalizePost(raw: RawPost): Post {
  const authors =
    raw.authors && raw.authors.length > 0
      ? raw.authors
      : [{ name: raw.authorName ?? "Ananta Team", avatarUrl: null }];
  return { ...raw, authors };
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return normalizePost(JSON.parse(raw) as RawPost);
}

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
}

/** Rough reading time estimate, ~200 words/minute. */
export function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export interface Heading {
  id: string;
  text: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Pulls `##` headings out of the raw markdown for the "In this article" nav. */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  for (const line of markdown.split("\n")) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const text = match[1].trim();
      headings.push({ id: slugify(text), text });
    }
  }
  return headings;
}

/** "A", "A and B", or "A, B, and C" for a byline of co-authors. */
export function formatAuthorNames(authors: PostAuthor[]): string {
  const names = authors.map((a) => a.name);
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/** The category a post belongs to under `/blog/<category>/<slug>` -
 * the first of its tags that matches a known category, if any. */
export function getPostCategorySlug(post: Post): string | null {
  return CATEGORIES.find((c) => post.tags.includes(c.tag))?.slug ?? null;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
