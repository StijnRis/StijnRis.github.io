"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const allItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

// The Blog link is hidden until there is at least one post.
export default function Nav({ showBlog }: { showBlog: boolean }) {
    const pathname = usePathname();
    const items = allItems.filter((i) => showBlog || i.href !== "/blog");
    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

    return (
        <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-lg">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-fg">
                    stijn<span className="text-accent">.</span>risseeuw
                </Link>
                <div className="flex items-center gap-1">
                    <ul className="flex gap-1 text-sm">
                        {items.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`rounded-full px-2 py-1.5 transition sm:px-3 ${
                                        isActive(item.href) ? "bg-surface-muted text-fg" : "text-muted hover:text-fg"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    );
}
