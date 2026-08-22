"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { CarouselCard } from "@/types";
import { carouselCards as cards } from "@/lib/data";

function CardInner({ card }: { card: CarouselCard }) {
  if (card.type === "photo") {
    return (
      <div className="relative h-[230px] w-[280px] shrink-0 rounded-md border border-line overflow-hidden flex flex-col justify-end transition-transform hover:-translate-y-1">
        {card.image ? (
          <Image src={card.image} alt={card.label} fill className="object-cover" sizes="280px" />
        ) : (
          <div
            className={`absolute inset-0 ${
              card.variant === "one"
                ? "bg-gradient-to-br from-[#2a2a28] to-[#141413]"
                : "bg-gradient-to-br from-[#1c1c3a] to-[#0e0e18]"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="relative z-[1] m-3.5 self-start rounded-full bg-black/55 backdrop-blur-md px-3.5 py-2 font-mono text-[11px] flex items-center gap-2">
          {card.label}
          {card.href && (
            <span className="w-[22px] h-[22px] rounded-full bg-ink text-bg flex items-center justify-center text-xs">↗</span>
          )}
        </span>
      </div>
    );
  }

  if (card.type === "metrics") {
    return (
      <div className="h-[230px] w-[230px] shrink-0 rounded-md bg-accent text-white p-6 flex flex-col justify-between">
        <span className="font-mono text-[11px] text-white/70">KEY METRICS</span>
        <div className="space-y-1">
          {card.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <span className="font-display text-[34px]">{s.value}</span>
              <span className="font-mono text-[11px] text-white/80">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-[230px] w-[340px] shrink-0 rounded-md p-6 flex flex-col justify-end transition-transform hover:-translate-y-1"
      style={{ background: "repeating-linear-gradient(45deg, var(--color-accent) 0 2px, #2a4fd6 2px 16px)" }}
    >
      <div className="bg-white text-black rounded-full px-4.5 py-3.5 flex justify-between items-center text-sm">
        <span>+ Ask Anything</span>
        <span className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center shrink-0">↑</span>
      </div>
    </div>
  );
}

function CardSlot({ card }: { card: CarouselCard }) {
  const href = card.type === "photo" || card.type === "ask" ? card.href : undefined;
  if (href) {
    return (
      <Link href={href} className="block">
        <CardInner card={card} />
      </Link>
    );
  }
  return <CardInner card={card} />;
}

export default function CardCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = cards.length;

  const goTo = (nextIndex: number) => {
    const wrapped = ((nextIndex % total) + total) % total;
    setIndex(wrapped);

    const track = trackRef.current;
    if (!track) return;
    const child = track.children[wrapped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div className="relative py-6">
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
      >
        ←
      </button>

      <div
        ref={trackRef}
        className="flex gap-3.5 overflow-x-auto px-14 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <CardSlot key={i} card={card} />
        ))}
      </div>

      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
      >
        →
      </button>
    </div>
  );
}