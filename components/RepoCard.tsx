import { languageBreakdown, languageColor, prettyName, type Repo } from "@/lib/github";

function Placeholder({ repo }: { repo: Repo }) {
    const color = repo.language ? languageColor(repo.language) : "#8b5cf6";
    const initials = prettyName(repo.name)
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("");
    return (
        <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${color} 35%, transparent), transparent 60%), linear-gradient(135deg, #18181b, #0b0b0f)` }}
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

function Languages({ repo }: { repo: Repo }) {
    const languages = languageBreakdown(repo);
    if (!languages.length) return null;
    const color = (name: string) => (name === "Other" ? "#52525b" : languageColor(name));
    return (
        <div>
            <div className="flex h-1.5 overflow-hidden rounded-full bg-white/5">
                {languages.map((l) => (
                    <span key={l.name} style={{ width: `${l.share * 100}%`, background: color(l.name) }} title={`${l.name} ${Math.round(l.share * 100)}%`} />
                ))}
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500">
                {languages.map((l) => (
                    <li key={l.name} className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full" style={{ background: color(l.name) }} />
                        <span className="text-zinc-400">{l.name}</span>
                        {Math.round(l.share * 100)}%
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function RepoCard({ repo }: { repo: Repo }) {
    const description = repo.description ?? repo.readmeSummary;
    const s = repo.stats;
    const stats = [
        ...(repo.stars > 0 ? [{ label: "Stars", value: `★ ${repo.stars}` }] : []),
        ...(s.contributors > 1 ? [{ label: "Team", value: `${s.contributors} people` }] : []),
        // Short projects are the norm, so only call out the longer ones.
        ...(s.daysWorked > 15 ? [{ label: "of development", value: `${s.daysWorked} days`, title: `Days with commits by me, ${s.firstCommit} to ${s.lastCommit}` }] : []),
    ];

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition hover:-translate-y-0.5 hover:border-white/25">
            <a href={repo.homepage || repo.url} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/9] overflow-hidden bg-zinc-950">
                {repo.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={repo.image} alt="" loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
                ) : (
                    <Placeholder repo={repo} />
                )}
            </a>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                    {!repo.owned && <div className="font-mono text-xs text-zinc-500">{repo.owner} /</div>}
                    <h3 className="text-lg font-semibold text-white">
                        <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {prettyName(repo.name)}
                        </a>
                    </h3>
                    {description && <p className="mt-1 line-clamp-4 text-sm text-zinc-400">{description}</p>}
                    {repo.topics.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                            {repo.topics.map((t) => (
                                <li
                                    key={t}
                                    className={`rounded-md px-2 py-0.5 font-mono text-[11px] ${t === "hackathon" ? "bg-amber-400/10 text-amber-300" : "bg-white/5 text-zinc-400"}`}
                                >
                                    {t}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-auto flex flex-col gap-3 border-t border-white/5 pt-3">
                    {stats.length > 0 && (
                        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
                            {stats.map((st) => (
                                <Stat key={st.label} {...st} />
                            ))}
                        </div>
                    )}
                    <Languages repo={repo} />
                </div>

                <div className="flex justify-end gap-3 text-xs text-zinc-500">
                    {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            Live ↗
                        </a>
                    )}
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        Code ↗
                    </a>
                </div>
            </div>
        </article>
    );
}
