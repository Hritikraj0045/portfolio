"use client";

import { useRef } from "react";

type GalleryItem = {
  label: string;
  image?: string;
};

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({
      left: dir * 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative border-t border-line">
      {/* Previous */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Previous"
      >
        ←
      </button>

      {/* Gallery */}
      <div
        ref={scrollRef}
        className="flex gap-0.5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className="relative snap-start shrink-0 w-[340px] h-[260px] overflow-hidden bg-panel"
            style={{
              backgroundImage: item.image
                ? `url(${item.image})`
                : i % 2 === 0
                  ? "linear-gradient(150deg, #1a1a30, #0c0c14)"
                  : "linear-gradient(150deg, #241a30, #120c18)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay for readable text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            {/* Card label */}
            <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-4">
              <div>
                <span className="block font-mono text-[10px] tracking-widest text-white/60 mb-1">
                  PROJECT VIEW
                </span>

                <span className="font-display text-2xl uppercase text-white leading-none">
                  {item.label}
                </span>
              </div>

              <span className="shrink-0 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center">
                ↗
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => scroll(1)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Next"
      >
        →
      </button>
    </div>
  );
}








// "use client";

// import { useRef } from "react";

// export default function Gallery({ items }: { items: { label: string }[] }) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (dir: 1 | -1) => {
//     scrollRef.current?.scrollBy({ left: dir * 350, behavior: "smooth" });
//   };

//   return (
//     <div className="relative border-t border-line">
//       <button
//         onClick={() => scroll(-1)}
//         className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
//         aria-label="Previous"
//       >
//         ←
//       </button>

//       <div
//         ref={scrollRef}
//         className="flex gap-0.5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//       >
//         {items.map((item, i) => (
//           <div
//             key={item.label}
//             className="snap-start shrink-0 w-[340px] h-[260px] flex items-end bg-gradient-to-br from-panel to-bg-soft"
//             style={{
//               backgroundImage:
//                 i % 2 === 0
//                   ? "linear-gradient(150deg, #1a1a30, #0c0c14)"
//                   : "linear-gradient(150deg, #241a30, #120c18)",
//             }}
//           >
//             <span className="m-3.5 rounded-full bg-black/55 backdrop-blur-md px-3 py-1.5 font-mono text-[11px]">
//               {item.label}
//             </span>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => scroll(1)}
//         className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-ink text-bg flex items-center justify-center"
//         aria-label="Next"
//       >
//         →
//       </button>
//     </div>
//   );
// }