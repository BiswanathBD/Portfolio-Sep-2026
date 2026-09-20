"use client";

import Image from "next/image";
import { SkillItem } from "@/data/heroData";
import { motion } from "framer-motion";

export interface ProfileShowcaseProps {
  profileImage: string;
  name?: string;
  skillSets: {
    innerCircle: SkillItem[];
    middleCircle: SkillItem[];
    thirdCircle: SkillItem[];
    outerCircle: SkillItem[];
  };
}

const circleSize = ["w-4/7", "w-5/7", "w-6/7", "w-7/7"];

const getRandomSizeStyle = () => {
  const num = Math.floor(Math.random() * (8 - 4 + 1)) + 6;
  return `${num * 4}px`;
};

const ProfileShowcase = ({
  profileImage,
  name = "Profile Image",
  skillSets,
}: ProfileShowcaseProps) => {
  return (
    <section className="relative w-full flex justify-center items-center">
      {/* profile image */}
      <div className="relative group w-3/7 aspect-square rounded-full border-2 border-primary/50 overflow-hidden bg-background z-10 flex items-center justify-center shadow-[0_0_500px_var(--primary)]">
        {profileImage && (
          <Image
            src={profileImage}
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 192px, 256px"
            className="object-cover group-hover:scale-105 transition-all duration-500"
          />
        )}
      </div>

      {/* skill sets */}
      {skillSets &&
        Object.entries(skillSets).map(([circleKey, skills], circleIdx) => {
          if (!skills || skills.length < 1) return null;

          const circleSizeClass = circleSize[circleIdx] || "w-7/7";
          const isClockwise = circleIdx % 2 === 0;
          const targetRotation = isClockwise ? 360 : -360;

          return (
            <motion.div
              key={circleKey}
              className={`absolute ${circleSizeClass} aspect-square rounded-full border border-border-color top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
              animate={{ rotate: targetRotation }}
              transition={{
                duration: 50 + circleIdx * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {skills.map((skill, skillIdx) => {
                const dynamicDimension = getRandomSizeStyle();

                // random direction for icon rotation
                const iconRotationDir =
                  (skillIdx + circleIdx) % 2 === 0 ? 360 : -360;
                const randomDuration = 8 + (skillIdx % 4) * 3;

                return (
                  <motion.div
                    key={skill.name || skillIdx}
                    className={`absolute p-1.5 aspect-square rounded-full border border-border-color bg-linear-to-br from-card-bg to-accent/20 backdrop-blur-md pointer-events-auto flex items-center justify-center shadow-[0_0_12px_var(--card-bg)] -translate-x-1/2 -translate-y-1/2
                      ${skillIdx === 0 && "top-0 left-1/2"} 
                      ${skillIdx === 1 && "top-1/2 left-full"} 
                      ${skillIdx === 2 && "top-full left-1/2"} 
                      ${skillIdx === 3 && "top-1/2 left-0"} 
                    `}
                    style={{
                      width: dynamicDimension,
                      height: dynamicDimension,
                    }}
                    title={skill.name}
                    animate={{
                      scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2.5 + skillIdx * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: skillIdx * 0.2,
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 20px var(--accent)",
                    }}
                  >
                    {skill.icon && (
                      <motion.div
                        className="relative w-full h-full flex items-center justify-center"
                        animate={{ rotate: iconRotationDir }}
                        transition={{
                          duration: randomDuration,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Image
                          src={skill.icon}
                          alt={skill.name || "skill icon"}
                          fill
                          unoptimized
                          sizes="40px"
                          className="object-contain drop-shadow-[0_0_6px_var(--card-bg)]"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          );
        })}
    </section>
  );
};

export default ProfileShowcase;
