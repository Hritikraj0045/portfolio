export interface Project {
  id: string;
  index: string; // "01", "02"
  name: string;
  domain: string;
  timeline: string;
  description: string;
  status: string;
  links: {
    details?: string;
    live?: string;
    source?: string;
  };
  stats: { value: string; label: string }[];
  gallery: { label: string; image?: string }[];
}

export interface SkillItem {
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface SkillGroup {
  number: string;
  title: string;
  description?: string;
  skills: SkillItem[];
}

export interface GithubStats {
  username: string;
  contributions: number;
  repositories: number;
  stars: number;
  followers: number;
  heatmap: number[]; // 371 values, one per day, 0-4 intensity level
}

export type CarouselCard =
  | {
      type: "photo";
      label: string;
      variant: "one" | "two";
      href?: string;
      image?: string;
    }
  | {
      type: "metrics";
      stats: { value: string; label: string }[];
      image?: string;
      href?: string;
    }
  | {
      type: "link";
      title: string;
      label: string;
      href: string;
      image: string;
    }
  | {
      type: "ask";
      href?: string;
      image?: string;
    };