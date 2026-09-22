"use client";

import React from "react";
import { motion } from "framer-motion";
import { StatItem } from "@/data/skillsData";

interface StatsGridProps {
  stats: StatItem[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -8, scale: 1.05 }}
          className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
        >
          <motion.div
            className={`text-3xl font-bold ${stat.color} mb-2`}
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.2, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          >
            {stat.number}
          </motion.div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};