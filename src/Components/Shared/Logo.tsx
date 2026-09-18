"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <motion.div
        className="flex items-center gap-3.5 group cursor-pointer relative py-1"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo Image with Glow Animation */}
        <motion.div
          className="relative w-11 h-11"
          whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated Ambient Glow */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-linear-to-r from-primary to-secondary opacity-60 blur-md"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced Hover Glow */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-linear-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10"
            initial={false}
          />

          {/* Optimized Next.js Image */}
          <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border border-border-color group-hover:border-primary/50 transition-colors duration-300">
            <Image
              src="/assets/logo.jpg"
              alt="Biswanath Sarker"
              fill
              sizes="44px"
              className="object-cover transition-all duration-300 group-hover:scale-105"
            />
          </div>

          {/* Corner Accent Dots */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full z-20 shadow-[0_0_8px_(--primary)]"
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
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-secondary rounded-full z-20 shadow-[0_0_6px_var(--secondary)]"
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

        {/* Name and Title */}
        <div className="flex flex-col">
          {/* Name */}
          <motion.div
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.span
              className="font-sans font-bold text-base md:text-lg text-foreground relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              Biswanath
              {/* Foreground Underline */}
              <motion.div
                className="absolute -bottom-0.5 left-0 h-0.5 bg-foreground/30 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>

            <motion.span
              className="font-sans font-bold text-base md:text-lg bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              Sarker
              {/* linear Underline */}
              <motion.div
                className="absolute -bottom-0.5 left-0 h-0.5 bg-linear-to-r from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.div>

          {/* Subtitle / Role */}
          <motion.div
            className="text-xs text-foreground/60 font-medium relative overflow-hidden flex items-center group-hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              MERN Stack Developer
            </motion.span>

            {/* Blinking Cursor */}
            <motion.span
              className="inline-block w-0.5 h-3.5 bg-primary ml-1"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* Floating Particles */}
        <motion.div
          className="absolute -top-1 right-3 w-1 h-1 bg-primary/60 rounded-full"
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-7 right-1 w-0.5 h-0.5 bg-secondary/50 rounded-full"
          animate={{
            y: [0, -6, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Background Card Glow on Hover */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          initial={false}
        />
      </motion.div>
    </Link>
  );
};

export default Logo;
