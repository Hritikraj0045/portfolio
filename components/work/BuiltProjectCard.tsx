"use client";

import { motion } from "framer-motion";
import type { BuiltProject } from "@/lib/data";

interface BuiltProjectCardProps {
  project: BuiltProject;
  onDetails: (project: BuiltProject) => void;
}

export default function BuiltProjectCard({
  project,
  onDetails,
}: BuiltProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover="hover"
      className="group relative min-h-[390px] border-b border-line md:border-r overflow-hidden"
    >
      {/* subtle hover layer */}
      <motion.div
        variants={{
          hover: {
            scaleY: 1,
          },
        }}
        initial={{ scaleY: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 origin-bottom bg-panel pointer-events-none"
      />

      <div className="relative z-10 h-full px-6 md:px-10 py-7 flex flex-col">
        {/* TOP ROW */}

        <div className="flex items-start justify-between gap-6">
          <span className="font-mono text-xs text-ink-dim">
            / {project.index}
          </span>

          <div className="font-mono text-[9px] tracking-[0.12em] text-ink-dim text-right">
            <span>{project.category}</span>
          </div>
        </div>

        {/* CONTENT */}

        <div className="mt-12 flex-1">
          <motion.h3
            variants={{
              hover: {
                x: 8,
              },
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-display uppercase text-[clamp(34px,4vw,58px)] leading-[0.9] tracking-[-0.02em] max-w-xl"
          >
            {project.title}
          </motion.h3>

          <p className="font-mono text-xs md:text-sm text-ink-dim leading-[1.7] max-w-xl mt-6">
            {project.description}
          </p>

          {/* TECH */}

          <div className="flex flex-wrap gap-2 mt-7">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] tracking-[0.08em] uppercase border border-line px-2.5 py-1.5 text-ink-dim"
              >
                {tech}
              </span>
            ))}

            {project.tech.length > 4 && (
              <span className="font-mono text-[9px] text-ink-dim px-2 py-1.5">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* BOTTOM */}

        <div className="pt-7 mt-8 border-t border-line flex items-center justify-between gap-5">
          {/* STATUS */}

          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] text-ink-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {project.status}
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-5 font-mono text-[9px] tracking-[0.08em] uppercase">
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-ink hover:text-accent transition-colors underline underline-offset-4"
              >
                Live ↗
              </a>
            )}

            {project.source && project.source !== "#" && (
              <a
                href={project.source}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-ink hover:text-accent transition-colors underline underline-offset-4"
              >
                GitHub ↗
              </a>
            )}

            <span className="w-px h-4 bg-line" />

            <button
              type="button"
              onClick={() => onDetails(project)}
              className="text-ink hover:text-accent transition-colors"
            >
              Details ↗
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}