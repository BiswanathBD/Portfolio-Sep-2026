import React from "react";
import { projectsData } from "@/data/projectData";
import Container from "../Shared/Container";
import ProjectCard from "../ProjectCard";

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
      <section className="text-foreground w-full py-4 lg:py-8 relative">
        {/* Background Lighting Effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-120 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <Container>
          {/* Projects List */}
          <div className="space-y-24 md:space-y-32 lg:space-y-48">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* GitHub Call-to-Action */}
          <div className="text-center mt-16 md:mt-24 mb-8">
            <a
              href="https://github.com/BiswanathBD?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-gray-200 px-8 py-4 rounded-full font-medium hover:bg-white/10 hover:text-white hover:border-primary/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <span>View More Projects on GitHub</span>
              <i className="fab fa-github text-lg" />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Projects;
