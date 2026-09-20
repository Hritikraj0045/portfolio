"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data";
import type { BlogPostType } from "@/types";

const categories: ("ALL" | BlogPostType)[] = [
  "ALL",
  "CASE STUDY",
  "DEEP DIVE",
  "ENGINEERING NOTES",
  "REVIEWS",
];

export default function BlogList() {
  const [activeCategory, setActiveCategory] =
    useState<"ALL" | BlogPostType>("ALL");

  const filteredPosts =
    activeCategory === "ALL"
      ? blogPosts
      : blogPosts.filter((post) => post.type === activeCategory);

  return (
    <section id="blog-list" className="border-b border-line">
      <div className="px-6 md:px-10 py-7 border-b border-line">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <span className="font-mono text-xs tracking-[0.2em] text-ink-dim">
            03 / {activeCategory === "ALL" ? "ALL POSTS" : activeCategory}
          </span>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`font-mono text-[10px] tracking-[0.08em] border rounded-full px-3 py-1.5 transition-colors ${
                    isActive
                      ? "bg-ink text-bg border-ink"
                      : "border-line text-ink-dim hover:text-ink hover:border-ink"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs text-ink-dim hidden lg:block">
            SORTED BY LATEST
          </span>
        </div>
      </div>

      <div>
        {filteredPosts.map((post, i) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative px-6 md:px-10 py-10 border-b border-line overflow-hidden"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-panel transition-transform duration-300 ease-out group-hover:scale-x-100" />

              <div className="relative grid md:grid-cols-[60px_1fr_auto] gap-4 md:gap-10 items-start">
                <span className="font-mono text-xs text-ink-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-mono text-[10px] tracking-[0.12em] text-accent">
                      {post.type}
                    </span>
                  </div>

                  <h3 className="font-display uppercase text-2xl md:text-4xl leading-[1.05] mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>

                  <p className="font-mono text-sm text-ink-dim leading-relaxed max-w-xl mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] border border-line rounded-full px-3 py-1 text-ink-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-ink-dim shrink-0 flex md:flex-col justify-between md:justify-start gap-2 md:gap-1.5">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <span>{post.readTime}</span>

                  <span className="text-accent">Read ↗</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}

        {filteredPosts.length === 0 && (
          <div className="px-6 md:px-10 py-20 font-mono text-sm text-ink-dim">
            NO POSTS IN THIS CATEGORY YET.
          </div>
        )}
      </div>
    </section>
  );
}