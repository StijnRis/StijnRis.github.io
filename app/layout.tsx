import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import { getPosts } from "@/lib/blog";
import { github, socialLinks } from "@/lib/github-data";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: `${site.name} · Software engineer & CS student at TU Delft`,
        template: `%s · ${site.name}`,
    },
    description: site.tagline,
    openGraph: {
        title: site.name,
        description: site.tagline,
        url: site.url,
        type: "website",
    },
    verification: {
        google: "RzLWX-UVKj_PcuiEJNmSdqNOr6ALAOIUkZ2zf1BHRRg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const updated = new Date(github.generatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Nav showBlog={getPosts().length > 0} />
                <main className="min-h-[70vh]">{children}</main>
                <footer className="mt-24 border-t border-white/5">
                    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            © {new Date().getFullYear()} {site.name} · {site.location}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((l) => (
                                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                                    {l.label}
                                </a>
                            ))}
                            <span title="GitHub data is refreshed daily">Updated {updated}</span>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
