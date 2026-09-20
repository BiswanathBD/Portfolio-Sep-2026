"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorCircleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    if (!mediaQuery.matches) return;

    const cursorDot = cursorDotRef.current;
    const cursorCircle = cursorCircleRef.current;

    if (!cursorDot || !cursorCircle) return;

    const cursorElements = [cursorDot, cursorCircle];

    const disabledSelector =
      ".custom-cursor-disabled, [data-cursor-disabled='true']";

    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select";

    const setCursorOpacity = (opacity: number) => {
      gsap.to(cursorElements, {
        opacity,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    const resetCursor = () => {
      gsap.to(cursorElements, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const expandCursor = () => {
      gsap.to(cursorDot, {
        scale: 1.8,
        duration: 0.3,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });

      gsap.to(cursorCircle, {
        scale: 2,
        opacity: 0.5,
        duration: 0.3,
        ease: "back.out(1.7)",
        overwrite: "auto",
      });
    };

    const moveCursor = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const disabledElement = target.closest(disabledSelector);

      if (disabledElement) {
        setCursorOpacity(0);
        return;
      }

      setCursorOpacity(1);

      gsap.to(cursorDot, {
        x: event.clientX - 8,
        y: event.clientY - 8,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursorCircle, {
        x: event.clientX - 16,
        y: event.clientY - 16,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const disabledElement = target.closest(disabledSelector);

      if (disabledElement) {
        setCursorOpacity(0);
        return;
      }

      const interactiveElement = target.closest(interactiveSelector);

      if (interactiveElement) {
        expandCursor();
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const disabledElement = target.closest(disabledSelector);

      if (disabledElement) return;

      const interactiveElement = target.closest(interactiveSelector);

      if (interactiveElement) {
        resetCursor();
      }
    };

    const handleBodyLeave = () => {
      setCursorOpacity(0);
    };

    const handleBodyEnter = () => {
      setCursorOpacity(1);
    };

    window.addEventListener("mousemove", moveCursor);

    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    document.body.addEventListener("mouseleave", handleBodyLeave);
    document.body.addEventListener("mouseenter", handleBodyEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);

      document.body.removeEventListener("mouseleave", handleBodyLeave);
      document.body.removeEventListener("mouseenter", handleBodyEnter);

      gsap.killTweensOf(cursorDot);
      gsap.killTweensOf(cursorCircle);
    };
  }, []);

  return (
    <>
      {" "}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-9999 h-4 w-4 rounded-full bg-linear-to-r from-primary to-accent mix-blend-difference opacity-0"
        aria-hidden="true"
      />
      <div
        ref={cursorCircleRef}
        className="pointer-events-none fixed top-0 left-0 z-9998 h-8 w-8 rounded-full border border-primary/30"
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
