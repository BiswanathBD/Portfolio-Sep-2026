import React from "react";
import Container from "@/Components/Shared/Container";

export default function HomeLoading() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center text-foreground mt-32 sm:mt-28 lg:mt-0">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-96 bg-primary/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Hero Section Grid Skeleton */}
      <div className="relative py-4 grow grid items-center sm:mt-16 lg:mt-0">
        <Container className="w-full grid lg:grid-cols-2 lg:gap-8 items-center relative h-full">
          {/* Left Side: HeroContent skeleton */}
          <article className="pt-0 sm:pt-28 md:pt-20 lg:pt-0 mx-auto w-full max-w-md sm:w-fit lg:w-full   md:max-w-lg lg:w-full mt-[8vw] lg:mt-0 order-2 lg:order-1">
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
              <div className="space-y-3 flex-1 w-full sm:w-sm md:w-lg lg:w-full">
                {/* Greeting line */}
                <div className="h-6 w-28 rounded bg-white/5 animate-pulse" />

                {/* Name heading */}
                <div className="h-8 sm:h-10 md:h-12 w-3/5 rounded-lg bg-white/5 animate-pulse" />
                <div className="h-8 sm:h-10 md:h-12 w-1/2 rounded-lg bg-white/5 animate-pulse" />

                {/* Role subtitle */}
                <div className="h-5 sm:h-6 w-2/3 rounded bg-white/5 animate-pulse" />

                {/* Description lines */}
                <div className="space-y-2.5 pt-2">
                  <div className="h-3.5 w-full rounded bg-white/5 animate-pulse" />
                  <div className="h-3.5 w-11/12 rounded bg-white/5 animate-pulse" />
                  <div className="h-3.5 w-4/5 rounded bg-white/5 animate-pulse" />
                </div>

                {/* Action buttons */}
                <div className="mt-6 h-12 w-36 rounded-sm bg-white/5 animate-pulse" />
              </div>
            </div>
          </article>

          {/* Right Side: ProfileShowcase skeleton (order-1 on mobile, order-2 on lg) */}
          <aside
            className="mx-auto w-11/12 max-w-sm sm:w-9/12 sm:max-w-full md:max-w-lg lg:w-full lg:max-w-full order-1 lg:order-2 flex item-center justify-center"
            aria-label="Profile Showcase skeleton"
          >
            {/* Exactly matches ProfileShowcase component root section */}
            <section className="relative w-full flex justify-center items-center">
              {/* Profile Image Wrapper (w-[52%] aspect-square) */}
              <div className="relative z-20 flex items-center justify-center w-[52%]">
                {/* Background glow */}
                <div className="absolute inset-0 bg-primary/60 rounded-full blur-[100px] z-0 pointer-events-none" />

                <div className="relative z-10 w-full aspect-square rounded-full border-2 border-primary/50 overflow-hidden bg-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(134,77,203,0.3)] animate-pulse">
                  <div className="w-full h-full bg-linear-to-tr from-primary/10 via-white/5 to-accent/10" />
                </div>
              </div>

              {/* Orbiting Ring 0: w-[64%], initialAngle: 0deg */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[10]">
                <div
                  className="w-[64%] aspect-square rounded-full border border-border-color/50 pointer-events-none animate-pulse"
                  style={{ transform: "rotate(0deg)", transformOrigin: "center center" }}
                >
                </div>
              </div>

              {/* Orbiting Ring 1: w-[76%], initialAngle: 55deg */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[9]">
                <div
                  className="w-[76%] aspect-square rounded-full border border-border-color/50 pointer-events-none animate-pulse"
                  style={{ transform: "rotate(55deg)", transformOrigin: "center center" }}
                >
                </div>
              </div>

              {/* Orbiting Ring 2: w-[88%], initialAngle: 85deg */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[8]">
                <div
                  className="w-[88%] aspect-square rounded-full border border-border-color/50 pointer-events-none animate-pulse"
                  style={{ transform: "rotate(85deg)", transformOrigin: "center center" }}
                >
                </div>
              </div>

              {/* Orbiting Ring 3: w-[100%], initialAngle: 25deg */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[7]">
                <div
                  className="w-[100%] aspect-square rounded-full border border-border-color/50 pointer-events-none animate-pulse"
                  style={{ transform: "rotate(25deg)", transformOrigin: "center center" }}
                >
                </div>
              </div>
            </section>
          </aside>
        </Container>
      </div>
    </div>
  );
}
