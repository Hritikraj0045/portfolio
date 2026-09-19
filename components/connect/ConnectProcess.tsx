"use client";

import { motion } from "framer-motion";

const steps = [
  ["01", "DISCOVERY", "Understand the problem, users, constraints, and the outcome the product needs to achieve."],
  ["02", "ARCHITECTURE", "Turn requirements into a clear system design covering interfaces, APIs, data flow, and boundaries."],
  ["03", "FULL-STACK BUILD", "Build the product across frontend, backend, databases, integrations, and production-ready APIs."],
  ["04", "AI INTEGRATION", "Use LLMs, natural-language interfaces, RAG, agents, or automation where AI creates genuine value."],
  ["05", "DATA & AUTOMATION", "Connect data pipelines, analytics, scraping, scheduled workflows, and repeatable operational processes."],
  ["06", "PRODUCTION", "Containerize, deploy, monitor, secure, and make the system reliable enough for real users."],
  ["07", "VALIDATION", "Test the experience against the original problem, measure what matters, and iterate from real usage."],
];

export default function ConnectProcess() {
  return (
    <section className="border-b border-line">
      <div className="px-6 md:px-10 py-10 border-b border-line flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.6em] text-ink-dim">02 / HOW I WORK</span>
        <span className="font-mono text-xs text-ink-dim">07 STEPS</span>
      </div>

      {steps.map(([number, title, text], index) => (
        <motion.article
          key={number}
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: index * 0.03 }}
          className="relative min-h-[72svh] border-b last:border-b-0 border-line px-6 md:px-10 py-12 md:py-16 flex flex-col justify-between overflow-hidden"
        >
          <div className="flex items-start justify-between">
            <span className="font-mono text-xs text-ink-dim">(Step {number})</span>
            <span className="font-mono text-xs text-ink-dim">{number} / 07</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.65fr_0.35fr] gap-12 items-end">
            <h2 className="font-display uppercase text-[clamp(80px,14vw,230px)] leading-[0.95] tracking-[-0.035em]">
              {title}
            </h2>

            <p className="max-w-md font-mono text-sm md:text-base leading-7 text-ink-dim lg:pb-4">
              {text}
            </p>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
