"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";
type LogoVariant = "both" | "icon-only" | "text-only";

interface LogoProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
}

// Scale factors based on default 'md' (100% / 1.0)
const scaleMap: Record<LogoSize, number> = {
  xs: 0.65,
  sm: 0.8,
  md: 1.0,
  lg: 1.2,
  xl: 1.4,
};

const Logo: React.FC<LogoProps> = ({
  size = "md",
  variant = "both",
  className = "",
}) => {
  const scale = scaleMap[size];
  const showIcon = variant === "both" || variant === "icon-only";
  const showText = variant === "both" || variant === "text-only";

  return (
    <Link
      href={"/"}
      className="inline-flex w-max items-center justify-center origin-left"
      style={{ transform: `scale(${scale})` }}
    >
      <motion.div
        className={`flex items-center gap-4 group cursor-pointer relative ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo Image with Glow Animation */}
        {showIcon && (
          <motion.div
            className="relative w-12 h-12 shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-linear-to-r from-primary to-accent opacity-60 blur-md"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Enhanced Hover Glow */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10"
              initial={false}
            />

            {/* Logo Image */}
            <motion.div
              className="relative z-10 w-full h-full overflow-hidden rounded-xl border border-border-color group-hover:border-primary/50 transition-colors duration-300"
              whileHover={{ filter: "brightness(1.1)" }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://i.ibb.co.com/cKyjq19R/4897896.jpg"
                alt="Biswanath Sarker"
                fill
                sizes="48px"
                className="object-cover"
                priority
                unoptimized
              />
            </motion.div>

            {/* Corner Accent Dots */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full z-20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-accent rounded-full z-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        )}

        {/* Name and Title with Enhanced Animations */}
        {showText && (
          <div className="flex flex-col">
            {/* Name */}
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span
                className="font-sans font-bold text-lg text-foreground relative"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 8px var(--primary)",
                }}
                transition={{ duration: 0.2 }}
              >
                Biswanath
                {/* Subtle underline animation */}
                <motion.div
                  className="absolute -bottom-0.5 left-0 h-0.5 bg-border-color rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>

              <motion.span
                className="font-sans font-bold text-lg bg-linear-to-r from-primary to-accent bg-clip-text text-transparent relative"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.05,
                  filter: "brightness(1.2)",
                }}
              >
                Sarker
                {/* Accent underline animation */}
                <motion.div
                  className="absolute -bottom-0.5 left-0 h-0.5 bg-linear-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </motion.div>

            {/* Subtitle with Typewriter Effect */}
            <motion.div
              className="text-xs text-foreground/60 font-medium relative overflow-hidden transition-colors duration-300 hover:text-accent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                MERN Stack Developer
              </motion.span>

              {/* Blinking cursor effect */}
              <motion.span
                className="inline-block w-0.5 h-4 bg-primary ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          </div>
        )}

        {/* Floating Particles */}
        {showText && (
          <>
            <motion.div
              className="absolute -top-2 right-4 w-1 h-1 bg-primary/60 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-8 right-2 w-0.5 h-0.5 bg-accent/40 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        )}
      </motion.div>
    </Link>
  );
};

export default Logo;
