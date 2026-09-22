"use client";

import React from "react";
import { MotionWrapper } from "../MotionWrapper";

export interface SectionHeaderProps {
  id?: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id = "section-heading",
  titlePrefix,
  titleHighlight,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`w-full mb-8 md:mb-16 ${className}`}>
      <div className="flex items-stretch gap-4 md:gap-6">
        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Main Title */}
          <MotionWrapper animationType="fadeUp" delay={0.1} duration={0.5}>
            <h2
              id={id}
              className="text-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground tracking-tight leading-tight"
            >
              {titlePrefix}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto] animate-gradient">
                {titleHighlight}
              </span>
            </h2>
          </MotionWrapper>

          {/* Subtitle + Expanding Line Container */}
          {subtitle && (
            <div className="flex items-center gap-4 w-full">
              {/* Remaining Space Filler Line (Grows using widthIncrease) */}
              <div className="flex-1 overflow-hidden flex items-center">
                <MotionWrapper
                  animationType="widthIncrease"
                  delay={0.4}
                  duration={0.8}
                  className="h-px bg-linear-to-r from-border-color/20 to-primary/20"
                />
              </div>
              {/* Subtitle Text */}
              <MotionWrapper
                animationType="fadeUp"
                delay={0.25}
                duration={0.5}
              >
                <p className="text-sm sm:text-base md:text-lg text-primary whitespace-nowrap font-normal">
                  {subtitle}
                </p>
              </MotionWrapper>

              {/* Remaining Space Filler Line (Grows using widthIncrease) */}
              <div className="flex-1 overflow-hidden flex items-center">
                <MotionWrapper
                  animationType="widthIncrease"
                  delay={0.4}
                  duration={0.8}
                  className="h-px bg-linear-to-l from-border-color/20 to-primary/20"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
