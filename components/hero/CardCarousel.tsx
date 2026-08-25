"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { CarouselCard } from "@/types";
import { carouselCards as cards } from "@/lib/data";

function CardInner({ card }: { card: CarouselCard }) {
  // ------------------------------------------------------------
  // PHOTO CARD
  // ------------------------------------------------------------
  if (card.type === "photo") {
    return (
      <div className="relative h-[230px] w-[280px] shrink-0 rounded-md overflow-hidden border border-transparent">
        {card.image ? (
          <Image
            src={card.image}
            alt={card.label}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="280px"
          />
        ) : (
          <div
            className={`absolute inset-0 ${
              card.variant === "one"
                ? "bg-gradient-to-br from-[#2a2a28] to-[#141413]"
                : "bg-gradient-to-br from-[#1c1c3a] to-[#0e0e18]"
            }`}
          />
        )}

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Text */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="font-mono text-[10px] text-white/65 tracking-widest">
            {card.variant === "one" ? "PROFILE" : "WORK WITH ME"}
          </span>

          <div className="mt-1 flex items-center justify-between">
            <span className="font-display text-3xl text-white uppercase">
              {card.label}
            </span>

            {card.href && (
              <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center">
                ↗
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }



  // if (card.type === "photo") {
  //   return (
  //     <div className="relative h-[230px] w-[280px] shrink-0 rounded-md border border-line overflow-hidden flex flex-col justify-end transition-transform duration-300 hover:-translate-y-1">
  //       {card.image ? (
  //         <Image
  //           src={card.image}
  //           alt={card.label}
  //           fill
  //           className="object-cover"
  //           sizes="280px"
  //         />
  //       ) : (
  //         <div
  //           className={`absolute inset-0 ${
  //             card.variant === "one"
  //               ? "bg-gradient-to-br from-[#2a2a28] to-[#141413]"
  //               : "bg-gradient-to-br from-[#1c1c3a] to-[#0e0e18]"
  //           }`}
  //         />
  //       )}

  //       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

  //       <span className="relative z-[1] m-3.5 self-start rounded-full bg-black/55 backdrop-blur-md px-3.5 py-2 font-mono text-[11px] flex items-center gap-2">
  //         {card.label}

  //         {card.href && (
  //           <span className="w-[22px] h-[22px] rounded-full bg-ink text-bg flex items-center justify-center text-xs">
  //             ↗
  //           </span>
  //         )}
  //       </span>
  //     </div>
  //   );
  // }

  // ------------------------------------------------------------
  // METRICS CARD
  // ------------------------------------------------------------
  if (card.type === "metrics") {
    return (
      <div
        className="relative h-[230px] w-[230px] shrink-0 rounded-md overflow-hidden text-white p-6 flex flex-col justify-between"
        style={{
          backgroundImage: `url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />

        <span className="relative z-10 font-mono text-[20px] text-white/80">
          KEY METRICS
        </span>

        <div className="relative z-10 space-y-1">
          {card.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <span className="font-display text-[34px]">
                {s.value}
              </span>

              <span className="font-mono text-[11px] text-white/80">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // BLOG / Work CARD
  // ------------------------------------------------------------
  if (card.type === "link") {
    return (
      <div className="relative h-[230px] w-[280px] shrink-0 rounded-md overflow-hidden border border-line">
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="280px"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <span className="font-mono text-[10px] text-white/65 tracking-widest">
            {card.label}
          </span>

          <div className="mt-1 flex items-center justify-between">
            <span className="font-display text-3xl text-white">
              {card.title}
            </span>

            <span className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center">
              ↗
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // ASK ANYTHING
  // ------------------------------------------------------------
  if (card.type === "ask") {
    return (
      <div className="relative h-[230px] w-[340px] shrink-0 rounded-md overflow-hidden border border-line">
        {card.image ? (
          <Image
            src={card.image}
            alt="Ask Anything"
            fill
            className="object-cover"
            sizes="340px"
          />
        ) : (
          <div className="absolute inset-0 bg-accent" />
        )}

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-x-5 bottom-5 bg-white text-black rounded-full px-4.5 py-3.5 flex justify-between items-center text-sm">
          <span>+ Ask Anything</span>

          <span className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center shrink-0">
            ↑
          </span>
        </div>
      </div>
    );
  }

  return null;
}

// ------------------------------------------------------------
// CLICKABLE CARD
// ------------------------------------------------------------
function CardSlot({
  card,
  index,
  active,
  onClick,
}: {
  card: CarouselCard;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const cardContent = (
    <motion.div
      onClick={onClick}
      animate={{
        scale: active ? 1.02 : 1,
      }}
      transition={{ duration: 0.25 }}
      className={`
        relative shrink-0 rounded-md
        box-border
        transition-all duration-300
        cursor-pointer
        ${
          active
            ? "border-2 border-black dark:border-white"
            : "border-2 border-transparent"
        }
      `}
    >
      <CardInner card={card} />
    </motion.div>
  );

  // Only navigate to the actual page when the card is already active.
  if (card.href && active) {
    return (
      <Link href={card.href} className="block shrink-0">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// ------------------------------------------------------------
// CAROUSEL
// ------------------------------------------------------------
export default function CardCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const total = cards.length;

  const goTo = (nextIndex: number) => {
    if (!trackRef.current || total === 0) return;

    // Infinite wrapping
    const wrapped = ((nextIndex % total) + total) % total;

    setIndex(wrapped);

    const track = trackRef.current;
    const card = track.children[wrapped] as HTMLElement | undefined;

    if (!card) return;

    track.scrollTo({
      left: card.offsetLeft - 56,
      behavior: "smooth",
    });
  };

  // ------------------------------------------------------------
  // KEYBOARD NAVIGATION
  // ------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't hijack arrow keys while typing
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index]);

  return (
    <div className="relative py-8">
      {/* LEFT ARROW */}
      <button
        onClick={() => goTo(index - 1)}
        aria-label="Previous card"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center transition-transform hover:scale-110"
      >
        ←
      </button>

      {/* CARD TRACK */}
      <div
        ref={trackRef}
        className="flex gap-3.5 overflow-x-auto px-14 py-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, i) => (
          <CardSlot
            key={i}
            card={card}
            index={i}
            active={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => goTo(index + 1)}
        aria-label="Next card"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center transition-transform hover:scale-110"
      >
        →
      </button>

      {/* POSITION INDICATOR */}
      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 flex gap-1.5">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to card ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? "w-6 bg-ink"
                : "w-1.5 bg-ink/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}








// "use client";

// import { useRef, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import type { CarouselCard } from "@/types";
// import { carouselCards as cards } from "@/lib/data";

// function CardInner({ card }: { card: CarouselCard }) {
//   if (card.type === "photo") {
//     return (
//       <div className="relative h-[230px] w-[280px] shrink-0 rounded-md border border-line overflow-hidden flex flex-col justify-end transition-transform hover:-translate-y-1">
//         {card.image ? (
//           <Image src={card.image} alt={card.label} fill className="object-cover" sizes="280px" />
//         ) : (
//           <div
//             className={`absolute inset-0 ${
//               card.variant === "one"
//                 ? "bg-gradient-to-br from-[#2a2a28] to-[#141413]"
//                 : "bg-gradient-to-br from-[#1c1c3a] to-[#0e0e18]"
//             }`}
//           />
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//         <span className="relative z-[1] m-3.5 self-start rounded-full bg-black/55 backdrop-blur-md px-3.5 py-2 font-mono text-[11px] flex items-center gap-2">
//           {card.label}
//           {card.href && (
//             <span className="w-[22px] h-[22px] rounded-full bg-ink text-bg flex items-center justify-center text-xs">↗</span>
//           )}
//         </span>
//       </div>
//     );
//   }

// if (card.type === "metrics") {
//   return (
//     <div
//       className="relative h-[230px] w-[230px] shrink-0 rounded-md overflow-hidden text-white p-6 flex flex-col justify-between"
//       style={{
//         backgroundImage: `url(${card.image})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/45" />

//       {/* Content */}
//       <span className="relative z-10 font-mono text-[11px] text-white/80">
//         KEY METRICS
//       </span>

//       <div className="relative z-10 space-y-1">
//         {card.stats.map((s) => (
//           <div key={s.label} className="flex items-baseline gap-2.5">
//             <span className="font-display text-[34px]">
//               {s.value}
//             </span>

//             <span className="font-mono text-[11px] text-white/80">
//               {s.label}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

//   return (
//     <div
//       className="h-[230px] w-[340px] shrink-0 rounded-md p-6 flex flex-col justify-end transition-transform hover:-translate-y-1"
//       style={{ background: "repeating-linear-gradient(45deg, var(--color-accent) 0 2px, #2a4fd6 2px 16px)" }}
//     >
//       <div className="bg-white text-black rounded-full px-4.5 py-3.5 flex justify-between items-center text-sm">
//         <span>+ Ask Anything</span>
//         <span className="w-[30px] h-[30px] rounded-full bg-black text-white flex items-center justify-center shrink-0">↑</span>
//       </div>
//     </div>
//   );
// }

// function CardSlot({ card }: { card: CarouselCard }) {
//   const href = card.type === "photo" || card.type === "ask" ? card.href : undefined;
//   if (href) {
//     return (
//       <Link href={href} className="block">
//         <CardInner card={card} />
//       </Link>
//     );
//   }
//   return <CardInner card={card} />;
// }

// export default function CardCarousel() {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const [index, setIndex] = useState(0);
//   const total = cards.length;

//   const goTo = (nextIndex: number) => {
//     const wrapped = ((nextIndex % total) + total) % total;
//     setIndex(wrapped);

//     const track = trackRef.current;
//     if (!track) return;
//     const child = track.children[wrapped] as HTMLElement | undefined;
//     child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
//   };

//   return (
//     <div className="relative py-6">
//       <button
//         onClick={() => goTo(index - 1)}
//         aria-label="Previous"
//         className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
//       >
//         ←
//       </button>

//       <div
//         ref={trackRef}
//         className="flex gap-3.5 overflow-x-auto px-14 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//       >
//         {cards.map((card, i) => (
//           <CardSlot key={i} card={card} />
//         ))}
//       </div>

//       <button
//         onClick={() => goTo(index + 1)}
//         aria-label="Next"
//         className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
//       >
//         →
//       </button>
//     </div>
//   );
// }