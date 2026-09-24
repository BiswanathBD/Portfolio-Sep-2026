import React from "react";
import { projectsData } from "@/data/projectData";
import Container from "@/Components/Shared/Container";
import { ProjectFilters } from "@/Components/ProjectsPage/ProjectFilters";
import { ProjectGridCard } from "@/Components/ProjectsPage/ProjectGridCard";
import { MotionWrapper } from "@/Components/Shared/MotionWrapper";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

const AllProjectsPage = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams?.category || "All";
  const searchQuery = resolvedParams?.q || "";

  const categories = [
    "All",
    ...Array.from(new Set(projectsData.map((project) => project.category))),
  ];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesSearch;
  });

  const projectListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All Portfolio Projects",
    description: "A showcase of web development projects.",
    itemListElement: filteredProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.description,
        image: project.image,
        url: project.liveUrl,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectListSchema),
        }}
      />

      {/* give space for mobile navbar */}
      <section className="relative py-24 w-full text-foreground sm:py-12 md:py-24">
        <Container>
          <div className="relative grid grid-cols-1 items-start gap-8 sm:gap-10 md:grid-cols-3 md:gap-12 xl:grid-cols-4 xl:gap-24">
            {/* Filter */}
            <aside className="z-50 flex flex-col md:sticky md:top-28 md:self-start">
              <div className="mb-6 shrink-0 text-center md:text-right">
                <MotionWrapper animationType="fadeLeft" delay={0.1}>
                  <h2 className="text-xl font-extrabold text-accent lg:text-2xl">
                    Relevant Projects
                  </h2>
                </MotionWrapper>

                <MotionWrapper animationType="fadeLeft" delay={0.3}>
                  <p className="text-xs leading-relaxed text-foreground sm:text-sm">
                    Explore my contributed web applications
                  </p>
                </MotionWrapper>
              </div>

              <MotionWrapper
                animationType="fadeUp"
                delay={0.4}
                className="w-full"
              >
                <ProjectFilters
                  categories={categories}
                  selectedCategory={selectedCategory}
                  searchQuery={searchQuery}
                />
              </MotionWrapper>
            </aside>

            {/* Projects */}
            <div className="relative z-20 md:col-span-2 xl:col-span-3">
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-12">
                  {filteredProjects.map((project, idx) => (
                    <ProjectGridCard
                      key={project.id}
                      project={project}
                      idx={idx}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-border-color bg-card-bg py-16 text-center">
                  <p className="text-sm text-foreground/60">
                    No projects found matching your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AllProjectsPage;
