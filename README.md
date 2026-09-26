# stijnris.github.io

Personal website of Stijn Risseeuw: a static Next.js site hosted on GitHub Pages.

## How it works

- `scripts/fetch-github-data.mjs` fetches all public repos of `StijnRis` at build time and writes
  `data/github.json` (not committed). Per repo it collects the GitHub description, topics, languages,
  README image and contribution stats, and computes a score from 0 to 100. Repos that mention
  "hackathon" get +10, tutorials get −20.
- To change how a project shows up, edit the repo on GitHub (description, topics, website, README image).
- `content/blog/*.md` are blog posts (see `content/blog/README.md`). The Blog link appears once there is a post.
- `lib/site.ts` holds the little hand-written content (bio links, experience, education).
- `.github/workflows/deploy.yml` builds and deploys on every push to `main` and once a day.

## Development

```bash
pnpm install
GITHUB_TOKEN=$(gh auth token) pnpm fetch-data   # needed once before `pnpm dev`
pnpm dev
```

`pnpm build` fetches fresh data and builds the static site into `out/`.
Add `public/photo.jpg` and/or `public/cv.pdf` and the About page will pick them up automatically.
