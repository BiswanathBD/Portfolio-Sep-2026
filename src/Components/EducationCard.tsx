"use client";

import React from "react";
import { EducationItem } from "@/data/educationData";
import { MotionWrapper } from "./Shared/MotionWrapper";
import {
  Code2,
  GraduationCap,
  Building2,
  MapPin,
  BookOpen,
  LucideIcon,
} from "lucide-react";

interface EducationCardProps {
  edu: EducationItem;
  index: number;
}

// Icon Mapping Object
const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  "fas fa-code": Code2,
  graduation: GraduationCap,
  "fas fa-graduation-cap": GraduationCap,
};

export const EducationCard: React.FC<EducationCardProps> = ({ edu }) => {
  const IconComponent = iconMap[edu.icon] || GraduationCap;

  return (
    <MotionWrapper
      animationType="fadeLeft"
      delay={0.2}
      transitionType="spring"
      className="relative flex items-start mb-20 last:mb-0"
    >
      {/* Timeline Dot*/}
      <MotionWrapper
        animationType="scale"
        delay={0.2}
        className="absolute left-0 md:left-19 top-8 w-6 h-6 bg-linear-to-r from-primary to-accent rounded-full border-4 border-background z-10 shadow-lg hidden md:block"
      >
        <div className="absolute inset-1 bg-linear-to-r from-primary to-accent rounded-full" />
      </MotionWrapper>

      {/* Year Badge - Desktop */}
      <MotionWrapper
        animationType="fadeLeft"
        transitionType="spring"
        delay={0.8}
        className="absolute -left-6 top-7 bg-linear-to-r from-primary to-accent text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10 hidden md:block"
      >
        {edu.year}
      </MotionWrapper>

      {/* desktop card */}
      <div className="ml-0 md:ml-28 w-full max-w-2xl">
        <MotionWrapper animationType="fadeLeft" delay={0.5}>
          <div className="group relative bg-linear-to-bl from-primary/10 to-card-bg border border-border-color/80 rounded-4xl overflow-hidden shadow-2xl shadow-background transition-all duration-700 hover:border-primary/40">
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

            {/* main card */}
            <div className="relative p-4 md:p-6 z-10 card-content">
              {/* Year Tag - Mobile */}
              <MotionWrapper
                animationType="fadeLeft"
                delay={0.3}
                transitionType="spring"
              >
                <span className="md:hidden mb-4 inline-block bg-linear-to-r from-primary to-accent text-primary-foreground px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                  {edu.year}
                </span>
              </MotionWrapper>

              {/* Card Header */}
              <div className="flex items-start gap-4 md:gap-6 mb-6">
                <MotionWrapper
                  animationType="rotateScaleUp"
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="card-icon"
                >
                  <div className="size-12 md:size-14 bg-linear-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center border border-border-color/50 text-accent">
                    <IconComponent className="size-6 md:size-8" />
                  </div>
                </MotionWrapper>

                <div className="flex-1">
                  <MotionWrapper
                    animationType="fadeRight"
                    transitionType="spring"
                    delay={0.5}
                  >
                    <h3 className="text-foreground font-bold text-xl md:text-2xl xl:text-3xl leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                      {edu.degree}
                    </h3>
                  </MotionWrapper>

                  <MotionWrapper
                    animationType="fadeRight"
                    transitionType="spring"
                    delay={0.7}
                  >
                    <p className="text-primary font-semibold text-sm md:text-base mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      {edu.field}
                    </p>
                  </MotionWrapper>
                </div>
              </div>

              {/* Institution Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <MotionWrapper
                  animationType="fadeUp"
                  transitionType="spring"
                  delay={0.4}
                >
                  <div className="flex items-center gap-2 bg-card-bg rounded-xl backdrop-blur-sm p-2 border border-border-color hover:border-primary/30 transition-all duration-300">
                    <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center text-foreground">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-foreground text-sm font-medium">
                      {edu.institution}
                    </span>
                  </div>
                </MotionWrapper>

                <MotionWrapper
                  animationType="fadeUp"
                  transitionType="spring"
                  delay={0.6}
                >
                  <div className="flex items-center gap-2 bg-card-bg rounded-xl backdrop-blur-sm p-2 border border-border-color hover:border-primary/30 transition-all duration-300">
                    <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center text-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-foreground text-sm font-medium">
                      {edu.location}
                    </span>
                  </div>
                </MotionWrapper>
              </div>

              {/* Description */}
              <MotionWrapper
                animationType="fadeRight"
                transitionType="spring"
                delay={0.8}
              >
                <p className="text-foreground/80 leading-relaxed my-4 py-2 pl-4 border-l border-accent text-sm group-hover:text-foreground transition-colors duration-300">
                  {edu.description}
                </p>
              </MotionWrapper>

              {/* Key Learning Areas */}
              <div>
                <h4 className="text-foreground font-bold text-sm md:text-base mb-3 flex items-center gap-2">
                  <MotionWrapper
                    animationType="fadeRight"
                    transitionType="spring"
                    delay={0.5}
                  >
                    <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                  </MotionWrapper>
                  <MotionWrapper
                    animationType="fadeRight"
                    transitionType="spring"
                    delay={0.6}
                  >
                    Key Learning Areas
                  </MotionWrapper>
                </h4>

                {/* learning area card */}
                <div className="grid sm:grid-cols-2 gap-2">
                  {edu.achievements.map((achievement, achIndex) => (
                    <MotionWrapper
                      key={achIndex}
                      animationType="fadeUp"
                      transitionType="spring"
                      delay={0.6 + achIndex * 0.1}
                    >
                      <div className="achievement-item h-full group flex items-center gap-2 p-3 rounded-xl bg-linear-to-r from-foreground/5 to-foreground/10 border border-border-color hover:border-primary/30 hover:from-primary/5 hover:to-accent/5 transition-all duration-500 cursor-default">
                        <div className="w-2 h-2 bg-linear-to-r from-primary to-accent rounded-full" />
                        <span className="text-foreground/80 text-xs font-medium group-hover:text-foreground transition-colors duration-300">
                          {achievement}
                        </span>
                      </div>
                    </MotionWrapper>
                  ))}
                </div>
              </div>

              {/* Decorative Elements on Hover */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-linear-to-tl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full pointer-events-none" />
              <div className="absolute top-1/2 left-0 w-1 h-16 bg-linear-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-r-full pointer-events-none" />
            </div>
          </div>
        </MotionWrapper>
      </div>
    </MotionWrapper>
  );
};
