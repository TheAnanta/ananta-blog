"use client";

/** Chevron built from a rotated bordered corner, matching the reference's
 * `.css-10uwj9b` arrow (border-based, not a text glyph or icon font). */
function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className="inline-block border-solid border-ananta-text-secondary"
      style={{
        borderWidth: "0 0.14rem 0.14rem 0",
        padding: "0.14rem",
        transform: `rotate(${direction === "left" ? 135 : -45}deg)`,
      }}
    />
  );
}

/** Numbered pager with prev/next arrows, matching the reference's
 * "< 1 2 3 4 ... N >" pattern. Collapses distant pages behind an ellipsis. */
export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pageCount = Math.max(1, totalPages);
  const pages = new Set<number>([1, pageCount, page, page - 1, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);

  const items: (number | "ellipsis")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) items.push("ellipsis");
    items.push(p);
    prev = p;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ananta-cream disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Chevron direction="left" />
      </button>

      {items.map((item, i) =>
        item === "ellipsis" ? (
          <span key={`e${i}`} className="px-1 text-sm text-ananta-text-secondary">
            &hellip;
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-current={item === page ? "page" : undefined}
            onClick={() => onChange(item)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              item === page
                ? "bg-ananta-text text-white"
                : "bg-ananta-cream text-ananta-text-secondary hover:bg-ananta-border"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-ananta-cream disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Chevron direction="right" />
      </button>
    </nav>
  );
}
