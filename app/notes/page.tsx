import type { Metadata } from "next";
import { Button, PageHeader, Section } from "@/components/ui";
import { notes, site } from "@/lib/site";

export const metadata: Metadata = { title: "Notes" };

export default function Notes() {
    return (
        <>
            <PageHeader eyebrow="Notes" title="Lessons from building under pressure">
                Short takeaways from hackathons, CTFs and projects. Longer write-ups live on LinkedIn.
            </PageHeader>

            <Section className="max-w-3xl space-y-10">
                {notes.map((n) => (
                    <article key={n.title} className="border-l border-white/10 pl-6">
                        <time className="font-mono text-xs text-zinc-600">{n.date}</time>
                        <h2 className="mt-1 text-xl font-semibold text-white">{n.title}</h2>
                        <ul className="mt-3 space-y-2 text-zinc-400">
                            {n.takeaways.map((t) => (
                                <li key={t} className="flex gap-3">
                                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
                <div className="pt-4">
                    <Button href={site.links.linkedinActivity} variant="ghost">
                        Read the full posts on LinkedIn ↗
                    </Button>
                </div>
            </Section>
        </>
    );
}
