"use client";

import { motion } from "framer-motion";

const stack = [
  { name: "NEXT.JS", glyph: "circle-rings" },
  { name: "REACT", glyph: "hex" },
  { name: "TYPESCRIPT", glyph: "square" },
  { name: "NODE.JS", glyph: "chevron" },
  { name: "FASTAPI", glyph: "dot-grid" },
  { name: "POSTGRESQL", glyph: "petal" },
  { name: "PRISMA", glyph: "diamond" },
  { name: "LANGGRAPH", glyph: "star-cluster" },
  { name: "MCP", glyph: "octagon" },
  { name: "OPENAI / LLMS", glyph: "orbit" },
  { name: "DOCKER", glyph: "layers" },
  { name: "GIT", glyph: "fork" },
];

function Glyph({ type }: { type: string }) {
  const stroke = "currentColor";
  switch (type) {
    case "circle-rings":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <circle cx="30" cy="30" r="26" stroke={stroke} strokeWidth="1.5" />
          <line x1="4" y1="20" x2="56" y2="20" stroke={stroke} strokeWidth="1.5" />
          <line x1="4" y1="30" x2="56" y2="30" stroke={stroke} strokeWidth="1.5" />
          <line x1="4" y1="40" x2="56" y2="40" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "hex":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <polygon points="30,6 52,18 52,42 30,54 8,42 8,18" stroke={stroke} strokeWidth="1.5" />
          <circle cx="30" cy="30" r="8" fill={stroke} />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <polygon points="30,8 52,30 30,52 8,30" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "chevron":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <circle cx="30" cy="30" r="24" stroke={stroke} strokeWidth="1.5" />
          <path d="M20 40 L30 20 L40 40" stroke={stroke} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "dot-grid":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill={stroke}>
          {[12, 24, 36, 48].flatMap((x) =>
            [12, 24, 36, 48].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" />)
          )}
        </svg>
      );
    case "petal":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill={stroke}>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="30"
              cy="18"
              rx="6"
              ry="12"
              transform={`rotate(${deg} 30 30)`}
              opacity="0.9"
            />
          ))}
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <polygon points="30,6 46,30 30,54 14,30" stroke={stroke} strokeWidth="1.5" />
          <circle cx="30" cy="30" r="6" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "star-cluster":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill={stroke}>
          {[[18, 18], [42, 18], [30, 38], [18, 46], [42, 46]].map(([cx, cy], i) => (
            <polygon
              key={i}
              points="0,-6 1.8,-1.8 6,0 1.8,1.8 0,6 -1.8,1.8 -6,0 -1.8,-1.8"
              transform={`translate(${cx} ${cy})`}
            />
          ))}
        </svg>
      );
    case "octagon":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <polygon
            points="20,8 40,8 52,20 52,40 40,52 20,52 8,40 8,20"
            stroke={stroke}
            strokeWidth="1.5"
          />
        </svg>
      );
    case "orbit":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <ellipse cx="30" cy="30" rx="26" ry="12" stroke={stroke} strokeWidth="1.5" />
          <ellipse cx="30" cy="30" rx="12" ry="26" stroke={stroke} strokeWidth="1.5" />
          <circle cx="30" cy="30" r="3" fill={stroke} />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <polygon points="30,10 50,22 30,34 10,22" stroke={stroke} strokeWidth="1.5" />
          <polygon points="30,26 50,38 30,50 10,38" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case "fork":
      return (
        <svg viewBox="0 0 60 60" className="w-14 h-14" fill="none">
          <circle cx="18" cy="14" r="5" stroke={stroke} strokeWidth="1.5" />
          <circle cx="42" cy="14" r="5" stroke={stroke} strokeWidth="1.5" />
          <circle cx="30" cy="46" r="5" stroke={stroke} strokeWidth="1.5" />
          <path d="M18 19 V28 Q18 34 24 34 H36 Q42 34 42 28 V19" stroke={stroke} strokeWidth="1.5" fill="none" />
          <line x1="30" y1="34" x2="30" y2="41" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    default:
      return <div className="w-14 h-14 rounded-full border border-current" />;
  }
}

export default function AboutTechnology() {
  return (
    <section className="border-b border-line">
      <div className="px-6 md:px-10 py-7 border-b border-line flex justify-between">
        <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">04 / ECOSYSTEM</span>
        <span className="font-mono text-xs text-ink-dim">{stack.length} TOOLS</span>
      </div>

      <div className="px-6 md:px-10 py-14 md:py-20">
        <h2 className="font-display uppercase text-[clamp(40px,6.5vw,90px)] leading-[0.9] tracking-[-0.02em] max-w-4xl">
          CORE TECHNOLOGIES &amp; ECOSYSTEM
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t border-l border-line">
        {stack.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -4 }}
            className="relative border-b border-r border-line px-6 py-10 min-h-[220px] flex flex-col justify-between text-ink-dim hover:text-ink transition-colors"
          >
            <div className="flex justify-between items-start">
              <span className="w-2.5 h-2.5 border border-current" />
              <span className="font-mono text-xs tracking-wide">{tech.name}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <Glyph type={tech.glyph} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}