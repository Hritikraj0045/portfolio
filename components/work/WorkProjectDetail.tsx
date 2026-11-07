"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types";
import Magnetic from "@/components/ui/Magnetic";

export default function WorkProjectDetail({
  project,
  nextId,
}: {
  project: Project;
  nextId?: string;
}) {
  return (
    <section id={project.id} className="border-b border-line">
      {/* title + actions + status */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <span className="font-mono text-xs text-ink-dim">PROJECT [{project.index}]</span>
          <h2 className="font-display uppercase text-[clamp(48px,8vw,120px)] leading-[0.88] mt-2">
            {project.name}
          </h2>
          <div className="flex gap-3 mt-6 flex-wrap font-mono text-xs">
            {project.links.details && (
              <Magnetic>
                <a href={project.links.details} className="border border-line rounded-full px-4 py-2 inline-block">
                  CASE STUDY ↗
                </a>
              </Magnetic>
            )}
            {project.links.live && (
              <Magnetic>
                <a href={project.links.live} target="_blank" className="border border-accent text-accent rounded-full px-4 py-2 inline-block">
                  LIVE DEMO ↗
                </a>
              </Magnetic>
            )}
            {project.links.source && (
              <Magnetic>
                <a href={project.links.source} target="_blank" className="border border-line rounded-full px-4 py-2 inline-block">
                  SOURCE CODE ↗
                </a>
              </Magnetic>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-ink-dim shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {project.status.toUpperCase()}
        </div>
      </motion.div>

      {/* gallery + core tech panel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-[1fr_1fr_1fr_280px] border-t border-line"
      >
        {project.gallery.slice(0, 3).map((item) => (
          <div
            key={item.label}
            className="relative h-[280px] md:h-[380px] border-r border-line overflow-hidden bg-panel flex items-end"
          >
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt={item.label} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-bg-soft to-panel" />
            )}
            <span className="relative m-3.5 bg-black/55 backdrop-blur-md px-3 py-1.5 font-mono text-[11px] text-white">
              {item.label}
            </span>
          </div>
        ))}

        <div className="p-6 flex flex-col justify-between min-h-[200px] md:h-auto">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 border border-ink-dim" />
              <span className="font-mono text-xs tracking-wide text-ink-dim">CORE TECH</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(project.techStack ?? []).map((tech) => (
                <span key={tech} className="font-mono text-[11px] border border-line rounded-full px-3 py-1.5">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {nextId && (
            <a
              href={`#${nextId}`}
              aria-label="Next project"
              className="self-end w-11 h-11 rounded-full bg-ink text-bg flex items-center justify-center mt-6"
            >
              →
            </a>
          )}
        </div>
      </motion.div>

      {/* meta row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-3 gap-8 px-6 md:px-10 py-10 border-t border-line font-mono"
      >
        <div>
          <span className="block text-[11px] text-ink-dim mb-1.5">DOMAIN</span>
          <b className="text-sm">{project.domain}</b>
        </div>
        <div>
          <span className="block text-[11px] text-ink-dim mb-1.5">TIMELINE</span>
          <b className="text-sm">{project.timeline}</b>
        </div>
        <div>
          <span className="block text-[11px] text-ink-dim mb-1.5">ROLE</span>
          <b className="text-sm">{project.role ?? "—"}</b>
        </div>
      </motion.div>

      {/* description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="px-6 md:px-10 pb-14 max-w-3xl font-mono text-sm text-ink-dim leading-relaxed"
      >
        {project.description}
      </motion.p>
    </section>
  );
}