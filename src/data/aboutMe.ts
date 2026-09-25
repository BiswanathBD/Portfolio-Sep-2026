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
        { text: "MERN Stack Developer", highlight: "primary" },
        {
          text: " who enjoys building modern web applications and solving real-world problems. My interest in web development comes from my love for ",
        },
        { text: "art and painting", highlight: "accent" },
        { text: ", which inspires my approach to " },
        { text: "UI design", highlight: "primary" },
        { text: " and visual experiences." },
      ],

      [
        { text: "I focus on writing " },
        { text: "clean code", highlight: "accent" },
        {
          text: " while maintaining strong attention to user experience and design aesthetics. I am a ",
        },
        { text: "quick learner", highlight: "primary" },
        {
          text: " and patient problem solver who continuously improves through real-world projects and exploring both frontend and backend development to grow as a ",
        },
        { text: "MERN Stack Developer.", highlight: "accent" },
      ],
    ],

    skills: [
      {
        id: "mern",
        title: "MERN Stack",
        description: "Building modern and scalable web applications.",
        colorType: "primary",
      },
      {
        id: "ui",
        title: "UI Design",
        description: "Creating modern, responsive, and intuitive interfaces.",
        colorType: "accent",
      },
      {
        id: "problem",
        title: "Problem Solving",
        description: "Analyzing problems and writing clean, efficient code.",
        colorType: "accent",
      },
      {
        id: "backend",
        title: "Backend APIs",
        description: "Building secure REST APIs and backend services.",
        colorType: "primary",
      },
    ],
  },
};
