import Link from "next/link";

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <section className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</section>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
    return <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-amber-400">{children}</p>;
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
    return (
        <Section className="pb-12 pt-20">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
            {children && <div className="mt-5 max-w-2xl text-lg text-zinc-400">{children}</div>}
        </Section>
    );
}

export function Button({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
    const external = href.startsWith("http");
    const className =
        variant === "primary"
            ? "inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-amber-300"
            : "inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40";
    if (external) {
        return (
            <a href={href} className={className} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    }
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}
