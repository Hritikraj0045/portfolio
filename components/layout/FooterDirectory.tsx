"use client";

import Link from "next/link";
import { navLinks, socials } from "@/lib/data";
import Clock from "./Clock";

const expertise = [
  "AGENTIC SYSTEMS",
  "MCP PROTOCOL",
  "NEXT.JS 16 APP ROUTER",
  "DISTRIBUTED WORKFLOWS",
  "LANGGRAPH ORCHESTRATION",
  "PRODUCTION RAG",
];

export default function FooterDirectory() {
  return (
    <section className="border-t border-line">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

        {/* MENU */}
        <div className="min-h-[360px] border-b md:border-r xl:border-b-0 border-line p-8 md:p-10">
          <div className="flex items-center justify-between border-b border-line pb-5">
            <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
              MENU
            </span>

            <span className="font-mono text-xs text-ink-dim">
              [01]
            </span>
          </div>

          <nav className="mt-8 flex flex-col gap-5">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-3 font-mono text-sm tracking-wider hover:text-accent transition-colors"
              >
                <span className="text-xs text-ink-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{link.label}</span>

                <span className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                  ↗
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* NETWORK */}
        <div className="min-h-[360px] border-b xl:border-r xl:border-b-0 border-line p-8 md:p-10">
          <div className="flex items-center justify-between border-b border-line pb-5">
            <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
              NETWORK
            </span>

            <span className="font-mono text-xs text-ink-dim">
              [02]
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between font-mono text-sm tracking-wider hover:text-accent transition-colors"
              >
                <span>{social.label.toUpperCase()}</span>
                <span>↗</span>
              </a>
            ))}

            <a
              href="mailto:hritikraj2000@outlook.com"
              className="group flex items-center justify-between font-mono text-sm tracking-wider hover:text-accent transition-colors"
            >
              <span>DIRECT EMAIL</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* EXPERTISE */}
        <div className="min-h-[360px] border-b md:border-r xl:border-b-0 border-line p-8 md:p-10">
          <div className="flex items-center justify-between border-b border-line pb-5">
            <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
              EXPERTISE
            </span>

            <span className="font-mono text-xs text-ink-dim">
              [03]
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {expertise.map((item) => (
              <span
                key={item}
                className="border border-line px-3 py-2 font-mono text-xs tracking-wider text-ink-dim transition-colors hover:bg-ink hover:text-bg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* AVAILABILITY */}
        <div className="min-h-[360px] p-8 md:p-10">
          <div className="flex items-center justify-between border-b border-line pb-5">
            <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
              AVAILABILITY
            </span>

            <span className="font-mono text-xs text-ink-dim">
              [04]
            </span>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-3 font-mono text-sm tracking-wider">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span>AVAILABLE — FREELANCING & FULL-TIME</span>
            </div>

            <div className="mt-6 space-y-2 font-mono text-xs tracking-wider text-ink-dim">
              <div>MAHARASHTRA, INDIA</div>

              <div className="flex items-center gap-3">
                <Clock />
                <span>UTC +5:30</span>
              </div>
            </div>

            <Link
              href="/connect"
              className="mt-8 inline-flex border border-line px-6 py-4 font-mono text-xs tracking-[0.15em] transition-colors hover:bg-ink hover:text-bg"
            >
              INITIATE CONTACT ↗
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}