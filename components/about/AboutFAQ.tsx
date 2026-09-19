"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What do you build?",
    a: "AI-driven web applications, backend systems, data pipelines, and automation tools — end to end, from database to interface.",
  },
  {
    q: "How do you use AI in your work?",
    a: "As a core engineering tool — building LLM-backed features, agentic workflows, and integrating natural language interfaces into real products, not just experimenting with prompts.",
  },
  {
    q: "Do you work across the full stack?",
    a: "Yes — frontend, backend, database design, and deployment. I prefer owning a feature end to end rather than working in a single layer.",
  },
  {
    q: "What kind of projects interest you?",
    a: "Problems where data, automation, or AI can genuinely remove friction from a workflow — not just add a chatbot for its own sake.",
  },
];

export default function AboutFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-b border-line">
      <div className="px-6 md:px-10 py-7 border-b border-line flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">05 / FAQ</span>
        <span className="font-mono text-xs text-ink-dim">COMMON QUESTIONS</span>
      </div>

      <div className="px-6 md:px-10">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.q} className="border-b border-line last:border-b-0">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-8 text-left group"
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-5">
                  <span className="font-mono text-xs text-ink-dim">{String(i + 1).padStart(2, "0")} {"//"}</span>
                  <span className="font-display uppercase text-xl md:text-3xl group-hover:text-accent transition-colors">
                    {item.q}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-2xl text-ink-dim shrink-0"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 pl-[70px] pr-10 text-sm text-ink-dim leading-relaxed max-w-xl font-body">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}