"use client";

import { motion, AnimatePresence, type Transition } from "framer-motion";
import React from "react";

type AnimationType =
  | "fade"
  | "fadeLeft"
  | "fadeRight"
  | "fadeUp"
  | "fadeDown"
  | "scale"
  | "button"
  | "line"
  | "heightIncrease"
  | "widthIncrease"
  | "springUp"
  | "staggerChild"
  | "rotate"
  | "rotateScaleUp";

type AnimationConfig = {
  initial?: Record<string, number | string>;
  whileInView?: Record<string, number | string | number[]>;
  animate?: Record<string, number | string | number[]>;
  exit?: Record<string, number | string>;
  transition?: Transition;
  whileHover?: Record<string, number | string>;
  whileTap?: Record<string, number | string>;
  viewport?: { once?: boolean };
};

type MotionWrapperProps = {
  children?: React.ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  duration?: number;
  custom?: number;
  hoverScale?: number;
  once?: boolean;
  transition?: Transition;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  className,
  animationType = "fade",
  delay = 0,
  duration = 0.5,
  hoverScale = 1.02,
  once = true,
  transition,
  onClick,
}) => {
  const getAnimationConfig = (type: AnimationType): AnimationConfig => {
    const defaultTransition: Transition = {
      duration,
      delay,
      ease: "easeOut",
    };

    const configs: Record<AnimationType, AnimationConfig> = {
      fade: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        exit: { opacity: 0 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      fadeLeft: {
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      fadeRight: {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      fadeUp: {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      fadeDown: {
        initial: { opacity: 0, y: -20 },
        whileInView: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      scale: {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      button: {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        whileHover: { scale: hoverScale },
        whileTap: { scale: 0.9 },
        transition: transition ?? {
          duration: 0.2,
          ease: "easeOut",
        },
        viewport: { once },
      },

      springUp: {
        initial: { opacity: 0, y: 15, scale: 0.95 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 15, scale: 0.95 },
        transition: transition ?? {
          type: "spring",
          stiffness: 350,
          damping: 25,
          delay,
        },
        viewport: { once },
      },

      staggerChild: {
        initial: { opacity: 0, x: -10 },
        whileInView: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -10 },
        transition: transition ?? {
          type: "spring",
          stiffness: 300,
          damping: 24,
          delay,
        },
        viewport: { once },
      },

      line: {
        initial: { width: 0 },
        whileInView: { width: 40 },
        exit: { width: 0 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      heightIncrease: {
        initial: { height: 0 },
        whileInView: { height: "100%" },
        exit: { height: 0 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      widthIncrease: {
        initial: { width: 0 },
        whileInView: { width: "100%" },
        exit: { width: 0 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },

      rotate: {
        animate: { rotate: [0, 360] },
        transition: transition ?? {
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        },
      },

      rotateScaleUp: {
        initial: { opacity: 0, scale: 0, rotate: -180 },
        whileInView: { opacity: 1, scale: 1, rotate: 0 },
        exit: { opacity: 0, scale: 0, rotate: -180 },
        transition: transition ?? defaultTransition,
        viewport: { once },
      },
    };

    return configs[type];
  };

  const config = getAnimationConfig(animationType);

  return (
    <motion.div className={className} onClick={onClick} {...config}>
      {children}
    </motion.div>
  );
};

export { motion, AnimatePresence };
