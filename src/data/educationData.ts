export interface EducationItem {
  id: string;
  year: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  description: string;
  achievements: string[];
  icon: string;
}

export const educationData: EducationItem[] = [
  {
    id: "programming-hero",
    year: "2025 - 2026",
    degree: "Complete Web Development Course",
    field: "Full Stack Web Development",
    institution: "Programming Hero",
    location: "Dhaka, Bangladesh",
    description:
      "Completed an intensive 6-month programming course focusing on modern web development technologies including React, Node.js, MongoDB, and Express.js (MERN Stack).",
    achievements: [
      "Mastered MERN Stack Development",
      "Built multiple full-stack projects",
      "Learned modern JavaScript frameworks",
      "Gained hands-on industry experience",
    ],
    icon: "code",
  },
  {
    id: "bl-college",
    year: "2013 - 2018",
    degree: "Bachelor of Arts (BA)",
    field: "Bengali Literature",
    institution: "Govt. B.L. College, Khulna",
    location: "Khulna, Bangladesh",
    description:
      "Completed Bachelor of Arts degree with specialization in Bengali Literature, developing strong analytical, communication, and critical thinking skills.",
    achievements: [
      "Strong foundation in Bengali Literature and Language",
      "Developed excellent communication skills",
      "Enhanced analytical and critical thinking abilities",
      "Cultural and literary research experience",
    ],
    icon: "graduation",
  },
];

export const continuousLearningText =
  "My educational journey combines the analytical thinking and communication skills from my Bengali Literature background with intensive technical training from Programming Hero. This unique blend allows me to create user-centered solutions with attention to detail and deep technical proficiency.";
