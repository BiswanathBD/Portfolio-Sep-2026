import React from "react";
import Container from "@/Components/Shared/Container";

export default function ProjectDetailLoading() {
  return (
    <main className="relative h-screen overflow-hidden text-foreground py-24 sm:py-8">
      {/* Background ambient glow */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 size-96 bg-accent/10 rounded-full blur-[200px] pointer-events-none -z-10" />

      <Container>
        {/* Back button skeleton */}
        <div className="mb-6 md:mb-12 flex items-center gap-2">
          <div className="size-4 rounded-full bg-white/5 animate-pulse" />
          <div className="h-4 w-28 rounded bg-white/5 animate-pulse" />
        </div>

        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-10 lg:mb-14">
          {/* Left: Project live preview or static image placeholder */}
          <div className="relative aspect-3/4 sm:aspect-3/2 w-full overflow-hidden rounded-b-sm rounded-r-sm border-2 border-border-color/40 bg-card-bg/40 animate-pulse">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Right: Project info */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="mb-2 flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="h-8 sm:h-10 w-48 rounded-lg bg-white/5 animate-pulse" />
              <div className="h-4 w-32 rounded bg-white/5 animate-pulse lg:border-l lg:border-primary/40 lg:pl-3" />
            </div>

            <div className="space-y-2 py-2">
              <div className="h-3.5 w-full rounded bg-white/5 animate-pulse" />
              <div className="h-3.5 w-11/12 rounded bg-white/5 animate-pulse" />
              <div className="h-3.5 w-4/5 rounded bg-white/5 animate-pulse" />
            </div>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="h-6 w-20 rounded-lg bg-white/5 animate-pulse" />
              <div className="h-6 w-16 rounded-lg bg-white/5 animate-pulse" />
              <div className="h-6 w-24 rounded-lg bg-white/5 animate-pulse" />
              <div className="h-6 w-20 rounded-lg bg-white/5 animate-pulse" />
            </div>

            {/* Action buttons */}
            <div className="pt-3 flex flex-wrap gap-3">
              <div className="h-9 w-28 rounded-sm bg-white/5 animate-pulse" />
              <div className="h-9 w-28 rounded-sm bg-white/5 animate-pulse" />
              <div className="h-9 w-28 rounded-sm bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content sections skeleton below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
          <div className="card lg:col-span-7 bg-background py-6 px-8 rounded-sm border border-border-color/30 space-y-4 animate-pulse">
            <div className="h-6 w-40 rounded bg-white/5" />
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-white/5" />
              <div className="h-3.5 w-5/6 rounded bg-white/5" />
              <div className="h-3.5 w-4/6 rounded bg-white/5" />
            </div>
          </div>

          <div className="card lg:col-span-5 bg-card-bg/40 py-6 px-8 rounded-sm border border-border-color/30 space-y-4 animate-pulse">
            <div className="h-6 w-36 rounded bg-white/5" />
            <div className="space-y-2.5">
              <div className="h-4 w-full rounded bg-white/5" />
              <div className="h-4 w-4/5 rounded bg-white/5" />
              <div className="h-4 w-3/4 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

