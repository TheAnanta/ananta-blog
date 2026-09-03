import type { Heading } from "@/lib/posts";

/** "In this article" anchor nav, sticky in the left rail on desktop. */
export default function ArticleToc({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="In this article">
      <h3 className="mb-4 text-sm font-normal text-ananta-text-title">
        In this article
      </h3>
      <ul className="flex flex-col gap-3 border-t border-b border-ananta-border py-6 text-sm lg:border-none lg:py-0">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="text-ananta-text underline decoration-ananta-border-dark underline-offset-2 hover:text-ananta-blue"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
