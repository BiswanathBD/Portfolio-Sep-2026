"use client";

import React from "react";
import { AboutContentProps } from "@/data/aboutMe";
import { MotionWrapper } from "../Shared/MotionWrapper";

export const AboutMeContent: React.FC<Omit<AboutContentProps, "skills">> = ({
  namePrefix,
  name,
  paragraphs,
}) => {
  return (
    <aside className="flex flex-col space-y-4">
      {/* Name Title */}
      <MotionWrapper
        animationType="fadeRight"
        transitionType="spring"
        delay={0.5}
      >
        <h3 className="font-sans font-bold text-3xl sm:text-4xl text-foreground">
          {namePrefix}{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto] animate-linear">
            {name}
          </span>
        </h3>
      </MotionWrapper>

      {/* Paragraphs Article Container */}
      <article className="relative space-y-4 py-2 px-6 h-fit overflow-hidden">
        {/* Animated Left Line */}
        <MotionWrapper
          animationType="heightIncrease"
          delay={0.5}
          duration={1.2}
          className="absolute left-0 top-0 bottom-0 w-px origin-top overflow-hidden"
        >
          <div className="h-full w-full bg-accent/40" />
        </MotionWrapper>

        {paragraphs.map((paraChunks, index) => (
          <MotionWrapper
            key={index}
            animationType="fadeRight"
            transitionType="spring"
            delay={0.5 + index * 0.15}
          >
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg font-normal">
              {paraChunks.map((chunk, chunkIndex) => {
                if (typeof chunk === "string") {
                  return (
                    <React.Fragment key={chunkIndex}>{chunk}</React.Fragment>
                  );
                }

                const highlightClass =
                  chunk.highlight === "primary"
                    ? "text-primary font-medium"
                    : chunk.highlight === "accent"
                      ? "text-accent font-medium"
                      : "";

                return (
                  <span key={chunkIndex} className={highlightClass}>
                    {chunk.text}
                  </span>
                );
              })}
            </p>
          </MotionWrapper>
        ))}
      </article>
    </aside>
  );
};
