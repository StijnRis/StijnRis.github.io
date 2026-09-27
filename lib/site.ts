// Hand-written content for the site. Project data is fetched from GitHub at build
// time (scripts/fetch-github-data.mjs), and blog posts live in content/blog.

export const site = {
    name: "Stijn Risseeuw",
    shortName: "Stijn",
    role: "MSc Computer Science student · Research Assistant at TU Delft",
    tagline:
        "I build AI-powered products fast, from hackathon prototypes to research tools, and I like hard problems best when the clock is ticking.",
    location: "Delft, the Netherlands",
    timezone: "Europe/Amsterdam (CET/CEST)",
    // Endpoint of a form service (e.g. Formspree) that forwards messages without
    // exposing an email address. Leave empty to hide the contact form.
    formEndpoint: "",
    url: "https://stijnris.github.io",
};

// Logos are the organisations' own icons, stored in public/logos.
export const organisations = {
    tudelft: { name: "Delft University of Technology", url: "https://www.tudelft.nl/", logo: "/logos/tudelft.png" },
    asof: { name: "ASOF B.V.", url: "https://www.asof.nl/", logo: "/logos/asof.png" },
    davinci: { name: "Da Vinci Satellite", url: "https://davincisatellite.nl/", logo: "/logos/davincisatellite.png" },
    ssl: { name: "Stichting Studiebegeleiding Leiden", url: "https://www.sslleiden.nl/", logo: "/logos/ssl-leiden.png" },
};

export type OrganisationKey = keyof typeof organisations;

export type TimelineItem = { title: string; org: OrganisationKey; detail?: string; period: string };

export const experience: TimelineItem[] = [
    { title: "Research Assistant", org: "tudelft", detail: "Faculty of EEMCS", period: "Aug 2026 – now" },
    {
        title: "Teaching Assistant",
        org: "tudelft",
        detail: "Computational Intelligence, Information & Data Management, Web & Database Technology",
        period: "Nov 2024 – now",
    },
    { title: "Educator", org: "davinci", period: "Mar 2026 – now" },
    { title: "Software Engineer", org: "asof", detail: "ServiceDigitaal: built a client portal end to end", period: "Jul 2025 – Sep 2026" },
    { title: "Student Ambassador & Mentor", org: "tudelft", period: "Nov 2023 – now" },
    { title: "Assistant Teacher", org: "ssl", period: "Mar 2024 – Dec 2025" },
];

export const education: TimelineItem[] = [
    {
        title: "Master of Computer Science",
        org: "tudelft",
        period: "Sep 2026 – Jun 2028 (expected)",
    },
    {
        title: "BSc Computer Science & Engineering (Honours)",
        org: "tudelft",
        detail: "9.37/10 · summa cum laude · 10s in Algorithms & Data Structures, Computer Security, Functional Programming and more",
        period: "2023 – 2026",
    },
];
