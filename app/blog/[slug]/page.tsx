import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui";
import { formatDate, getPost, getPosts } from "@/lib/blog";

// Static export needs at least one path, so a placeholder is generated while
// there are no posts; it renders the 404 page.
const PLACEHOLDER = "_";

export const dynamicParams = false;

export function generateStaticParams() {
    const posts = getPosts();
    return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const post = getPost((await params).slug);
    return post ? { title: post.title, description: post.description } : {};
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const post = getPost((await params).slug);
    if (!post) notFound();

    return (
        <Section className="max-w-3xl pt-20">
            <Link href="/blog/" className="text-sm text-subtle hover:text-fg">
                ← All posts
            </Link>
            <time className="mt-8 block font-mono text-xs text-subtle">{formatDate(post.date)}</time>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-fg">{post.title}</h1>
            <article className="prose prose-zinc dark:prose-invert mt-10 max-w-none prose-a:text-accent prose-pre:border prose-pre:border-line" dangerouslySetInnerHTML={{ __html: post.html }} />
        </Section>
    );
}
