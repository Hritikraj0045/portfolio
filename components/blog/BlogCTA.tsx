"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Magnetic from "@/components/ui/Magnetic";

export default function BlogCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section ref={ref} className="px-6 md:px-10 py-24 md:py-32 border-b border-line overflow-hidden">
      <div className="font-display uppercase leading-[0.9] text-[clamp(48px,9vw,140px)]">
        <motion.div style={{ x: xLeft }}>HAVE A SYSTEM</motion.div>
        <motion.div style={{ x: xRight }}>WORTH BUILDING?</motion.div>
      </div>

      <Magnetic>
        <Link
          href="/connect"
          className="inline-flex items-center gap-3 mt-10 border border-accent text-accent rounded-full px-6 py-3 font-mono text-sm"
        >
          GET IN TOUCH ↗
        </Link>
      </Magnetic>
    </section>
  );
}