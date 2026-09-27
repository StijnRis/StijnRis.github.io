import { activeDates, languageBreakdown, languageColor, prettyName, type Repo } from "@/lib/github";

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
            style={{ background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${color} 30%, transparent), transparent 65%), linear-gradient(135deg, var(--surface-muted), var(--surface))` }}
        >
            <span className="font-mono text-4xl font-bold tracking-tight text-fg/70">{initials}</span>
        </div>
    );
}

function Languages({ repo }: { repo: Repo }) {
    const languages = languageBreakdown(repo);
    if (!languages.length) return null;
    const color = (name: string) => (name === "Other" ? "#a1a1aa" : languageColor(name));
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-surface-muted">
                {languages.map((l) => (
                    <span key={l.name} style={{ width: `${l.share * 100}%`, background: color(l.name) }} />
                ))}
            </div>
            <ul className="flex min-w-0 flex-wrap gap-x-3 gap-y-1 text-xs text-subtle">
                {languages
                    .filter((l) => l.name !== "Other")
                    .slice(0, 3)
                    .map((l) => (
                        <li key={l.name} className="flex items-center gap-1.5" title={`${l.name} ${Math.round(l.share * 100)}%`}>
                            <span className="h-2 w-2 rounded-full" style={{ background: color(l.name) }} />
                            {l.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

function GitHubIcon() {
    return (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
    );
}

export default function RepoCard({ repo }: { repo: Repo }) {
    const description = repo.description ?? repo.readmeSummary;
    const s = repo.stats;
    const dates = activeDates(repo);
    const meta = [
        ...(s.contributors > 1 ? [`${s.contributors} people`] : []),
        // Short projects are the norm, so only call out the longer ones.
        ...(s.daysWorked > 15 ? [`${s.daysWorked} days of work`] : []),
        ...(repo.stars > 0 ? [`★ ${repo.stars}`] : []),
    ];

    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md">
            <a href={repo.homepage || repo.url} target="_blank" rel="noopener noreferrer" className="block aspect-[16/9] overflow-hidden border-b border-line bg-surface-muted">
                {repo.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={repo.image} alt="" loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]" />
                ) : (
                    <Placeholder repo={repo} />
                )}
            </a>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold leading-snug text-fg">
                    <a href={repo.homepage || repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {prettyName(repo.name)}
                    </a>
                </h3>
                {(dates.length > 0 || meta.length > 0) && (
                    <p className="mt-1 text-xs text-subtle">
                        {dates.length > 0 && (
                            <span className="font-mono" title="When I was actively developing it, based on my commits">
                                {dates.join(", ")}
                            </span>
                        )}
                        {meta.map((m) => (
                            <span key={m}>
                                <span className="mx-1.5 text-line-strong">·</span>
                                {m}
                            </span>
                        ))}
                    </p>
                )}
                {description && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{description}</p>}
                {repo.topics.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                        {repo.topics.slice(0, 4).map((t) => (
                            <li key={t} className={`rounded-full px-2 py-0.5 text-[11px] ${t === "hackathon" ? "bg-accent-soft text-accent" : "bg-surface-muted text-muted"}`}>
                                {t}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-auto pt-5">
                    <Languages repo={repo} />
                    <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
                        {repo.homepage && (
                            <a
                                href={repo.homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={repo.homepage}
                                className="rounded-full bg-fg px-3.5 py-1.5 text-xs font-medium text-bg transition hover:opacity-85"
                            >
                                Visit website ↗
                            </a>
                        )}
                        <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-muted transition hover:border-line-strong hover:text-fg"
                        >
                            <GitHubIcon />
                            Source code
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
