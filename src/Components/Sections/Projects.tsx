import React from "react";
import { projectsData } from "@/data/projectData";
import Container from "../Shared/Container";
import ProjectCard from "../ProjectCard";
import Link from "next/link";
import {  FolderGit2 } from "lucide-react";
import { MotionWrapper } from "../Shared/MotionWrapper";

const Projects: React.FC = () => {
  // SEO Structured Data for Portfolio Projects
  const projectListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects",
    description: "A showcase of web development projects and applications.",
    itemListElement: projectsData.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        applicationCategory: "WebApplication",
        operatingSystem: "Web Browser",
        image: project.image,
        url: project.liveUrl,
      },
    })),
  };

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListSchema) }}
      />

      {/* Projects Section */}
      <section className="text-foreground w-full py-12 lg:py-24 relative overflow-hidden">
        {/* Background Lighting Effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 lg:size-120 bg-primary/10 rounded-full blur-[100px] lg:blur-[120px] pointer-events-none -z-10" />

        <Container>
          {/* Projects List */}
          <div className="gap-8 md:gap-16 lg:gap-32 grid sm:grid-cols-2 lg:grid-cols-1">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* all projects */}
          <div className="flex items-center justify-center gap-4 mt-8 lg:mt-16">
            <MotionWrapper animationType="button">
              <div className="relative p-px rounded-2xl overflow-hidden flex items-center justify-center group">
                <Link
                  href={"/projects"}
                  className="relative flex items-center gap-2 px-6 py-3 rounded-[calc(1rem-1px)] overflow-hidden bg-background/90 backdrop-blur-md bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 text-accent font-medium z-10 transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span>Explore More Projects</span>

                  <FolderGit2 className="w-4 h-4 text-foreground group-hover:scale-110 transition-all duration-500" />
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Projects;
