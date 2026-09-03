import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-20 text-center">
      <h1 className="text-5xl font-bold tracking-[-0.04em] text-ananta-text-title sm:text-6xl">
        Ananta
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ananta-text-body sm:text-xl">
        Ideas, captured and compiled into writing.
      </p>
      <Link href="/blog" className="btn-pill btn-pill-primary mt-10">
        Read the blog
      </Link>
    </main>
  );
}
