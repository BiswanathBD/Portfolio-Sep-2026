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

export default function SmoothScroll() {
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Lenis initialization and listeners
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 1,
    });

    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      lenis.resize();
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
      lenis.resize();
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
      gsap.ticker.remove(update);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  // Route change handler
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const pending = getPendingSection();
    const hash = window.location.hash ? window.location.hash.replace(/^#/, "") : null;
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
        window.scrollTo(0, 0);
      }
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(refreshTimer);
  }, [pathname]);

  return null;
}
