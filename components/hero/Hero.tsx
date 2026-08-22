"use client";

import { motion } from "framer-motion";
import Marquee from "./Marquee";
import CardCarousel from "./CardCarousel";

const tickerItems = [
  "FULL STACK DEVELOPER.",
  "AI & AGENTIC SYSTEMS",
  "SYSTEM DESIGN",
];

export default function Hero() {
  return (
    <section className="pt-[70px]">
      <div className="flex justify-end px-10 pt-5">
        <div className="font-mono text-[11px] tracking-widest text-ink-dim text-right">
          SPECIALIZATION // FULL STACK &amp; AI SYSTEMS
          <br />
          <span className="mt-1 block">BASED IN INDIA · UTC +5:30</span>
        </div>
      </div>

      <div className="mt-6">
        <Marquee items={tickerItems} />
      </div>

      <CardCarousel />

      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display uppercase leading-[0.86] text-[clamp(52px,9.5vw,150px)] px-8 pt-10 pb-10"
      >
        Hritik Raj Arya
      </motion.h1>
    </section>
  );
}