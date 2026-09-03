# Ananta Blog

The public site for [blogs.theananta.in](https://blogs.theananta.in) - Next.js
(App Router, TypeScript, Tailwind). This is the sibling of the `ananta_ideas`
Flutter app; posts are written and published from there, not from this repo.

## Content pipeline

Posts are **not** fetched from Supabase at request or build time. Instead:

1. In the Ananta Ideas app, a publisher flips a post's status to
   `published`.
2. The app calls the Supabase `publish-post` Edge Function
   (`ananta_ideas/supabase/functions/publish-post/index.ts`).
3. The function reads the post row from Postgres and commits
   `content/posts/<slug>.json` to this repo via the GitHub Contents API,
   on the branch configured by `GITHUB_BRANCH` (see that repo's
   `supabase/.env.example`).
4. Vercel's git integration sees the push and redeploys automatically -
   `generateStaticParams` in `app/blog/[slug]/page.tsx` picks up the new
   file on the next build. Unpublishing deletes the file the same way,
   which 404s the route once redeployed.

Each JSON file matches the `Post` shape in `lib/posts.ts`:

```json
{
  "slug": "my-post",
  "title": "My Post",
  "excerpt": "One-line summary",
  "coverImageUrl": "https://...",
  "tags": ["tag-one", "tag-two"],
  "authorName": "Jane Doe",
  "publishedAt": "2026-08-25T09:00:00.000Z",
  "bodyMarkdown": "# Markdown body..."
}
```

Four sample posts ship in `content/posts/` (placeholder `picsum.photos`
covers) so `npm run dev` renders something immediately without touching
Supabase or GitHub.

## Pages

- `/` - minimal landing page linking to `/blog`.
- `/blog` - index of all posts (grid of cards).
- `/blog/[slug]` - full article: hero cover image, title, author/date/
  read-time meta line, Markdown body rendered with `@tailwindcss/typography`
  prose styling. Styled to an editorial quality bar (generous whitespace,
  large hero, readable measure) inspired by long-form blog layouts like
  Headspace's blog - not copying their branding or content, just the layout
  quality bar.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Real deploy (not done here - no credentials exist yet)

1. Push this repo to GitHub.
2. Import it into Vercel; point the production domain at
   `blogs.theananta.in`.
3. In the Ananta Ideas app's Supabase project, set the `publish-post`
   function's secrets (`GITHUB_TOKEN`, `GITHUB_REPO` as `owner/ananta-blog`,
   `GITHUB_BRANCH`) so it can commit here.
4. From then on, publishing in the app commits directly to this repo and
   Vercel redeploys on every push - no manual step on the site side.
