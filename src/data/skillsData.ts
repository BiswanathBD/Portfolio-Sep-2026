export interface Skill {
  name: string;
  icon: string;
  color?: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface StatItem {
  number: string;
  label: string;
  color: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        color: "text-orange-500",
        level: 95,
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        color: "text-primary",
        level: 90,
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        color: "text-yellow-400",
        level: 88,
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "text-secondary",
        level: 85,
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        color: "text-white",
        level: 80,
      },
      {
        name: "Tailwind CSS",
        icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
        color: "text-cyan-400",
        level: 92,
      },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "text-green-500",
        level: 82,
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        color: "text-gray-300",
        level: 78,
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "text-green-600",
        level: 75,
      },
    ],
  },
  {
    title: "Tools & Services",
    skills: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        color: "text-red-500",
        level: 85,
      },
      {
        name: "Postman",
        icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        color: "text-orange-500",
        level: 80,
      },
      {
        name: "Thunder Client",
        icon: "https://raw.githubusercontent.com/rangav/thunder-client-support/master/images/thunder-icon.png",
        color: "text-purple-400",
        level: 75,
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        color: "text-orange-400",
        level: 70,
      },
      {
        name: "Netlify",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
        color: "text-teal-400",
        level: 88,
      },
      {
        name: "Vercel",
        icon: "https://www.svgrepo.com/show/354513/vercel-icon.svg",
        color: "text-white",
        level: 85,
      },
    ],
  },
  {
    title: "UI/UX & Animation",
    skills: [
      {
        name: "GSAP",
        icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
        color: "text-green-500",
        level: 78,
      },
      {
        name: "Lenis",
        icon: "https://avatars.githubusercontent.com/u/67077908?s=200&v=4",
        color: "text-blue-400",
        level: 70,
      },
      {
        name: "Swiper",
        icon: "https://swiperjs.com/images/swiper-logo.svg",
        color: "text-blue-500",
        level: 75,
      },
      {
        name: "AOS",
        icon: "https://www.drupal.org/files/project-images/Drupal-AOSJS-Animate-On-Scroll-Javascript-Library.png",
        color: "text-cyan-400",
        level: 72,
      },
      {
        name: "Framer Motion",
        icon: "https://cdn.brandfetch.io/idDJv1mfrb/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1753779030563",
        color: "text-secondary",
        level: 85,
      },
      {
        name: "Daisy UI",
        icon: "https://img.daisyui.com/images/daisyui/mark-rotating.svg",
        color: "text-pink-400",
        level: 80,
      },
    ],
  },
];

export const statsData: StatItem[] = [
  { number: "15+", label: "Technologies", color: "text-primary" },
  { number: "30+", label: "Projects", color: "text-accent" },
  { number: "6+", label: "Months Experience", color: "text-accent" },
  { number: "100%", label: "Client Satisfaction", color: "text-primary" },
];
