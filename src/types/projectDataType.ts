export interface TechStack {
  name: string;
  icon: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  image: string;
  technologies: string[];
  mainTech?: TechStack[];
  features: string[];
  challenges: string[];
  improvements: string[];
  liveUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  category: "Full Stack" | "Frontend" | "Backend" | string;
}
