import RepoCard from "@/components/RepoCard";
import { Button, Eyebrow, OrgLogo, Section } from "@/components/ui";
import { github, linkedin, photo } from "@/lib/github-data";
import { organisations, site, type OrganisationKey } from "@/lib/site";

export default function Home() {
    const top = github.repos.slice(0, 3);
    const highlights = [
        { value: "9.37", label: "BSc GPA out of 10, summa cum laude" },
        { value: String(github.totals.repos), label: "public projects on GitHub" },
        { value: String(github.totals.hackathons), label: "hackathon projects" },
        { value: String(github.totals.daysWorked), label: "days spent building them" },
    ];

    return (
        <>
            <Section className="pb-16 pt-20 sm:pt-28">
                <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo} alt={`Photo of ${site.name}`} width={64} height={64} className="h-16 w-16 rounded-full border border-line object-cover" />
                    <div>
                        <div className="font-semibold text-fg">{site.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted">
                            <OrgLogo org="tudelft" size="sm" />
                            {site.role}
                        </div>
                    </div>
                </div>
                <h1 className="mt-10 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-7xl">
                    Hi, I&apos;m Stijn. I turn hard problems into <span className="text-accent">working software</span>, fast.
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-muted">{site.tagline}</p>
                <div className="mt-10 flex flex-wrap gap-3">
                    <Button href="/projects">See my projects →</Button>
                    <Button href="/contact" variant="ghost">
                        Get in touch
                    </Button>
                </div>
            </Section>

            <Section>
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
                    {highlights.map((h) => (
                        <div key={h.label} className="bg-surface p-6">
                            <dt className="text-3xl font-semibold text-fg">{h.value}</dt>
                            <dd className="mt-1 text-sm text-subtle">{h.label}</dd>
                        </div>
                    ))}
                </dl>
            </Section>

            <Section className="pt-16">
                <p className="text-sm text-subtle">Studied and worked at</p>
                <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
                    {(Object.keys(organisations) as OrganisationKey[]).map((key) => (
                        <li key={key}>
                            <a href={organisations[key].url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-muted hover:text-fg">
                                <OrgLogo org={key} />
                                {organisations[key].name}
                            </a>
                        </li>
                    ))}
                </ul>
            </Section>

            <Section className="pt-24">
                <div className="mb-8 flex items-end justify-between gap-4">
                    <h2 className="text-3xl font-semibold tracking-tight text-fg">Top projects</h2>
                    <a href="/projects/" className="hidden text-sm text-muted hover:text-fg sm:block">
                        All projects →
                    </a>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {top.map((r) => (
                        <RepoCard key={r.fullName} repo={r} />
                    ))}
                </div>
            </Section>

            <Section className="pt-24">
                <div className="rounded-3xl border border-line bg-surface p-10 sm:p-14">
                    <Eyebrow>Open to opportunities</Eyebrow>
                    <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-fg">Looking for someone who learns fast and ships under pressure?</h2>
                    <p className="mt-3 max-w-xl text-muted">
                        I&apos;m open to software engineering, AI and quantitative roles in and around {site.location.split(",")[0]}.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button href="/contact">Contact me</Button>
                        {linkedin && (
                            <Button href={linkedin.href} variant="ghost">
                                LinkedIn ↗
                            </Button>
                        )}
                    </div>
                </div>
            </Section>
        </>
    );
}
