import { formatDuration, formatNumber, languageColors, prettyName, type Repo } from "@/lib/github";

function Placeholder({ repo }: { repo: Repo }) {
    const color = languageColors[repo.language ?? ""] ?? "#8b5cf6";
    const initials = prettyName(repo.name)
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("");
    return (
        <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `radial-gradient(circle at 30% 20%, ${color}55, transparent 60%), linear-gradient(135deg, #18181b, #0b0b0f)` }}
        >
            <span className="font-mono text-4xl font-bold tracking-tight text-white/80">{initials}</span>
        </div>
    );
}

function Stat({ label, value, title }: { label: string; value: string; title?: string }) {
    return (
        <div title={title}>
            <div className="text-sm font-semibold text-zinc-100">{value}</div>
            <div className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</div>
        </div>
    );
}

export default function RepoCard({ repo, rank }: { repo: Repo; rank?: number }) {
    const description = repo.description ?? repo.readmeSummary;
    const s = repo.stats;
    const breakdown = Object.entries(repo.scoreComponents)
        .map(([k, v]) => `${k}: ${Math.round(v * 100)}%`)
        .join("\n");

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition hover:-translate-y-0.5 hover:border-white/25">
            <a href={repo.homepage || repo.url} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/9] overflow-hidden bg-zinc-950">
                {repo.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={repo.image} alt="" loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
                ) : (
                    <Placeholder repo={repo} />
                )}
                {rank !== undefined && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-xs text-zinc-200 backdrop-blur">#{rank}</span>
                )}
                <span
                    className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 font-mono text-xs text-amber-300 backdrop-blur"
                    title={`Score breakdown\n${breakdown}`}
                >
                    {repo.score.toFixed(0)} pts
                </span>
            </a>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                    {repo.award && <div className="mb-1 text-xs font-medium text-amber-300">🏆 {repo.award}</div>}
                    <h3 className="text-lg font-semibold text-white">
                        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {prettyName(repo.name)}
                        </a>
                    </h3>
                    {description && <p className="mt-1 line-clamp-3 text-sm text-zinc-400">{description}</p>}
                </div>

                <div className="mt-auto grid grid-cols-4 gap-2 border-t border-white/5 pt-3">
                    <Stat label="Stars" value={`★ ${repo.stars}`} />
                    <Stat label="Commits" value={`${Math.round(s.commitShare * 100)}%`} title={`${s.myCommits} of ${s.totalCommits} commits by me`} />
                    <Stat label="Lines" value={`${Math.round(s.lineShare * 100)}%`} title={`${formatNumber(s.myLines)} of ${formatNumber(s.totalLines)} lines changed by me`} />
                    <Stat label="Active" value={formatDuration(s.activeDays)} title={`${s.activeWeeks} active weeks`} />
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500">
                    {repo.language ? (
                        <span className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: languageColors[repo.language] ?? "#a1a1aa" }} />
                            {repo.language}
                        </span>
                    ) : (
                        <span />
                    )}
                    <span className="flex gap-3">
                        {repo.homepage && (
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                Live ↗
                            </a>
                        )}
                        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            Code ↗
                        </a>
                    </span>
                </div>
            </div>
        </article>
    );
}
