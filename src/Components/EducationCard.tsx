"use client";

import React from "react";
import { EducationItem } from "@/data/educationData";
import { MotionWrapper } from "./MotionWrapper";
import { Code2, GraduationCap, Building2, MapPin, BookOpen, LucideIcon } from "lucide-react";

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

export const EducationCard: React.FC<EducationCardProps> = ({ edu, index }) => {
  const IconComponent = iconMap[edu.icon] || GraduationCap;

  return (
    <div className="relative flex items-start mb-20 last:mb-0">
      {/* Timeline Dot - Desktop */}
      <MotionWrapper
        animationType="rotateScaleUp"
        delay={0.1 * index}
        className="absolute left-19 top-8 w-6 h-6 bg-linear-to-r from-primary to-accent rounded-full border-4 border-background z-10 shadow-lg hidden md:block"
      >
        <div className="absolute inset-1 bg-linear-to-r from-primary to-accent rounded-full" />
      </MotionWrapper>

      {/* Year Badge - Desktop */}
      <MotionWrapper
        animationType="fadeRight"
        delay={0.15 * index}
        className="absolute -left-6 top-7 bg-linear-to-r from-primary to-accent text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10 hidden md:block"
      >
        {edu.year}
      </MotionWrapper>

      {/* Main Education Card */}
      <div className="ml-0 md:ml-28 w-full max-w-2xl">
        <MotionWrapper animationType="fadeLeft" delay={0.3}>
          <div className="group relative bg-card-bg backdrop-blur-xl border border-border-color rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 hover:border-primary/40">
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

            <div className="relative p-6 md:p-8 z-10 card-content">
              {/* Year Tag - Mobile */}
              <div className="md:hidden mb-4">
                <span className="inline-block bg-linear-to-r from-primary to-accent text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  {edu.year}
                </span>
              </div>

              {/* Card Header */}
              <div className="flex items-start gap-4 md:gap-6 mb-6">
                <MotionWrapper
                  animationType="rotateScaleUp"
                  delay={0.3 * index}
                  className="card-icon"
                >
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-linear-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center border border-primary/30 backdrop-blur-sm text-primary">
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </MotionWrapper>

                <div className="flex-1">
                  <h3 className="card-title text-foreground font-bold text-lg md:text-xl xl:text-2xl mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                    {edu.degree}
                  </h3>
                  <p className="text-primary font-semibold text-sm md:text-base mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    {edu.field}
                  </p>
                </div>
              </div>

              {/* Institution Info */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 bg-foreground/5 backdrop-blur-sm rounded-lg p-2 border border-border-color hover:border-primary/30 transition-all duration-300">
                  <div className="w-6 h-6 bg-primary/20 rounded-md flex items-center justify-center text-primary">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-foreground/80 text-xs font-medium">
                    {edu.institution}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-foreground/5 backdrop-blur-sm rounded-lg p-2 border border-border-color hover:border-accent/30 transition-all duration-300">
                  <div className="w-6 h-6 bg-accent/20 rounded-md flex items-center justify-center text-accent">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-foreground/80 text-xs font-medium">
                    {edu.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="card-description text-foreground/80 leading-relaxed mb-6 text-sm group-hover:text-foreground transition-colors duration-300">
                {edu.description}
              </p>

              {/* Key Learning Areas */}
              <div>
                <h4 className="text-foreground font-bold text-sm md:text-base mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-linear-to-r from-primary to-accent rounded-md flex items-center justify-center text-primary-foreground">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  Key Learning Areas
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {edu.achievements.map((achievement, achIndex) => (
                    <MotionWrapper
                      key={achIndex}
                      animationType="staggerChild"
                      delay={0.1 * achIndex}
                    >
                      <div className="achievement-item h-full group flex items-center gap-2 p-3 rounded-lg bg-linear-to-r from-foreground/5 to-foreground/10 border border-border-color hover:border-primary/30 hover:from-primary/5 hover:to-accent/5 transition-all duration-300 cursor-default">
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
    </div>
  );
};