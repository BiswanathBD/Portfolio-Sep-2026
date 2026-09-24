import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectItem } from "@/types/projectDataType";
import { MotionWrapper } from "./Shared/MotionWrapper";
import SectionWrapper from "./SectionWrapper";

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const isReversed = index % 2 !== 0;

  const animationX = isReversed ? "fadeLeft" : "fadeRight";
  const animationXReverse = isReversed ? "fadeRight" : "fadeLeft";

  const actions = [
    {
      idx: 1,
      label: "Back-end",
      url: project.backendUrl,
    },
    {
      idx: 1,
      label: "Front-end",
      url: project.frontendUrl,
    },
    {
      idx: 0,
      label: "Live Demo",
      url: project.liveUrl,
    },
  ];

  return (
    <SectionWrapper>
      <div className="relative">
        <div
          className={`flex items-stretch ${
            isReversed ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Action Bar */}
          <div className="flex shrink-0 self-stretch items-center px-10 [writing-mode:vertical-lr] rotate-180 text-nowrap">
            {actions.map((action) => (
              <MotionWrapper
                key={action.label}
                animationType={animationXReverse}
                transitionType="spring"
                delay={0.8 + action.idx * 0.1}
                className="text-xs font-bold tracking-widest flex-1 flex justify-center items-center"
              >
                {action.url ? (
                  <MotionWrapper
                    animationType="button"
                    className="w-full h-full"
                  >
                    <a
                      href={action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center min-w-full min-h-full px-4 py-2 text-center transition-all duration-500 ${
                        isReversed
                          ? "bg-accent/60 hover:bg-accent"
                          : "bg-primary/60  hover:bg-primary"
                      }`}
                    >
                      {action.label.toUpperCase()}
                    </a>
                  </MotionWrapper>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex items-center justify-center min-w-full min-h-full bg-foreground/10 px-4 py-2 text-center text-foreground/10"
                  >
                    {action.label.toUpperCase()}
                  </button>
                )}
              </MotionWrapper>
            ))}
          </div>

          {/* Image */}
          <MotionWrapper
            animationType={animationX}
            transitionType="spring"
            delay={0.5}
            className="relative flex-1 min-w-0 self-stretch shadow-[0_0_200px_var(--color-card-bg)]"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
              priority={false}
            />
          </MotionWrapper>

          {/* Content */}
          <div
            className={`flex min-w-0 flex-1 flex-col justify-center space-y-4 py-10 ${
              isReversed
                ? "text-right lg:order-1 lg:pr-16"
                : "lg:order-3 lg:pl-16"
            }`}
          >
            <div>
              <div
                className={`flex item-center gap-3 mb-4 ${isReversed && "flex-row-reverse"}`}
              >
                <MotionWrapper animationType={animationX} delay={0.3}>
                  <h2 className="text-3xl font-extrabold leading-tight text-accent md:text-3xl lg:text-4xl">
                    {project.title}
                  </h2>
                </MotionWrapper>

                <MotionWrapper animationType={animationX} delay={0.5}>
                  <div
                    className={`${isReversed ? "pr-3 border-r border-primary" : "pl-3 border-l border-primary"}`}
                  >
                    <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                      {project.category}
                    </span>

                    {project.subtitle && (
                      <p className="text-sm font-medium text-foreground/80 md:text-base">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                </MotionWrapper>
              </div>

              <MotionWrapper animationType="fadeUp" delay={0.4}>
                <p className="mb-6 line-clamp-4 text-xs leading-relaxed text-foreground/70 md:text-sm">
                  {project.description}
                </p>
              </MotionWrapper>

              <div
                className={`mb-8 flex flex-wrap gap-2 ${
                  isReversed ? "justify-end" : ""
                }`}
              >
                {project.technologies.map((tech, techIndex) => (
                  <MotionWrapper
                    key={techIndex}
                    animationType="fadeUp"
                    delay={0.4 + techIndex * 0.1}
                  >
                    <span className="border border-border-color bg-card-bg px-3 py-1 text-xs font-medium text-foreground/90">
                      {tech}
                    </span>
                  </MotionWrapper>
                ))}
              </div>

              <MotionWrapper
                animationType={animationX}
                transitionType="spring"
                delay={0.6}
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="group inline-flex items-center gap-2 text-x font-semibold text-accent shadow-md transition-all"
                >
                  <span>View Details</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectCard;
