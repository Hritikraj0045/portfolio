"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Glyph } from "./Glyph";

const steps = [
  {
    n: "01",
    title: "THINK",
    rotate: -2,
    items: [
      { name: "PROBLEM FRAMING", glyph: "orbit", color: "#3d6dff" },
      { name: "USER NEEDS", glyph: "hex", color: "#a78bfa" },
      { name: "CONSTRAINTS", glyph: "diamond", color: "#22d3ee" },
    ],
  },
  {
    n: "02",
    title: "DESIGN",
    rotate: 1.5,
    items: [
      { name: "ARCHITECTURE", glyph: "layers", color: "#f97316" },
      { name: "DATA FLOW", glyph: "fork", color: "#3d6dff" },
      { name: "INTERFACES", glyph: "square", color: "#a78bfa" },
    ],
  },
  {
    n: "03",
    title: "BUILD",
    rotate: -1.5,
    items: [
      { name: "IMPLEMENTATION", glyph: "circle-rings", color: "#22c55e" },
      { name: "INTEGRATION", glyph: "octagon", color: "#22d3ee" },
      { name: "TESTING", glyph: "chevron", color: "#f97316" },
    ],
  },
  {
    n: "04",
    title: "EVOLVE",
    rotate: 2,
    items: [
      { name: "MONITORING", glyph: "dot-grid", color: "#3ecf5e" },
      { name: "ITERATION", glyph: "star-cluster", color: "#a78bfa" },
      { name: "OPTIMIZATION", glyph: "petal", color: "#f97316" },
    ],
  },
];

function ProcessCard({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });

  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1]);

  return (
    <div ref={ref} className="sticky top-0 h-[65vh] w-full flex items-center justify-center px-6">
      <motion.div
        style={{ y, opacity, zIndex: index + 1 }}
        className="relative w-full max-w-3xl bg-bg-soft border border-line p-6 md:p-10 flex flex-col items-center justify-center text-center gap-6"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <span className="font-display text-[clamp(28px,3.5vw,50px)] text-ink-dim leading-none">
            {step.n}
          </span>
          <h3 className="font-display uppercase text-[clamp(36px,6vw,90px)] leading-[0.85]">
            {step.title}
          </h3>
        </div>

        <div className="grid grid-cols-3 border-t border-l border-line w-full">
          {step.items.map((item) => (
            <div
              key={item.name}
              className="border-b border-r border-line px-3 py-6 flex flex-col items-center gap-3"
            >
              <Glyph type={item.glyph} color={item.color} />
              <span className="font-mono text-[10px] tracking-wide text-ink-dim">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutProcess() {
  return (
    <section className="border-b border-line">
      <div className="px-6 md:px-10 py-7 border-b border-line flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">05 / PROCESS</span>
        <span className="font-mono text-xs text-ink-dim">THINK → DESIGN → BUILD → EVOLVE</span>
      </div>

      <div className="relative">
        {steps.map((step, i) => (
          <ProcessCard key={step.n} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}