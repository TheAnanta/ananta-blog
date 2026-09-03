export interface Category {
  slug: string;
  label: string;
  /** Matches a post's `tags` entry (see content/posts/*.json). */
  tag: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { slug: "jetpack-compose", label: "Jetpack Compose", tag: "jetpack-compose", color: "#0061EF" },
  { slug: "android", label: "Android", tag: "android", color: "#02873E" },
  { slug: "web", label: "Web", tag: "web", color: "#9E65C6" },
  { slug: "meta", label: "Meta", tag: "meta", color: "#FF7300" },
];
