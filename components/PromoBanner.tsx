import Link from "next/link";

/** Full-bleed promo banner, styled after the reference's colored
 * "A meditation for..." interstitial — a headline, copy, a small preview
 * card, and a CTA, dropped between category sections. */
export function PromoBanner() {
  return (
    <div className="relative my-10 w-full overflow-hidden rounded-3xl bg-ananta-blue py-16 sm:py-20">
      <div
        aria-hidden
        className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 sm:h-72 sm:w-72"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/10"
      />

      <div className="relative mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl">
            Capture the idea before it slips away
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            Ananta is built for the moment you learn something worth
            remembering - jot it down, and come back later to shape it into a
            post.
          </p>
          <Link href="/" className="btn-pill btn-pill-secondary mt-8 !border-white !bg-transparent !text-white hover:!bg-white/10">
            See how it works
          </Link>
        </div>

        <div className="w-full max-w-sm justify-self-start rounded-2xl bg-white p-5 shadow-lg md:justify-self-end">
          <p className="text-sm font-semibold text-ananta-text-secondary">
            New idea
          </p>
          <p className="mt-2 text-lg font-bold leading-snug text-ananta-text">
            &ldquo;State hoisting finally clicked when I stopped thinking of
            it as boilerplate.&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-ananta-border pt-4">
            <span className="text-xs font-semibold text-ananta-text-secondary">
              Captured 2 min ago
            </span>
            <span className="rounded-full bg-ananta-cream px-3 py-1 text-xs font-bold text-ananta-blue">
              jetpack-compose
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
