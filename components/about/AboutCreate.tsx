"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    n: "01",
    title: "AI SYSTEMS",
    items: ["Natural Language Interfaces", "LLM-Backed Features", "Agentic Workflows", "RAG Pipelines"],
  },
  {
    n: "02",
    title: "DATA & ANALYTICS",
    items: ["Query Engines", "Analytics Dashboards", "Data Pipelines", "Visualization"],
  },
  {
    n: "03",
    title: "FULL STACK",
    items: ["Next.js & React Apps", "Backend API Design", "Database Architecture", "Authentication"],
  },
  {
    n: "04",
    title: "AUTOMATION",
    items: ["Scrapers & Integrations", "Workflow Automation", "Scheduled Jobs", "Tool-Calling Systems"],
  },
  {
    n: "05",
    title: "PRODUCTION SYSTEMS",
    items: ["Docker Deployments", "CI/CD Pipelines", "Monitoring & Logging", "Performance Tuning"],
  },
];

export default function AboutCreate() {
  return (
    <section className="border-b border-line">
      <div className="px-6 md:px-10 py-7 border-b border-line flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">03 / WHAT I CREATE</span>
        <span className="font-mono text-xs text-ink-dim">{categories.length} AREAS</span>
      </div>

      <div className="grid md:grid-cols-[1fr_360px]">
        <div>
          <div className="px-6 md:px-10 py-14 md:py-20">
            <h2 className="font-display uppercase text-[clamp(64px,10vw,160px)] leading-[0.95] tracking-[-0.03em]">
              WHAT I
              <br />
              CREATE
            </h2>
          </div>

          {categories.map((cat) => (
            <motion.div
              key={cat.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 md:px-10 py-14 border-t border-line"
            >
              <span className="font-mono text-sm text-ink-dim">({cat.n})</span>
              <h3 className="font-display uppercase text-[clamp(36px,6vw,80px)] leading-[0.85] mt-2 mb-6">
                {cat.title}
              </h3>
              <ul className="space-y-1.5 font-mono text-sm text-ink-dim">
                {cat.items.map((item, i) => (
                  <li key={item}>
                    {String(i + 1).padStart(2, "0")} {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:block relative border-l border-line">
          <div className="sticky top-0 h-screen flex items-center justify-center p-8">
            <div className="relative w-full h-[70vh] border border-line overflow-hidden">
              <Image src="/images/prof.png" alt="Hritik Raj Arya" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}