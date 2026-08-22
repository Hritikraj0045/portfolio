import Reveal from "./Reveal";
import { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <Reveal>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 px-10 pt-28 pb-10">
        <div>
          <span className="block mb-2.5 italic text-ink-dim text-lg">{eyebrow}</span>
          <h2 className="font-display uppercase text-[clamp(38px,6.5vw,84px)] leading-[0.92]">
            {title}
          </h2>
        </div>
        {description && (
          <p className="max-w-[320px] font-mono text-[13px] text-ink-dim leading-relaxed md:text-right">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}