"use client";

import React from "react";
import { ArrowUpRight, Check, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { ExperienceItem } from "@/data/experienceData";
import { MotionWrapper } from "./Shared/MotionWrapper";

interface ExperienceCardsProps {
  experience: ExperienceItem;
}

const ExperienceCards = ({ experience }: ExperienceCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-2 gap-4">
      {/* What I Do */}
      <MotionWrapper
        animationType="fadeUp"
        transitionType="spring"
        delay={0.3}
        className="h-full md:col-span-4 lg:col-span-1 lg:row-span-2"
      >
        <article className="group relative h-full overflow-hidden rounded-4xl border border-border-color/40 bg-card-bg/35 p-4 transition-all duration-500 hover:border-primary/20 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="pointer-events-none absolute -bottom-20 -left-16 size-44 rounded-full bg-accent/8 blur-3xl transition-transform duration-700 group-hover:scale-110" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)/6%,transparent_35%)]" />

          <div className="relative z-10">
            <header className="mb-6 flex items-center justify-between gap-4">
              <div>
                <span className="mb-1 block text-[10px] font-semibold tracking-[0.16em] text-primary">
                  01
                </span>

                <h3 className="text-lg font-bold text-foreground sm:text-xl">
                  What I Do
                </h3>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl border border-border-color/60 bg-background/30 text-primary backdrop-blur-md">
                <Check className="size-4" />
              </div>
            </header>

            <div className="space-y-4">
              {experience.description.map((description, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />

                  <p className="text-xs leading-relaxed text-foreground/65 sm:text-sm">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </MotionWrapper>

      {/* Technologies */}
      <MotionWrapper
        animationType="fadeUp"
        transitionType="spring"
        delay={0.4}
        className="h-full md:col-span-3 lg:col-span-1"
      >
        <article className="group relative h-full overflow-hidden rounded-4xl border border-border-color/40 bg-card-bg/35 p-4 transition-all duration-500 hover:border-accent/10 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 size-44 rounded-full bg-accent/8 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="pointer-events-none absolute -bottom-16 -left-12 size-36 rounded-full bg-primary/8 blur-3xl transition-transform duration-700 group-hover:scale-110" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-accent)/5%,transparent_38%)]" />

          <div className="relative z-10">
            <header className="mb-6 flex items-center justify-between gap-4">
              <div>
                <span className="mb-1 block text-[10px] font-semibold tracking-[0.16em] text-accent">
                  02
                </span>

                <h3 className="text-lg font-bold text-foreground sm:text-xl">
                  Technologies
                </h3>
              </div>

              <div className="flex size-10 items-center justify-center rounded-xl border border-border-color/60 bg-background/30 text-accent backdrop-blur-md">
                <FolderGit2 className="size-4" />
              </div>
            </header>

            <div className="flex flex-wrap gap-2">
              {experience.skills.map((skill, index) => (
                <MotionWrapper
                  key={skill}
                  animationType="fadeUp"
                  transitionType="spring"
                  delay={0.45 + index * 0.04}
                >
                  <span className="inline-flex items-center rounded-lg border border-border-color/50 bg-background/25 px-2.5 py-1.5 text-[11px] font-medium text-foreground/70 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary">
                    {skill}
                  </span>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </article>
      </MotionWrapper>

      {/* Projects */}
      {experience.projectsWorkedOn &&
        experience.projectsWorkedOn.length > 0 && (
          <MotionWrapper
            animationType="fadeUp"
            transitionType="spring"
            delay={0.5}
            className="h-full md:col-span-7 lg:col-span-1"
          >
            <article className="relative h-full overflow-hidden rounded-4xl border border-border-color/40 bg-card-bg/50 p-4 transition-all duration-500 hover:border-primary/20 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 size-44 rounded-full bg-primary/8 blur-3xl transition-transform duration-700" />

              <div className="pointer-events-none absolute -bottom-16 -left-12 size-36 rounded-full bg-accent/8 blur-3xl transition-transform duration-700" />

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)/5%,transparent_38%)]" />

              <div className="relative z-10">
                <header className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <span className="mb-1 block text-[10px] font-semibold tracking-[0.16em] text-primary">
                      03
                    </span>

                    <h3 className="text-lg font-bold text-foreground sm:text-xl">
                      Projects
                    </h3>
                  </div>

                  <div className="flex size-10 items-center justify-center rounded-xl border border-border-color/60 bg-background/30 text-primary backdrop-blur-md">
                    <FolderGit2 className="size-4" />
                  </div>
                </header>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                  {experience.projectsWorkedOn.map((project) => (
                    <div
                      key={project.name}
                      className="group rounded-xl border border-border-color/35 bg-background/15 p-3 transition-colors duration-300 hover:border-primary/30 hover:bg-background/25"
                    >
                      <div className="flex justify-between gap-3">
                        <h4 className="text-sm font-bold text-foreground">
                          {project.name}
                        </h4>

                        {project.liveUrl && (
                          <MotionWrapper animationType="button">
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.name} live website`}
                              className="flex size-7 shrink-0 items-center justify-center rounded-lg text-shadow-color transition-all duration-500 group-hover:text-primary hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            >
                              <ArrowUpRight className="size-4" />
                            </Link>
                          </MotionWrapper>
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-relaxed text-foreground/55">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </MotionWrapper>
        )}
    </div>
  );
};

export default ExperienceCards;
