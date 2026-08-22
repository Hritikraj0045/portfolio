"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import Gallery from "./Gallery";

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find((p) => p.id === activeId)!;

  return (
    <section id="work">
      <div className="px-10 pt-28 pb-10">
        <span className="block mb-2.5 italic text-ink-dim text-lg">(Featured Projects)</span>
        <h2 className="font-display uppercase text-[clamp(38px,6.5vw,84px)] leading-[0.92]">
          Selected
          <br />
          Works
        </h2>
      </div>

      <div className="flex border-y border-line">
        <div className="hidden sm:flex items-center px-10 py-5 font-mono text-[13px] uppercase font-bold">
          Projects / Featured
        </div>
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`flex-1 px-10 py-5 text-left font-mono text-[13px] border-b-2 transition-colors ${
              activeId === p.id
                ? "text-ink border-accent"
                : "text-ink-dim border-transparent"
            }`}
          >
            {p.index}. {p.name}
          </button>
        ))}
      </div>

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
              <a href={active.links.live} className="border border-accent text-accent rounded-full px-4 py-2">
                Live Project ↗
              </a>
            )}
            {active.links.source && (
              <a href={active.links.source} className="border border-line rounded-full px-4 py-2">
                Source Code ↗
              </a>
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
    </section>
  );
}