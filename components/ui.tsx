import Link from "next/link";
import { organisations, type OrganisationKey, type TimelineItem } from "@/lib/site";

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <section className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</section>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
    return <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{children}</p>;
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
    return (
        <Section className="pb-12 pt-20">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{title}</h1>
            {children && <div className="mt-5 max-w-2xl text-lg text-muted">{children}</div>}
        </Section>
    );
}

export function Button({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
    const external = href.startsWith("http");
    const className =
        variant === "primary"
            ? "inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition hover:opacity-85"
            : "inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-fg transition hover:bg-surface-muted";
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

// Logos sit on a white tile so they read well in both themes.
export function OrgLogo({ org, size = "md" }: { org: OrganisationKey; size?: "sm" | "md" }) {
    const o = organisations[org];
    const box = size === "sm" ? "h-8 w-8 p-1" : "h-11 w-11 p-1.5";
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={o.logo} alt={`${o.name} logo`} width={44} height={44} className={`${box} shrink-0 rounded-lg border border-line bg-white object-contain`} />
    );
}

export function Timeline({ items }: { items: TimelineItem[] }) {
    return (
        <ol className="space-y-6">
            {items.map((item) => {
                const org = organisations[item.org];
                return (
                    <li key={item.title + item.org} className="flex gap-4">
                        <a href={org.url} target="_blank" rel="noopener noreferrer" title={org.name} className="shrink-0">
                            <OrgLogo org={item.org} />
                        </a>
                        <div>
                            <div className="font-medium text-fg">{item.title}</div>
                            <a href={org.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-fg hover:underline">
                                {org.name}
                            </a>
                            {item.detail && <div className="text-sm text-subtle">{item.detail}</div>}
                            <div className="mt-0.5 font-mono text-xs text-subtle">{item.period}</div>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}
