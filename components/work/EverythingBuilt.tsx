"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { builtProjects } from "@/lib/data";
import type { BuiltProject } from "@/lib/data";

import BuiltProjectCard from "./BuiltProjectCard";
import ProjectDetailOverlay from "./ProjectDetailOverlay";

export default function EverythingBuilt() {
  const [selectedProject, setSelectedProject] =
    useState<BuiltProject | null>(null);

  return (
    <section
      id="everything-built"
      className="border-b border-line"
    >
      {/* SECTION HEADER */}

      <div className="px-6 md:px-10 py-20 md:py-28 border-b border-line overflow-hidden">
        <div className="flex items-start justify-between gap-8">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-accent mb-6">
              03 / PROJECT INDEX
            </div>

            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display uppercase text-[clamp(64px,12vw,180px)] leading-[0.78] tracking-[-0.04em]"
            >
              EVERYTHING
              <br />
              I&apos;VE BUILT
            </motion.h2>
          </div>

          <div className="hidden md:block font-mono text-[10px] text-ink-dim text-right pt-2">
            <div>{String(builtProjects.length).padStart(2, "0")}</div>
            <div className="mt-2 tracking-[0.15em]">
              PROJECTS
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2">
        {builtProjects.map((project) => (
          <BuiltProjectCard
            key={project.id}
            project={project}
            onDetails={setSelectedProject}
          />
        ))}
      </div>

      {/* DETAIL EXPERIENCE */}

      <ProjectDetailOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}