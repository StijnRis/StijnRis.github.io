import type { Metadata } from "next";
import RepoGrid from "@/components/RepoGrid";
import { PageHeader, Section } from "@/components/ui";
import { github } from "@/lib/github-data";

export const metadata: Metadata = { title: "Work" };

const scoreParts = [
    ["Effort", "20%", "number of commits by me (log scale)"],
    ["Duration", "20%", "number of days I committed to it"],
    ["Polish", "20%", "description, live demo, README image, topics"],
    ["Recency", "15%", "time since my last commit"],
    ["Popularity", "13%", "stars and forks"],
    ["Ownership", "12%", "share of commits and lines changed by me"],
];

export default function Work() {
    return (
        <>
            <PageHeader eyebrow="Work" title={`${github.totals.repos} projects, ranked`}>
                Every public repository on my GitHub, refreshed daily and ranked by how much work went into it.
            </PageHeader>

            <Section>
                <details className="mb-8 max-w-2xl text-sm text-zinc-500">
                    <summary className="cursor-pointer hover:text-zinc-300">How is the score calculated?</summary>
                    <p className="mt-3">Each project gets a score out of 100 from these parts (hover over a score to see its breakdown):</p>
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
                    <p className="mt-3">
                        Projects that mention &ldquo;hackathon&rdquo; get 10 bonus points; tutorials lose 20.
                    </p>
                </details>
                <RepoGrid repos={github.repos} />
            </Section>
        </>
    );
}
