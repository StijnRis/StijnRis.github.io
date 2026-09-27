// Types and helpers for the repo data. Safe to import from client components;
// the data itself is loaded in lib/github-data.ts.

export type ActivePeriod = { start: string; end: string; days: number };

export type RepoStats = {
    totalCommits: number;
    myCommits: number;
    commitShare: number;
    totalLines: number;
    myLines: number;
    lineShare: number;
    contributors: number;
    daysWorked: number;
    firstCommit: string;
    lastCommit: string;
    activePeriods?: ActivePeriod[];
};

export type Repo = {
    name: string;
    fullName: string;
    owner: string;
    owned: boolean;
    url: string;
    description: string | null;
    readmeSummary: string | null;
    homepage: string | null;
    image: string | null;
    language: string | null;
    languages: Record<string, number>;
    topics: string[];
    fork: boolean;
    stars: number;
    forks: number;
    createdAt: string;
    pushedAt: string;
    lastActivity: string;
    stats: RepoStats;
    bonus: number;
    relevance: number;
    relevanceComponents: Record<string, number>;
};

export type GithubData = {
    generatedAt: string;
    profile: {
        login: string;
        name: string | null;
        avatarUrl: string;
        url: string;
        followers: number;
        publicRepos: number;
        website: string | null;
        socials: { provider: string; url: string }[];
    };
    totals: { repos: number; stars: number; commits: number; linesChanged: number; daysWorked: number; hackathons: number; languages: { name: string; bytes: number }[] };
    repos: Repo[];
};

export function prettyName(name: string): string {
    return name
        .replace(/[-_]+/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatNumber(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 10_000) return `${Math.round(n / 1000)}k`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Rust: "#dea584",
    Java: "#b07219",
    "C#": "#178600",
    Svelte: "#ff3e00",
    HTML: "#e34c26",
    CSS: "#663399",
    SCSS: "#c6538c",
    Shell: "#89e051",
    Go: "#00ADD8",
    Dockerfile: "#384d54",
    Pug: "#a86454",
    ShaderLab: "#222c37",
    HLSL: "#aace60",
    "Jupyter Notebook": "#DA5B0B",
};

export function languageColor(language: string): string {
    if (languageColors[language]) return languageColors[language];
    // Stable fallback colour for languages not in the list.
    let hash = 0;
    for (const c of language) hash = (hash * 31 + c.charCodeAt(0)) | 0;
    return `hsl(${Math.abs(hash) % 360} 55% 55%)`;
}

// Languages of a repo with their share of the code, largest first. Languages
// below `minShare` are merged into "Other".
export function languageBreakdown(repo: Repo, minShare = 0.03): { name: string; share: number }[] {
    const entries = Object.entries(repo.languages);
    const total = entries.reduce((s, [, bytes]) => s + bytes, 0);
    if (!total) return repo.language ? [{ name: repo.language, share: 1 }] : [];
    const sorted = entries.map(([name, bytes]) => ({ name, share: bytes / total })).sort((a, b) => b.share - a.share);
    const main = sorted.filter((l) => l.share >= minShare);
    const other = sorted.filter((l) => l.share < minShare).reduce((s, l) => s + l.share, 0);
    return other >= 0.005 ? [...main, { name: "Other", share: other }] : main;
}

const monthYear = (date: string) => new Date(date).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
const month = (date: string) => new Date(date).toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" });

// "Mar 2024", "Mar – Jun 2024" or "Nov 2024 – Feb 2025".
export function formatPeriod(start: string, end: string): string {
    if (start.slice(0, 7) === end.slice(0, 7)) return monthYear(start);
    if (start.slice(0, 4) === end.slice(0, 4)) return `${month(start)} – ${monthYear(end)}`;
    return `${monthYear(start)} – ${monthYear(end)}`;
}

// When I was actively developing a repo. Single-day touch-ups next to real
// periods of work are left out, and more than two periods collapse into one range.
export function activeDates(repo: Repo): string[] {
    const periods = repo.stats.activePeriods ?? [{ start: repo.stats.firstCommit, end: repo.stats.lastCommit, days: repo.stats.daysWorked }];
    const substantial = periods.filter((p) => p.days > 1);
    const shown = substantial.length ? substantial : periods;
    if (!shown.length) return [];
    if (shown.length > 2) return [formatPeriod(shown[0].start, shown.at(-1)!.end)];
    return shown.map((p) => formatPeriod(p.start, p.end));
}
