export interface SocialLink {
  href: string;
  label: string;
  iconName: "github" | "linkedin" | "mail";
}

export interface SkillItem {
  name: string;
  icon: string;
}

export interface HeroData {
  greeting: string;
  name: string;
  role: string;
  description: string;
  resumeUrl: string;
  profileImage: string;
  socialLinks: SocialLink[];
  skills: {
    innerCircle: SkillItem[];
    middleCircle: SkillItem[];
    thirdCircle: SkillItem[];
    outerCircle: SkillItem[];
  };
}

export const heroData: HeroData = {
  greeting: "Hi, I'm",
  name: "Biswanath",
  role: "MERN Stack Web Developer",
  description:
    "Crafting modern, responsive, and user-friendly web applications with passion and precision.",
  resumeUrl:
    "https://drive.google.com/file/d/1ztfZQBwpZmJhdonW6V-5wnhg5vGOqMbn/view?usp=sharing",
  profileImage: "/assets/heroProfile.jpeg",

  socialLinks: [
    {
      href: "https://github.com/BiswanathBD",
      label: "GitHub",
      iconName: "github",
    },
    {
      href: "https://www.linkedin.com/in/biswanath-sarker-bd/",
      label: "LinkedIn",
      iconName: "linkedin",
    },
    {
      href: "mailto:biswanath.sarker.bd@gmail.com",
      label: "Email",
      iconName: "mail",
    },
  ],

  skills: {
    innerCircle: [
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
    ],

    middleCircle: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
    ],

    thirdCircle: [
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "Prisma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
      },
    ],

    outerCircle: [
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
    ],
  },
};
