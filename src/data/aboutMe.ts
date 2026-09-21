export interface SkillItem {
  id: string;
  text: string;
  colorType: "primary" | "accent";
}

export interface AboutImageProps {
  imageSrc: string;
  imageAlt: string;
}

export interface AboutContentProps {
  namePrefix: string;
  name: string;
  paragraphs: string[];
  skills: SkillItem[];
}

export interface AboutData {
  titlePrefix: string;
  titleHighlight: string;
  imageProps: AboutImageProps;
  contentProps: AboutContentProps;
}

export const aboutData: AboutData = {
  titlePrefix: "About",
  titleHighlight: "Me",
  imageProps: {
    imageSrc: "/assets/aboutMeImg.png",
    imageAlt: "Biswanath Sarker - MERN Stack Developer",
  },
  contentProps: {
    namePrefix: "I'm",
    name: "Biswanath Sarker",
    paragraphs: [
      "I am a passionate MERN Stack web developer and a fresher who genuinely enjoys building modern web applications. My interest in web development comes from my love for art and painting, as it allows me to express creativity through UI design and visual layouts while solving real-world problems.",
      "I focus on writing clean, functional code while maintaining strong attention to user experience and design aesthetics. I am a quick learner, patient problem solver, and continuously motivated to improve my skills by working on real projects and exploring both frontend and backend development to grow into a strong full-stack developer.",
    ],
    skills: [
      {
        id: "mern",
        text: "MERN Stack Development",
        colorType: "primary",
      },
      {
        id: "ui",
        text: "Frontend & UI Design Thinking",
        colorType: "accent",
      },
      {
        id: "problem",
        text: "Problem Solving & Logic Building",
        colorType: "primary",
      },
      {
        id: "backend",
        text: "Backend & API Fundamentals",
        colorType: "accent",
      },
    ],
  },
};
