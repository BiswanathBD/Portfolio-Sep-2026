"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Laptop, Rocket } from "lucide-react";
import { AboutImageProps, SkillItem } from "@/data/aboutMe";
import { MotionWrapper } from "../Shared/MotionWrapper";
import { SkillGrid } from "./SkillGrid";

interface ExtendedAboutImageProps extends AboutImageProps {
  skills: SkillItem[];
}

export const AboutMeImage: React.FC<ExtendedAboutImageProps> = ({
  imageSrc,
  imageAlt,
  skills,
}) => {
  return (
    <aside className="flex flex-col mx-auto gap-10 w-10/12">
      {/* Outer Scale Animation via MotionWrapper */}
      <MotionWrapper
        animationType="scale"
        transitionType="spring"
        delay={0.5}
        className="relative w-full flex justify-center"
      >
        {/* outer container */}
        <motion.div
          whileHover="hover"
          initial="rest"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.03 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-2/3 md:w-4/5 lg:w-1/2 rounded-2xl border border-border-color bg-card-bg p-1"
        >
          {/* image container */}
          <figure className="relative w-full border border-primary/40 rounded-xl overflow-hidden group shadow-[0_0px_100px_var(--shadow-color)] hover:shadow-[0_0px_160px_var(--shadow-color)] transition-all duration-500">
            <Image
              alt={imageAlt}
              className="w-full aspect-square object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
              src={imageSrc}
              width={500}
              height={500}
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-primary/10 pointer-events-none" />
          </figure>

          {/* corner accents (Rotation removed, position offset kept, opacity drops to 60%) */}
          <motion.div
            variants={{
              rest: { x: 0, y: 0, opacity: 0.8 },
              hover: { x: -12, y: -10, opacity: 0.6 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary rounded-tl-lg pointer-events-none"
          />
          <motion.div
            variants={{
              rest: { x: 0, y: 0, opacity: 0.8 },
              hover: { x: 14, y: -8, opacity: 0.6 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-accent rounded-tr-lg pointer-events-none"
          />
          <motion.div
            variants={{
              rest: { x: 0, y: 0, opacity: 0.8 },
              hover: { x: -10, y: 12, opacity: 0.6 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary rounded-bl-lg pointer-events-none"
          />
          <motion.div
            variants={{
              rest: { x: 0, y: 0, opacity: 0.8 },
              hover: { x: 12, y: 14, opacity: 0.6 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-accent rounded-br-lg pointer-events-none"
          />

          {/* accent lines */}
          <div className="absolute top-6 -left-1 w-4 h-0.5 bg-linear-to-r from-primary to-transparent opacity-60 pointer-events-none" />
          <div className="absolute top-12 -left-1 w-3 h-0.5 bg-linear-to-r from-accent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute bottom-6 -right-1 w-4 h-0.5 bg-linear-to-l from-primary to-transparent opacity-60 pointer-events-none" />
          <div className="absolute bottom-12 -right-1 w-3 h-0.5 bg-linear-to-l from-accent to-transparent opacity-60 pointer-events-none" />

          <div className="absolute -top-1 left-6 h-4 w-0.5 bg-linear-to-b from-primary to-transparent opacity-60 pointer-events-none" />
          <div className="absolute -top-1 left-12 h-3 w-0.5 bg-linear-to-b from-accent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute -bottom-1 right-6 h-4 w-0.5 bg-linear-to-t from-primary to-transparent opacity-60 pointer-events-none" />
          <div className="absolute -bottom-1 right-12 h-3 w-0.5 bg-linear-to-t from-accent to-transparent opacity-60 pointer-events-none" />

          {/* floating icon 1 */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              scale: [1, 1.08, 0.95, 1],
              y: [0, -3, 2, 0],
              x: [0, 2, -2, 0],
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1,
              },
              y: {
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
                delay: 1,
              },
              x: {
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
                delay: 1,
              },
              rotate: { duration: 1.2, ease: "easeOut", delay: 1 },
              opacity: { duration: 1, delay: 1 },
            }}
            className="absolute -top-1/5 right-1/4 w-8 h-8 bg-linear-to-tl from-card-bg backdrop-blur-md rounded-lg flex items-center justify-center border border-border-color shadow-lg pointer-events-none"
          >
            <Code2 className="w-5 h-5 text-primary" />
          </motion.div>

          {/* floating icon 2 */}
          <motion.div
            initial={{ scale: 0, rotate: 180, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              scale: [1, 0.92, 1.06, 1],
              y: [0, 3, -2, 0],
              x: [0, -2, 2, 0],
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
                delay: 1.2,
              },
              y: {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 1.2,
              },
              x: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 1.2,
              },
              rotate: { duration: 1.4, ease: "easeOut", delay: 1.2 },
              opacity: { duration: 1, delay: 1.2 },
            }}
            className="absolute bottom-4 -left-1/4 w-10 h-10 bg-linear-to-tl from-card-bg backdrop-blur-md rounded-xl flex items-center justify-center border border-border-color shadow-lg pointer-events-none"
          >
            <Laptop className="w-5 h-5 text-accent" />
          </motion.div>

          {/* floating icon 3 */}
          <motion.div
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            animate={{
              scale: [1, 1.06, 0.94, 1],
              y: [0, -4, 2, 0],
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              scale: {
                repeat: Infinity,
                duration: 3.8,
                ease: "easeInOut",
                delay: 1.8,
              },
              y: {
                repeat: Infinity,
                duration: 3.2,
                ease: "easeInOut",
                delay: 1.8,
              },
              rotate: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 1.8,
              },
              opacity: { duration: 1, delay: 1.8 },
            }}
            className="absolute top-1/2 -right-1/4 -translate-y-1/2 w-10 h-10 bg-linear-to-br from-card-bg backdrop-blur-md rounded-xl flex items-center justify-center border border-border-color shadow-lg pointer-events-none"
          >
            <Rocket className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </MotionWrapper>

      <SkillGrid skills={skills} delay={0.5} />
    </aside>
  );
};
