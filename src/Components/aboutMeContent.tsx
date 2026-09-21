"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Code2, Palette, Brain, Database, LucideIcon } from "lucide-react";
import { AboutContentProps } from "@/data/aboutMe";

const skillIconMap: Record<string, LucideIcon> = {
  mern: Code2,
  ui: Palette,
  problem: Brain,
  backend: Database,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInRight: Variants = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const iconRotateScale: Variants = {
  hidden: { scale: 0, opacity: 0, rotate: -180 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: "backOut" },
  },
};

export const AboutMeContent: React.FC<AboutContentProps> = ({
  namePrefix,
  name,
  paragraphs,
  skills,
}) => {
  return (
    <motion.div
      className="space-y-8 order-1 md:order-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Name */}
      <motion.div variants={fadeInRight} className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-xl rounded-2xl" />
        <h3 className="relative font-sans font-bold text-3xl md:text-4xl text-foreground">
          {namePrefix}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient">
            {name}
          </span>
        </h3>
      </motion.div>

      {/* Paragraphs */}
      <div className="space-y-6">
        {paragraphs.map((paraText, index) => (
          <motion.p
            key={index}
            variants={fadeInRight}
            className="text-foreground/80 leading-relaxed text-base"
          >
            {paraText}
          </motion.p>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3"
      >
        {skills.map((item) => {
          const IconComponent = skillIconMap[item.id] || Code2;

          return (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="group relative"
            >
              <div
                className={`absolute -inset-0.5 ${
                  item.colorType === "primary"
                    ? "bg-primary/20"
                    : "bg-accent/20"
                } rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative flex items-center gap-3 p-3 rounded-lg border border-border-color bg-card-bg hover:border-border-color/80 transition-all duration-500 backdrop-blur-sm overflow-hidden">
                {/* Rotated Icon Container */}
                <motion.div
                  variants={iconRotateScale}
                  className="relative flex-shrink-0 w-9 h-9 rounded-lg bg-background flex items-center justify-center border border-border-color group-hover:scale-110 transition-transform duration-300"
                >
                  <IconComponent
                    className={`w-4 h-4 ${
                      item.colorType === "primary"
                        ? "text-primary"
                        : "text-accent"
                    }`}
                  />
                </motion.div>

                <span className="relative font-medium text-sm text-foreground/90 group-hover:text-foreground transition-colors flex-1">
                  {item.text}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
