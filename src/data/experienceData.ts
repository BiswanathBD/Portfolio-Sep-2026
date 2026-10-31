export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyLogo: string;
  companyUrl?: string;
  companyLinkedin?: string;
  location: string;
  jobType: "Remote" | "On-site" | "Hybrid";
  employmentType: "Internship" | "Full-time" | "Part-time" | "Contract";
  startDate: string;
  endDate: string | "Present";
  description: string[];
  skills: string[];
  projectsWorkedOn?: {
    name: string;
    description: string;
    liveUrl?: string;
  }[];
  keyHighlights?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "rise-together-internship",
    role: "MERN Stack Developer Intern",
    company: "Rise Together",
    companyLogo: "/assets/rise-together.png",
    companyUrl: "https://www.risetogetherbd.com",
    companyLinkedin: "https://www.linkedin.com/company/risetogetherbd/posts/?feedView=all",
    location: "Remote",
    jobType: "Remote",
    employmentType: "Internship",
    startDate: "15 May 2026",
    endDate: "Present",
    description: [
      "Building production-ready web applications using Next.js, React, TypeScript, Tailwind CSS, and REST APIs.",
      "Contributed to core production products like Fele Trip and Uparzo through UI/UX implementation, API integration, authentication, and technical SEO.",
      "Optimized application performance, deployment pipelines, and user experience in live production environments.",
      "Exploring and practicing modern backend tools and infrastructure including PostgreSQL, Prisma, Redis, Docker, Swagger, NestJS, and SSLCommerz.",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Authentication",
      "Technical SEO",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Redis",
      "NestJS",
    ],
    projectsWorkedOn: [
      {
        name: "Uparzo",
        description:
          "E-commerce Website Builder platform for business customization.",
        liveUrl: "https://uparzo.com/",
      },
      {
        name: "Fele Trip",
        description:
          "Hotel Booking Platform with availability, location features, and SEO.",
        liveUrl: "https://www.feletrip.com/",
      },
    ],
  },
];

export default experienceData;
