"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { BuiltProject } from "@/lib/data";

interface ProjectDetailOverlayProps {
  project: BuiltProject | null;
  onClose: () => void;
}

export default function ProjectDetailOverlay({
  project,
  onClose,
}: ProjectDetailOverlayProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg text-ink overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* PANEL HEADER */}

          <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-md"
          >
            <div className="px-6 md:px-10 h-20 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <span className="font-mono text-xs text-ink-dim">
                  PROJECT / {project.index}
                </span>

                <span className="hidden md:block w-px h-4 bg-line" />

                <span className="hidden md:block font-mono text-xs text-accent">
                  {project.category}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="group flex items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase"
              >
                <span className="group-hover:text-accent transition-colors">
                  Close
                </span>

                <span className="w-9 h-9 border border-line flex items-center justify-center group-hover:bg-ink group-hover:text-bg transition-colors">
                  ×
                </span>
              </button>
            </div>
          </motion.header>

          {/* CONTENT */}

          <div className="px-6 md:px-10 py-14 md:py-24">
            {/* TITLE */}

            <div className="max-w-[1500px] mx-auto">
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.15,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] text-ink-dim mb-5">
                  {project.detail.type}
                </div>

                <h1 className="font-display uppercase text-[clamp(64px,11vw,180px)] leading-[0.82] tracking-[-0.03em] max-w-[1300px]">
                  {project.title}
                </h1>
              </motion.div>

              {/* META */}

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="grid grid-cols-2 md:grid-cols-4 border-y border-line mt-14"
              >
                <Meta
                  label="ROLE"
                  value={project.detail.role}
                />

                <Meta
                  label="OWNERSHIP"
                  value={project.detail.ownership}
                />

                <Meta
                  label="STATUS"
                  value={project.status}
                />

                <Meta
                  label="CATEGORY"
                  value={project.category}
                />
              </motion.div>

              {/* DESCRIPTION */}

              <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-24 py-20 border-b border-line">
                <div className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">
                  01 / OVERVIEW
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-mono text-base md:text-lg leading-[1.8] max-w-3xl"
                >
                  {project.detail.description}
                </motion.p>
              </div>

              {/* IMPACT */}

              <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-24 py-20 border-b border-line">
                <div className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">
                  02 / IMPACT
                </div>

                <div>
                  {project.detail.impact.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      className="flex gap-6 py-5 border-b border-line first:border-t"
                    >
                      <span className="font-mono text-[10px] text-accent shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-mono text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CAPABILITIES */}

              <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-24 py-20 border-b border-line">
                <div className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">
                  03 / CAPABILITIES
                </div>

                <div className="grid sm:grid-cols-2">
                  {project.detail.capabilities.map((capability, index) => (
                    <motion.div
                      key={capability}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.05,
                      }}
                      className="border-b border-line py-5 pr-5"
                    >
                      <span className="font-mono text-xs">
                        {capability}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* TECH STACK */}

              <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-24 py-20 border-b border-line">
                <div className="font-mono text-[10px] tracking-[0.2em] text-ink-dim">
                  04 / TECHNOLOGY
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.detail.techStack.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.05,
                      }}
                      className="font-mono text-xs border border-line px-4 py-3 hover:border-accent hover:text-accent transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* PROJECT IMAGE / PLACEHOLDER */}

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-20 min-h-[50svh] border border-line bg-panel flex items-center justify-center overflow-hidden"
              >
                {project.detail.image ? (
                  <img
                    src={project.detail.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="font-display uppercase text-[clamp(80px,15vw,220px)] leading-none text-ink/10">
                      {project.index}
                    </div>

                    <div className="font-mono text-[10px] tracking-[0.2em] text-ink-dim mt-4">
                      PROJECT VISUAL
                    </div>
                  </div>
                )}
              </motion.div>

              {/* LINKS */}

              <div className="flex flex-wrap gap-4 py-20 border-b border-line">
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="px-7 py-4 border border-line font-mono text-xs hover:bg-ink hover:text-bg transition-colors"
                  >
                    LIVE PROJECT ↗
                  </a>
                )}

                {project.source && project.source !== "#" && (
                  <a
                    href={project.source}
                    target="_blank"
                    rel="noreferrer"
                    className="px-7 py-4 border border-line font-mono text-xs hover:bg-ink hover:text-bg transition-colors"
                  >
                    SOURCE CODE ↗
                  </a>
                )}
              </div>

              {/* CLOSE */}

              <div className="py-24 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="group flex flex-col items-center gap-4"
                >
                  <span className="w-16 h-16 rounded-full border border-line flex items-center justify-center text-xl group-hover:bg-ink group-hover:text-bg transition-colors">
                    ↑
                  </span>

                  <span className="font-mono text-[10px] tracking-[0.18em] text-ink-dim group-hover:text-ink transition-colors">
                    CLOSE PROJECT
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Meta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="px-5 md:px-7 py-6 border-r border-line last:border-r-0">
      <div className="font-mono text-[9px] tracking-[0.16em] text-ink-dim mb-3">
        {label}
      </div>

      <div className="font-mono text-xs uppercase leading-relaxed">
        {value}
      </div>
    </div>
  );
}