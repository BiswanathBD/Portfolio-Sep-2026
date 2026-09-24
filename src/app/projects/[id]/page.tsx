import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projectData";
import {
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Layers,
  ShieldAlert,
  Rocket,
} from "lucide-react";
import Container from "@/Components/Shared/Container";
import { MotionWrapper } from "@/Components/Shared/MotionWrapper";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// github icon
const GithubIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const resolvedParams = await params;
  const project = projectsData.find(
    (p) => p.id.toString() === resolvedParams.id,
  );

  if (!project) {
    notFound();
  }

  const { liveUrl, frontendUrl, backendUrl } = project;

  return (
    <main className="relative min-h-screen text-foreground py-8">
      <Container>
        {/* bottom glow */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 size-100 bg-accent/15 rounded-full blur-[200px] pointer-events-none -z-10" />

        {/* back button */}
        <MotionWrapper
          animationType="fadeRight"
          transitionType="spring"
          delay={0.1}
          className="mb-6 md:mb-12"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 py-2 group shadow-sm"
          >
            <ArrowLeft className="size-4 text-accent transition-transform duration-500 group-hover:-translate-x-1" />
            <span className="bg-linear-to-r from-accent to-primary bg-clip-text text-transparent font-bold text-sm tracking-wide">
              Back to Projects
            </span>
          </Link>
        </MotionWrapper>

        {/* hero section */}
        <aside className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 md:mb-20">
          {/* project live preview or static image */}
          <MotionWrapper
            animationType="fadeUp"
            transitionType="spring"
            delay={0.2}
            className="w-full card relative"
          >
            {/* corner glow */}
            <div className="absolute w-1/2 aspect-square bg-primary/20 bottom-0 -right-1/4 -z-10 blur-[150px]"/>

            {/* live preview indicator */}
            <div className="inline-flex items-center select-none">
              {/* text area */}
              <span className="pl-2 pr-1 bg-accent text-accent-foreground text-[10px] font-bold tracking-widest ml-px">
                Live Preview
              </span>
              <div
                className="h-3.75 w-3.5 bg-accent"
                style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
              />
            </div>

            {/* main preview */}
            <div className="relative aspect-3/2 w-full overflow-hidden rounded-b-sm rounded-r-sm border-2 border-border-color shadow-2xl backdrop-blur-sm group -mt-0.5">
              {liveUrl ? (
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <div className="w-[calc(100%+14px)] lg:w-[254%] h-full lg:h-[250%] origin-top-left lg:scale-40 overflow-hidden">
                    <iframe
                      src={liveUrl}
                      title={project.title}
                      className="w-full h-full border-none pointer-events-auto"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                </div>
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-700 rounded-sm"
                />
              )}
            </div>
          </MotionWrapper>

          {/* project info */}
          <aside className="flex flex-col justify-center space-y-4">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
              {/* title */}
              <MotionWrapper
                animationType="fadeRight"
                transitionType="spring"
                delay={0.3}
              >
                <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-accent">
                  {project.title}
                </h1>
              </MotionWrapper>

              {/* category & subtitle */}
              <MotionWrapper
                animationType="fadeRight"
                transitionType="spring"
                delay={0.4}
                className="border-l border-primary pl-3"
              >
                <span className="mb-1 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
                  {project.category}
                </span>

                {project.subtitle && (
                  <p className="text-sm font-medium text-foreground/80 md:text-base">
                    {project.subtitle}
                  </p>
                )}
              </MotionWrapper>
            </div>

            {/* description */}
            <MotionWrapper
              animationType="fadeUp"
              transitionType="spring"
              delay={0.4}
            >
              <p className="mb-6 text-xs leading-relaxed text-foreground/70 md:text-sm">
                {project.description}
              </p>
            </MotionWrapper>

            {/* tech stack */}
            <div className="mb-8 flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <MotionWrapper
                  key={idx}
                  animationType="fadeUp"
                  delay={0.4 + idx * 0.1}
                  className="border border-border-color/40 bg-card-bg px-3 py-1 text-xs font-medium text-foreground backdrop-blur-xs rounded-lg"
                >
                  {tech}
                </MotionWrapper>
              ))}
            </div>

            {/* action buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <MotionWrapper animationType="fadeUp" delay={0.4}>
                {liveUrl ? (
                  <Link
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 backdrop-blur-md bg-accent/15 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 text-foreground font-semibold text-xs uppercase tracking-wider rounded-sm shadow-lg transition-all duration-300 hover:shadow-accent/14 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="size-3.5" />
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 backdrop-blur-xs bg-foreground/5 border border-foreground/5 text-foreground/30 font-semibold text-xs uppercase tracking-wider rounded-sm cursor-not-allowed select-none">
                    Live Demo (N/A)
                  </span>
                )}
              </MotionWrapper>

              <MotionWrapper animationType="fadeUp" delay={0.5}>
                {frontendUrl ? (
                  <Link
                    href={frontendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 backdrop-blur-md bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50 text-foreground font-semibold text-xs uppercase tracking-wider rounded-sm shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <GithubIcon className="size-3.5" />
                    <span>Frontend</span>
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 backdrop-blur-xs bg-foreground/5 border border-foreground/5 text-foreground/30 font-semibold text-xs uppercase tracking-wider rounded-sm cursor-not-allowed select-none">
                    Frontend (N/A)
                  </span>
                )}
              </MotionWrapper>

              <MotionWrapper animationType="fadeUp" delay={0.6}>
                {backendUrl ? (
                  <Link
                    href={backendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 backdrop-blur-md bg-primary/20 hover:bg-primary/30 border border-primary/30 hover:border-primary/50 text-foreground font-semibold text-xs uppercase tracking-wider rounded-sm shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <GithubIcon className="size-3.5" />
                    <span>Backend</span>
                  </Link>
                ) : (
                  <span className="px-5 py-2.5 backdrop-blur-xs bg-foreground/5 border border-foreground/5 text-foreground/30 font-semibold text-xs uppercase tracking-wider rounded-sm cursor-not-allowed select-none">
                    Backend (N/A)
                  </span>
                )}
              </MotionWrapper>
            </div>
          </aside>
        </aside>

        {/* content sections */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-12 items-stretch">
            {/* project overview */}
            <MotionWrapper
              animationType="fadeUp"
              delay={0.2}
              className="card lg:col-span-7 flex flex-col justify-between bg-background py-6 px-8 rounded-sm"
            >
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                  <Layers className="size-5 text-primary" />
                  <span>Project Overview</span>
                </h2>
                <p className="text-foreground/80 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {project.detailedDescription || project.description}
                </p>
              </div>
            </MotionWrapper>

            {/* key features */}
            {project.features && project.features.length > 0 && (
              <MotionWrapper
                animationType="fadeUp"
                delay={0.4}
                className="lg:col-span-5 flex flex-col justify-between bg-accent py-6 px-8 rounded-sm shadow-lg"
              >
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent-foreground">
                    <Sparkles className="size-5 text-accent-foreground" />
                    <span>Key Features</span>
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-accent-foreground font-black text-sm mt-0.5 shrink-0 opacity-90">
                          0{index + 1}.
                        </span>
                        <p className="text-accent-foreground text-sm font-medium leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* challenges and solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <MotionWrapper
                animationType="fadeUp"
                delay={0.2}
                className="flex flex-col justify-between bg-background py-6 px-8 rounded-sm"
              >
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                    <ShieldAlert className="size-5 text-primary" />
                    <span>Challenges & Solutions</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="space-y-1">
                        <span className="text-xs font-bold text-accent tracking-wider uppercase block">
                          Challenge {index + 1}
                        </span>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          {challenge}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            )}

            {/* future roadmap */}
            {project.improvements && project.improvements.length > 0 && (
              <MotionWrapper
                animationType="fadeUp"
                delay={0.4}
                className="flex flex-col justify-between bg-background py-6 px-8 rounded-sm"
              >
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                    <Rocket className="size-5 text-primary" />
                    <span>Future Roadmap</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="size-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_8px_var(--color-accent)]" />
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          {improvement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProjectDetailPage;
