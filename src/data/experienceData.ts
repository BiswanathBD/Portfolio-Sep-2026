export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyLogo: string;
  companyUrl?: string;
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
    companyLogo:
      "https://scontent.fdac183-1.fna.fbcdn.net/v/t39.30808-6/671134194_122130811569118229_6337579141557797642_n.jpg?stp=dst-jpg_tt6&cstp=mx1500x1500&ctp=s1500x1500&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHr_bbOMTNBIz09hqkEGIh_4YstFA0PB67hiy0UDQ8HrrfWC8QohswSnWZTa6Rz59E8cSjH8Xfq8LxI_YKC8k4J&_nc_ohc=-ZUaTqDWGHYQ7kNvwFohDjo&_nc_oc=Adqq2t84ZwuHorEnphphYTFZquzsvIK8onQgpzZi_-slIYwhbU9CC4RSlUTYhy-sdPU&_nc_zt=23&_nc_ht=scontent.fdac183-1.fna&_nc_gid=TrOz17MiTC9WdSsHlETSHw&_nc_ss=7a2a8&oh=00_AQLN6x5SqfTPdJ5kE_PYRnPUj5nqt6rDNoBt1_S2WQBA9w&oe=6ABD8479",
    companyUrl: "https://www.risetogetherbd.com",
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
