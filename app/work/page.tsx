import type { Metadata } from "next";
import RepoGrid from "@/components/RepoGrid";
import { Eyebrow, PageHeader, Section } from "@/components/ui";
import { getRepo, github } from "@/lib/github";
import { caseStudies } from "@/lib/site";

export const metadata: Metadata = { title: "Work" };

const scoreParts = [
    ["Effort", "20%", "my commit count (log scale)"],
    ["Polish", "20%", "description, live demo, README image, topics"],
    ["Recency", "15%", "time since my last commit"],
    ["Popularity", "13%", "stars and forks"],
    ["Ownership", "12%", "share of commits and lines changed by me"],
    ["Duration", "10%", "time between my first and last commit"],
    ["Consistency", "10%", "number of weeks I committed"],
];

export default function Work() {
    return (
        <>
            <PageHeader eyebrow="Work" title="Case studies & everything I've built">
                A selection of projects with the problem, my role, the approach and the result. Below that, every public repository, ranked automatically.
            </PageHeader>

            <Section className="space-y-6">
                {caseStudies.map((c, i) => {
                    const repo = c.repo ? getRepo(c.repo) : undefined;
                    return (
                        <article key={c.title} className="grid overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 md:grid-cols-[1fr_1.4fr]">
                            <div className="flex flex-col justify-between gap-6 border-b border-white/10 p-8 md:border-b-0 md:border-r">
                                <div>
                                    <div className="font-mono text-xs text-zinc-600">0{i + 1}</div>
                                    <h2 className="mt-2 text-2xl font-semibold text-white">{c.title}</h2>
                                    <p className="mt-1 text-sm text-zinc-400">
                                        {c.event} · {c.date}
                                    </p>
                                    <p className="mt-4 inline-block rounded-full bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-300">{c.result}</p>
                                </div>
                                <div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {c.stack.map((s) => (
                                            <span key={s} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-zinc-400">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                    {repo && (
                                        <div className="mt-4 flex gap-4 text-sm">
                                            <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white">
                                                Code ↗
                                            </a>
                                            {repo.homepage && (
                                                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white">
                                                    Live demo ↗
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <dl className="grid gap-5 p-8 text-sm sm:grid-cols-2">
                                {[
                                    ["Problem", c.problem],
                                    ["My role", c.role],
                                    ["Approach", c.solution],
                                    ["Result", c.result],
                                ].map(([k, v]) => (
                                    <div key={k}>
                                        <dt className="font-mono text-xs uppercase tracking-widest text-zinc-500">{k}</dt>
                                        <dd className="mt-1.5 leading-relaxed text-zinc-300">{v}</dd>
                                    </div>
                                ))}
                            </dl>
                        </article>
                    );
                })}
            </Section>

            <Section className="pt-24">
                <div id="repositories" className="mb-8 scroll-mt-24">
                    <Eyebrow>All repositories</Eyebrow>
                    <h2 className="text-3xl font-semibold tracking-tight text-white">{github.totals.repos} public projects, ranked</h2>
                    <details className="mt-3 max-w-2xl text-sm text-zinc-500">
                        <summary className="cursor-pointer hover:text-zinc-300">How is the score calculated?</summary>
                        <p className="mt-3">
                            Every day a GitHub Action fetches all my public repositories and computes a score out of 100 from these parts (hover over a
                            score to see its breakdown):
                        </p>
                        <table className="mt-3 w-full text-left">
                            <tbody>
                                {scoreParts.map(([name, weight, desc]) => (
                                    <tr key={name} className="border-t border-white/5">
                                        <td className="py-1.5 pr-4 text-zinc-300">{name}</td>
                                        <td className="py-1.5 pr-4 font-mono">{weight}</td>
                                        <td className="py-1.5">{desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-3">Award-winning hackathon projects get a small bonus, and tutorials get a penalty.</p>
                    </details>
                </div>
                <RepoGrid repos={github.repos} />
            </Section>
        </>
    );
}
