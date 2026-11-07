"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function FloatingAskButton() {
  const pathname = usePathname();
  if (pathname === "/ask") return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/ask"
        aria-label="Ask AI about Hritik"
        className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <span className="font-mono text-xs">ASK</span>
      </Link>
    </motion.div>
  );
}