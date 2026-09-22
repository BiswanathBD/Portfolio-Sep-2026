export interface SkillItem {
  id: string;
  title: string;
  description: string;
  colorType: "primary" | "accent";
}

export interface AboutImageProps {
  imageSrc: string;
  imageAlt: string;
}

export interface HighlightedChunk {
  text: string;
  highlight?: "primary" | "accent";
}

export type ParagraphItem = (string | HighlightedChunk)[];

export interface AboutContentProps {
  namePrefix: string;
  name: string;
  paragraphs: ParagraphItem[];
  skills: SkillItem[];
}

export interface AboutData {
  imageProps: AboutImageProps;
  contentProps: AboutContentProps;
}

export const aboutData: AboutData = {
  imageProps: {
    imageSrc: "/assets/aboutMeImg.png",
    imageAlt: "Biswanath Sarker - MERN Stack Developer",
  },
  contentProps: {
    namePrefix: "I'm",
    name: "Biswanath Sarker",
    paragraphs: [
      [
        { text: "I am a passionate " },
        { text: "MERN Stack developer", highlight: "primary" },
        {
          text: " and a fresher who genuinely enjoys building modern web applications. My interest in web development comes from my love for ",
        },
        { text: "art and painting", highlight: "accent" },
        { text: ", as it allows me to express creativity through " },
        { text: "UI design", highlight: "primary" },
        { text: " and visual layouts while solving real-world problems." },
      ],
      [
        { text: "I focus on writing " },
        { text: "clean code", highlight: "accent" },
        {
          text: " while maintaining strong attention to user experience and design aesthetics. I am a ",
        },
        { text: "quick learner", highlight: "primary" },
        {
          text: " patient problem solver, and continuously motivated to improve my skills by working on real projects and exploring both frontend and backend development to grow into a strong ",
        },
        { text: "full-stack developer.", highlight: "accent" },
      ],
    ],
    skills: [
      {
        id: "mern",
        title: "MERN Stack",
        description: "Building scalable apps with React, Node etc.",
        colorType: "primary",
      },
      {
        id: "ui",
        title: "UI Design",
        description: "Modern, responsive, and intuitive interfaces.",
        colorType: "accent",
      },
      {
        id: "problem",
        title: "Problem Solving",
        description: "Analyzing to write clean, efficient code.",
        colorType: "accent",
      },
      {
        id: "backend",
        title: "Backend APIs",
        description: "Secure RESTful APIs and database architecture.",
        colorType: "primary",
      },
    ],
  },
};
