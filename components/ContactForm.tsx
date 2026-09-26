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

    const input = "w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-amber-400/60 focus:outline-none";

    return (
        <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-zinc-400">
                    Name
                    <input required name="name" className={`${input} mt-1.5`} placeholder="Your name" />
                </label>
                <label className="block text-sm text-zinc-400">
                    Your email
                    <input required type="email" name="email" className={`${input} mt-1.5`} placeholder="So I can reply" />
                </label>
            </div>
            <label className="block text-sm text-zinc-400">
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
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-amber-300 disabled:opacity-50"
            >
                {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" && <p className="text-sm text-emerald-400">Thanks! Your message has been sent.</p>}
            {status === "error" && <p className="text-sm text-rose-400">Something went wrong. Please try LinkedIn instead.</p>}
        </form>
    );
}
