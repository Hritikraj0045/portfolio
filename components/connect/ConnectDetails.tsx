"use client";

import { motion } from "framer-motion";
import { socials } from "@/lib/data";

export default function ConnectDetails() {
  return (
    <section className="border-b border-line px-6 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* 25 */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(180px,30vw,520px)] leading-[0.95] tracking-[0.06em] text-accent/20"
        >
          25
        </motion.div>

        {/* INFO CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="border border-line bg-bg-soft"
        >
          {/* EMAIL */}
          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-6 p-6 md:p-8 border-b border-line">
            <span className="font-mono text-sm text-ink-dim">
              Email
            </span>

            <a
              href="mailto:hritikraj2000@outlook.com"
              className="font-mono text-sm md:text-base text-ink break-all hover:text-accent transition-colors"
            >
              hritikraj2000@outlook.com ↗
            </a>
          </div>

          {/* SOCIAL */}
          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr] gap-6 p-6 md:p-8">
            <span className="font-mono text-sm text-ink-dim">
              Social
            </span>

            <div className="flex flex-col gap-4">
              {socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm md:text-base text-ink hover:text-accent transition-colors w-fit"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}