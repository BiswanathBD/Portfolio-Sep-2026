"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, FolderGit2 } from "lucide-react";
import Container from "@/Components/Shared/Container";
import { MotionWrapper } from "./MotionWrapper";

export default function NotFoundClient() {
  const router = useRouter();

  // Hide the layout footer while on the 404 page and restore on unmount
  useEffect(() => {
    const footer = document.getElementById("footer");
    if (footer) {
      const prevDisplay = footer.style.display;
      footer.style.display = "none";
      return () => {
        footer.style.display = prevDisplay;
      };
    }
  }, []);

  return (
    <>
      {/* Hide layout footer on 404 page */}
      <style>{`
        #footer {
          display: none !important;
        }
      `}</style>

      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 sm:py-12">
        {/* Subtle ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Container className="w-full flex items-center justify-center">
          <div className="max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {/* Left: Steady tube light 404 (flex-1 to push symmetrically against divider) */}
            <div className="flex justify-center sm:justify-end items-center">
              <MotionWrapper animationType="scale">
                <span
                  style={{
                    textShadow:
                      "0 0 4px #ffffff, 0 0 10px rgba(253, 75, 140, 0.95), 0 0 20px rgba(253, 75, 140, 0.75), 0 0 35px rgba(253, 75, 140, 0.5), 0 0 50px rgba(134, 77, 203, 0.35)",
                  }}
                  className="text-white text-7xl md:text-8xl font-thin tracking-widest leading-none select-none p-0 m-0 [text-shadow:0_0_4px_#ffffff,0_0_10px_rgba(253,75,140,0.95),0_0_20px_rgba(253,75,140,0.75),0_0_35px_rgba(253,75,140,0.5),0_0_50px_rgba(134,77,203,0.35)]"
                >
                  404
                </span>
              </MotionWrapper>
            </div>

            {/* Divider: horizontal on mobile with widthIncrease, vertical on sm+ with heightIncrease */}
            <MotionWrapper
              animationType="widthIncrease"
              delay={0.2}
              className="shrink-0 flex items-center justify-center sm:hidden"
            >
              <div className="w-[60vw] h-px bg-border-color/40" />
            </MotionWrapper>

            <MotionWrapper
              animationType="heightIncrease"
              delay={0.2}
              className="shrink-0 hidden sm:flex items-center justify-center"
            >
              <div className="w-px h-48 bg-border-color/40" />
            </MotionWrapper>

            {/* Right: Minimal content & actions (flex-1 with matching spacing) */}
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left gap-2.5">
              <MotionWrapper animationType="fadeUp">
                <h1 className="text-2xl sm:text-3xl font-light text-foreground tracking-tight leading-none p-0 m-0">
                  Page does not exist
                </h1>
              </MotionWrapper>

              <MotionWrapper animationType="fadeRight" delay={0.3}>
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed max-w-xs p-0 m-0">
                  The link you followed may be broken or the page may have been moved.
                </p>
              </MotionWrapper>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <MotionWrapper animationType="fadeUp" delay={0.3}>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-foreground/70 hover:text-foreground border border-border-color/40 hover:border-border-color rounded-sm transition-colors"
                  >
                    <ArrowLeft className="size-3" />
                    <span>back</span>
                  </button>
                </MotionWrapper>

                <MotionWrapper animationType="fadeUp" delay={0.5}>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm transition-colors shadow-sm"
                  >
                    <Home className="size-3" />
                    <span>home</span>
                  </Link>
                </MotionWrapper>

                <MotionWrapper animationType="fadeUp" delay={0.7}>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-foreground/80 hover:text-foreground border border-primary/30 hover:border-primary/50 bg-primary/10 rounded-sm transition-colors"
                  >
                    <FolderGit2 className="size-3 text-primary" />
                    <span>Projects</span>
                  </Link>
                </MotionWrapper>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
