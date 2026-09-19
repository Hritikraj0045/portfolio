"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ConnectHero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92svh] overflow-hidden border-b border-line px-6 pt-20 pb-10 md:px-10 flex flex-col"
    >
      {/* Section label */}
      <div className="absolute top-8 left-6 md:left-10 font-mono text-xs tracking-[0.2em] text-ink-dim">
        01 / CONNECT
      </div>

      {/* Hero content */}
      <div className="flex-1 flex items-end">
        <div className="grid w-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(300px,38vw)] gap-8 lg:gap-10 items-end">

          {/* TEXT */}
          <motion.div
            style={{ x }}
            className="relative z-10 pb-4 lg:pb-8"
          >
            <h1 className="font-display uppercase text-[clamp(72px,12vw,190px)] leading-[0.95] tracking-[-0.04em]">
              LET&apos;S BUILD
              <br />
              SOMETHING
              <br />
              USEFUL
            </h1>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease }}
            className="relative order-first lg:order-last h-[42svh] min-h-[600px] max-h-[620px] overflow-hidden bg-[#020817] lg:h-[68svh]"
          >
            <Image
              src="/images/connect-portrait.png"
              alt="Illustrated portrait of Hritik Raj Arya"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 38vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#020817]/50 to-transparent" />
          </motion.div>

        </div>
      </div>

      {/* Description */}
      <motion.div
        style={{ y }}
        className="mt-8 ml-auto max-w-xl font-mono text-sm md:text-base leading-7 text-ink-dim"
      >
        <p>
          I work with people and teams building products where full-stack engineering,
          data, automation, and practical AI can create real leverage.
        </p>
      </motion.div>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
        className="absolute bottom-0 left-6 md:left-10 h-px w-1/3 origin-left bg-accent"
      />
    </section>
  );
}