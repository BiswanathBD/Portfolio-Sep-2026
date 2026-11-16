"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  setLenisInstance,
  getLenisInstance,
  getPendingSection,
  setPendingSection,
  scrollToSectionElement,
} from "@/utils/lenisController";

gsap.registerPlugin(ScrollTrigger);

const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 768
  );
};

export default function SmoothScroll() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Scroll initialization and listeners
  useEffect(() => {
    const isTouch = isTouchDevice();

    let lenis: Lenis | null = null;
    let updateTicker: ((time: number) => void) | null = null;

    if (!isTouch) {
      // Desktop / Mouse: Enable Lenis smooth scrolling (syncTouch disabled)
      lenis = new Lenis({
        autoRaf: false,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.2,
        touchMultiplier: 0,
      });

      setLenisInstance(lenis);
      lenis.on("scroll", ScrollTrigger.update);

      updateTicker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);
    } else {
      // Mobile / Touch: Use native smooth momentum scroll (Lenis OFF for touch)
      setLenisInstance(null);
      window.addEventListener("scroll", ScrollTrigger.update, { passive: true });
    }

    const handleResize = () => {
      lenis?.resize();
      ScrollTrigger.refresh();
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      scrollToSectionElement(hash, {
        duration: 1.2,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("hashchange", handleHashChange);

    // Initial mount hash scroll check
    const initialTimer = window.setTimeout(() => {
      lenis?.resize();
      ScrollTrigger.refresh();

      const initialHash = window.location.hash;
      if (initialHash) {
        scrollToSectionElement(initialHash, {
          duration: 1.2,
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        });
      }
    }, 120);

    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);

      if (updateTicker) {
        gsap.ticker.remove(updateTicker);
      }
      if (isTouch) {
        window.removeEventListener("scroll", ScrollTrigger.update);
      }

      setLenisInstance(null);
      lenis?.destroy();
    };
  }, []);

  // Route change handler
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const pending = getPendingSection();
    const hash = window.location.hash
      ? window.location.hash.replace(/^#/, "")
      : null;
    const targetSection = pending || hash;

    if (pathname === "/" && targetSection && targetSection !== "home") {
      setPendingSection(null);

      scrollToSectionElement(targetSection, {
        duration: 1.2,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });
    } else {
      setPendingSection(null);

      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(0, {
          immediate: true,
          force: true,
        });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(refreshTimer);
  }, [pathname]);

  return null;
}

