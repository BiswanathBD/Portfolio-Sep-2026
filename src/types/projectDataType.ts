export interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  improvements: string[];
  liveUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  category: "Full Stack" | "Frontend" | "Backend" | string;
}
