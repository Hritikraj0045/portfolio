"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface GalleryItem {
  image?: string;
  label: string;
}

interface ProjectGalleryProps {
  gallery: GalleryItem[];
  projectIndex: string;
  projectName: string;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
  }),

  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },

  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
  }),
};

export default function ProjectGallery({
  gallery,
  projectIndex,
  projectName,
}: ProjectGalleryProps) {
  const [[activeIndex, direction], setSlide] = useState<
    [number, number]
  >([0, 0]);

  const total = gallery.length;

  if (!total) {
    return (
      <div className="relative min-h-[60svh] border-y border-line bg-panel flex items-center justify-center">
        <span className="font-mono text-xs text-ink-dim">
          NO PROJECT VISUALS
        </span>
      </div>
    );
  }

  const activeItem = gallery[activeIndex];

  const paginate = (newDirection: number) => {
    setSlide([
      (activeIndex + newDirection + total) % total,
      newDirection,
    ]);
  };

  return (
    <section className="relative border-y border-line overflow-hidden bg-panel">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-6 md:px-10 py-4">
        <div className="font-mono text-[10px] tracking-[0.18em] text-ink-dim">
          {projectIndex} / {projectName}
        </div>

        <div className="font-mono text-[10px] tracking-[0.18em] text-ink-dim">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* Gallery */}
      <div className="relative h-[55svh] min-h-[420px] md:h-[72svh] md:min-h-[600px] overflow-hidden">
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="popLayout"
        >
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 260,
                damping: 30,
              },
              opacity: {
                duration: 0.3,
              },
              scale: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              const threshold = 60;

              if (info.offset.x < -threshold) {
                paginate(1);
              }

              if (info.offset.x > threshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            {activeItem?.image ? (
              <Image
                src={activeItem.image}
                alt={`${projectName} — ${activeItem.label}`}
                fill
                priority={activeIndex === 0}
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-display uppercase text-5xl md:text-8xl text-ink/10">
                    {projectIndex}
                  </div>

                  <div className="font-mono text-[10px] tracking-[0.16em] text-ink-dim mt-4">
                    {activeItem?.label ?? "PROJECT VISUAL"}
                  </div>
                </div>
              </div>
            )}

            {/* Image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 pointer-events-none" />

            {/* Image label */}
            <div className="absolute left-6 md:left-10 bottom-6 md:bottom-10">
              <div className="font-mono text-[9px] tracking-[0.16em] text-white/50 mb-2">
                VISUAL / {String(activeIndex + 1).padStart(2, "0")}
              </div>

              <div className="font-mono text-xs md:text-sm text-white">
                {activeItem?.label}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute right-6 md:right-10 bottom-6 md:bottom-10 flex gap-2">
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous project image"
            className="w-12 h-12 border border-white/30 text-white font-mono text-sm hover:bg-white hover:text-black transition-colors"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next project image"
            className="w-12 h-12 border border-white/30 text-white font-mono text-sm hover:bg-white hover:text-black transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Thumbnail / progress strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-line">
        {gallery.map((item, index) => {
          const active = index === activeIndex;

          return (
            <button
              key={`${item.label}-${index}`}
              type="button"
              onClick={() =>
                setSlide([
                  index,
                  index > activeIndex ? 1 : -1,
                ])
              }
              className={`relative px-5 md:px-6 py-5 text-left border-r border-line last:border-r-0 transition-colors ${
                active
                  ? "bg-panel text-ink"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              <span className="font-mono text-[9px] tracking-[0.16em]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="block font-mono text-[10px] mt-2 truncate">
                {item.label}
              </span>

              {active && (
                <motion.span
                  layoutId={`gallery-active-${projectIndex}`}
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}