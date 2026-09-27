"use client";

const order = ["system", "light", "dark"] as const;
const labels = { system: "Auto", light: "Light", dark: "Dark" };

declare global {
    interface Window {
        __applyTheme?: () => void;
    }
}

// Cycles Auto → Light → Dark. The current preference lives in the
// data-theme-pref attribute set by the theme script, so CSS picks the icon and
// server and client HTML match.
export default function ThemeToggle() {
    const cycle = () => {
        const current = (document.documentElement.dataset.themePref ?? "system") as (typeof order)[number];
        const next = order[(order.indexOf(current) + 1) % order.length];
        if (next === "system") localStorage.removeItem("theme");
        else localStorage.setItem("theme", next);
        window.__applyTheme?.();
    };

    const icon = "h-4 w-4";
    return (
        <button
            type="button"
            onClick={cycle}
            aria-label="Change theme (Auto, Light, Dark)"
            title="Theme: Auto, Light or Dark"
            className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm text-muted transition hover:bg-surface-muted hover:text-fg"
        >
            <svg viewBox="0 0 24 24" className={`${icon} hidden pref-system:block`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path d="M8 20h8M12 16v4" />
            </svg>
            <svg viewBox="0 0 24 24" className={`${icon} hidden pref-light:block`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg viewBox="0 0 24 24" className={`${icon} hidden pref-dark:block`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
            <span className="hidden text-xs sm:pref-system:inline">{labels.system}</span>
            <span className="hidden text-xs sm:pref-light:inline">{labels.light}</span>
            <span className="hidden text-xs sm:pref-dark:inline">{labels.dark}</span>
        </button>
    );
}
