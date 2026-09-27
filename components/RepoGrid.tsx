"use client";

import { useMemo, useState } from "react";
import RepoCard from "@/components/RepoCard";
import { languageBreakdown, type Repo } from "@/lib/github";

const sorts = {
    relevance: { label: "Relevance", fn: (a: Repo, b: Repo) => b.relevance - a.relevance },
    recent: { label: "Recent", fn: (a: Repo, b: Repo) => Date.parse(b.lastActivity) - Date.parse(a.lastActivity) },
    stars: { label: "Stars", fn: (a: Repo, b: Repo) => b.stars - a.stars || b.relevance - a.relevance },
};

type SortKey = keyof typeof sorts;

const repoLanguages = (r: Repo) => languageBreakdown(r).map((l) => l.name).filter((l) => l !== "Other");

export default function RepoGrid({ repos }: { repos: Repo[] }) {
    const [sort, setSort] = useState<SortKey>("relevance");
    const [language, setLanguage] = useState<string>("");

    const languages = useMemo(() => {
        const counts = new Map<string, number>();
        for (const r of repos) for (const l of repoLanguages(r)) counts.set(l, (counts.get(l) ?? 0) + 1);
        return [...counts.entries()].sort((a, b) => b[1] - a[1]);
    }, [repos]);

    const shown = useMemo(
        () => repos.filter((r) => !language || repoLanguages(r).includes(language)).sort(sorts[sort].fn),
        [repos, sort, language]
    );

    const pill = (active: boolean) =>
        `whitespace-nowrap rounded-full px-3 py-1 text-sm transition ${active ? "bg-white text-black" : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"}`;

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex items-center gap-2 text-sm text-zinc-500">
                    Language
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="rounded-full border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-200 focus:border-amber-400/60 focus:outline-none"
                    >
                        <option value="">All languages ({repos.length})</option>
                        {languages.map(([l, count]) => (
                            <option key={l} value={l}>
                                {l} ({count})
                            </option>
                        ))}
                    </select>
                </label>
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
                    <RepoCard key={r.fullName} repo={r} />
                ))}
            </div>
        </div>
    );
}
