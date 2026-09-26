# stijnris.github.io

Personal website of Stijn Risseeuw: a static Next.js site hosted on GitHub Pages.

## How it works

- `scripts/fetch-github-data.mjs` fetches all public repos of `StijnRis`, computes stats per repo
  (share of commits and lines changed by me, stars, number of days worked on, recency) plus a
  score from 0 to 100, and writes `data/github.json`.
- `data/repo-overrides.json` lets you hide repos, add score boosts or penalties, show awards and override descriptions.
- `lib/site.ts` holds the hand-written content (bio, case studies, notes, experience).
- `.github/workflows/deploy.yml` fetches fresh data and deploys on every push to `main` and once a day.

## Development

```bash
pnpm install
GITHUB_TOKEN=$(gh auth token) pnpm fetch-data   # optional: refresh data/github.json
pnpm dev
```

Add `public/photo.jpg` and/or `public/cv.pdf` and the About page will pick them up automatically.
