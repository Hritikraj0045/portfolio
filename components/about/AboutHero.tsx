"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const titleLines = ["SHAPING", "THE FUTURE", "OF INTELLIGENT", "SOFTWARE"];

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.16]);

  return (
    <section ref={ref} className="relative w-full overflow-hidden border-b border-line">
      {/* top meta bar */}
      <div className="w-full px-6 md:px-10 py-7 border-b border-line flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">01 / ABOUT</span>
        <span className="font-mono text-xs text-ink-dim">FULL STACK · AI · DATA</span>
      </div>

      {/* hero: title + portrait, explicit 60/40 split */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
        {/* title column */}
        <div className="w-full px-6 md:px-10 py-16 md:py-24 flex items-end min-h-[60vh] md:min-h-[75vh] border-b md:border-b-0 md:border-r border-line">
          <h1 className="font-display uppercase text-[15vw] sm:text-[11vw] md:text-[7.5vw] leading-[0.95] tracking-[-0.03em]">
            {titleLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* portrait column */}
        <div className="relative w-full min-h-[50vh] md:min-h-[75vh] overflow-hidden">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imageY }}
            className="absolute inset-0"
          >
            <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
              <Image
                src="/images/prof.png"
                alt="Hritik Raj Arya"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* identity strip — full width, its own row */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 px-6 md:px-10 py-10 border-t border-line">
        <div>
          <div className="font-display uppercase text-3xl md:text-5xl leading-[0.95] mb-4">
            Hritik Raj Arya
          </div>
          <div className="font-mono text-sm text-ink-dim mb-6">FULL STACK DEVELOPER</div>
          <div className="border-t border-line pt-5 max-w-xl">
            <span className="block font-mono text-xs text-ink-dim mb-2">ABOUT</span>
            <p className="font-body text-sm md:text-base leading-relaxed">
              I build useful software where full-stack engineering, data, automation, and AI meet.
            </p>
          </div>
        </div>
        <div className="font-mono text-xs text-ink-dim self-start md:text-right">INDIA</div>
      </div>
    </section>
  );
}