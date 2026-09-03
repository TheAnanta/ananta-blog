/** Simple generic glyphs per category — not tied to any external icon set. */
export function CategoryIcon({ slug }: { slug: string }) {
  const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none" as const };

  switch (slug) {
    case "jetpack-compose":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="8" height="8" rx="2" fill="white" fillOpacity="0.9" />
          <rect x="13" y="3" width="8" height="8" rx="2" fill="white" fillOpacity="0.55" />
          <rect x="3" y="13" width="8" height="8" rx="2" fill="white" fillOpacity="0.55" />
          <rect x="13" y="13" width="8" height="8" rx="2" fill="white" fillOpacity="0.9" />
        </svg>
      );
    case "android":
      return (
        <svg {...common} aria-hidden>
          <rect x="6" y="7" width="12" height="14" rx="3" fill="white" fillOpacity="0.9" />
          <rect x="9" y="2" width="2" height="4" rx="1" fill="white" fillOpacity="0.9" />
          <rect x="13" y="2" width="2" height="4" rx="1" fill="white" fillOpacity="0.9" />
          <circle cx="9.5" cy="12.5" r="1.25" fill="currentColor" />
          <circle cx="14.5" cy="12.5" r="1.25" fill="currentColor" />
        </svg>
      );
    case "web":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.9" strokeWidth="1.75" />
          <ellipse cx="12" cy="12" rx="4" ry="9" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
          <path d="M3 12h18" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
        </svg>
      );
    case "meta":
      return (
        <svg {...common} aria-hidden>
          <path
            d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4L12 3z"
            fill="white"
            fillOpacity="0.9"
          />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="8" fill="white" fillOpacity="0.8" />
        </svg>
      );
  }
}
