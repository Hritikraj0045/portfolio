"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import Gallery from "./Gallery";
// import SectionHeading from "@/components/ui/SectionHeading";
import Magnetic from "@/components/ui/Magnetic";

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId)!;

  return (
    <section id="work">
      {/* <SectionHeading
        eyebrow="Featured Projects"
        title={
          <>
            Selected Works
          </>
        }
        description="A curated selection of recent engineering projects and technical explorations."
      /> */}

      <div className="flex border-y border-line overflow-x-auto">
        <div className="hidden sm:flex items-center px-10 py-5 font-mono text-[13px] uppercase font-bold shrink-0">
          Projects / Featured
        </div>
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`shrink-0 px-8 py-5 text-left font-mono text-[13px] border-b-2 transition-colors whitespace-nowrap ${
              activeId === p.id
                ? "text-ink border-accent"
                : "text-ink-dim border-transparent"
            }`}
          >
            {p.index}. {p.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="grid md:grid-cols-2 gap-10 px-10 py-10">
            <div>
              <div className="flex gap-14 mb-5 font-mono">
                <div>
                  <span className="block text-[11px] text-ink-dim mb-1.5">DOMAIN</span>
                  <b className="text-[13px]">{active.domain}</b>
                </div>
                <div>
                  <span className="block text-[11px] text-ink-dim mb-1.5">TIMELINE</span>
                  <b className="text-[13px]">{active.timeline}</b>
                </div>
              </div>
              <p className="text-sm text-ink-dim leading-relaxed border-t border-line pt-5 max-w-[480px]">
                {active.description}
              </p>
              <div className="flex items-center gap-2 mt-5 font-mono text-xs text-ink-dim">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                STATUS: {active.status.toUpperCase()}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end justify-between text-left md:text-right">
              <div className="font-display uppercase text-[clamp(36px,5.5vw,64px)]">{active.name}</div>
              <div className="flex gap-2.5 mt-5 flex-wrap justify-start md:justify-end font-mono text-[11px]">
                {active.links.live && (
                  <Magnetic>
                    <a
                      href={active.links.live}
                      target="_blank"
                      className="border border-accent text-accent rounded-full px-4 py-2 inline-block"
                    >
                      Live Project ↗
                    </a>
                  </Magnetic>
                )}
                {active.links.source && (
                  <Magnetic>
                    <a
                      href={active.links.source}
                      target="_blank"
                      className="border border-line rounded-full px-4 py-2 inline-block"
                    >
                      Source Code ↗
                    </a>
                  </Magnetic>
                )}
                {active.links.details && (
                  <Magnetic>
                    <a
                      href={active.links.details}
                      className="border border-line rounded-full px-4 py-2 inline-block"
                    >
                      Case Study ↗
                    </a>
                  </Magnetic>
                )}
                {!active.links.live && !active.links.source && !active.links.details && (
                  <span className="text-ink-dim px-4 py-2">Not publicly deployed</span>
                )}
              </div>
            </div>
          </div>

          <Gallery items={active.gallery} />

          <div className="flex gap-12 px-10 py-8 border-t border-line flex-wrap">
            {active.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-accent">{s.value}</div>
                <div className="font-mono text-[11px] text-ink-dim">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}