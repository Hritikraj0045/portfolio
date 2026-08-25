import type { SkillGroup, SkillItem } from "@/types";
import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  Braces,
  Database,
  FileText,
  GitBranch,
  Globe,
  MessageSquare,
  Network,
  Server,
  Workflow,
} from "lucide-react";

import {
  SiCss,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiFramer,
  SiGit,
  SiGithub,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSelenium,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  html: SiHtml5,
  css: SiCss,

  python: SiPython,
  fastapi: SiFastapi,
  flask: SiFlask,
  node: SiNodedotjs,
  postgresql: SiPostgresql,
  firebase: SiFirebase,

  pandas: SiPandas,
  numpy: SiNumpy,
  powerbi: BarChart3,
  dax: BarChart3,
  sql: Database,
  etl: Workflow,
  extraction: FileText,
  dashboard: BarChart3,

  selenium: SiSelenium,
  playwright: SiSelenium,
  beautifulsoup: Globe,
  requests: Network,
  scraping: Globe,
  pdf: FileText,
  scheduler: Activity,
  pipeline: Workflow,

  openai: Brain,
  agents: Bot,
  nlp: MessageSquare,
  rag: Database,
  huggingface: SiHuggingface,
  nlsql: Database,
  integration: Braces,
  chatbot: MessageSquare,

  aws: Server,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  cicd: GitBranch,
  linux: SiLinux,
  vercel: SiVercel,
  monitoring: Activity,
};

function SkillIcon({ skill }: { skill: SkillItem }) {
  const Icon = iconMap[skill.icon] ?? Server;

  return (
    <div
      className="
        relative
        flex
        h-16
        w-16
        md:h-20
        md:w-20
        items-center
        justify-center
        transition-transform
        duration-300
        group-hover/card:scale-110
      "
      style={{
        color: skill.color,
        filter: `drop-shadow(0 0 10px ${skill.color}28)`,
      }}
    >
      <Icon size={48} strokeWidth={1.5} />

      {/* subtle logo frame */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-30
          transition-opacity
          duration-300
          group-hover/card:opacity-70
        "
        style={{
          boxShadow: `inset 0 0 0 1px ${skill.color}55`,
        }}
      />
    </div>
  );
}

export default function StackCard({ group }: { group: SkillGroup }) {
  return (
    <section className="stack-card sticky top-0 min-h-screen bg-bg border-t border-line overflow-hidden flex flex-col justify-center px-6 md:px-10">

      {/* LARGE SECTION NUMBER */}
      <span
        aria-hidden="true"
        className="
          absolute
          left-6 md:left-10
          top-[8%]
          z-[1]
          font-display
          text-[clamp(70px,9vw,140px)]
          leading-none
          tracking-[-0.04em]
          select-none
          pointer-events-none
          text-black/[0.08]
          dark:text-white/[0.07]
        "
      >
        {group.number}
      </span>

      {/* SECTION TITLE */}
      <div className="relative z-10 flex justify-end mb-8">
        <h3
          className="
            font-display
            uppercase
            text-right
            leading-[0.85]
            text-[clamp(48px,8vw,110px)]
          "
        >
          {group.title}
        </h3>
      </div>

      {/* SKILLS GRID */}
      <div
        className="
          relative
          z-10
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-px
          bg-line
          border
          border-line
          group/skills
        "
      >
        {group.skills.map((skill) => (
          <div
            key={skill.name}
            className="
              group/card
              relative
              min-h-[190px]
              md:min-h-[220px]
              bg-[#1c1c1c] 
              dark:bg-bg
              flex
              flex-col
              items-center
              justify-center
              px-6
              py-8
              text-center
              overflow-hidden
              transition-all
              duration-300
              ease-out
              group-hover/skills:opacity-35
              group-hover/skills:scale-[0.99]
              hover:!opacity-100
              hover:!scale-[1.02]
              hover:z-20
              hover:bg-panel
            "
          >
            {/* TOP METADATA */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
              <span className="w-1.5 h-1.5 bg-ink-dim" />

              <span className="font-mono text-[10px] tracking-widest text-ink-dim uppercase">
                {skill.name}
              </span>

              <span className="w-1.5 h-1.5 bg-ink-dim" />
            </div>

            {/* TECHNOLOGY LOGO */}
            <SkillIcon skill={skill} />

            {/* DESCRIPTION */}
            <p className="mt-5 font-mono text-[11px] text-ink-dim transition-colors duration-300 group-hover/card:text-ink">
              {skill.description}
            </p>

            {/* FOCUS BORDER */}
            <span
              className="
                absolute
                inset-0
                pointer-events-none
                opacity-0
                group-hover/card:opacity-100
                transition-opacity
                duration-300
              "
              style={{
                boxShadow: `inset 0 0 0 1px ${skill.color}`,
              }}
            />

            {/* BOTTOM ACCENT */}
            <span
              className="
                absolute
                bottom-0
                left-0
                h-[3px]
                w-0
                group-hover/card:w-full
                transition-all
                duration-300
              "
              style={{
                backgroundColor: skill.color,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}







// import type { SkillGroup } from "@/types";

// export default function StackCard({ group }: { group: SkillGroup }) {
//   return (
//     <section className="stack-card sticky top-0 min-h-screen bg-bg border-t border-line overflow-hidden flex flex-col justify-center px-6 md:px-10">

//       {/* LARGE SECTION NUMBER */}
//       <span
//         aria-hidden="true"
//         className="
//           absolute
//           left-6 md:left-10
//           top-[10%]
//           z-[1]
//           font-display
//           text-[clamp(100px,14vw,120px)]
//           leading-none
//           tracking-[-0.01em]
//           select-none
//           pointer-events-none
//           text-black/[0.08]
//           dark:text-white/[0.07]
//         "
//       >
//         {group.number}
//       </span>

//       {/* SECTION TITLE */}
//       <div className="relative z-10 flex justify-end mb-8">
//         <h3
//           className="
//             font-display
//             uppercase
//             text-right
//             leading-[0.85]
//             text-[clamp(48px,8vw,110px)]
//           "
//         >
//           {group.title}
//         </h3>
//       </div>

//       {/* SKILLS GRID */}
//       <div
//         className="
//           relative
//           z-10
//           grid
//           grid-cols-2
//           md:grid-cols-3
//           lg:grid-cols-4
//           gap-px
//           bg-line
//           border
//           border-line
//           group/skills
//         "
//       >
//         {group.skills.map((skill) => (
//           <div
//             key={skill.name}
//             className="
//               group/card
//               relative
//               min-h-[190px]
//               md:min-h-[220px]
//               bg-bg
//               flex
//               flex-col
//               items-center
//               justify-center
//               px-6
//               py-8
//               text-center
//               overflow-hidden
//               transition-all
//               duration-300
//               ease-out
//               group-hover/skills:opacity-40
//               hover:!opacity-100
//               hover:!scale-[1.02]
//               hover:z-20
//               hover:bg-panel
//             "
//           >
//             {/* Top metadata */}
//             <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
//               <span className="w-1.5 h-1.5 bg-ink-dim" />

//               <span className="font-mono text-[10px] tracking-widest text-ink-dim uppercase">
//                 {skill.name}
//               </span>

//               <span className="w-1.5 h-1.5 bg-ink-dim" />
//             </div>

//             {/* Icon */}
//             <div
//               className="
//                 w-16 h-16
//                 md:w-20 md:h-20
//                 rounded-full
//                 flex items-center justify-center
//                 transition-transform duration-300
//                 group-hover/card:scale-110
//               "
//               style={{
//                 border: `1.5px solid ${skill.color}`,
//                 boxShadow: `0 0 0 4px ${skill.color}18`,
//               }}
//             >
//               <span
//                 className="w-3 h-3 rounded-full"
//                 style={{
//                   backgroundColor: skill.color,
//                 }}
//               />
//             </div>

//             {/* Description */}
//             <p className="mt-5 font-mono text-[11px] text-ink-dim transition-colors duration-300 group-hover/card:text-ink">
//               {skill.description}
//             </p>

//             {/* Focus border */}
//             <span
//               className="
//                 absolute
//                 inset-0
//                 pointer-events-none
//                 opacity-0
//                 group-hover/card:opacity-100
//                 transition-opacity
//                 duration-300
//               "
//               style={{
//                 boxShadow: `inset 0 0 0 1px ${skill.color}`,
//               }}
//             />

//             {/* Bottom accent */}
//             <span
//               className="
//                 absolute
//                 bottom-0
//                 left-0
//                 h-[3px]
//                 w-0
//                 bg-accent
//                 group-hover/card:w-full
//                 transition-all
//                 duration-300
//               "
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

