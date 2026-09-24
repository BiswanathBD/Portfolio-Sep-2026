"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EducationItem, continuousLearningText } from "@/data/educationData";
import { EducationCard } from "./EducationCard";
import { MotionWrapper } from "./Shared/MotionWrapper";
import {  CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface EducationTimelineProps {
  data: EducationItem[];
}

export const EducationTimeline: React.FC<EducationTimelineProps> = ({
  data,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<
    HTMLElement | undefined
  >(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const detectedScroller =
        (document.querySelector("[data-lenis-prevent]") as HTMLElement) ||
        (document.querySelector(".smooth-scroll") as HTMLElement) ||
        (containerRef.current?.closest(".overflow-y-auto") as HTMLElement) ||
        undefined;

      setScrollContainer(detectedScroller);
    }
  }, []);

  // Framer Motion useScroll - Dynamic Container Binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start 70%", "end 60%"],
  });

  // Smooth Spring Animation for Scroll Line
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="w-full">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
        {/* Heading & Info */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 lg:mt-8">
          <MotionWrapper
            animationType="fadeUp"
            delay={0.5}
            transitionType="spring"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-[1.15]">
              Education & <br />
              <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
                Qualifications
              </span>
            </h2>
          </MotionWrapper>

          <MotionWrapper
            animationType="fadeUp"
            delay={0.55}
            transitionType="spring"
          >
            <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6">
              {continuousLearningText}
            </p>
          </MotionWrapper>

          <MotionWrapper
            animationType="fadeUp"
            delay={0.6}
            transitionType="spring"
          >
            <div className="p-5 rounded-2xl bg-card-bg/80 border border-border-color backdrop-blur-xl shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Continuous Learning Approach</span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Combining an analytical academic background with practical,
                modern software engineering practices to build scalable web
                platforms.
              </p>
            </div>
          </MotionWrapper>

          <div className="pt-2">
            <MotionWrapper
              animationType="fadeUp"
              delay={0.65}
              transitionType="spring"
            >
              <Link
                href="#projects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors group"
              >
                <span>Explore technical implementations</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </MotionWrapper>
          </div>
        </div>

        {/* Scroll-Driven Dynamic Line & Cards */}
        <div
          ref={containerRef}
          className="lg:col-span-7 relative w-full pl-6 md:pl-10"
        >
          {/* Base Background Track Line */}
          <div className="absolute left-0 md:left-32 top-6 bottom-6 w-0.5 bg-primary/20 rounded-full" />

          {/* Framer Motion Driven Dynamic Glowing Line */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-0 md:left-32 top-6 bottom-6 w-0.5 bg-accent rounded-full z-10 pointer-events-none shadow-[0_0_12px_var(--shadow-color)]"
          />

          {/* Timeline Cards */}
          <div className="relative z-20 space-y-10 md:space-y-12">
            {data.map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
