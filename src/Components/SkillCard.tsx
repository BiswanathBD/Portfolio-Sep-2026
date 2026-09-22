"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SkillCategory } from "@/data/skillsData";

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="relative group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-primary/30 overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="font-display font-bold text-lg text-white mb-6 group-hover:text-primary transition-colors">
          {category.title}
        </h3>

        <div className="space-y-4">
          {category.skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30 flex justify-center items-center ${
                      skill.color || "text-primary"
                    } hover:scale-110 hover:shadow-lg hover:shadow-primary/30 hover:border-primary/50 transition-all duration-300`}
                  >
                    <Image
                      src={skill.icon}
                      alt={`${skill.name} icon`}
                      width={16}
                      height={16}
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                  <span className="text-gray-200 font-medium">
                    {skill.name}
                  </span>
                </div>
                <span className="text-gray-400 text-sm font-mono">
                  {skill.level}%
                </span>
              </div>

              {/* Animated Progress Bar with Framer Motion */}
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-1 h-10 bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-r-full pointer-events-none" />
    </motion.div>
  );
};
