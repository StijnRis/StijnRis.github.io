import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHeader, Section } from "@/components/ui";
import { linkedin, socialLinks } from "@/lib/github-data";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
    return (
        <>
            <PageHeader eyebrow="Contact" title="Let's build something together">
                Hiring, collaborating, or putting together a hackathon team? Send me a message and I&apos;ll get back to you soon.
            </PageHeader>

            <Section className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
                <div className="space-y-4">
                    {socialLinks.map((c) => (
                        <a
                            key={c.href}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-2xl border border-line bg-surface p-5 transition hover:border-line-strong"
                        >
                            <span>
                                <span className="block font-mono text-xs uppercase tracking-widest text-subtle">{c.label}</span>
                                <span className="mt-1 block text-fg">{c.value}</span>
                            </span>
                            <span className="text-subtle">↗</span>
                        </a>
                    ))}
                    <div className="rounded-2xl border border-line p-5 text-sm text-muted">
                        <span className="block font-mono text-xs uppercase tracking-widest text-subtle">Location</span>
                        <span className="mt-1 block text-fg">{site.location}</span>
                        <span className="block">{site.timezone}</span>
                    </div>
                </div>
                {site.formEndpoint ? (
                    <ContactForm endpoint={site.formEndpoint} />
                ) : linkedin ? (
                    <div className="flex flex-col justify-center rounded-3xl border border-line bg-surface p-8">
                        <h2 className="text-2xl font-semibold text-fg">The fastest way to reach me</h2>
                        <p className="mt-3 text-muted">Send me a message on LinkedIn and I&apos;ll get back to you.</p>
                        <a
                            href={linkedin.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 self-start rounded-full bg-fg px-6 py-2.5 text-sm font-medium text-bg transition hover:opacity-85"
                        >
                            Message me on LinkedIn ↗
                        </a>
                    </div>
                ) : null}
            </Section>
        </>
    );
}
