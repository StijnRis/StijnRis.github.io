// Hand-written content for the site. Project data is fetched from GitHub at build
// time (scripts/fetch-github-data.mjs), and blog posts live in content/blog.

export const site = {
    name: "Stijn Risseeuw",
    shortName: "Stijn",
    role: "Computer Science & Engineering honours student · Research Assistant at TU Delft",
    tagline:
        "I build AI-powered products fast, from hackathon prototypes to research tools, and I like hard problems best when the clock is ticking.",
    location: "Delft, the Netherlands",
    timezone: "Europe/Amsterdam (CET/CEST)",
    // Endpoint of a form service (e.g. Formspree) that forwards messages without
    // exposing an email address. Leave empty to hide the contact form.
    formEndpoint: "",
    url: "https://stijnris.github.io",
};

export const experience = [
    { title: "Research Assistant", org: "TU Delft (EEMCS)", period: "Aug 2026 – now" },
    { title: "Teaching Assistant", org: "TU Delft (Computational Intelligence, Information & Data Management, Web & Database Technology)", period: "Nov 2024 – now" },
    { title: "Educator", org: "Da Vinci Satellite", period: "Mar 2026 – now" },
    { title: "Software Engineer", org: "ASOF B.V. (ServiceDigitaal): built a client portal end to end", period: "Jul 2025 – Sep 2026" },
    { title: "Student Ambassador & Mentor", org: "TU Delft", period: "Nov 2023 – now" },
    { title: "Assistant Teacher", org: "Stichting Studiebegeleiding Leiden", period: "Mar 2024 – Dec 2025" },
];

export const education = [
    {
        title: "BSc Computer Science & Engineering (Honours)",
        org: "Delft University of Technology",
        period: "2023 – 2026",
        note: "9.37/10 · summa cum laude · 10s in Algorithms & Data Structures, Computer Security, Functional Programming and more",
    },
    {
        title: "Exchange, Economics",
        org: "The University of Queensland",
        period: "Jul – Dec 2025",
        note: "6.75/7 · Dean's Commendation for Academic Excellence",
    },
];
