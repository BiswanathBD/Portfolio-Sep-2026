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
      "a, img, button, [role='button'], input, textarea, select, label, .card, .cursor-pointer, [data-cursor-pointer]";

    let isVisible = false;
    let isHoveringInteractive = false;

    // Set initial scale and opacity safely
    gsap.set(cursorElements, {
      scale: 1,
      opacity: 0,
    });

    // Smoothly restore cursor to normal 1x scale and visible opacity
    const showNormalCursor = () => {
      gsap.to(cursorElements, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // Fade out and expand cursor when hovering interactive elements
    const fadeOutCursor = () => {
      gsap.to(cursorElements, {
        scale: 2.5,
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // Hide cursor completely and ensure scale is normalized back to 1
    const hideCursor = () => {
      isVisible = false;
      isHoveringInteractive = false;
      gsap.to(cursorElements, {
        opacity: 0,
        scale: 1,
        duration: 0.2,
        overwrite: "auto",
      });
    };

    const moveCursor = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const disabledElement = target.closest(disabledSelector);
      if (disabledElement) {
        hideCursor();
        return;
      }

      // Smooth position tracking
      gsap.to(cursorDot, {
        x: event.clientX - 8,
        y: event.clientY - 8,
        duration: 0.12,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(cursorCircle, {
        x: event.clientX - 16,
        y: event.clientY - 16,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Synchronize scale and opacity based on whether target is interactive
      const isInteractive = Boolean(target.closest(interactiveSelector));

      if (isInteractive) {
        if (!isHoveringInteractive) {
          isHoveringInteractive = true;
          fadeOutCursor();
        }
      } else {
        if (isHoveringInteractive || !isVisible) {
          isHoveringInteractive = false;
          isVisible = true;
          showNormalCursor();
        }
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest(disabledSelector)) {
        hideCursor();
        return;
      }

      const isInteractive = Boolean(target.closest(interactiveSelector));
      if (isInteractive && !isHoveringInteractive) {
        isHoveringInteractive = true;
        fadeOutCursor();
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // Check if mouse moved into another interactive child element
      const nextElement = event.relatedTarget;
      if (
        nextElement instanceof Element &&
        nextElement.closest(interactiveSelector)
      ) {
        return;
      }

      if (isHoveringInteractive) {
        isHoveringInteractive = false;
        showNormalCursor();
      }
    };

    const handleMouseDown = () => {
      if (!isHoveringInteractive && isVisible) {
        gsap.to(cursorElements, {
          scale: 0.8,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseUp = () => {
      if (!isHoveringInteractive && isVisible) {
        gsap.to(cursorElements, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      hideCursor();
    };

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target;
      const isInteractive =
        target instanceof Element && Boolean(target.closest(interactiveSelector));

      isVisible = true;
      if (isInteractive) {
        isHoveringInteractive = true;
        fadeOutCursor();
      } else {
        isHoveringInteractive = false;
        showNormalCursor();
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter as EventListener);
    window.addEventListener("blur", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      window.removeEventListener("blur", hideCursor);

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
