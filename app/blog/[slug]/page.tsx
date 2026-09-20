import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import MDXContent from "@/components/blog/MDXContent";

import Footer from "@/components/layout/Footer";
import PageNavigation from "@/components/layout/PageNavigation";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "content",
    "blog",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, "utf8");

  return (
    <>
      <PageNavigation />

      <main className="min-h-screen bg-bg">
        <div className="px-6 md:px-10 pt-28 pb-10 border-b border-line">
          <Link
            href="/blog"
            className="font-mono text-xs text-ink-dim hover:text-ink transition-colors"
          >
            ← BACK TO FIELD NOTES
          </Link>

          <h1 className="font-display uppercase text-[clamp(48px,8vw,110px)] leading-[0.9] mt-8 max-w-6xl">
            {post.title}
          </h1>

          <div className="flex gap-4 mt-6 font-mono text-xs text-ink-dim flex-wrap items-center">
            <span className="text-accent">{post.type}</span>

            <span>·</span>

            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <span>·</span>

            <span>{post.readTime}</span>

            <span>·</span>

            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-line rounded-full px-3 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <article className="px-6 md:px-10 py-16 md:py-24 max-w-4xl">
          <MDXContent source={content} />
        </article>
      </main>

      <Footer />
    </>
  );
}