"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2, ExternalLink, FolderGit2, ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/types/projectDataType";
import { MotionWrapper } from "../Shared/MotionWrapper";

interface ProjectGridCardProps {
  project: ProjectItem;
  idx: number;
}

export const ProjectGridCard: React.FC<ProjectGridCardProps> = ({
  project,
  idx,
}) => {
  return (
    <MotionWrapper
      animationType="fadeUp"
      delay={0.2 + idx * 0.2}
      className="relative"
    >
      <article className="group relative flex h-full flex-col rounded-sm overflow-hidden border border-border-color/40">
        {/* Project visual */}

        <Link
          href={`/projects/${project.id}`}
          className="group/image relative block aspect-video w-full overflow-hidden"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-[1.035]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover/image:opacity-40" />
        </Link>

        {/* Project information */}
        <div className="flex flex-1 flex-col p-5 bg-background">
          {/* Title + category */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MotionWrapper animationType="fadeRight" delay={0.2}>
              <Link
                href={`/projects/${project.id}`}
                className="group/title inline-flex w-fit items-center"
              >
                <h3 className="text-xl text-nowrap font-extrabold leading-tight text-foreground transition-all duration-400 group-hover/title:text-accent sm:text-2xl">
                  {project.title}
                </h3>
              </Link>
            </MotionWrapper>

            <MotionWrapper
              animationType="fadeRight"
              delay={0.4}
              className="border-l border-accent pl-3"
            >
              <span className="mb-1 inline-block text-[10px] font-semibold tracking-widest text-accent">
                {project.category}
              </span>

              {project.subtitle && (
                <p className="text-sm sm:text-base font-medium text-foreground pb-2">
                  {project.subtitle}
                </p>
              )}
            </MotionWrapper>
          </div>

          {/* Description */}
          <MotionWrapper animationType="fadeUp" delay={0.6}>
            <p className="mb-5 text-xs leading-relaxed text-foreground sm:text-sm">
              {project.description}
            </p>
          </MotionWrapper>

          {/* main technology stack */}
          {project.mainTech && (
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 text-[10px] font-medium text-foreground/50 sm:text-xs">
              {project.mainTech.map((tech, idx) => (
                <MotionWrapper
                  key={tech.name}
                  animationType="fadeUp"
                  transitionType="spring"
                  delay={0.5 + idx * 0.1}
                  className="flex items-center justify-center p-1.5 bg-border-color border border-border-color  rounded-full"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={24}
                    height={24}
                    className="h-4 w-4 object-contain"
                  />
                </MotionWrapper>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto flex items-center justify-between gap-4 pt-1">
            {/* External links */}
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <MotionWrapper
                  animationType="fadeUp"
                  transitionType="spring"
                  delay={0.5}
                >
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="inline-flex items-center justify-center text-foreground/45 transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
                  >
                    <ExternalLink className="size-3.5 sm:size-4" />
                  </Link>
                </MotionWrapper>
              )}

              {project.frontendUrl && (
                <MotionWrapper
                  animationType="fadeUp"
                  transitionType="spring"
                  delay={0.55}
                >
                  <Link
                    href={project.frontendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} frontend repository`}
                    className="inline-flex items-center justify-center text-foreground/45 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
                  >
                    <Code2 className="size-3.5 sm:size-4" />
                  </Link>
                </MotionWrapper>
              )}

              {project.backendUrl && (
                <MotionWrapper
                  animationType="fadeUp"
                  transitionType="spring"
                  delay={0.6}
                >
                  <Link
                    href={project.backendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} backend repository`}
                    className="inline-flex items-center justify-center text-foreground/45 transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
                  >
                    <FolderGit2 className="size-3.5 sm:size-4" />
                  </Link>
                </MotionWrapper>
              )}
            </div>

            {/* Primary action */}
            <MotionWrapper
              animationType="fadeUp"
              transitionType="spring"
              delay={0.65}
              className="ml-auto"
            >
              <Link
                href={`/projects/${project.id}`}
                className="group/details inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors duration-300 hover:text-primary sm:text-sm"
              >
                <span>View details</span>

                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5" />
              </Link>
            </MotionWrapper>
          </div>
        </div>
      </article>
    </MotionWrapper>
  );
};
