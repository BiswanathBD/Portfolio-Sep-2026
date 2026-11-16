"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type Lenis from "lenis";
import { navItems } from "@/data/navData";
import {
  scrollToSectionElement,
  subscribeLenis,
  setPendingSection,
  getPendingSection,
} from "@/utils/lenisController";

let globalActiveSection = "home";
const sectionListeners = new Set<(section: string) => void>();

export const setGlobalActiveSection = (section: string) => {
  if (globalActiveSection === section) return;
  globalActiveSection = section;
  sectionListeners.forEach((listener) => listener(section));
};

export const getGlobalActiveSection = () => globalActiveSection;

const getSectionElements = () =>
  navItems
    .map((item) => document.getElementById(item.section))
    .filter((element): element is HTMLElement => element !== null);

export const useActiveSection = (defaultSection = "home") => {
  const pathname = usePathname();
  const router = useRouter();

  const isProjectsRoute = pathname.startsWith("/projects");
  const initialSection = isProjectsRoute
    ? "projects"
    : getGlobalActiveSection() || defaultSection;

  const [activeSection, setActiveSection] = useState(initialSection);
  const activeSectionRef = useRef(initialSection);
  const isProgrammaticScrollRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const unlockTimeoutRef = useRef<number | null>(null);

  const setCurrentSection = useCallback((section: string) => {
    activeSectionRef.current = section;
    setActiveSection(section);
    setGlobalActiveSection(section);
  }, []);

  // Sync with global active section listeners
  useEffect(() => {
    const listener = (newSection: string) => {
      activeSectionRef.current = newSection;
      setActiveSection(newSection);
    };
    sectionListeners.add(listener);
    return () => {
      sectionListeners.delete(listener);
    };
  }, []);

  const updateActiveSection = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    if (pathname !== "/") return;

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
  }, [pathname, setCurrentSection]);

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
      const cleanId = sectionId.replace(/^#/, "").toLowerCase();

      // If we are currently on the home page, perform smooth scroll directly
      if (pathname === "/") {
        isProgrammaticScrollRef.current = true;
        setCurrentSection(cleanId);

        const nextHash = cleanId === "home" ? "#home" : `#${cleanId}`;
        if (window.location.hash !== nextHash) {
          window.history.pushState(null, "", nextHash);
        }

        if (unlockTimeoutRef.current !== null) {
          window.clearTimeout(unlockTimeoutRef.current);
        }
        unlockTimeoutRef.current = window.setTimeout(unlockTracking, 1600);

        scrollToSectionElement(cleanId, {
          duration: 1.2,
          onComplete: unlockTracking,
        });
      } else {
        // If we are on /projects or another route, navigate to the target section on the home page
        setPendingSection(cleanId);
        setCurrentSection(cleanId);

        const targetUrl = cleanId === "home" ? "/#home" : `/#${cleanId}`;
        router.push(targetUrl);
      }
    },
    [pathname, router, setCurrentSection, unlockTracking],
  );

  // Sync active section based on route changes or hash
  useEffect(() => {
    if (pathname.startsWith("/projects")) {
      setCurrentSection("projects");
      return;
    }

    if (pathname === "/") {
      const pending = getPendingSection();
      const hash = window.location.hash ? window.location.hash.replace(/^#/, "") : null;
      const target = pending || hash;

      if (target) {
        const validItem = navItems.find((item) => item.section === target);
        if (validItem) {
          isProgrammaticScrollRef.current = true;
          setCurrentSection(validItem.section);

          if (unlockTimeoutRef.current !== null) {
            window.clearTimeout(unlockTimeoutRef.current);
          }
          unlockTimeoutRef.current = window.setTimeout(unlockTracking, 1600);
          return;
        }
      }

      updateActiveSection();
    }
  }, [pathname, setCurrentSection, updateActiveSection, unlockTracking]);

  // Lenis & window scroll listener for home page
  useEffect(() => {
    if (pathname !== "/") return;

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
  }, [pathname, updateActiveSection]);

  return {
    activeSection,
    scrollToSection,
  };
};

