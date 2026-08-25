import type { Project, SkillGroup, CarouselCard } from "@/types";

// ============================================================
// Navigation
// ============================================================
export const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "/about" },
  { label: "BLOG", href: "/blog" },
  { label: "CONNECT", href: "#contact" },
  { label: "STATUS", href: "/status" },
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
  // 01 — Profile
  {
    type: "photo",
    label: "ME",
    variant: "one",
    image: "/images/prof.png",
  },

  // 02 — Metrics
  {
    type: "metrics",
    stats: [
      { value: "15+", label: "PROJECTS" },
      { value: "3+", label: "YEARS EXP" },
      { value: "7+", label: "CLIENTS" },
    ],
    image: "/images/metrics.jpg",
  },

  // 03 — Build With Me
  {
    type: "photo",
    label: "Build With Me",
    variant: "two",
    href: "/about",
    image: "/images/buildwithme.avif",
  },

  // 04 — Blog
  {
    type: "link",
    title: "BLOG",
    label: "READ MY NOTES",
    href: "/blog",
    image: "/images/blogs.png",
  },

  // 05 — Works
  {
    type: "link",
    title: "WORKS",
    label: "VIEW WORKS ↗",
    href: "/works",
    image: "/images/works.png",
  },

  // 06 — Ask Anything
  {
    type: "ask",
    href: "/chat",
    image: "/images/askmeanything.jpg",
  },

  // 06 — My Playlist
  {
    type: "link",
    title: "PLAYLIST",
    label: "LISTEN TO MY MUSIC ↗",
    href: "https://open.spotify.com/playlist/37i9dQZF1DWX76Z8XDsZzF",
    image: "/images/spotify.png",
  },
];

// ============================================================
// Selected Works — projects
// ============================================================
export const projects: Project[] = [
  {
    id: "meta-ads-nlq",
    index: "01",
    name: "Meta Ads NLQ",
    domain: "AI · Data Analytics · NLP",
    timeline: "2026 – Present",
    description:
      "A natural language query engine for Meta Ads data that translates business questions into SQL, executes them against campaign data, and presents the results in a simple analytical interface.",
    status: "Production deployed · evolving",
    links: {
      live: "#",
      source: "https://github.com/Hritikraj0045/nlq_engine_v2",
    },
    stats: [
      { value: "NLQ", label: "QUERY ENGINE" },
      { value: "SQL", label: "GENERATED QUERIES" },
      { value: "AI", label: "NATURAL LANGUAGE" },
    ],
    gallery: [
      {
        label: "Dashboard",
        image: "/images/dashboard.png",
      },
      {
        label: "Natural Language Queries",
        image: "/images/nlq.png",
      },
      {
        label: "Campaign Analytics",
        image: "/images/analytics.png",
      },
      {
        label: "SQL Generation",
        image: "/images/sql.png",
      },
      {
        label: "Core Tech",
        image: "/images/coretech.png",
      }
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
    description: "Interfaces, interaction and modern web experiences.",
    skills: [
      {
        name: "React",
        description: "Component-driven UI",
        color: "#61DAFB",
        icon: "react",
      },
      {
        name: "Next.js",
        description: "Full-stack React framework",
        color: "#FFFFFF",
        icon: "nextjs",
      },
      {
        name: "TypeScript",
        description: "Type-safe application code",
        color: "#3178C6",
        icon: "typescript",
      },
      {
        name: "JavaScript",
        description: "Modern web applications",
        color: "#F7DF1E",
        icon: "javascript",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling",
        color: "#06B6D4",
        icon: "tailwind",
      },
      {
        name: "Framer Motion",
        description: "Motion-driven interfaces",
        color: "#0055FF",
        icon: "framer",
      },
      {
        name: "HTML",
        description: "Semantic web structure",
        color: "#E34F26",
        icon: "html",
      },
      {
        name: "CSS",
        description: "Responsive visual systems",
        color: "#1572B6",
        icon: "css",
      },
    ],
  },

  {
    number: "02",
    title: "Backend & APIs",
    description: "Production services, APIs and application infrastructure.",
    skills: [
      {
        name: "Python",
        description: "Production backend systems",
        color: "#3776AB",
        icon: "python",
      },
      {
        name: "FastAPI",
        description: "High-performance Python APIs",
        color: "#009688",
        icon: "fastapi",
      },
      {
        name: "Flask",
        description: "Lightweight web services",
        color: "#FFFFFF",
        icon: "flask",
      },
      {
        name: "Node.js",
        description: "JavaScript runtime",
        color: "#339933",
        icon: "node",
      },
      {
        name: "REST APIs",
        description: "Service integration",
        color: "#22C55E",
        icon: "rest",
      },
      {
        name: "MSSQL",
        description: "Enterprise relational database",
        color: "#CC2927",
        icon: "mssql",
      },
      {
        name: "PostgreSQL",
        description: "Relational data storage",
        color: "#4169E1",
        icon: "postgresql",
      },
      {
        name: "Firebase",
        description: "Backend-as-a-service",
        color: "#FFCA28",
        icon: "firebase",
      },
    ],
  },

  {
    number: "03",
    title: "Data & Analytics",
    description: "Data processing, extraction, modelling and analytical systems.",
    skills: [
      {
        name: "Pandas",
        description: "Data manipulation",
        color: "#150458",
        icon: "pandas",
      },
      {
        name: "NumPy",
        description: "Numerical computing",
        color: "#4D77CF",
        icon: "numpy",
      },
      {
        name: "SQL",
        description: "Data querying",
        color: "#F59E0B",
        icon: "sql",
      },
      {
        name: "Power BI",
        description: "Business intelligence",
        color: "#F2C811",
        icon: "powerbi",
      },
      {
        name: "DAX",
        description: "Analytical expressions",
        color: "#F2C811",
        icon: "dax",
      },
      {
        name: "ETL",
        description: "Data transformation pipelines",
        color: "#06B6D4",
        icon: "etl",
      },
      {
        name: "Data Extraction",
        description: "Structured information extraction",
        color: "#22C55E",
        icon: "extraction",
      },
      {
        name: "Dashboards",
        description: "Analytical interfaces",
        color: "#3B82F6",
        icon: "dashboard",
      },
    ],
  },

  {
    number: "04",
    title: "Automation",
    description: "Browser automation, scraping and repeatable data workflows.",
    skills: [
      {
        name: "Selenium",
        description: "Browser automation",
        color: "#43B02A",
        icon: "selenium",
      },
      {
        name: "Playwright",
        description: "Modern browser automation",
        color: "#2EAD33",
        icon: "playwright",
      },
      {
        name: "BeautifulSoup",
        description: "HTML parsing",
        color: "#F97316",
        icon: "beautifulsoup",
      },
      {
        name: "Requests",
        description: "HTTP automation",
        color: "#FFFFFF",
        icon: "requests",
      },
      {
        name: "Web Scraping",
        description: "Automated data extraction",
        color: "#22C55E",
        icon: "scraping",
      },
      {
        name: "PDF Extraction",
        description: "Document data extraction",
        color: "#EF4444",
        icon: "pdf",
      },
      {
        name: "Schedulers",
        description: "Scheduled workflows",
        color: "#A78BFA",
        icon: "scheduler",
      },
      {
        name: "Pipelines",
        description: "Repeatable processing workflows",
        color: "#06B6D4",
        icon: "pipeline",
      },
    ],
  },

  {
    number: "05",
    title: "AI & Agents",
    description: "LLMs, intelligent workflows and AI-powered applications.",
    skills: [
      {
        name: "LLMs",
        description: "Large language models",
        color: "#10A37F",
        icon: "openai",
      },
      {
        name: "AI Agents",
        description: "Autonomous AI workflows",
        color: "#8B5CF6",
        icon: "agents",
      },
      {
        name: "NLP",
        description: "Natural language processing",
        color: "#A78BFA",
        icon: "nlp",
      },
      {
        name: "RAG",
        description: "Retrieval-augmented generation",
        color: "#22D3EE",
        icon: "rag",
      },
      {
        name: "Transformers",
        description: "Modern NLP architectures",
        color: "#FFD21E",
        icon: "huggingface",
      },
      {
        name: "NL → SQL",
        description: "Natural language querying",
        color: "#3B82F6",
        icon: "nlsql",
      },
      {
        name: "AI Integration",
        description: "AI-powered application features",
        color: "#EC4899",
        icon: "integration",
      },
      {
        name: "Chatbots",
        description: "Conversational AI systems",
        color: "#22C55E",
        icon: "chatbot",
      },
    ],
  },

  {
    number: "06",
    title: "Cloud & DevOps",
    description: "Deployment, infrastructure and production operations.",
    skills: [
      {
        name: "AWS",
        description: "Cloud infrastructure",
        color: "#FF9900",
        icon: "aws",
      },
      {
        name: "Docker",
        description: "Containerized deployments",
        color: "#2496ED",
        icon: "docker",
      },
      {
        name: "Git",
        description: "Version control",
        color: "#F05032",
        icon: "git",
      },
      {
        name: "GitHub",
        description: "Code collaboration",
        color: "#FFFFFF",
        icon: "github",
      },
      {
        name: "CI/CD",
        description: "Automated deployments",
        color: "#22C55E",
        icon: "cicd",
      },
      {
        name: "Linux",
        description: "Production environments",
        color: "#FFFFFF",
        icon: "linux",
      },
      {
        name: "Vercel",
        description: "Modern web deployment",
        color: "#FFFFFF",
        icon: "vercel",
      },
      {
        name: "Monitoring",
        description: "Production observability",
        color: "#F59E0B",
        icon: "monitoring",
      },
    ],
  },
];