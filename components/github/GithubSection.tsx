import { getGithubStats } from "@/lib/github";
import Heatmap from "./Heatmap";
import Reveal from "@/components/ui/Reveal";

export default async function GithubSection() {
  const stats = await getGithubStats();

  return (
    <section className="bg-bg-soft relative mt-16 pl-[50px]">
 
      <div className="absolute left-0 top-0 bottom-0 w-[50px] bg-accent-2 flex items-center justify-center">
                <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-xs tracking-widest text-bg font-bold">
                FOLLOW ON GITHUB
                </span>
     </div>
       <div className="px-10 pt-24 pb-16">
        <Reveal>
        <div className="flex justify-between items-end mb-12 flex-wrap gap-5">
          <h2 className="font-display uppercase text-[clamp(34px,5vw,58px)] max-w-[520px]">
            Open Source Journey
          </h2>
          <p className="max-w-[280px] font-mono text-[13px] text-ink-dim leading-relaxed">
            SEE HOW I DESIGN, BUILD, AND SHIP PUBLIC SOFTWARE WITH CONSISTENCY AND CLEAN ARCHITECTURE.
          </p>
        </div>
      </Reveal>
        <div className="grid md:grid-cols-[220px_1fr] gap-10 items-start">
          <div>
            <div className="grid grid-cols-2 gap-6 mb-6 font-mono">
              <div>
                <span className="block text-[11px] text-ink-dim mb-1.5">CONTRIBUTIONS</span>
                <b className="font-display text-3xl">{stats.contributions}</b>
              </div>
              <div>
                <span className="block text-[11px] text-ink-dim mb-1.5">REPOSITORIES</span>
                <b className="font-display text-3xl">{stats.repositories}</b>
              </div>
              <div>
                <span className="block text-[11px] text-ink-dim mb-1.5">STARS</span>
                <b className="font-display text-3xl">{stats.stars}</b>
              </div>
              <div>
                <span className="block text-[11px] text-ink-dim mb-1.5">FOLLOWERS</span>
                <b className="font-display text-3xl">{stats.followers}</b>
              </div>
            </div>
            
            <a
              href={`https://github.com/${stats.username}`}
              target="_blank"
              className="inline-flex items-center gap-2 font-mono text-xs border border-line px-5 py-3"
            >
              VIEW PROFILE ↗
            </a>
          </div>

          <div className="bg-panel border border-line p-6 overflow-x-auto">
            <Heatmap data={stats.heatmap} />
            <div className="flex justify-between mt-3.5 font-mono text-[11px] text-ink-dim">
              <span>{stats.contributions} contributions in the last year</span>
              <span>
                Less{" "}
                <span className="text-accent-2 bg-gradient-to-r from-green-900 via-green-500 to-green-300 bg-clip-text text-transparent">
                  ■■■■
                </span>{" "}
                More
              </span>
            </div>
          </div>
        </div>

        <div className="font-display uppercase text-[clamp(50px,11vw,140px)] text-ink-dim/50 pt-10">
          Contributions
        </div>
      </div>
    </section>
  );
}