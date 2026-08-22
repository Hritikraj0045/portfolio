import type { Project, SkillGroup, CarouselCard } from "@/types";

// ============================================================
// Navigation
// ============================================================
export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
  { label: "Status", href: "/status" },
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/hritikraj0045" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hritik-raj-arya-b09584135/" },
  { label: "X", href: "https://x.com/Hr_aryaa" },
] as const;

// ============================================================
// Hero — carousel cards
// ============================================================
export const carouselCards: CarouselCard[] = [
  { type: "photo", label: "Hritik Raj Arya", variant: "one", image: "/images/prof.png" },
  {
    type: "metrics",
    stats: [
      { value: "15+", label: "PROJECTS" },
      { value: "3+", label: "YEARS EXP" },
      { value: "10+", label: "CLIENTS" },
    ],
  },
  { type: "photo", label: "Build With Me", variant: "two", href: "/about" },
  { type: "ask", href: "/chat" },
];

// ============================================================
// Selected Works — projects
// ============================================================
export const projects: Project[] = [
  {
    id: "project-one",
    index: "01",
    name: "Project One",
    domain: "SaaS · Dashboard",
    timeline: "Jan 2025 – Present",
    description:
      "Replace with a short summary of what the product does, the core architecture, and what makes it technically interesting.",
    status: "Production deployed · evolving",
    links: { live: "#", source: "#" },
    stats: [
      { value: "12", label: "API ENDPOINTS" },
      { value: "4", label: "INTEGRATIONS" },
      { value: "99.9%", label: "UPTIME" },
    ],
    gallery: [
      { label: "Landing Page" },
      { label: "Dashboard" },
      { label: "Analytics" },
      { label: "Settings" },
    ],
  },
  {
    id: "project-two",
    index: "02",
    name: "Project Two",
    domain: "Mobile · Realtime",
    timeline: "Jun 2024 – Dec 2024",
    description:
      "Replace with a short summary of the second project's purpose, stack, and standout engineering decisions.",
    status: "Production deployed",
    links: { live: "#", source: "#" },
    stats: [
      { value: "8", label: "RT CHANNELS" },
      { value: "50k+", label: "USERS" },
      { value: "4.8", label: "APP RATING" },
    ],
    gallery: [
      { label: "Home Feed" },
      { label: "Chat" },
      { label: "Profile" },
      { label: "Notifications" },
    ],
  },
];

// ============================================================
// Engineering Toolkit
// ============================================================
export const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "Frontend",
    skills: [
      { name: "React", description: "Component-driven UI", color: "#61dafb" },
      { name: "Next.js", description: "Full-stack React framework", color: "#c9c9c9" },
      { name: "TypeScript", description: "Type-safe application code", color: "#3178c6" },
      { name: "Tailwind CSS", description: "Utility-first styling", color: "#38bdf8" },
    ],
  },
  {
    number: "02",
    title: "Backend",
    skills: [
      { name: "Node.js", description: "JavaScript runtime & APIs", color: "#3fcf5e" },
      { name: "FastAPI", description: "Python async web framework", color: "#019486" },
      { name: "tRPC", description: "End-to-end typesafe APIs", color: "#398ccb" },
      { name: "GraphQL", description: "Flexible query layer", color: "#e10098" },
    ],
  },
  {
    number: "03",
    title: "AI & Agentic",
    skills: [
      { name: "LangGraph", description: "Stateful agent orchestration", color: "#a78bfa" },
      { name: "MCP Servers", description: "Tool-calling for AI clients", color: "#f97316" },
      { name: "Vercel AI SDK", description: "Streaming AI interfaces", color: "#f5f5f5" },
      { name: "RAG Pipelines", description: "Retrieval-augmented generation", color: "#22d3ee" },
    ],
  },
  {
    number: "04",
    title: "Databases",
    skills: [
      { name: "PostgreSQL", description: "Relational data store", color: "#336791" },
      { name: "MongoDB", description: "Document database", color: "#47a248" },
      { name: "Redis", description: "In-memory cache & queues", color: "#dc382d" },
      { name: "Prisma", description: "Type-safe ORM", color: "#5a67d8" },
    ],
  },
  {
    number: "05",
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", description: "Containerized deployments", color: "#2496ed" },
      { name: "GitHub Actions", description: "CI/CD automation", color: "#c9c9c9" },
      { name: "AWS", description: "Cloud infrastructure", color: "#ff9900" },
      { name: "CI/CD", description: "Automated build & release", color: "#22c55e" },
    ],
  },
];