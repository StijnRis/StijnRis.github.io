import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/ui";
import { formatDate, getPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Blog" };

export default function Blog() {
    const posts = getPosts();

    return (
        <>
            <PageHeader eyebrow="Blog" title="Writing">
                Thoughts on building software, hackathons, security and AI.
            </PageHeader>

            <Section className="max-w-3xl">
                {posts.length === 0 ? (
                    <p className="text-zinc-500">No posts yet. Check back soon.</p>
                ) : (
                    <ul className="space-y-8">
                        {posts.map((p) => (
                            <li key={p.slug} className="border-l border-white/10 pl-6">
                                <time className="font-mono text-xs text-zinc-600">{formatDate(p.date)}</time>
                                <h2 className="mt-1 text-xl font-semibold text-white">
                                    <Link href={`/blog/${p.slug}/`} className="hover:underline">
                                        {p.title}
                                    </Link>
                                </h2>
                                {p.description && <p className="mt-2 text-zinc-400">{p.description}</p>}
                            </li>
                        ))}
                    </ul>
                )}
            </Section>
        </>
    );
}
