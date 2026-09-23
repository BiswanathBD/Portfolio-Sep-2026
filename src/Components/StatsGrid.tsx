import React from "react";
import { StatItem } from "@/data/skillsData";
import { MotionWrapper } from "./Shared/MotionWrapper";

interface StatsGridProps {
  stats: StatItem[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <MotionWrapper
      animationType="fadeUp"
      className="mt-4 lg:mt-8 flex divide-x divide-border-color/60 border-t border-border-color/60"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex-1 text-center pt-6 pb-2 px-2">
          <h2 className="flex flex-col md:flex-row items-center gap-2 justify-center">
            <span className={`card text-2xl font-bold ${stat.color}`}>
              {stat.number}
            </span>
            <span className="text-foreground">{stat.label}</span>
          </h2>
        </div>
      ))}
    </MotionWrapper>
  );
};
