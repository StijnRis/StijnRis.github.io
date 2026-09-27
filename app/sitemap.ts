import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getPosts();
    const pages = ["", "/about", "/projects", "/contact", ...(posts.length ? ["/blog", ...posts.map((p) => `/blog/${p.slug}`)] : [])];
    return pages.map((p) => ({
        url: `${site.url}${p}`,
        lastModified: new Date(),
    }));
}
