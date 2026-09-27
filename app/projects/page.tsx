import type { Metadata } from "next";
import RepoGrid from "@/components/RepoGrid";
import { PageHeader, Section } from "@/components/ui";
import { github } from "@/lib/github-data";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
    return (
        <>
            <PageHeader eyebrow="Projects" title={`${github.totals.repos} projects I've worked on`} />
            <Section>
                <RepoGrid repos={github.repos} />
            </Section>
        </>
    );
}
