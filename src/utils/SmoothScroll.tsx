"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
export let lenisInstance: Lenis | null = null;

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,

      /* --- Smooth Scroll Controls --- */
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisInstance = lenis;
    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <main
      ref={wrapperRef}
      className="h-screen grow flex justify-center overflow-y-scroll overflow-x-hidden scrollbar-none [&::-webkit-scrollbar]:hidden snap-y snap-mandatory"
    >
      <div ref={contentRef} className="w-full flex flex-col items-center">
        {children}
      </div>
    </main>
  );
}
