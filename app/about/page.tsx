import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Button, Eyebrow, Section } from "@/components/ui";
import { github } from "@/lib/github-data";
import { education, experience, site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

// Drop a photo.jpg or cv.pdf into /public and they show up automatically.
const hasPhoto = existsSync(path.join(process.cwd(), "public", "photo.jpg"));
const hasCv = existsSync(path.join(process.cwd(), "public", "cv.pdf"));

const values = [
    { title: "Learn by doing", text: "The fastest way to understand a system is to build or break it. Hackathons and CTFs are my favourite way to do that." },
    { title: "Scope ruthlessly", text: "Find the core of the problem first, build it properly, and mock the rest until it matters." },
    { title: "Explain it simply", text: "Teaching hundreds of students taught me that if I can't explain it, I don't understand it yet." },
];

const interests = ["Hackathons", "Capture the Flag (CTF) competitions", "Teaching & mentoring", "AI in education", "Economics", "Side projects that save me time"];

export default function About() {
    return (
        <>
            <Section className="grid gap-12 pb-16 pt-20 md:grid-cols-[280px_1fr]">
                <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={hasPhoto ? "/photo.jpg" : github.profile.avatarUrl}
                        alt={`Photo of ${site.name}`}
                        className="aspect-square w-full rounded-3xl border border-white/10 object-cover"
                    />
                    <div className="mt-6 flex flex-col gap-3">
                        {hasCv && (
                            <Button href="/cv.pdf">Download CV ↓</Button>
                        )}
                        <Button href={site.links.linkedin} variant={hasCv ? "ghost" : "primary"}>
                            Full profile on LinkedIn ↗
                        </Button>
                    </div>
                </div>

                <div>
                    <Eyebrow>About me</Eyebrow>
                    <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Curious, competitive and happiest when solving hard problems.</h1>
                    <div className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-400">
                        <p>
                            I&apos;m Stijn, a Computer Science &amp; Engineering honours graduate from TU Delft (9.37/10, summa cum laude), where I now work as a
                            Research Assistant. I also spent a semester studying economics at the University of Queensland.
                        </p>
                        <p>
                            I like working across the whole stack. At ASOF I built a client portal from start to finish, from data syncing to CI/CD. For my honours
                            research I built a VS Code extension to study how students learn with LLMs, and published the dataset. On weekends you&apos;ll often find
                            me at a hackathon: in 2026 I finished on the podium at bunq, AISO x Prosus and RouteStack.ai.
                        </p>
                        <p>
                            Teaching is the other half of what I do. As a TA, student ambassador, mentor and educator, I&apos;ve helped hundreds of students
                            understand the material by asking the right questions, not by giving answers.
                        </p>
                    </div>
                </div>
            </Section>

            <Section className="pb-16">
                <Eyebrow>How I work</Eyebrow>
                <div className="grid gap-6 md:grid-cols-3">
                    {values.map((v) => (
                        <div key={v.title} className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
                            <h3 className="font-semibold text-white">{v.title}</h3>
                            <p className="mt-2 text-sm text-zinc-400">{v.text}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="grid gap-12 pb-16 md:grid-cols-2">
                <div>
                    <Eyebrow>Experience</Eyebrow>
                    <ol className="space-y-5 border-l border-white/10 pl-6">
                        {experience.map((e) => (
                            <li key={e.title + e.org} className="relative">
                                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400" />
                                <div className="font-medium text-white">{e.title}</div>
                                <div className="text-sm text-zinc-400">{e.org}</div>
                                <div className="font-mono text-xs text-zinc-600">{e.period}</div>
                            </li>
                        ))}
                    </ol>
                </div>
                <div>
                    <Eyebrow>Education</Eyebrow>
                    <ol className="space-y-5 border-l border-white/10 pl-6">
                        {education.map((e) => (
                            <li key={e.title} className="relative">
                                <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-sky-400" />
                                <div className="font-medium text-white">{e.title}</div>
                                <div className="text-sm text-zinc-400">{e.org}</div>
                                <div className="text-sm text-zinc-500">{e.note}</div>
                                <div className="font-mono text-xs text-zinc-600">{e.period}</div>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-12">
                        <Eyebrow>Outside of work</Eyebrow>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((i) => (
                                <span key={i} className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-300">
                                    {i}
                                </span>
                            ))}
                        </div>
                        <p className="mt-4 text-sm text-zinc-500">Languages: Dutch (native) and English (full professional).</p>
                    </div>
                </div>
            </Section>
        </>
    );
}
