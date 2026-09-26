"use client";

import { useMemo, useState } from "react";
import RepoCard from "@/components/RepoCard";
import type { Repo } from "@/lib/github";

const sorts = {
    score: { label: "Score", fn: (a: Repo, b: Repo) => b.score - a.score },
    recent: { label: "Recent", fn: (a: Repo, b: Repo) => Date.parse(b.lastActivity) - Date.parse(a.lastActivity) },
    stars: { label: "Stars", fn: (a: Repo, b: Repo) => b.stars - a.stars || b.score - a.score },
    commits: { label: "My commits", fn: (a: Repo, b: Repo) => b.stats.myCommits - a.stats.myCommits },
};

type SortKey = keyof typeof sorts;

export default function RepoGrid({ repos }: { repos: Repo[] }) {
    const [sort, setSort] = useState<SortKey>("score");
    const [language, setLanguage] = useState<string>("All");

    const languages = useMemo(() => {
        const counts = new Map<string, number>();
        for (const r of repos) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
        return ["All", ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([l]) => l)];
    }, [repos]);

    // Rank is always by score, whatever the current sort order.
    const rankOf = useMemo(() => new Map([...repos].sort(sorts.score.fn).map((r, i) => [r.name, i + 1])), [repos]);

    const shown = useMemo(
        () => repos.filter((r) => language === "All" || r.language === language).sort(sorts[sort].fn),
        [repos, sort, language]
    );

    const pill = (active: boolean) =>
        `rounded-full px-3 py-1 text-sm transition ${active ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"}`;

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
                    <RepoCard key={r.name} repo={r} rank={rankOf.get(r.name)} />
                ))}
            </div>
        </div>
    );
}
