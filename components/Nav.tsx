"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/work", label: "Work" },
    { href: "/notes", label: "Notes" },
    { href: "/contact", label: "Contact" },
];

export default function Nav() {
    const pathname = usePathname();
    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-lg">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="font-mono text-sm font-semibold tracking-tight text-white">
                    stijn<span className="text-amber-400">.</span>risseeuw
                </Link>
                <ul className="flex gap-1 text-sm">
                    {items.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`rounded-full px-2 py-1.5 transition sm:px-3 ${
                                    isActive(item.href) ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
                                }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
