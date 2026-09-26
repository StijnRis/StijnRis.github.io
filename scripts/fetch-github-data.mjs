// Fetches all public repos of a GitHub user, computes contribution stats and a
// ranking score per repo, and writes the result to data/github.json.
//
// Usage: GITHUB_TOKEN=... node scripts/fetch-github-data.mjs
// Without a token it still works, but hits the 60 requests/hour limit quickly.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const USER = process.env.GITHUB_USER || "StijnRis";
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const OUT_FILE = path.join(process.cwd(), "data", "github.json");
const API = "https://api.github.com";

const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": `${USER}-website-builder`,
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function gh(url, { allow404 = false } = {}) {
    const res = await fetch(url.startsWith("http") ? url : API + url, { headers });
    if (allow404 && (res.status === 404 || res.status === 409)) return { status: res.status, data: null };
    if (!res.ok && res.status !== 202 && res.status !== 204) {
        throw new Error(`GitHub API ${res.status} for ${url}: ${await res.text()}`);
    }
    const data = res.status === 200 ? await res.json() : null;
    return { status: res.status, data, headers: res.headers };
}

async function paginate(url) {
    const all = [];
    let next = url;
    while (next) {
        const { data, headers: h } = await gh(next);
        all.push(...data);
        const link = h.get("link") || "";
        const m = link.match(/<([^>]+)>;\s*rel="next"/);
        next = m ? m[1] : null;
    }
    return all;
}

// The /stats/contributors endpoint answers 202 while GitHub computes the data
// in the background, so poll a few times.
async function contributorStats(fullName) {
    for (let attempt = 0; attempt < 8; attempt++) {
        const { status, data } = await gh(`/repos/${fullName}/stats/contributors`, { allow404: true });
        if (status === 200) return Array.isArray(data) ? data : [];
        if (status === 204 || status === 404 || status === 409) return [];
        await sleep(2000 + attempt * 1500);
    }
    return null;
}

// Distinct calendar days (Amsterdam time) on which I authored a commit.
const dayFormat = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" });
async function myCommitDays(fullName) {
    const { status } = await gh(`/repos/${fullName}/commits?author=${USER}&per_page=1`, { allow404: true });
    if (status !== 200) return [];
    const commits = await paginate(`/repos/${fullName}/commits?author=${USER}&per_page=100`);
    return [...new Set(commits.map((c) => dayFormat.format(new Date(c.commit.author.date))))].sort();
}

const BADGE_PATTERN = /shields\.io|badge|badgen|travis-ci|codecov|circleci|\/workflows\/|actions\/workflow|vercel\.com\/button|deploy-button|forthebadge|img\.shields|coveralls|snyk\.io|sonarcloud|app\.netlify\.com/i;

function resolveImage(src, repo, readmePath) {
    src = src.trim().replace(/^<|>$/g, "");
    if (!src || src.startsWith("data:")) return null;
    if (/^https?:\/\//i.test(src)) {
        // github.com/<owner>/<repo>/blob/<ref>/<path> -> raw
        const blob = src.match(/^https?:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/(.+)$/i);
        if (blob) return `https://raw.githubusercontent.com/${blob[1]}/${blob[2].replace(/\?raw=true$/, "")}`;
        return src;
    }
    if (src.startsWith("//")) return "https:" + src;
    const baseDir = path.posix.dirname(readmePath || "README.md");
    const clean = src.split("#")[0];
    const rel = clean.startsWith("/") ? clean.slice(1) : path.posix.normalize(path.posix.join(baseDir, clean));
    return `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${rel}`;
}

function findReadmeImage(markdown, repo, readmePath) {
    const candidates = [];
    const re = /!\[[^\]]*\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)|<img[^>]+src=["']([^"']+)["']/gi;
    let m;
    while ((m = re.exec(markdown))) candidates.push(m[1] || m[2]);
    for (const src of candidates) {
        if (BADGE_PATTERN.test(src)) continue;
        const url = resolveImage(src, repo, readmePath);
        if (url) return url;
    }
    return null;
}

// Lines from framework templates or setup instructions are not a description.
const BOILERPLATE = /bootstrapped with|starter template|this template|create-next-app|create-react-app|pip install|npm (run|install|start)|yarn |pnpm |activate|getting started|development mode|^https?:\/\/|hosted at|\$ /i;

function readmeSummary(markdown) {
    // First real paragraph of text, used when the repo has no description.
    const lines = markdown
        .replace(/```[\s\S]*?```/g, "")
        .replace(/<[^>]+>/g, "")
        .split(/\r?\n/)
        .map((l) => l.trim());
    for (const line of lines) {
        if (!line || line.startsWith("#") || line.startsWith("!") || line.startsWith("|") || line.startsWith("[!") || line.startsWith(">")) continue;
        const text = line
            .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
            .replace(/[*_`]/g, "")
            .trim();
        if (BOILERPLATE.test(text) || /for more information|--|\\|localhost|you.ll need|\/bin\/|:$/i.test(text)) continue;
        if (!/^[A-Z]/.test(text) || text.split(/\s+/).length < 5) continue;
        if (text.length > 30) return text.length > 220 ? text.slice(0, 217).trimEnd() + "…" : text;
    }
    return null;
}

const clamp01 = (x) => Math.max(0, Math.min(1, x));
const logScale = (x, max) => clamp01(Math.log1p(Math.max(0, x)) / Math.log1p(max));

// Score in [0, 100]. Each component is normalised to [0, 1] and weighted.
function computeScore(s, now) {
    const monthsSincePush = (now - new Date(s.lastActivity).getTime()) / (30 * 24 * 3600 * 1000);
    const components = {
        ownership: clamp01(0.5 * s.commitShare + 0.5 * s.lineShare),
        popularity: logScale(s.stars + 0.5 * s.forks, 25),
        effort: logScale(s.myCommits, 150),
        duration: logScale(s.daysWorked, 60),
        recency: Math.exp(-monthsSincePush / 18),
        polish:
            (s.description ? 0.3 : 0) +
            (s.homepage ? 0.3 : 0) +
            (s.image ? 0.25 : 0) +
            (s.topics.length ? 0.15 : 0),
    };
    const weights = {
        ownership: 0.12,
        popularity: 0.13,
        effort: 0.2,
        duration: 0.2,
        recency: 0.15,
        polish: 0.2,
    };
    let score = 0;
    for (const k of Object.keys(weights)) score += weights[k] * components[k];
    return { score: Math.round(score * 1000) / 10, components };
}

// Hackathon projects get a bonus, tutorials a penalty. The README is not
// checked for "tutorial" because framework templates (create-next-app etc.)
// link to their tutorials.
function keywordBonus(repo, readme) {
    const about = [repo.name, repo.description, ...(repo.topics || [])].join(" ").toLowerCase();
    const hackathon = about.includes("hackathon") || readme.toLowerCase().includes("hackathon");
    const tutorial = about.includes("tutorial");
    return (hackathon ? 10 : 0) + (tutorial ? -20 : 0);
}

async function loadJson(file, fallback) {
    try {
        return JSON.parse(await readFile(file, "utf8"));
    } catch {
        return fallback;
    }
}

async function main() {
    const previous = await loadJson(OUT_FILE, { repos: [] });
    const previousByName = new Map(previous.repos.map((r) => [r.name, r]));

    const { data: profile } = await gh(`/users/${USER}`);
    const repos = (await paginate(`/users/${USER}/repos?per_page=100&type=owner&sort=pushed`)).filter(
        (r) => !r.private
    );
    console.log(`Found ${repos.length} public repos for ${USER}`);

    // Kick off stats computation for all repos first, so later polls are fast.
    await Promise.all(repos.map((r) => gh(`/repos/${r.full_name}/stats/contributors`, { allow404: true }).catch(() => null)));

    const now = Date.now();
    const results = [];
    const queue = [...repos];
    const worker = async () => {
        while (queue.length) {
            const repo = queue.shift();
            try {
                results.push(await processRepo(repo));
            } catch (err) {
                console.warn(`! ${repo.name}: ${err.message}`);
                const prev = previousByName.get(repo.name);
                if (prev) results.push(prev);
            }
        }
    };

    async function processRepo(repo) {
        const [stats, days, languagesRes, readmeRes] = await Promise.all([
            contributorStats(repo.full_name),
            myCommitDays(repo.full_name),
            gh(`/repos/${repo.full_name}/languages`, { allow404: true }),
            gh(`/repos/${repo.full_name}/readme`, { allow404: true }),
        ]);

        let readme = "";
        let readmePath = "README.md";
        if (readmeRes.data?.content) {
            readme = Buffer.from(readmeRes.data.content, "base64").toString("utf8");
            readmePath = readmeRes.data.path;
        }

        const prev = previousByName.get(repo.name);
        let totalCommits = 0, myCommits = 0, totalLines = 0, myLines = 0, contributors = 0;

        if (stats === null && prev) {
            // Stats still computing; reuse numbers from the previous build.
            ({ totalCommits, myCommits, totalLines, myLines, contributors } = prev.stats);
        } else if (stats) {
            contributors = stats.length;
            for (const c of stats) {
                const isMe = c.author?.login?.toLowerCase() === USER.toLowerCase();
                totalCommits += c.total;
                for (const w of c.weeks) {
                    const lines = w.a + w.d;
                    totalLines += lines;
                    if (isMe) myLines += lines;
                }
                if (isMe) myCommits += c.total;
            }
        }

        const daysWorked = days.length;
        const firstCommit = days[0] ?? repo.created_at.slice(0, 10);
        const lastCommit = days.at(-1) ?? repo.pushed_at.slice(0, 10);

        const summary = {
            name: repo.name,
            fullName: repo.full_name,
            url: repo.html_url,
            description: repo.description || null,
            readmeSummary: readme ? readmeSummary(readme) : null,
            homepage: repo.homepage || null,
            image: readme ? findReadmeImage(readme, repo, readmePath) : null,
            language: repo.language,
            languages: languagesRes.data || {},
            topics: repo.topics || [],
            fork: repo.fork,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            createdAt: repo.created_at,
            pushedAt: repo.pushed_at,
            lastActivity: lastCommit,
            stats: {
                totalCommits,
                myCommits,
                commitShare: totalCommits ? myCommits / totalCommits : 0,
                totalLines,
                myLines,
                lineShare: totalLines ? myLines / totalLines : 0,
                contributors,
                daysWorked,
                firstCommit,
                lastCommit,
            },
        };

        const { score, components } = computeScore(
            {
                ...summary.stats,
                stars: summary.stars,
                forks: summary.forks,
                description: summary.description,
                homepage: summary.homepage,
                image: summary.image,
                topics: summary.topics,
                lastActivity: summary.lastActivity,
            },
            now
        );
        summary.scoreComponents = components;
        summary.bonus = keywordBonus(repo, readme);
        summary.score = Math.round((score + summary.bonus) * 10) / 10;
        console.log(`  ${repo.name.padEnd(40)} score ${summary.score.toFixed(1).padStart(5)}  commits ${myCommits}/${totalCommits}`);
        return summary;
    }

    await Promise.all(Array.from({ length: 6 }, worker));

    const visible = results
        // This website's own repo is not a project to show on it.
        .filter((r) => r.name.toLowerCase() !== `${USER.toLowerCase()}.github.io`)
        // Forks where I never committed are not my work.
        .filter((r) => !(r.fork && r.stats.myCommits === 0))
        .sort((a, b) => b.score - a.score);

    const totals = {
        repos: visible.length,
        stars: visible.reduce((s, r) => s + r.stars, 0),
        commits: visible.reduce((s, r) => s + r.stats.myCommits, 0),
        linesChanged: visible.reduce((s, r) => s + r.stats.myLines, 0),
        daysWorked: visible.reduce((s, r) => s + r.stats.daysWorked, 0),
        hackathons: visible.filter((r) => r.bonus > 0).length,
        languages: Object.entries(
            visible.reduce((acc, r) => {
                for (const [lang, bytes] of Object.entries(r.languages)) acc[lang] = (acc[lang] || 0) + bytes;
                return acc;
            }, {})
        )
            .sort((a, b) => b[1] - a[1])
            .map(([name, bytes]) => ({ name, bytes })),
    };

    const output = {
        generatedAt: new Date().toISOString(),
        profile: {
            login: profile.login,
            name: profile.name,
            avatarUrl: profile.avatar_url,
            url: profile.html_url,
            followers: profile.followers,
            publicRepos: profile.public_repos,
        },
        totals,
        repos: visible,
    };

    await mkdir(path.dirname(OUT_FILE), { recursive: true });
    await writeFile(OUT_FILE, JSON.stringify(output, null, 2) + "\n");
    console.log(`Wrote ${visible.length} repos to ${path.relative(process.cwd(), OUT_FILE)}`);
}

main().catch(async (err) => {
    console.error(err);
    // Keep the build going with data from a previous run if the API is unreachable.
    const existing = await loadJson(OUT_FILE, null);
    if (existing) {
        console.warn("Falling back to existing data/github.json");
        process.exit(0);
    }
    process.exit(1);
});
