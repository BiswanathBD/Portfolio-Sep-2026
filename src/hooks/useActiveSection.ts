"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { navItems } from "@/data/navData";
import { scrollToTarget, subscribeLenis } from "@/utils/lenisController";

const getSectionElements = () =>
  navItems
    .map((item) => document.getElementById(item.section))
    .filter((element): element is HTMLElement => element !== null);

export const useActiveSection = (defaultSection = "home") => {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const activeSectionRef = useRef(defaultSection);
  const isProgrammaticScrollRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const unlockTimeoutRef = useRef<number | null>(null);

  const setCurrentSection = useCallback((section: string) => {
    if (activeSectionRef.current === section) return;

    activeSectionRef.current = section;
    setActiveSection(section);
  }, []);

  const updateActiveSection = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;

    const sections = getSectionElements();
    if (sections.length === 0) return;

    const probe = Math.min(160, window.innerHeight * 0.2);
    let currentId = sections[0].id;

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= probe) {
        currentId = section.id;
      }
    }

    setCurrentSection(currentId);
  }, [setCurrentSection]);

  const unlockTracking = useCallback(() => {
    isProgrammaticScrollRef.current = false;

    if (unlockTimeoutRef.current !== null) {
      window.clearTimeout(unlockTimeoutRef.current);
      unlockTimeoutRef.current = null;
    }

    updateActiveSection();
  }, [updateActiveSection]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const isHome = sectionId === "home";
      const element = isHome ? null : document.getElementById(sectionId);
      const target = isHome ? 0 : element;

      if (!isHome && !element) return;

      isProgrammaticScrollRef.current = true;
      setCurrentSection(sectionId);

      const nextHash = isHome ? "#home" : `#${sectionId}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }

      if (unlockTimeoutRef.current !== null) {
        window.clearTimeout(unlockTimeoutRef.current);
      }

      unlockTimeoutRef.current = window.setTimeout(unlockTracking, 1600);

      scrollToTarget(target ?? 0, {
        onComplete: unlockTracking,
      });
    },
    [setCurrentSection, unlockTracking],
  );

  useEffect(() => {
    let attachedLenis: Lenis | null = null;

    const handleScroll = () => {
      if (animationFrameRef.current !== null) return;

      animationFrameRef.current = window.requestAnimationFrame(() => {
        animationFrameRef.current = null;
        updateActiveSection();
      });
    };

    const attachLenis = (instance: Lenis | null) => {
      attachedLenis?.off("scroll", handleScroll);
      attachedLenis = instance;
      instance?.on("scroll", handleScroll);
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    const unsubscribeLenis = subscribeLenis(attachLenis);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      unsubscribeLenis();
      attachedLenis?.off("scroll", handleScroll);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }

      if (unlockTimeoutRef.current !== null) {
        window.clearTimeout(unlockTimeoutRef.current);
      }
    };
  }, [updateActiveSection]);

  return {
    activeSection,
    scrollToSection,
  };
};
