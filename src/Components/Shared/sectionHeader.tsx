"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export interface SectionHeaderProps {
  id?: string;
  titlePrefix: string;
  titleHighlight: string;
  className?: string;
}

const fadeInUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  id = "section-heading",
  titlePrefix,
  titleHighlight,
  className = "",
}) => {
  return (
    <motion.div
      className={`text-center mb-8 md:mb-16 relative ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative inline-block">
        <div className="relative">
          <h2
            id={id}
            className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 relative z-10 tracking-tight"
          >
            {titlePrefix}{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient">
                {titleHighlight}
              </span>
            </span>
          </h2>

          {/* Decorative Corner Brackets */}
          <div className="absolute -top-2 -left-4 w-6 h-6 border-l-2 border-t-2 border-primary/40 rounded-tl-xl animate-pulse" />
          <div className="absolute -top-2 -right-4 w-6 h-6 border-r-2 border-t-2 border-accent/40 rounded-tr-xl animate-pulse" />
          <div className="absolute -bottom-2 -left-4 w-6 h-6 border-l-2 border-b-2 border-accent/40 rounded-bl-xl animate-pulse" />
          <div className="absolute -bottom-2 -right-4 w-6 h-6 border-r-2 border-b-2 border-primary/40 rounded-br-xl animate-pulse" />

          {/* Floating Dots */}
          <motion.div
            className="absolute -top-2 left-1/4 w-2 h-2 bg-primary rounded-full"
            animate={{
              y: [-5, 5, -5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-2 right-1/4 w-2 h-2 bg-accent rounded-full"
            animate={{
              y: [5, -5, 5],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
