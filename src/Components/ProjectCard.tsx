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
          className={`flex flex-col lg:items-stretch lg:flex-row ${
            isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* Action Bar */}
          <div className="order-2 flex w-full shrink-0 items-stretch lg:order-0 lg:w-auto lg:self-stretch lg:items-center lg:border-b-0 lg:px-10 lg:[writing-mode:vertical-lr] lg:rotate-180 lg:text-nowrap">
            {actions.map((action) => (
              <MotionWrapper
                key={action.label}
                animationType={animationXReverse}
                transitionType="spring"
                delay={0.8 + action.idx * 0.1}
                className="flex flex-1 items-center justify-center text-xs font-bold tracking-widest h-full lg:flex-1"
              >
                {action.url ? (
                  <MotionWrapper
                    animationType="button"
                    className="h-full w-full lg:h-full lg:w-full"
                  >
                    <Link
                      href={action.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex min-h-12 w-full items-center justify-center px-3 py-3 text-center transition-all duration-500 lg:min-h-0 lg:min-w-full lg:px-4 lg:py-2 ${
                        isReversed
                          ? "bg-accent/60 hover:bg-accent"
                          : "bg-primary/60 hover:bg-primary"
                      }`}
                    >
                      <span className="lg:block lg:-rotate-0">
                        {action.label.toUpperCase()}
                      </span>
                    </Link>
                  </MotionWrapper>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex min-h-12 w-full items-center justify-center bg-foreground/10 px-3 py-3 text-center text-foreground/10 lg:min-h-0 lg:min-w-full lg:px-4 lg:py-2"
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
            className="relative order-1 aspect-video w-full min-w-0 overflow-hidden shadow-[0_0_200px_var(--color-card-bg)] lg:order-0 lg:aspect-auto lg:flex-1 lg:self-stretch"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1023px) 100vw, 40vw"
              className="object-cover object-top"
              priority
            />
          </MotionWrapper>
          {/* Content */}
          <div
            className={`order-3 flex min-w-0 w-full flex-1 flex-col justify-center space-y-4 py-8 sm:py-10 lg:order-3 lg:w-auto lg:py-10 ${
              isReversed
                ? "text-left lg:pr-16 lg:text-right lg:order-1"
                : "lg:pl-16"
            }`}
          >
            <div>
              <div
                className={`mb-4 flex flex-col gap-3 lg:flex-row lg:items-center ${
                  isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <MotionWrapper animationType={animationX} delay={0.3}>
                  <h2 className="text-3xl font-extrabold leading-tight text-accent md:text-3xl lg:text-4xl">
                    {project.title}
                  </h2>
                </MotionWrapper>

                <MotionWrapper animationType={animationX} delay={0.5}>
                  <div
                    className={`${
                      isReversed
                        ? "border-l pl-3 lg:border-r lg:pr-3 lg:border-l-0 lg:pl-0"
                        : "border-l pl-3 lg:border-l lg:pl-3"
                    } border-primary`}
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
                  isReversed ? "lg:justify-end" : ""
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

              <div
                className={`flex justify-between items-center gap-4 ${isReversed ? "justify-end" : "justify-start"}`}
              >
                <span className="grow h-px bg-border-color/60 lg:hidden" />

                <MotionWrapper
                  animationType={animationX}
                  transitionType="spring"
                  delay={0.6}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-2 lg:text-lg font-semibold text-accent shadow-md transition-all"
                  >
                    <span>View Details</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MotionWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectCard;
