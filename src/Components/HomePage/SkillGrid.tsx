"use client";

import React, { useState } from "react";
import { Code2, Palette, Brain, Database, LucideIcon } from "lucide-react";
import { SkillItem } from "@/data/aboutMe";
import { MotionWrapper } from "../Shared/MotionWrapper";

const skillIconMap: Record<string, LucideIcon> = {
  mern: Code2,
  ui: Palette,
  problem: Brain,
  backend: Database,
};

interface SkillGridProps {
  skills: SkillItem[];
  delay?: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export const SkillGrid: React.FC<SkillGridProps> = ({
  skills,
  delay = 0.5,
}) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <MotionWrapper animationType="fade" delay={delay}>
      <div
        role="button"
        className="relative grid w-full grid-cols-2 overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className="pointer-events-none absolute -inset-32 z-0 transition-opacity duration-300 overflow-visible"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(
              250px circle at calc(${mousePosition.x}px + 128px) calc(${mousePosition.y}px + 128px),
              color-mix(in srgb, var(--accent) 10%, transparent),
              transparent 50%
            )`,
          }}
        />

        {/* vertical divider */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `
          linear-gradient(
            to right,
            transparent calc(50% - 0.5px),
            color-mix(in srgb, var(--border-color) 30%, transparent) calc(50% - 0.5px),
            color-mix(in srgb, var(--border-color) 30%, transparent) calc(50% + 0.5px),
            transparent calc(50% + 0.5px)
          )
        `,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 50%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 50%, black 80%, transparent 100%)",
          }}
        >
          {/* vertical hover spotlight */}
          <div
            className="absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `
            linear-gradient(
              to right,
              transparent calc(50% - 0.5px),
              var(--accent) calc(50% - 0.5px),
              var(--accent) calc(50% + 0.5px),
              transparent calc(50% + 0.5px)
            )
          `,
              maskImage: `radial-gradient(
            100px circle at ${mousePosition.x}px ${mousePosition.y}px,
            black 0%,
            black 25%,
            transparent 100%
          )`,
              WebkitMaskImage: `radial-gradient(
            100px circle at ${mousePosition.x}px ${mousePosition.y}px,
            black 0%,
            black 25%,
            transparent 100%
          )`,
            }}
          />
        </div>

        {/* horizontal divider */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `
          linear-gradient(
            to bottom,
            transparent calc(50% - 0.5px),
            color-mix(in srgb, var(--border-color) 30%, transparent) calc(50% - 0.5px),
            color-mix(in srgb, var(--border-color) 30%, transparent) calc(50% + 0.5px),
            transparent calc(50% + 0.5px)
          )
        `,
            maskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 50%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 20%, black 50%, black 80%, transparent 100%)",
          }}
        >
          {/* horizontal hover spotlight */}
          <div
            className="absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `
            linear-gradient(
              to bottom,
              transparent calc(50% - 0.5px),
              var(--accent) calc(50% - 0.5px),
              var(--accent) calc(50% + 0.5px),
              transparent calc(50% + 0.5px)
            )
          `,
              maskImage: `radial-gradient(
            100px circle at ${mousePosition.x}px ${mousePosition.y}px,
            black 0%,
            black 25%,
            transparent 100%
          )`,
              WebkitMaskImage: `radial-gradient(
            100px circle at ${mousePosition.x}px ${mousePosition.y}px,
            black 0%,
            black 25%,
            transparent 100%
          )`,
            }}
          />
        </div>

        {skills.map((item, idx) => (
          <SkillCard key={item.id} item={item} idx={idx} />
        ))}
      </div>
    </MotionWrapper>
  );
};

function SkillCard({ item, idx }: { item: SkillItem; idx: number }) {
  const IconComponent = skillIconMap[item.id] || Code2;
  const isPrimary = item.colorType === "primary";

  return (
    <MotionWrapper
      animationType="fadeUp"
      transitionType="spring"
      delay={0.3 + idx * 0.1}
      className="group relative z-0 flex gap-2 p-4 cursor-none"
    >
      {/* Icon Wrapper with Micro-interaction */}
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg p-1.5 transition-all duration-300 group-hover:scale-110`}
      >
        <IconComponent
          className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${
            isPrimary ? "text-primary" : "text-accent"
          }`}
        />
      </div>

      {/* Typography with Slide & Highlight */}
      <div className="flex flex-col gap-1 transition-transform duration-300 ease-out group-hover:translate-x-1">
        <h4
          className={`text-xs font-semibold text-foreground sm:text-sm transition-colors duration-300 ${
            isPrimary ? "group-hover:text-primary" : "group-hover:text-accent"
          }`}
        >
          {item.title}
        </h4>
        <p className="text-[11px] leading-relaxed text-foreground/70 sm:text-xs transition-colors duration-300 group-hover:text-foreground">
          {item.description}
        </p>
      </div>
    </MotionWrapper>
  );
}
