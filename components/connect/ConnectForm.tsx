"use client";

import { FormEvent, useState } from "react";

export default function ConnectForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const organization = String(form.get("organization") || "");
    const service = String(form.get("service") || "");
    const message = String(form.get("message") || "");

    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nService: ${service}\n\n${message}`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section className="border-b border-line px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">03 / START A PROJECT</span>
          <h2 className="mt-8 font-display uppercase text-[clamp(70px,10vw,160px)] leading-[0.95]">
            TELL ME
            <br />
            ABOUT IT
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              ["name", "YOUR NAME*", "Your name"],
              ["email", "EMAIL*", "you@example.com"],
              ["organization", "ORGANIZATION", "Company / team"],
              ["service", "WHAT DO YOU NEED?", "AI, backend, product, automation ..."],
            ].map(([name, label, placeholder]) => (
              <label key={name} className="block">
                <span className="font-mono text-xs tracking-widest text-ink-dim">{label}</span>
                <input
                  required={name === "name" || name === "email"}
                  name={name}
                  placeholder={placeholder}
                  className="mt-3 w-full h-20 border border-line bg-bg-soft px-6 font-mono text-sm text-ink outline-none placeholder:text-ink-dim focus:border-accent transition-colors"
                />
              </label>
            ))}
          </div>

          <label className="block">
            <span className="font-mono text-xs tracking-widest text-ink-dim">YOUR MESSAGE</span>
            <textarea
              name="message"
              rows={8}
              placeholder="Describe your project"
              className="mt-3 w-full border border-line bg-bg-soft p-6 font-mono text-sm text-ink outline-none placeholder:text-ink-dim focus:border-accent transition-colors resize-y"
            />
          </label>

          <div className="flex flex-col items-center gap-5">
            <button
              type="submit"
              className="w-full md:w-[370px] h-20 bg-ink text-bg font-mono tracking-[0.25em] text-sm hover:bg-accent transition-colors"
            >
              SEND ↗
            </button>
            {sent && (
              <p className="font-mono text-xs text-ink-dim">
                Your email client should now be open with the enquiry prepared.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
