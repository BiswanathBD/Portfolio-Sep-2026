import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projectData";

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

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const resolvedParams = await params;
  const project = projectsData.find(
    (p) => p.id.toString() === resolvedParams.id,
  );

  if (!project) {
    notFound();
  }

  // অপশনাল প্রপার্টি ডিফাইন
  const { liveUrl, frontendUrl, backendUrl } = project;

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-foreground">
      {/* Navigation Back Link */}
      <div className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-secondary/50 hover:bg-secondary px-4 py-2 rounded-xl border border-border"
        >
          <i className="fas fa-arrow-left text-xs" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="bg-card/80 backdrop-blur-2xl border border-border rounded-3xl p-6 md:p-10 shadow-2xl space-y-10">
        {/* Header */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full inline-block mb-3">
            {project.category}
          </span>
          <h1 className="font-extrabold text-3xl md:text-5xl text-card-foreground mb-2">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg text-muted-foreground font-medium">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Action Links (সবগুলো বাটন সবসময় দৃশ্যমান থাকবে) */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Live Link */}
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 bg-primary text-primary-foreground text-center font-semibold text-sm rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              Live Project
            </a>
          ) : (
            <button
              disabled
              className="flex-1 py-3 px-5 bg-muted/40 text-muted-foreground/40 text-center font-semibold text-sm rounded-xl border border-border/40 cursor-not-allowed select-none"
            >
              Live Project (N/A)
            </button>
          )}

          {/* Frontend Link */}
          {frontendUrl ? (
            <a
              href={frontendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 bg-secondary text-secondary-foreground hover:bg-secondary/80 text-center font-semibold text-sm rounded-xl transition-colors border border-border"
            >
              Frontend Code
            </a>
          ) : (
            <button
              disabled
              className="flex-1 py-3 px-5 bg-muted/40 text-muted-foreground/40 text-center font-semibold text-sm rounded-xl border border-border/40 cursor-not-allowed select-none"
            >
              Frontend Code (N/A)
            </button>
          )}

          {/* Backend Link */}
          {backendUrl ? (
            <a
              href={backendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-5 bg-secondary text-secondary-foreground hover:bg-secondary/80 text-center font-semibold text-sm rounded-xl transition-colors border border-border"
            >
              Backend Code
            </a>
          ) : (
            <button
              disabled
              className="flex-1 py-3 px-5 bg-muted/40 text-muted-foreground/40 text-center font-semibold text-sm rounded-xl border border-border/40 cursor-not-allowed select-none"
            >
              Backend Code (N/A)
            </button>
          )}
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-card-foreground font-bold text-xl mb-4 flex items-center gap-2">
            <i className="fas fa-code text-primary" />
            Technology Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3.5 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-lg border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Overview Description */}
        <div>
          <h2 className="text-card-foreground font-bold text-xl mb-4 flex items-center gap-2">
            <i className="fas fa-info-circle text-primary" />
            Project Overview
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
            {project.detailedDescription || project.description}
          </p>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div>
            <h2 className="text-card-foreground font-bold text-xl mb-4 flex items-center gap-2">
              <i className="fas fa-star text-primary" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-muted-foreground text-sm md:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges & Solutions */}
        {project.challenges && project.challenges.length > 0 && (
          <div>
            <h2 className="text-card-foreground font-bold text-xl mb-4 flex items-center gap-2">
              <i className="fas fa-mountain text-primary" />
              Challenges & Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-muted-foreground text-sm md:text-base"
                >
                  {challenge}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Future Improvements */}
        {project.improvements && project.improvements.length > 0 && (
          <div>
            <h2 className="text-card-foreground font-bold text-xl mb-4 flex items-center gap-2">
              <i className="fas fa-lightbulb text-primary" />
              Future Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.improvements.map((improvement, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-secondary/50 border border-border text-muted-foreground text-sm md:text-base"
                >
                  {improvement}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProjectDetailPage;
