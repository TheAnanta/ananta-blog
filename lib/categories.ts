import fs from "fs";
import path from "path";

export interface Category {
  slug: string;
  label: string;
  /** Matches a post's `tags` entry (see content/posts/*.json). */
  tag: string;
  color: string;
}

// Content pipeline: the Supabase `sync-categories` Edge Function rewrites
// content/categories.json in this repo whenever a category is
// created/edited/deleted in the ananta_ideas app (see
// ananta_ideas/supabase/functions/sync-categories/index.ts). Read once at
// build time, same pattern as lib/posts.ts. Falls back to a small
// hardcoded set so the site still builds before that file exists.
const FALLBACK_CATEGORIES: Category[] = [
  { slug: "jetpack-compose", label: "Jetpack Compose", tag: "jetpack-compose", color: "#0061EF" },
  { slug: "android", label: "Android", tag: "android", color: "#02873E" },
  { slug: "web", label: "Web", tag: "web", color: "#9E65C6" },
  { slug: "meta", label: "Meta", tag: "meta", color: "#FF7300" },
];

function loadCategories(): Category[] {
  const filePath = path.join(process.cwd(), "content", "categories.json");
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw) as Category[];
    return parsed.length > 0 ? parsed : FALLBACK_CATEGORIES;
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export const CATEGORIES: Category[] = loadCategories();
