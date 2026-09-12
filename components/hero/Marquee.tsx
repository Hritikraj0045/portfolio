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

      {/* ================= OPEN MENU ================= */}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.35,
                delay: 0.08,
              },
            }}
            className="w-full overflow-hidden bg-[#d4d4d0] dark:bg-black"
          >
            <div className="w-full px-6 md:px-12 py-10 md:py-14">
              {/* 3 COLUMNS × 2 ROWS */}
              <div className="grid grid-cols-3 w-full">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={isActive ? "/" : link.href}
                      onClick={closeMenu}
                      className="
                        group
                        relative
                        flex
                        items-center
                        justify-between
                        overflow-hidden
                        min-h-[90px]
                        px-7
                        md:px-10
                      "
                    >
                      {/* Blue hover panel */}
                      <span
                        className="
                          absolute
                          inset-0
                          origin-left
                          scale-x-0
                          bg-accent
                          transition-transform
                          duration-300
                          ease-out
                          group-hover:scale-x-100
                        "
                      />

                      {/* Text */}
                      <span
                        className="
                          relative
                          z-10
                          flex
                          items-center
                          gap-4
                          font-mono
                          text-lg
                          text-[#222]
                          dark:text-[#aaa]
                          transition-colors
                          duration-200
                          group-hover:text-white
                        "
                      >
                        <span className="text-[11px] opacity-50">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span>
                          {isActive ? "HOME" : link.label}
                        </span>
                      </span>

                      {/* Arrow */}
                      <span
                        className="
                          relative
                          z-10
                          text-base
                          text-[#222]
                          dark:text-[#aaa]
                          transition-colors
                          duration-200
                          group-hover:text-white
                        "
                      >
                        ↗
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}