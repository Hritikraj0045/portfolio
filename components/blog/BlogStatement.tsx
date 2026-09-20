"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { blogPosts } from "@/lib/data";

export default function BlogStatement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const topics = useMemo(
    () => Array.from(new Set(blogPosts.flatMap((p) => p.tags))),
    []
  );

  return (
    <section ref={ref} className="border-b border-line">
      <div className="px-6 md:px-10 py-7 border-b border-line flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">02 / WHY I WRITE</span>
        <span className="font-mono text-xs text-ink-dim">LESSONS, NOT TUTORIALS</span>
      </div>

      <div className="px-6 md:px-10 py-16 md:py-20 grid md:grid-cols-2 gap-10">
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="font-mono text-base md:text-lg leading-7 text-ink"
        >
          I write about the systems I&apos;ve actually shipped — what worked, what &apos;d change,
          and the decisions that only made sense once something broke in production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {topics.map((topic) => (
            <div
              key={topic}
              className="border border-line px-4 py-5 flex items-center justify-center text-center hover:border-accent transition-colors"
            >
              <span className="font-mono text-sm">{topic.toUpperCase()}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}