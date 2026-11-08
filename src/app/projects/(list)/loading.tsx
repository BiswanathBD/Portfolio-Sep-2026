import React from "react";
import Container from "@/Components/Shared/Container";

export default function ProjectsLoading() {
  return (
    <section className="relative py-24 sm:py-12 md:py-24 w-full h-screen overflow-hidden text-foreground">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/3 size-96 bg-primary/5 rounded-full blur-[180px] pointer-events-none -z-10" />

      <Container>
        <div className="relative grid grid-cols-1 items-start gap-8 sm:gap-10 md:grid-cols-3 md:gap-12 xl:grid-cols-4 xl:gap-24">
          {/* Left: Filter Sidebar Skeleton */}
          <aside className="flex flex-col md:sticky md:top-24 md:min-h-[calc(100vh-192px)] md:self-start">
            <div className="mb-6 shrink-0 text-center md:text-right space-y-2">
              <div className="h-6 sm:h-7 w-40 sm:w-48 ml-auto mr-auto md:mr-0 md:ml-auto rounded-lg bg-white/5 animate-pulse" />
              <div className="h-3.5 w-52 sm:w-60 ml-auto mr-auto md:mr-0 md:ml-auto rounded bg-white/5 animate-pulse" />
            </div>

            <div className="w-full flex-1 border-b border-border-color/40 md:border-b-0 md:border-r md:pr-6 space-y-4 pt-2">
              {/* Search bar placeholder */}
              <div className="h-10 w-full rounded-md border border-border-color/30 bg-card-bg/40 animate-pulse" />

              {/* Category pills */}
              <div className="flex flex-wrap md:flex-col gap-2 pt-2">
                <div className="h-8 w-20 md:w-full rounded-md bg-white/5 animate-pulse" />
                <div className="h-8 w-28 md:w-full rounded-md bg-white/5 animate-pulse" />
                <div className="h-8 w-24 md:w-full rounded-md bg-white/5 animate-pulse" />
                <div className="h-8 w-32 md:w-full rounded-md bg-white/5 animate-pulse" />
              </div>
            </div>
          </aside>

          {/* Right: Projects Grid Skeleton */}
          <div className="relative z-20 md:col-span-2 xl:col-span-3">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-12">
              {/* Project Card Skeletons */}
              {[1, 2, 3, 4].map((i) => (
                <article
                  key={i}
                  className="flex flex-col rounded-sm overflow-hidden border border-border-color/40 bg-card-bg/30 animate-pulse"
                >
                  {/* Aspect video preview placeholder */}
                  <div className="aspect-video w-full bg-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-4 bg-background">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-36 rounded bg-white/5" />
                      <div className="h-4 w-20 rounded bg-white/5" />
                    </div>

                    <div className="space-y-2">
                      <div className="h-3.5 w-full rounded bg-white/5" />
                      <div className="h-3.5 w-4/5 rounded bg-white/5" />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <div className="h-6 w-16 rounded-md bg-white/5" />
                      <div className="h-6 w-20 rounded-md bg-white/5" />
                      <div className="h-6 w-16 rounded-md bg-white/5" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

