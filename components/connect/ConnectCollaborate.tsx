"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ConnectCollaborate() {
  return (
    <section className="border-b border-line">
      <div className="px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row justify-between gap-12 items-end">
        <div>
          <div className="font-mono text-xs tracking-[0.2em] text-ink-dim mb-6">
            ■ [04] // CONNECT &amp; COLLABORATE
          </div>
          <p className="max-w-2xl font-mono text-sm md:text-base leading-7 text-ink-dim">
            Open to building high-impact software, intelligent systems,
            automation workflows, and scalable product architectures.
          </p>
        </div>

        <div className="font-mono text-xs text-ink-dim text-right">
          MAHARASHTRA, INDIA
          <br />
          UTC +5:30
        </div>
      </div>

      <div className="overflow-hidden border-t border-line py-8">
        <motion.div
          animate={{ x: ["0%", "-35%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap font-display uppercase text-[clamp(90px,15vw,240px)] leading-[0.72]"
        >
          LET&apos;S BUILD THE FUTURE · LET&apos;S BUILD THE FUTURE · LET&apos;S BUILD THE FUTURE · LET&apos;S BUILD THE FUTURE · LET&apos;S BUILD THE FUTURE ·
        </motion.div>
      </div>

      <div className="px-6 md:px-10 py-8 flex justify-end">
        <Link href="/" className="font-mono text-xs hover:text-accent transition-colors">
          BACK TO HOME ↑
        </Link>
      </div>
    </section>
  );
}
