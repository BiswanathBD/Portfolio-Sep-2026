"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Code2, Laptop, Rocket } from "lucide-react";
import { AboutImageProps } from "@/data/aboutMe";

const fadeInLeft: Variants = {
  hidden: { x: -60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const imageWrapperVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
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

export const AboutMeImage: React.FC<AboutImageProps> = ({
  imageSrc,
  imageAlt,
}) => {
  return (
    <motion.div
      className="relative flex justify-center group order-2 md:order-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInLeft}
    >
      {/* Main Image Wrapper with Scale Animation */}
      <motion.div
        variants={imageWrapperVariants}
        className="relative w-2/3 hover:scale-105 transition-transform duration-700 rounded-2xl shadow-lg border border-border-color bg-card-bg"
      >
        <div className="relative w-full border border-primary/40 p-1 rounded-2xl overflow-hidden">
          <Image
            alt={imageAlt}
            className="w-full aspect-square object-cover rounded-xl"
            src={imageSrc}
            width={500}
            height={500}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-primary/10" />
        </div>

        {/* Corner Accents */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary rounded-tl-lg opacity-80" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-accent rounded-tr-lg opacity-80" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary rounded-bl-lg opacity-80" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-accent rounded-br-lg opacity-80" />

        {/* Accent Lines */}
        <div className="absolute top-6 -left-1 w-4 h-0.5 bg-gradient-to-r from-primary to-transparent opacity-60" />
        <div className="absolute top-12 -left-1 w-3 h-0.5 bg-gradient-to-r from-accent to-transparent opacity-60" />
        <div className="absolute bottom-6 -right-1 w-4 h-0.5 bg-gradient-to-l from-primary to-transparent opacity-60" />
        <div className="absolute bottom-12 -right-1 w-3 h-0.5 bg-gradient-to-l from-accent to-transparent opacity-60" />

        <div className="absolute -top-1 left-6 h-4 w-0.5 bg-gradient-to-b from-primary to-transparent opacity-60" />
        <div className="absolute -top-1 left-12 h-3 w-0.5 bg-gradient-to-b from-accent to-transparent opacity-60" />
        <div className="absolute -bottom-1 right-6 h-4 w-0.5 bg-gradient-to-t from-primary to-transparent opacity-60" />
        <div className="absolute -bottom-1 right-12 h-3 w-0.5 bg-gradient-to-t from-accent to-transparent opacity-60" />
      </motion.div>

      {/* Floating Icons with Scale Up + 360 Rotation Animation */}
      <motion.div
        variants={iconRotateScale}
        className="absolute top-4 right-4 w-10 h-10 bg-card-bg backdrop-blur-md rounded-xl flex items-center justify-center border border-border-color shadow-lg"
      >
        <Code2 className="w-5 h-5 text-primary" />
      </motion.div>

      <motion.div
        variants={iconRotateScale}
        className="absolute bottom-4 left-4 w-10 h-10 bg-card-bg backdrop-blur-md rounded-xl flex items-center justify-center border border-border-color shadow-lg"
      >
        <Laptop className="w-5 h-5 text-accent" />
      </motion.div>

      <motion.div
        variants={iconRotateScale}
        className="absolute top-1/2 -right-4 w-10 h-10 bg-card-bg backdrop-blur-md rounded-xl flex items-center justify-center border border-border-color shadow-lg"
      >
        <Rocket className="w-5 h-5 text-primary" />
      </motion.div>
    </motion.div>
  );
};
