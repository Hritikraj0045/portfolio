import type { SkillGroup } from "@/types";

export default function StackCard({ group }: { group: SkillGroup }) {
  return (
    <div className="stack-card sticky top-0 min-h-screen flex flex-col justify-center px-10 bg-bg border-t border-line relative overflow-hidden">
      <span className="absolute left-8 top-1/2 -translate-y-1/2 font-display text-[clamp(80px,14vw,220px)] text-bg-soft leading-none select-none">
        {group.number}
      </span>

      <h3 className="font-display uppercase text-[clamp(34px,6vw,72px)] text-right relative z-[1] mb-8">
        {group.title}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line border border-line relative z-[1]">
        {group.skills.map((skill) => (
          <div
            key={skill.name}
            className="bg-panel min-h-[170px] flex flex-col items-center justify-center gap-3 px-5 py-8 text-center"
          >
            <div
              className="w-11 h-11 rounded-full border-[1.5px] flex items-center justify-center"
              style={{ borderColor: skill.color, boxShadow: `0 0 0 3px ${skill.color}22` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: skill.color }} />
            </div>
            <span className="font-mono text-[11px] tracking-wide">{skill.name.toUpperCase()}</span>
            <span className="font-mono text-[10px] text-ink-dim leading-snug">{skill.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}