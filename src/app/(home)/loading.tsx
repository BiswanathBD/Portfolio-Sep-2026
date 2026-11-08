import React from "react";
import Container from "@/Components/Shared/Container";

export default function HomeLoading() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-center text-foreground">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-96 bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Hero Section Grid Skeleton */}
      <div className="relative py-4 grow grid items-center mt-38 sm:mt-16 lg:mt-0">
        <Container className="grid w-full lg:grid-cols-2 gap-12 lg:gap-8 items-center relative h-full">
          {/* Left Side: HeroContent skeleton (order-2 on mobile, order-1 on lg) */}
          <article className="mt-[8vw] lg:mt-0 order-2 lg:order-1 mx-auto w-full">
            <div className="flex items-center gap-6 sm:gap-8">
              {/* Social vertical line indicator */}
              <div className="flex flex-col items-center gap-4 px-2">
                <div className="h-16 w-px bg-linear-to-t from-accent/40 to-transparent" />
                <div className="size-8 rounded-full border border-primary/20 bg-white/5 animate-pulse" />
                <div className="size-8 rounded-full border border-primary/20 bg-white/5 animate-pulse" />
                <div className="size-8 rounded-full border border-primary/20 bg-white/5 animate-pulse" />
                <div className="h-16 w-px bg-linear-to-b from-accent/40 to-transparent" />
              </div>

              {/* Text lines */}
              <div className="space-y-3 max-w-sm sm:max-w-sm md:max-w-lg lg:w-full flex-1">
                {/* Greeting line */}
                <div className="h-4 w-28 rounded bg-white/5 animate-pulse" />

                {/* Name heading */}
                <div className="h-8 sm:h-10 md:h-12 w-3/4 rounded-lg bg-white/5 animate-pulse" />

                {/* Role subtitle */}
                <div className="h-5 sm:h-6 w-1/2 rounded bg-white/5 animate-pulse" />

                {/* Description lines */}
                <div className="space-y-2 pt-2">
                  <div className="h-3.5 w-full rounded bg-white/5 animate-pulse" />
                  <div className="h-3.5 w-11/12 rounded bg-white/5 animate-pulse" />
                  <div className="h-3.5 w-4/5 rounded bg-white/5 animate-pulse" />
                </div>

                {/* Action buttons */}
                <div className="pt-4 flex items-center gap-4">
                  <div className="h-10 w-36 rounded-sm bg-white/5 animate-pulse" />
                  <div className="h-10 w-32 rounded-sm bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>
          </article>

          {/* Right Side: ProfileShowcase skeleton (order-1 on mobile, order-2 on lg) */}
          <aside
            className="mx-auto w-11/12 lg:w-full order-1 lg:order-2 flex justify-center items-center"
            aria-label="Profile Showcase skeleton"
          >
            <section className="relative w-full aspect-square flex justify-center items-center">
              {/* Center Profile Avatar Skeleton (w-[52%] matching Hero) */}
              <div className="relative z-20 flex items-center justify-center w-[52%]">
                {/* Background glow */}
                <div className="absolute inset-0 bg-primary/40 rounded-full blur-[80px] pointer-events-none -z-10" />

                <div className="relative z-10 w-full aspect-square rounded-full border-2 border-primary/50 overflow-hidden bg-background/80 flex items-center justify-center shadow-[0_0_50px_rgba(134,77,203,0.3)] animate-pulse">
                  <div className="w-full h-full bg-linear-to-tr from-primary/15 via-white/5 to-accent/15" />
                </div>
              </div>

              {/* Orbiting Rings matching circleSize = ["w-[64%]", "w-[76%]", "w-[88%]", "w-[100%]"] */}
              {/* Inner Circle 1 (w-[64%]) */}
              <div className="absolute w-[64%] aspect-square rounded-full border border-border-color/40 pointer-events-none animate-pulse flex items-center justify-center">
                <div className="absolute -top-3.5 left-1/3 size-7 sm:size-8 rounded-full bg-card-bg/80 border border-primary/30" />
                <div className="absolute -bottom-3.5 right-1/4 size-7 sm:size-8 rounded-full bg-card-bg/80 border border-accent/30" />
              </div>

              {/* Middle Circle 2 (w-[76%]) */}
              <div className="absolute w-[76%] aspect-square rounded-full border border-border-color/40 pointer-events-none animate-pulse flex items-center justify-center">
                <div className="absolute top-1/4 -right-3.5 size-7 sm:size-8 rounded-full bg-card-bg/80 border border-primary/30" />
                <div className="absolute bottom-1/3 -left-3.5 size-7 sm:size-8 rounded-full bg-card-bg/80 border border-accent/30" />
              </div>

              {/* Third Circle 3 (w-[88%]) */}
              <div className="absolute w-[88%] aspect-square rounded-full border border-border-color/40 pointer-events-none animate-pulse flex items-center justify-center">
                <div className="absolute -top-4 right-1/3 size-7 sm:size-8 rounded-full bg-card-bg/80 border border-primary/30" />
                <div className="absolute -bottom-4 left-1/3 size-7 sm:size-8 rounded-full bg-card-bg/80 border border-accent/30" />
              </div>

              {/* Outermost Circle 4 (w-[100%]) */}
              <div className="absolute w-[100%] aspect-square rounded-full border border-border-color/40 pointer-events-none animate-pulse flex items-center justify-center">
                <div className="absolute top-1/3 -left-4 size-7 sm:size-8 rounded-full bg-card-bg/80 border border-primary/30" />
                <div className="absolute bottom-1/4 -right-4 size-7 sm:size-8 rounded-full bg-card-bg/80 border border-accent/30" />
              </div>
            </section>
          </aside>
        </Container>
      </div>
    </div>
  );
}

