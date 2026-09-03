"use client";

import { useState } from "react";

/** Circular dark share icon buttons: Facebook, X/Twitter, and copy-link. */
export default function ArticleShare({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — nothing more we can do here.
    }
  }

  return (
    <div className="flex flex-row items-center gap-2 lg:flex-col">
      <a
        href={facebookHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        title={title}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-ananta-text text-white transition-opacity hover:opacity-80"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            fill="currentColor"
            d="M13.544 22.018H9.37V12H7.325V8.544h2.07v-2.07c0-2.822 1.17-4.492 4.492-4.492h2.763v3.456h-1.72c-1.294 0-1.377.485-1.377 1.386v1.72h3.122L16.308 12h-2.764v10.018z"
          />
        </svg>
      </a>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="flex h-7 w-7 items-center justify-center rounded-full bg-ananta-text text-white transition-opacity hover:opacity-80"
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path
            fill="currentColor"
            d="M8.332 5.928L13.544 0h-1.235L7.783 5.147 4.17 0H0l5.466 7.784L0 14h1.235l4.78-5.436L9.83 14H14L8.332 5.928zM6.64 7.852l-.554-.775L1.68.91h1.897l3.556 4.977.554.775 4.622 6.47h-1.897L6.64 7.852z"
          />
        </svg>
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        title={copied ? "Copied!" : "Copy link"}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-ananta-text text-white transition-opacity hover:opacity-80"
      >
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
          <path
            fill="currentColor"
            d="M13 5h-2.4c-.44 0-.8.36-.8.8 0 .44.36.8.8.8H13c1.32 0 2.4 1.08 2.4 2.4 0 1.32-1.08 2.4-2.4 2.4h-2.4c-.44 0-.8.36-.8.8 0 .44.36.8.8.8H13c2.208 0 4-1.792 4-4s-1.792-4-4-4zM5.8 9c0 .44.36.8.8.8h4.8c.44 0 .8-.36.8-.8 0-.44-.36-.8-.8-.8H6.6c-.44 0-.8.36-.8.8zm1.6 2.4H5c-1.32 0-2.4-1.08-2.4-2.4 0-1.32 1.08-2.4 2.4-2.4h2.4c.44 0 .8-.36.8-.8 0-.44-.36-.8-.8-.8H5C2.792 5 1 6.792 1 9s1.792 4 4 4h2.4c.44 0 .8-.36.8-.8 0-.44-.36-.8-.8-.8z"
          />
        </svg>
      </button>
    </div>
  );
}
