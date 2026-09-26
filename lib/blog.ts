import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Post = { slug: string; title: string; date: string; description: string; html: string };

// Minimal frontmatter parser for `key: value` lines between --- fences.
function parse(file: string): { meta: Record<string, string>; body: string } {
    const match = file.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { meta: {}, body: file };
    const meta: Record<string, string> = {};
    for (const line of match[1].split(/\r?\n/)) {
        const i = line.indexOf(":");
        if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
    return { meta, body: match[2] };
}

export function getPosts(): Post[] {
    if (!existsSync(BLOG_DIR)) return [];
    return readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
        .map((f) => {
            const { meta, body } = parse(readFileSync(path.join(BLOG_DIR, f), "utf8"));
            return {
                slug: f.replace(/\.md$/, ""),
                title: meta.title || f.replace(/\.md$/, ""),
                date: meta.date || "",
                description: meta.description || "",
                draft: meta.draft === "true",
                html: marked.parse(body, { async: false }),
            };
        })
        .filter((p) => !p.draft)
        .map(({ draft: _draft, ...post }) => post)
        .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
    return getPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
    const d = new Date(date);
    return isNaN(d.getTime()) ? date : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
