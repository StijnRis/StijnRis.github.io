// Hand-written content for the site. GitHub data lives in data/github.json.

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
    links: {
        github: "https://github.com/StijnRis",
        linkedin: "https://www.linkedin.com/in/stijn-risseeuw/",
        linkedinActivity: "https://www.linkedin.com/in/stijn-risseeuw/recent-activity/all/",
    },
};

export const highlights = [
    { value: "9.37", label: "BSc GPA out of 10, summa cum laude" },
    { value: "3", label: "hackathon podiums in 2026" },
    { value: "200+", label: "students supported per lab as a TA" },
    { value: "9/63", label: "National Hackers Cup 2026" },
];

export const trustedBy = ["TU Delft", "bunq", "Prosus", "IMC Trading", "RouteStack.ai", "University of Queensland", "McKinsey.org"];

export type CaseStudy = {
    title: string;
    repo?: string;
    event: string;
    date: string;
    result: string;
    problem: string;
    role: string;
    solution: string;
    stack: string[];
};

export const caseStudies: CaseStudy[] = [
    {
        title: "bunqAhead",
        repo: "bunq-hackathon-7.0",
        event: "bunq Multimodal AI Hackathon",
        date: "Apr 2026",
        result: "Top 3",
        problem: "Your calendar knows your future and your bank knows your past, but they never talk to each other, so upcoming costs catch you off guard.",
        role: "One of four builders during an overnight hackathon at bunq's Amsterdam office.",
        solution:
            "An assistant that reads calendar events, location and past spending (plus optional voice notes) to estimate what upcoming plans will cost. It creates bunq saving goals automatically and colour-codes your calendar by expected spend.",
        stack: ["Multimodal AI", "bunq API", "Google Calendar", "TypeScript"],
    },
    {
        title: "MatchRoute",
        repo: "match-route",
        event: "RouteStack.ai Build Challenge",
        date: "Jul 2026",
        result: "3rd place overall",
        problem: "Planning a trip with 5+ people usually dies in the group chat: conflicting budgets, overlapping schedules, endless spreadsheets.",
        role: "Solo build: architecture, agent design and front-end.",
        solution:
            "A multi-agent mediator that renders interactive maps, budget meters and live polls in the chat instead of walls of text. A conflict timeline spots schedule and budget clashes, and once the group agrees, a type-safe client fetches live flights, hotels and cars.",
        stack: ["Vercel AI SDK", "Gemini", "Leaflet", "OpenAPI", "Next.js"],
    },
    {
        title: "Autonomous restaurant agent",
        repo: "aiso-prosus-hackathon-2026",
        event: "AISO x Prosus Spring Hackathon",
        date: "May 2026",
        result: "2nd of 12 teams",
        problem: "Run a simulated restaurant on autopilot: buying ingredients, setting menus and prices, staffing, marketing and daily specials.",
        role: "Team of three. We tried LLM-based, rule-based and ML agents in 8 hours.",
        solution:
            "A hybrid agent: rules get the operational basics right every time, while machine learning tunes the changing variables to maximise profit.",
        stack: ["Python", "Machine learning", "Agents"],
    },
    {
        title: "Shelfwise",
        repo: "hack_the_beach_2026",
        event: "Hack on the Beach (TU Delft x IMC Trading)",
        date: "Jun 2026",
        result: "Came close to the grand prize; won the cup-stacking side quest (22 levels)",
        problem: "Every product claims to be sustainable. Comparing 50 items on a shelf in real time is impossible for shoppers.",
        role: "Team of four, 24 hours, building the detection-to-data pipeline.",
        solution:
            "Snap one photo of a shelf: an object detector crops each product, ministral-3b identifies it, Open Food Facts supplies impact data, and colour overlays show the result. Redis caching made live demos fast.",
        stack: ["Computer vision", "ministral-3b", "Open Food Facts", "Redis", "Next.js"],
    },
    {
        title: "Forget-me-not",
        repo: "forget-me-not",
        event: "Cursor Hackathon Den Haag",
        date: "Jun 2026",
        result: "30% of the audience vote (150 people)",
        problem: "People living with dementia often experience stress and anxiety, and daily tasks are easy to forget.",
        role: "Team of four with mixed backgrounds, 7.5 hours from blank screen to demo.",
        solution:
            "An app that uses research-backed methods, pairing memories of loved ones with soothing music transitions, plus smart reminders for daily tasks.",
        stack: ["Next.js", "ElevenLabs", "Cursor", "Vercel"],
    },
    {
        title: "AI-augmented education study",
        repo: "vscode-tutor",
        event: "TU Delft Honours Programme research",
        date: "Oct 2024 – Jun 2026",
        result: "Published dataset on 4TU.ResearchData",
        problem: "How do LLMs actually change the way 15 to 17-year-olds learn to program?",
        role: "Led the full study: ethics approval, tooling, data collection, analysis and publication.",
        solution:
            "A custom VS Code extension logged edits, runs and LLM prompts over six months of real classes. Bayesian Knowledge Tracing measured how knowledge grew and gave each question an impact score.",
        stack: ["TypeScript", "VS Code API", "Python", "Bayesian Knowledge Tracing"],
    },
];

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

export type Note = { title: string; date: string; takeaways: string[] };

export const notes: Note[] = [
    {
        title: "9th of 63 at the National Hackers Cup",
        date: "Sep 2026",
        takeaways: [
            "We solved 10 challenges in Web, Crypto, Reverse Engineering, Pwn, Forensics and Misc.",
            "Well-designed challenges pushed our web exploitation, crypto and reverse engineering skills to the limit, and cracking them as a team was the best part.",
        ],
    },
    {
        title: "AI agents should reduce friction between people",
        date: "Jul 2026",
        takeaways: [
            "Generative UI (maps, meters, polls) beats walls of AI text for group decisions.",
            "Detect conflicts before searching inventory; consensus first, then API calls.",
            "Agents add the most value when they help people decide together, not just when they automate tasks.",
        ],
    },
    {
        title: "Ruthless scoping in a 7.5-hour hackathon",
        date: "Jun 2026",
        takeaways: [
            "Build the emotional core of the product first; dashboards can wait.",
            "Use the AI stack you already know instead of reinventing the wheel.",
            "If a feature takes more than 30 minutes, mock the data but keep the user flow real.",
        ],
    },
    {
        title: "What 24 hours of computer vision taught us",
        date: "Jun 2026",
        takeaways: [
            "Small edge LLMs like ministral-3b handle structured extraction well with a good prompt.",
            "Caching is not optional for live demos: Redis made the difference.",
            "Spend zero time on vanity features.",
        ],
    },
    {
        title: "Hybrid agents beat pure LLM agents",
        date: "May 2026",
        takeaways: [
            "Rules make the basics reliable; ML optimises what keeps changing.",
            "We tested LLM-based, rule-based and ML agents; the hybrid won.",
        ],
    },
];
