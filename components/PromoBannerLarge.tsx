import Image from "next/image";
import Link from "next/link";

const VARIANTS = {
  yellow: {
    texture: "/banner-texture-yellow.svg",
    filter: undefined,
    heading: "text-ananta-text-title",
    body: "text-ananta-text-title/80",
  },
  // Derived from the yellow texture - matched by sampling rendered pixels
  // against the site's #FF7300 orange token.
  orange: {
    texture: "/banner-texture-yellow.svg",
    filter: "hue-rotate(-28deg) saturate(7) contrast(1.3)",
    heading: "text-white",
    body: "text-white/85",
  },
  green: {
    texture: "/banner-texture-green.svg",
    filter: undefined,
    heading: "text-white",
    body: "text-white/85",
  },
  // Derived from the green texture - matched by sampling rendered pixels
  // against the site's #0061EF blue token.
  blue: {
    texture: "/banner-texture-green.svg",
    filter: "hue-rotate(92deg) saturate(1.8) contrast(1.1)",
    heading: "text-white",
    body: "text-white/85",
  },
} as const;

/** The "original" hero-style promo banner from the reference (title, copy,
 * a mini preview card with an "interested in more?" CTA line, and a
 * decorative graphic on the right) - our own content and shapes, matching
 * its structure rather than its assets. Full-bleed, edge to edge, matching
 * the reference's `hero-background`/`hero-container` (a full-width colored
 * strip with a max-width inner content column) rather than a contained card. */
export function PromoBannerLarge({
  variant = "yellow",
}: {
  variant?: keyof typeof VARIANTS;
}) {
  const v = VARIANTS[variant];

  return (
    <div className="relative w-full overflow-hidden py-16 sm:py-20">
      <Image
        src={v.texture}
        alt=""
        fill
        priority
        className="object-cover"
        style={v.filter ? { filter: v.filter } : undefined}
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-start gap-12 px-6 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-md">
          <h2 className={`text-3xl font-bold leading-[1.15] tracking-[-0.03em] sm:text-4xl ${v.heading}`}>
            Every idea starts as a fragment
          </h2>
          <p className={`mt-4 text-base leading-relaxed sm:text-lg ${v.body}`}>
            Half-formed thoughts are still worth keeping. Ananta&apos;s idea
            log is where they wait until you&apos;re ready to write.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl shadow-sm">
            <div className="relative overflow-hidden bg-ananta-cream p-6">
              <div
                aria-hidden
                className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-ananta-yellow/60"
              />
              <p className="relative text-2xl font-bold leading-snug text-ananta-text-secondary">
                Recomposition Is Not The Enemy
              </p>
              <p className="relative mt-2 max-w-xs text-sm leading-relaxed text-ananta-text-secondary">
                Started as a two-line note during a debugging session, then
                sat for a week before it turned into a full post.
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 bg-[rgb(226,222,217)] px-6 py-5">
              <span className="text-sm text-ananta-text-secondary">
                Interested in more content like this?
              </span>
              <Link
                href="/blog"
                className="flex shrink-0 items-center gap-1 text-sm font-bold text-ananta-blue hover:text-ananta-blue-hover"
              >
                Read more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9.56 19.71l-1.41-1.42L14.44 12 8.15 5.71l1.41-1.42 7 7a1 1 0 010 1.41l-7 7.01z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div aria-hidden className="relative hidden h-64 w-64 shrink-0 md:block">
          <div className="absolute right-8 top-4 h-40 w-32 rotate-6 rounded-2xl bg-white/70 shadow-lg" />
          <div className="absolute right-0 top-16 h-40 w-32 -rotate-6 rounded-2xl bg-ananta-blue shadow-lg" />
          <div className="absolute bottom-4 left-4 h-32 w-32 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}
