import data from "@/data/github.json";

export type RepoStats = {
    totalCommits: number;
    myCommits: number;
    commitShare: number;
    totalLines: number;
    myLines: number;
    lineShare: number;
    contributors: number;
    activeWeeks: number;
    activeDays: number;
    firstCommit: string;
    lastCommit: string;
};

export type Repo = {
    name: string;
    fullName: string;
    url: string;
    description: string | null;
    readmeSummary: string | null;
    award: string | null;
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
    score: number;
    scoreComponents: Record<string, number>;
};

export type GithubData = {
    generatedAt: string;
    profile: { login: string; name: string | null; avatarUrl: string; url: string; followers: number; publicRepos: number };
    totals: { repos: number; stars: number; commits: number; linesChanged: number; languages: { name: string; bytes: number }[] };
    repos: Repo[];
};

export const github = data as unknown as GithubData;

export function getRepo(name: string): Repo | undefined {
    return github.repos.find((r) => r.name === name);
}

export function prettyName(name: string): string {
    return name
        .replace(/[-_]+/g, " ")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatDuration(days: number): string {
    if (days < 14) return `${days} day${days === 1 ? "" : "s"}`;
    if (days < 60) return `${Math.round(days / 7)} weeks`;
    if (days < 730) return `${Math.round(days / 30)} months`;
    return `${(days / 365).toFixed(1)} years`;
}

export function formatNumber(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 10_000) return `${Math.round(n / 1000)}k`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

export const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Rust: "#dea584",
    Java: "#b07219",
    "C#": "#178600",
    Svelte: "#ff3e00",
    HTML: "#e34c26",
    CSS: "#663399",
    Shell: "#89e051",
    Go: "#00ADD8",
};
