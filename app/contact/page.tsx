import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHeader, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

const channels = [
    { label: "LinkedIn", value: "in/stijn-risseeuw", href: site.links.linkedin },
    { label: "GitHub", value: "@StijnRis", href: site.links.github },
];

export default function Contact() {
    return (
        <>
            <PageHeader eyebrow="Contact" title="Let's build something together">
                Hiring, collaborating, or putting together a hackathon team? Send me a message and I&apos;ll get back to you soon.
            </PageHeader>

            <Section className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
                <div className="space-y-4">
                    {channels.map((c) => (
                        <a
                            key={c.label}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/50 p-5 transition hover:border-white/30"
                        >
                            <span>
                                <span className="block font-mono text-xs uppercase tracking-widest text-zinc-500">{c.label}</span>
                                <span className="mt-1 block text-white">{c.value}</span>
                            </span>
                            <span className="text-zinc-500">↗</span>
                        </a>
                    ))}
                    <div className="rounded-2xl border border-white/10 p-5 text-sm text-zinc-400">
                        <span className="block font-mono text-xs uppercase tracking-widest text-zinc-500">Location</span>
                        <span className="mt-1 block text-white">{site.location}</span>
                        <span className="block">{site.timezone}</span>
                    </div>
                </div>
                {site.formEndpoint ? (
                    <ContactForm endpoint={site.formEndpoint} />
                ) : (
                    <div className="flex flex-col justify-center rounded-3xl border border-white/10 bg-zinc-950 p-8">
                        <h2 className="text-2xl font-semibold text-white">The fastest way to reach me</h2>
                        <p className="mt-3 text-zinc-400">Send me a message on LinkedIn and I&apos;ll get back to you.</p>
                        <a
                            href={site.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 self-start rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-amber-300"
                        >
                            Message me on LinkedIn ↗
                        </a>
                    </div>
                )}
            </Section>
        </>
    );
}
