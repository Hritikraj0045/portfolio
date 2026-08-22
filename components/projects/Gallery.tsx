"use client";

import { useRef } from "react";

export default function Gallery({ items }: { items: { label: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 350, behavior: "smooth" });
  };

  return (
    <div className="relative border-t border-line">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
        aria-label="Previous"
      >
        ←
      </button>

      <div
        ref={scrollRef}
        className="flex gap-0.5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className="snap-start shrink-0 w-[340px] h-[260px] flex items-end bg-gradient-to-br from-panel to-bg-soft"
            style={{
              backgroundImage:
                i % 2 === 0
                  ? "linear-gradient(150deg, #1a1a30, #0c0c14)"
                  : "linear-gradient(150deg, #241a30, #120c18)",
            }}
          >
            <span className="m-3.5 rounded-full bg-black/55 backdrop-blur-md px-3 py-1.5 font-mono text-[11px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
        aria-label="Next"
      >
        →
      </button>
    </div>
  );
}