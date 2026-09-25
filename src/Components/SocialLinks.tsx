import React from "react";
import { socialsData } from "@/data/contactData";
import Link from "next/link";
import { MotionWrapper } from "./Shared/MotionWrapper";

export const SocialLinks = () => {
  return (
    <div className="flex items-center justify-center gap-6 px-2 lg:flex-col">
      {socialsData.map((s, idx) => {
        const IconComponent = s.icon;
        return (
          <MotionWrapper
            key={s.name}
            animationType="fadeUp"
            delay={0.2 + idx * 0.1}
          >
            <Link
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="group relative"
            >
              <div
                className={`absolute inset-0 rounded-xl bg-linear-to-r ${s.glow} opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100`}
              />
              <MotionWrapper animationType="button">
                <div
                  className={`relative flex h-10 w-10 items-center justify-center rounded-xl border border-border-color bg-linear-to-br from-card-bg to-border-color text-foreground ${s.color} ${s.borderColor} ${s.shadowColor} transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}
                >
                  <IconComponent className="text-base" />
                </div>
              </MotionWrapper>
            </Link>
          </MotionWrapper>
        );
      })}
    </div>
  );
};
