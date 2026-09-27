import type { Metadata } from "next";
import RepoGrid from "@/components/RepoGrid";
import { PageHeader, Section } from "@/components/ui";
import { github } from "@/lib/github-data";

export const metadata: Metadata = { title: "Work" };

export default function Work() {
    return (
        <>
            <PageHeader eyebrow="Work" title={`${github.totals.repos} projects I've worked on`} />
            <Section>
                <RepoGrid repos={github.repos} />
            </Section>
        </>
    );
}
