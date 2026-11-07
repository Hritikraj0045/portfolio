"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { projects } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

export default function WorkHero() {
  const project = projects[0];
  const nextProject = projects[1];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.7]);
  const infoY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 1.06]);
  const galleryY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const statsY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} id={project.id} className="relative overflow-hidden border-b border-line">
      {/* PROJECT NAVIGATION */}
      <div className="border-y border-line overflow-hidden">
        <div className="flex min-w-max">
          <div className="px-6 md:px-10 py-4 border-r border-line font-mono text-[10px] tracking-[0.18em] text-ink-dim">
            SELECTED WORK
          </div>
          {projects.map((item, index) => (
            <div
              key={item.id}
              className={`px-6 md:px-9 py-4 border-r border-line font-mono text-[10px] tracking-[0.12em] whitespace-nowrap transition-colors ${
                index === 0 ? "text-accent" : "text-ink-dim"
              }`}
            >
              {item.index} / {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* PROJECT HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] border-b border-line">
        <div className="relative min-h-[55svh] lg:min-h-[620px] px-6 md:px-10 py-16 md:py-24 border-b lg:border-b-0 lg:border-r border-line flex items-end overflow-hidden">
          <div className="absolute top-6 left-6 md:left-10 font-mono text-[10px] tracking-[0.2em] text-ink-dim">
            {project.index} / FEATURED PROJECT
          </div>

          <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10">
            <div className="font-mono text-[10px] tracking-[0.18em] text-accent mb-5">
              {project.domain}
            </div>
            <h1 className="font-display uppercase text-[clamp(64px,11vw,175px)] leading-[0.78] tracking-[-0.045em] max-w-[1100px]">
              {project.name}
            </h1>
          </motion.div>
        </div>

        <motion.div style={{ y: infoY }} className="px-6 md:px-10 py-10 md:py-14 flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-ink-dim mb-4">
              PROJECT OVERVIEW
            </div>
            <p className="font-mono text-xs md:text-sm leading-[1.9] text-ink-dim max-w-xl">
              {project.description}
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-3 border-t border-line">
              <div className="pt-4 pr-4">
                <div className="font-mono text-[9px] tracking-[0.16em] text-ink-dim mb-2">TIMELINE</div>
                <div className="font-mono text-xs text-ink">{project.timeline}</div>
              </div>

              <div className="pt-4 px-4 border-l border-line">
                <div className="font-mono text-[9px] tracking-[0.16em] text-ink-dim mb-2">ROLE</div>
                <div className="font-mono text-xs text-ink">{project.role ?? "—"}</div>
              </div>

              <div className="pt-4 pl-4 border-l border-line">
                <div className="font-mono text-[9px] tracking-[0.16em] text-ink-dim mb-2">STATUS</div>
                <div className="font-mono text-xs text-accent leading-relaxed">{project.status}</div>
              </div>
            </div>

            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] border border-line rounded-full px-3 py-1.5 text-ink-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-8">
              {project.links.live && project.links.live !== "#" && (
                <Magnetic>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3 bg-ink text-bg font-mono text-[10px] tracking-[0.12em] uppercase hover:bg-accent transition-colors"
                  >
                    Live Project ↗
                  </a>
                </Magnetic>
              )}
              {project.links.source && project.links.source !== "#" && (
                <Magnetic>
                  <a
                    href={project.links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3 border border-line font-mono text-[10px] tracking-[0.12em] uppercase hover:border-accent hover:text-accent transition-colors"
                  >
                    Source Code ↗
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* HERO VISUAL */}
      <div className="relative border-b border-line overflow-hidden">
        <motion.div style={{ y: heroImageY, scale: heroImageScale }} className="relative min-h-[60svh] md:min-h-[720px] bg-panel">
          {project.gallery[0]?.image ? (
            <Image
              src={project.gallery[0].image}
              alt={project.gallery[0].label}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-ink-dim">
              NO PROJECT VISUAL
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

          <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10">
            <div className="font-mono text-[9px] tracking-[0.16em] text-white/60 mb-2">PROJECT VISUAL</div>
            <div className="font-mono text-xs text-white">{project.gallery[0]?.label}</div>
          </div>

          <div className="absolute right-6 md:right-10 bottom-6 md:bottom-10 font-mono text-[9px] tracking-[0.16em] text-white/60">
            {project.index} / {project.gallery.length}
          </div>
        </motion.div>
      </div>

      {/* SUPPORTING GALLERY */}
      <motion.div style={{ y: galleryY }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {project.gallery.slice(1).map((item, index) => (
          <div
            key={item.label}
            className={`relative min-h-[280px] md:min-h-[360px] border-b border-line overflow-hidden bg-panel ${
              index !== project.gallery.slice(1).length - 1 ? "lg:border-r" : ""
            }`}
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-ink-dim">
                NO IMAGE
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="font-mono text-[9px] tracking-[0.12em] text-white/60">
                {String(index + 2).padStart(2, "0")}
              </div>
              <div className="font-mono text-xs text-white mt-1">{item.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* PROJECT METRICS */}
      <motion.div style={{ y: statsY }} className="grid grid-cols-2 md:grid-cols-3">
        {project.stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-6 md:px-10 py-10 md:py-14 border-b border-line ${
              index !== project.stats.length - 1 ? "md:border-r" : ""
            }`}
          >
            <div className="font-display text-[clamp(42px,5vw,76px)] leading-none text-accent">
              {stat.value}
            </div>
            <div className="font-mono text-[9px] tracking-[0.16em] text-ink-dim mt-4">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* NEXT PROJECT */}
      {nextProject && (
        <div className="flex justify-end px-6 md:px-10 py-8 border-t border-line">
          <a
            href={`#${nextProject.id}`}
            aria-label="Next project"
            className="w-11 h-11 rounded-full bg-ink text-bg flex items-center justify-center"
          >
            →
          </a>
        </div>
      )}
    </section>
  );
}