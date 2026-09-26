# Blog posts

Every `.md` file in this folder (except this README) becomes a post at `/blog/<file-name>/`.
Start each file with frontmatter:

```md
---
title: What I learned at my first CTF
date: 2026-10-01
description: One-line summary shown in the post list.
draft: false
---

Your post in **markdown**.
```

Posts with `draft: true` are not published. The Blog link appears in the navigation once there is at least one post.
