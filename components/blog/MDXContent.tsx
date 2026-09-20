import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

interface MDXContentProps {
  source: string;
}

function BlogImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-12">
      <div className="relative w-full overflow-hidden border border-line bg-panel">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          className="w-full h-auto object-cover"
        />
      </div>

      {caption && (
        <figcaption className="mt-3 font-mono text-[10px] leading-relaxed tracking-wide text-ink-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function MDXContent({ source }: MDXContentProps) {

  return (
    <div className="blog-content blog-sections">
      <MDXRemote
        source={source}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display uppercase text-4xl md:text-6xl leading-[0.95] mt-16 mb-8">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <div className="blog-section-heading">
                <div className="font-mono text-[10px] tracking-[0.2em] text-accent mb-3">
                SECTION
                </div>

                <h2 className="font-display uppercase text-3xl md:text-5xl leading-[0.95]">
                {children}
                </h2>
            </div>
        ),

          h3: ({ children }) => (
            <h3 className="font-display uppercase text-xl md:text-3xl leading-tight mt-12 mb-4">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="font-mono text-sm md:text-[15px] leading-[1.9] text-ink-dim mb-6">
              {children}
            </p>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-ink">{children}</strong>
          ),

          em: ({ children }) => (
            <em className="text-ink">{children}</em>
          ),

          ul: ({ children }) => (
            <ul className="font-mono text-sm md:text-[15px] leading-[1.9] text-ink-dim list-disc pl-6 mb-8 space-y-2">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="font-mono text-sm md:text-[15px] leading-[1.9] text-ink-dim list-decimal pl-6 mb-8 space-y-2">
              {children}
            </ol>
          ),

          li: ({ children }) => <li>{children}</li>,

          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent pl-6 my-10 font-mono text-sm md:text-base leading-relaxed text-ink">
              {children}
            </blockquote>
          ),

          code: ({ children }) => (
            <code className="font-mono text-[0.9em] px-1.5 py-0.5 border border-line bg-panel text-accent rounded-sm">
              {children}
            </code>
          ),

          pre: ({ children }) => (
            <pre className="my-10 overflow-x-auto border border-line bg-panel p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed text-ink">
              {children}
            </pre>
          ),

          hr: () => <hr className="border-0 border-t border-line my-14" />,

          a: ({ children, href }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
              className="text-accent underline underline-offset-4 hover:text-ink transition-colors"
            >
              {children}
            </a>
          ),

          img: ({ src, alt }) => (
            <BlogImage src={src || ""} alt={alt || ""} />
          ),

          BlogImage,
        }}
      />
    </div>
  );
}