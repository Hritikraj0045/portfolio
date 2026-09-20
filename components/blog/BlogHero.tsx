"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data";
import Image from "next/image";

const titleLines = ["FIELD NOTES", "FROM PRODUCTION."];

export default function BlogHero() {
  return (
    <section className="border-b border-line overflow-hidden">
      <div className="px-6 md:px-10 py-7 border-b border-line flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">01 / BLOG</span>
        <span className="font-mono text-xs text-ink-dim">{blogPosts.length} POSTS</span>
      </div>

      <div className="px-6 md:px-10 py-20 md:py-28">
  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-16 items-center">

    {/* TEXT */}
    <div>
      <h1 className="font-display uppercase text-[clamp(48px,9vw,150px)] leading-[0.95] tracking-[-0.03em]">
        {titleLines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="font-mono text-sm md:text-base text-ink-dim max-w-lg mt-8"
      >
        Notes on backend systems, AI features, and what actually breaks in production —
        written after building it, not before.
      </motion.p>
    </div>

    {/* IMAGE */}
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative h-[55svh] min-h-[600px] max-h-[650px] overflow-hidden bg-[#020817]"
    >
      <Image
        src="/images/blogs-portrait.png"
        alt="Illustrated portrait of Hritik Raj Arya"
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 40vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#020817]/50 to-transparent" />
    </motion.div>

  </div>
</div>
    </section>
  );
}