"use client";

import React from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { SkillCategory } from "@/data/skillsData";
import { MotionWrapper } from "./Shared/MotionWrapper";

interface SkillCardProps {
  category: SkillCategory;
  idx: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ category, idx }) => {
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
  };

  // Mouse-following glow area
  const maskGradient = useMotionTemplate`radial-gradient(
    250px circle at ${mouseX}px ${mouseY}px,
    black 0%,
    rgba(0,0,0,0.60) 30%,
    rgba(0,0,0,0.20) 60%,
    transparent 80%
  )`;

  return (
    <MotionWrapper
      animationType="fadeUp"
      transitionType="spring"
      delay={0.5 + idx * 0.1}
      className="h-full"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card group relative bg-card-bg/60 border border-border-color/80 rounded-4xl py-4 px-6 shadow-xl overflow-hidden h-full"
      >
        {/* Mouse-following background glow */}
        <motion.div
          className={`pointer-events-none absolute -inset-px rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${idx % 2 === 0 ? "bg-primary/20" : "bg-accent/10"} `}
          style={{
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
          }}
        />

        {/* Card border glow */}
        <motion.div
          className={`pointer-events-none absolute inset-0 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 border ${idx % 2 === 0 ? "border-primary" : "border-accent"} `}
          style={{
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
          }}
        />

        {/* Soft outer border glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 border border-accent/60 blur-[3px]"
          style={{
            maskImage: maskGradient,
            WebkitMaskImage: maskGradient,
          }}
        />

        {/* Background Static Blur Effects */}
        <div className="absolute -bottom-10 -right-10 w-1/3 aspect-square rounded-full bg-accent/20 blur-[120px] pointer-events-none z-0" />

        <div className="absolute -top-10 left-1/3 w-1/3 aspect-square rounded-full bg-shadow-color blur-[70px] pointer-events-none z-0" />

        {/* Card Contents */}
        <div className="relative z-10 pointer-events-none">
          <div className="flex justify-between items-center gap-3 mb-6">
            <span className="h-1 w-1 rounded-full bg-shadow-color" />

            <h3 className="font-bold text-lg text-foreground text-center">
              {category.title}
            </h3>

            <span className="h-1 w-1 rounded-full bg-shadow-color" />
          </div>

          <div className="space-y-4">
            {category.skills.map((skill, skillIdx) => (
              <div key={skill.name} className="skill-item">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 w-full">
                    {/* icon */}
                    <MotionWrapper
                      animationType="fadeRight"
                      transitionType="spring"
                      delay={0.5 + skillIdx * 0.1}
                    >
                      <div className="w-8 h-8 bg-linear-to-r from-primary/10 to-accent/10 rounded-lg border border-border-color/80 flex justify-center items-center text-primary shrink-0">
                        <Image
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                    </MotionWrapper>

                    <div className="w-full">
                      <div className="flex items-center justify-between gap-4 flex-1">
                        <MotionWrapper
                          animationType="fadeUp"
                          transitionType="spring"
                          delay={0.6 + skillIdx * 0.1}
                        >
                          <span className="text-foreground font-medium">
                            {skill.name}
                          </span>
                        </MotionWrapper>

                        <MotionWrapper
                          animationType="fade"
                          delay={1 + skillIdx * 0.1}
                        >
                          <span className="text-foreground/60 text-sm font-mono">
                            {skill.level}%
                          </span>
                        </MotionWrapper>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full bg-border-color/60 rounded-full h-0.5 overflow-hidden mt-1 mb-1">
                        <motion.div
                          className="h-full bg-linear-to-r from-primary to-accent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            delay: 0.2,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
};
