"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import { useMenu } from "@/components/ui/MenuContext";

export default function MenuOverlay() {
  const { open, closeMenu } = useMenu();
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-[76px] left-0 right-0 bottom-0 z-40 bg-[#d4d4d0] dark:bg-black overflow-y-auto"
        >
          <div className="min-h-full flex flex-col justify-center px-6 md:px-12 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={isActive ? "/" : link.href}
                    onClick={closeMenu}
                    className="group relative flex items-center justify-between overflow-hidden min-h-[120px] px-7 md:px-10"
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    <span className="relative z-10 flex items-center gap-4 font-mono text-2xl md:text-3xl text-[#222] dark:text-[#aaa] transition-colors duration-200 group-hover:text-white">
                      <span className="text-xs opacity-50">{String(index + 1).padStart(2, "0")}</span>
                      <span>{isActive ? "HOME" : link.label}</span>
                    </span>
                    <span className="relative z-10 text-lg text-[#222] dark:text-[#aaa] transition-colors duration-200 group-hover:text-white">
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
  );
}