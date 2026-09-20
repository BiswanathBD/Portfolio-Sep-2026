"use client";

import Image from "next/image";
import { SkillItem } from "@/data/heroData";
import { motion } from "framer-motion";
import { MotionWrapper } from "../MotionWrapper";

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

const circleSize = ["w-[64%]", "w-[76%]", "w-[88%]", "w-[100%]"];

const ProfileShowcase = ({
  profileImage,
  name = "Profile Image",
  skillSets,
}: ProfileShowcaseProps) => {
  const getDeterministicSize = (circleIdx: number, skillIdx: number) => {
    const base = 28;
    const offset = ((circleIdx * 3 + skillIdx * 7) % 5) * 4;
    return `${base + offset}px`;
  };

  return (
    <section className="relative w-full flex justify-center items-center py-6">
      <div className="relative z-20 flex items-center justify-center w-[52%]">
        {/* bg glow */}
        <MotionWrapper
          animationType="scale"
          delay={1}
          duration={1}
          className="absolute inset-0 bg-primary/60 rounded-full blur-[100px] z-0 pointer-events-none"
        />

        {/* Profile Image Wrapper */}
        <MotionWrapper
          animationType="scale"
          className="relative z-10 group w-full aspect-square rounded-full border-2 border-primary/50 overflow-hidden bg-background flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]"
        >
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
        </MotionWrapper>
      </div>

      {/* Orbiting Skill Sets */}
      {skillSets &&
        Object.entries(skillSets).map(([circleKey, skills], circleIdx) => {
          if (!skills || skills.length < 1) return null;

          const circleSizeClass = circleSize[circleIdx] || "w-[100%]";
          const isClockwise = circleIdx % 2 === 0;
          const targetRotation = isClockwise ? 360 : -360;
          const zIndexClass = `z-[${10 - circleIdx}]`;

          return (
            <MotionWrapper
              key={circleKey}
              animationType="scale"
              delay={0.2 + circleIdx * 0.15}
              className={`absolute inset-0 flex items-center justify-center pointer-events-none ${zIndexClass}`}
            >
              {/* Rotating Ring Container */}
              <motion.div
                className={`absolute ${circleSizeClass} aspect-square rounded-full border border-border-color/40 pointer-events-none`}
                initial={{ rotate: 0 }}
                animate={{ rotate: targetRotation }}
                transition={{
                  duration: 40 + circleIdx * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  willChange: "transform",
                  transformOrigin: "center center",
                }}
              >
                {skills.map((skill, skillIdx) => {
                  const dynamicDimension = getDeterministicSize(
                    circleIdx,
                    skillIdx,
                  );

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
                        willChange: "transform",
                      }}
                      title={skill.name}
                      animate={{
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{
                        duration: 3 + skillIdx * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: skillIdx * 0.2,
                      }}
                      whileHover={{
                        scale: 1.2,
                        boxShadow: "0px 0px 20px var(--accent)",
                      }}
                    >
                      {/* Counter-rotation on icon so skills remain upright */}
                      {skill.icon && (
                        <motion.div
                          className="relative w-full h-full flex items-center justify-center"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: -targetRotation }}
                          transition={{
                            duration: 40 + circleIdx * 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{ willChange: "transform" }}
                        >
                          <Image
                            src={skill.icon}
                            alt={skill.name || "skill icon"}
                            fill
                            unoptimized
                            sizes="40px"
                            className="object-contain drop-shadow-[0_0_6px_var(--card-bg)] pointer-events-none"
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </MotionWrapper>
          );
        })}
    </section>
  );
};

export default ProfileShowcase;
