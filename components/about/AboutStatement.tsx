"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const titleLines = ["SOFTWARE SHOULD", "REMOVE", "COMPLEXITY."];

const tags = [
  "NEXT.JS 16", "REACT 19", "TYPESCRIPT",
  "LANGGRAPH", "MCP", "GEMINI",
  "INNGEST", "POSTGRESQL", "TAILWIND",
  "FASTAPI", "DOCKER", "PRISMA",
];

export default function AboutStatement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="border-b border-line overflow-hidden">
      <div className="px-6 md:px-10 py-7 border-b border-line flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">02 / PHILOSOPHY</span>
        <span className="font-mono text-xs text-ink-dim">BUILDING INTELLIGENT SOFTWARE</span>
      </div>

      <div className="px-6 md:px-10 py-20 md:py-28">
        <h2 className="font-display uppercase text-[clamp(48px,8vw,130px)] leading-[1.05] tracking-[-0.03em] max-w-[1300px]">
          {titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-10 max-w-5xl ml-auto">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="font-mono text-base leading-7 text-ink"
          >
            I like understanding the problem before choosing the technology. The best solution
            is usually the one that makes the difficult parts disappear for the person using it —
            not the one with the most features bolted on.
          </motion.p>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="font-mono text-sm md:text-base leading-7 text-ink-dim"
          >
            I work across interfaces, APIs, databases, data pipelines, automation, and AI —
            thinking about the complete system rather than one isolated layer. Most of what
            I build sits at the intersection of full-stack engineering and AI-native features.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-16"
        >
          {tags.map((tag) => (
            <div
              key={tag}
              className="border border-line px-6 py-8 flex items-center justify-center text-center hover:border-accent transition-colors"
            >
              <span className="font-mono text-lg md:text-xl">{tag}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}