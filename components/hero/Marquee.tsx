interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  // duplicate the items so the loop is seamless
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-line py-3.5">
      <div className="inline-flex animate-marquee">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[13px] tracking-widest text-ink-dim mx-6 inline-flex items-center gap-6"
          >
            <span className="text-accent">✤</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}