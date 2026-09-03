"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollProgressBar from "./ScrollProgressBar";
import { useHeaderBreadcrumb } from "./HeaderBreadcrumbContext";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { items: breadcrumbItems } = useHeaderBreadcrumb();
  const pathname = usePathname();
  // Only individual post pages (/blog/<slug>) get the reading-progress bar —
  // not the /blog index or any other page.
  const isBlogPostPage = /^\/blog\/[^/]+$/.test(pathname);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 bg-white transition-shadow ${scrolled
        ? "shadow-[0_5px_10px_rgba(0,0,0,0.07)]"
        : "border-b border-ananta-border"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[1.7rem] font-medium tracking-tight text-ananta-text"
        >
          <Image
            src="/ananta-logomark.svg"
            alt=""
            width={32}
            height={32}
            priority
          />
          ananta
        </Link>

        {scrolled && breadcrumbItems.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="ml-10 hidden flex-1 items-center gap-1.5 overflow-hidden text-base text-ananta-text-secondary md:flex"
          >
            {breadcrumbItems.map((item, i) => (
              <span key={i} className="flex shrink-0 items-center gap-1.5 last:min-w-0 last:shrink">
                {i > 0 && <span aria-hidden>-</span>}
                <Link
                  href={item.href ?? pathname}
                  className={`truncate hover:text-ananta-text hover:opacity-100 ${
                    i === breadcrumbItems.length - 1
                      ? "text-ananta-text"
                      : "opacity-60"
                  }`}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <nav className="ml-auto flex items-center gap-6 text-sm font-medium text-ananta-text-secondary">
          <Link href="/" className="hover:text-ananta-text">
            Home
          </Link>
          <Link href="/blog" className="hover:text-ananta-text">
            Blog
          </Link>
        </nav>
      </div>
      {isBlogPostPage && <ScrollProgressBar />}
    </header>
  );
}
