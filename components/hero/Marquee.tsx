"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import { useMenu } from "@/components/ui/MenuContext";

type MarqueeProps = {
  items?: readonly string[];
  showTicker?: boolean;
};

export default function Marquee({
  items = [],
  showTicker = true,
}: MarqueeProps) {
  const { open, closeMenu } = useMenu();
  const pathname = usePathname();

  const dotColors = [
    "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.7)]",
    "bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.7)]",
    "bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.7)]",
    "bg-pink-400 shadow-[0_0_6px_rgba(244,114,182,0.7)]",
    "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]",
  ];

  return (
    <div
      className={`w-full overflow-hidden ${
        showTicker || open ? "border-y border-line" : ""
      }`}
    >
      {/* ================= CLOSED MARQUEE ================= */}

      {showTicker && (
        <motion.div
          animate={{
            height: open ? 0 : 70,
            opacity: open ? 0 : 1,
          }}
          transition={{
            height: {
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 0.25,
            },
          }}
          className="overflow-hidden"
        >
          <div className="h-[70px] flex items-center overflow-hidden">
            <div
              className="flex w-max items-center"
              style={{
                animation: "portfolio-marquee 25s linear infinite",
                willChange: "transform",
              }}
            >
              {[...items, ...items].map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-center shrink-0"
                >
                  <span className="px-10 font-mono text-[13px] tracking-[0.18em] text-ink-dim uppercase whitespace-nowrap">
                    {item}
                  </span>

                  <span className="flex items-center justify-center px-10">
                    <span
                      className={`w-[5px] h-[5px] rounded-full ${
                        dotColors[index % dotColors.length]
                      }`}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}


    </div>
  );
}