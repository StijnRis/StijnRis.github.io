import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Post = { slug: string; title: string; date: string; description: string; html: string };

// YAML parses `date: 2026-09-26` as a Date; normalise to YYYY-MM-DD.
function toDateString(value: unknown): string {
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return value ? String(value) : "";
}

export function getPosts(): Post[] {
    if (!existsSync(BLOG_DIR)) return [];
    return readdirSync(BLOG_DIR)
        .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
        .map((f) => ({ slug: f.replace(/\.md$/, ""), ...matter(readFileSync(path.join(BLOG_DIR, f), "utf8")) }))
        .filter(({ data }) => data.draft !== true)
        .map(({ slug, data, content }) => ({
            slug,
            title: data.title ?? slug,
            date: toDateString(data.date),
            description: data.description ?? "",
            html: marked.parse(content, { async: false }),
        }))
        .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
    return getPosts().find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
    const d = new Date(date);
    return isNaN(d.getTime()) ? date : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
