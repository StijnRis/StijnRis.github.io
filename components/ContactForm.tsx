"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

// GitHub Pages has no backend, so messages are posted to a form service
// (e.g. Formspree) that forwards them without exposing an email address.
export default function ContactForm({ endpoint }: { endpoint: string }) {
    const [status, setStatus] = useState<Status>("idle");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus("sending");
        try {
            const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
            if (!res.ok) throw new Error(String(res.status));
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    };

    const input = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-fg placeholder:text-subtle focus:border-accent focus:outline-none";

    return (
        <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-line bg-surface p-8">
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-muted">
                    Name
                    <input required name="name" className={`${input} mt-1.5`} placeholder="Your name" />
                </label>
                <label className="block text-sm text-muted">
                    Your email
                    <input required type="email" name="email" className={`${input} mt-1.5`} placeholder="So I can reply" />
                </label>
            </div>
            <label className="block text-sm text-muted">
                Message
                <textarea
                    required
                    name="message"
                    rows={6}
                    className={`${input} mt-1.5 resize-y`}
                    placeholder="Tell me a bit about your project, role or idea…"
                />
            </label>
            <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-fg px-6 py-2.5 text-sm font-medium text-bg transition hover:opacity-85 disabled:opacity-50"
            >
                {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && <p className="text-sm text-emerald-600 dark:text-emerald-400">Thanks! Your message has been sent.</p>}
            {status === "error" && <p className="text-sm text-rose-600 dark:text-rose-400">Something went wrong. Please try LinkedIn instead.</p>}
        </form>
    );
}
