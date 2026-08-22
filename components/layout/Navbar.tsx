"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/data";
import Clock from "./Clock";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-10 py-6">
      <Link href="/" className="font-display text-xl uppercase justify-self-start">
        YN.
      </Link>

      <div className="justify-self-center">
        <Clock />
      </div>

      <div className="flex items-center gap-4 justify-self-end">
        <ThemeToggle />

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="font-mono text-xs tracking-widest flex items-center gap-2"
          >
            MENU
            <span className="flex flex-col gap-[3px]">
              <span className="w-4 h-[1.5px] bg-ink" />
              <span className="w-4 h-[1.5px] bg-ink" />
              <span className="w-4 h-[1.5px] bg-ink" />
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 bg-panel border border-line rounded-md p-4 flex flex-col gap-3"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-mono text-sm text-ink-dim hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}