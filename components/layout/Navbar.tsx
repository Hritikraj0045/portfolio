"use client";

import Link from "next/link";
import { useMenu } from "@/components/ui/MenuContext";
import { navLinks } from "@/lib/data";
import Clock from "./Clock";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const { open, toggleMenu } = useMenu();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-10 py-6 bg-bg/70 backdrop-blur-md border-b border-line">
      {/* Logo */}
      <Link
        href="/"
        className="font-display text-xl uppercase justify-self-start flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
        <span>HRITIK RAJ ARYA</span>
      </Link>

      {/* Clock */}
      <div className="justify-self-center">
        <Clock />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 justify-self-end">
        <ThemeToggle />

        <button
          onClick={toggleMenu}
          className="group font-mono text-xs tracking-widest flex items-center gap-3"
          aria-label="Toggle menu"
        >
          <span className="group-hover:text-accent transition-colors">
            MENU
          </span>

          {/* Hamburger → X */}
          <span className="relative flex flex-col gap-[4px] w-5">
            <span
              className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${
                open ? "rotate-45 translate-y-[5.5px]" : ""
              }`}
            />

            <span
              className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />

            <span
              className={`block w-5 h-[1.5px] bg-ink transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[5.5px]" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </nav>
  );
}