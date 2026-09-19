"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AboutCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xA = useTransform(scrollYProgress, [0, 1], ["-12%", "8%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  return (
    <section ref={ref} className="border-b border-line py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-10 mb-14 flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">05 / COLLABORATION</span>
        <span className="font-mono text-xs text-ink-dim">GET IN TOUCH</span>
      </div>
      <motion.div style={{ x: xA }} className="whitespace-nowrap">
        <span className="font-display uppercase text-[clamp(90px,15vw,240px)] leading-[0.95]">LET&apos;S BUILD</span>
      </motion.div>
      <motion.div style={{ x: xB }} className="whitespace-nowrap mt-2">
        <span className="font-display uppercase text-[clamp(90px,15vw,240px)] leading-[0.95]">SOMETHING USEFUL</span>
      </motion.div>
      <div className="px-6 md:px-10 mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <p className="font-mono text-sm leading-6 text-ink-dim max-w-md">Have a product, system, or engineering problem worth exploring?</p>
        <Link href="/connect" className="font-display uppercase text-4xl md:text-6xl hover:text-accent transition-colors">LET&apos;S TALK ↗</Link>
      </div>
    </section>
  );
}
