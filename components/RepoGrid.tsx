"use client";

import { useMemo, useState } from "react";
import RepoCard from "@/components/RepoCard";
import { languageBreakdown, type Repo } from "@/lib/github";

const sorts = {
    score: { label: "Score", fn: (a: Repo, b: Repo) => b.score - a.score },
    recent: { label: "Recent", fn: (a: Repo, b: Repo) => Date.parse(b.lastActivity) - Date.parse(a.lastActivity) },
    stars: { label: "Stars", fn: (a: Repo, b: Repo) => b.stars - a.stars || b.score - a.score },
    commits: { label: "My commits", fn: (a: Repo, b: Repo) => b.stats.myCommits - a.stats.myCommits },
};

type SortKey = keyof typeof sorts;

const repoLanguages = (r: Repo) => languageBreakdown(r).map((l) => l.name).filter((l) => l !== "Other");

export default function RepoGrid({ repos }: { repos: Repo[] }) {
    const [sort, setSort] = useState<SortKey>("score");
    const [language, setLanguage] = useState<string>("All");

    const languages = useMemo(() => {
        const counts = new Map<string, number>();
        for (const r of repos) for (const l of repoLanguages(r)) counts.set(l, (counts.get(l) ?? 0) + 1);
        return ["All", ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([l]) => l)];
    }, [repos]);

    const shown = useMemo(
        () => repos.filter((r) => language === "All" || repoLanguages(r).includes(language)).sort(sorts[sort].fn),
        [repos, sort, language]
    );

    const pill = (active: boolean) =>
        `whitespace-nowrap rounded-full px-3 py-1 text-sm transition ${active ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"}`;

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    {languages.map((l) => (
                        <button key={l} onClick={() => setLanguage(l)} className={pill(language === l)}>
                            {l}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                    Sort
                    {(Object.keys(sorts) as SortKey[]).map((k) => (
                        <button key={k} onClick={() => setSort(k)} className={pill(sort === k)}>
                            {sorts[k].label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((r) => (
                    <RepoCard key={r.name} repo={r} />
                ))}
            </div>
        </div>
    );
}
