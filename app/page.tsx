import RepoCard from "@/components/RepoCard";
import { Button, Eyebrow, Section } from "@/components/ui";
import { formatNumber, github } from "@/lib/github";
import { highlights, site, trustedBy } from "@/lib/site";

export default function Home() {
    const top = github.repos.slice(0, 3);

    return (
        <>
            <Section className="relative pb-20 pt-24 sm:pt-32">
                <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500/20 via-rose-500/15 to-sky-500/20 blur-3xl" />
                <Eyebrow>{site.role}</Eyebrow>
                <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
                    Hi, I&apos;m Stijn. I turn hard problems into{" "}
                    <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">working software</span>, fast.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-zinc-400">{site.tagline}</p>
                <div className="mt-10 flex flex-wrap gap-3">
                    <Button href="/work">See my work →</Button>
                    <Button href="/contact" variant="ghost">
                        Get in touch
                    </Button>
                </div>
            </Section>

            <Section>
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
                    {highlights.map((h) => (
                        <div key={h.label} className="bg-zinc-950 p-6">
                            <dt className="text-3xl font-semibold text-white">{h.value}</dt>
                            <dd className="mt-1 text-sm text-zinc-500">{h.label}</dd>
                        </div>
                    ))}
                </dl>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-zinc-500">
                    <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">Built with & for</span>
                    {trustedBy.map((t) => (
                        <span key={t} className="font-medium text-zinc-400">
                            {t}
                        </span>
                    ))}
                </div>
            </Section>

            <Section className="pt-24">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <Eyebrow>Top projects</Eyebrow>
                        <h2 className="text-3xl font-semibold tracking-tight text-white">Ranked by my GitHub activity</h2>
                        <p className="mt-2 text-sm text-zinc-500">
                            {github.totals.repos} public repos · {formatNumber(github.totals.commits)} commits · {formatNumber(github.totals.linesChanged)} lines changed
                        </p>
                    </div>
                    <a href="/work#repositories" className="hidden text-sm text-zinc-400 hover:text-white sm:block">
                        All projects →
                    </a>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {top.map((r, i) => (
                        <RepoCard key={r.name} repo={r} rank={i + 1} />
                    ))}
                </div>
            </Section>

            <Section className="pt-24">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 sm:p-14">
                    <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white">Looking for someone who learns fast and ships under pressure?</h2>
                    <p className="mt-3 max-w-xl text-zinc-400">
                        I&apos;m open to software engineering, AI and quantitative roles in and around {site.location.split(",")[0]}.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button href="/contact">Contact me</Button>
                        <Button href={site.links.linkedin} variant="ghost">
                            LinkedIn ↗
                        </Button>
                    </div>
                </div>
            </Section>
        </>
    );
}
