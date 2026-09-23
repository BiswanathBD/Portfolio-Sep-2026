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
      "a, img, button, [role='button'], input, textarea, select, label";

    let isVisible = false;
    let isHoveringInteractive = false;
    let returnTimer: gsap.core.Tween | null = null;

    const setCursorOpacity = (opacity: number) => {
      gsap.to(cursorElements, {
        opacity,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    // smooth scale back to normal cursor after delay
    const resetCursor = () => {
      if (!isVisible) return;
      returnTimer = gsap.delayedCall(0.1, () => {
        if (!isHoveringInteractive) {
          gsap.to(cursorElements, {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      });
    };

    // fade out cursor on hover
    const fadeOutCursor = () => {
      if (returnTimer) {
        returnTimer.kill();
        returnTimer = null;
      }

      gsap.to(cursorElements, {
        scale: 4,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const moveCursor = (event: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        if (!isHoveringInteractive) {
          setCursorOpacity(1);
        }
      }

      const target = event.target;

      if (!(target instanceof Element)) return;

      const disabledElement = target.closest(disabledSelector);

      if (disabledElement) {
        setCursorOpacity(0);
        return;
      }

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
        isHoveringInteractive = true;
        fadeOutCursor();
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const interactiveElement = target.closest(interactiveSelector);

      if (interactiveElement) {
        isHoveringInteractive = false;
        resetCursor();
      }
    };

    // hide when leaving window
    const handleMouseLeave = () => {
      isVisible = false;
      if (returnTimer) returnTimer.kill();
      setCursorOpacity(0);
    };

    // show when entering window
    const handleMouseEnter = () => {
      isVisible = true;
      if (!isHoveringInteractive) {
        setCursorOpacity(1);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);

      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );

      if (returnTimer) returnTimer.kill();

      gsap.killTweensOf(cursorDot);
      gsap.killTweensOf(cursorCircle);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-9999 h-4 w-4 rounded-full bg-linear-to-r from-primary to-accent mix-blend-difference opacity-0"
        aria-hidden="true"
      />
      <div
        ref={cursorCircleRef}
        className="pointer-events-none fixed top-0 left-0 z-9998 h-8 w-8 rounded-full border border-primary/30 opacity-0"
        aria-hidden="true"
      />
    </div>
  );
};

export default CustomCursor;
