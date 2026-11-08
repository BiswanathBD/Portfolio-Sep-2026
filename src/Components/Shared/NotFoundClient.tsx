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

      <section className="relative w-full min-h-screen flex items-center justify-center py-12">
        {/* Subtle ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <Container className="w-full flex items-center justify-center">
          <div className="w-full max-w-2xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
            {/* Left: Steady tube light 404 */}
            <MotionWrapper animationType="scale">
              <div className="flex justify-center items-center shrink-0">
                <span
                  style={{
                    textShadow:
                      "0 0 4px #ffffff, 0 0 10px rgba(253, 75, 140, 0.95), 0 0 20px rgba(253, 75, 140, 0.75), 0 0 35px rgba(253, 75, 140, 0.5), 0 0 50px rgba(134, 77, 203, 0.35)",
                  }}
                  className="text-white text-6xl sm:text-7xl md:text-8xl font-thin tracking-widest leading-none select-none [text-shadow:0_0_4px_#ffffff,0_0_10px_rgba(253,75,140,0.95),0_0_20px_rgba(253,75,140,0.75),0_0_35px_rgba(253,75,140,0.5),0_0_50px_rgba(134,77,203,0.35)]"
                >
                  404
                </span>
              </div>
              </MotionWrapper>

            {/* Divider: vertical on desktop, horizontal on mobile */}
            <MotionWrapper animationType="heightIncrease" delay={0.3} className="overflow-hidden">
            <div className="hidden md:block w-px h-32 bg-border-color/40 shrink-0" />
            </MotionWrapper>
            <MotionWrapper animationType="widthIncrease" delay={0.3} className="overflow-hidden">
            <div className="block md:hidden w-32 h-px bg-border-color/40 shrink-0" />
            </MotionWrapper>

            {/* Right: Minimal content & actions */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <MotionWrapper animationType="fadeUp">
              <h1 className="text-xl sm:text-2xl font-light text-foreground tracking-tight">
                Page does not exist
              </h1>
              </MotionWrapper>

            <MotionWrapper animationType="fadeRight" delay={0.3}>
              <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed max-w-xs">
                The link you followed may be broken or the page may have been moved.
              </p>
            </MotionWrapper>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <MotionWrapper animationType="fadeUp" delay={0.3}>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-foreground/70 hover:text-foreground border border-border-color/40 hover:border-border-color rounded-sm transition-colors"
                >
                  <ArrowLeft className="size-3" />
                  <span>Go back</span>
                </button>
                </MotionWrapper>

                <MotionWrapper animationType="fadeUp" delay={0.4}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm transition-colors shadow-sm"
                >
                  <Home className="size-3" />
                  <span>home</span>
                </Link>
                </MotionWrapper>

                <MotionWrapper animationType="fadeUp" delay={0.5}>
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
