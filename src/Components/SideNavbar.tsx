"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { navItems } from "@/data/navData";
import { MotionWrapper } from "./Shared/MotionWrapper";
import Logo from "./Shared/Logo";
import Navigation from "./Navigation";
import { SectionNavigator } from "./SectionNavigator";

const SideNavbar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState("home");

  const sectionElementsRef = useRef<HTMLElement[]>([]);
  const activeSectionRef = useRef("home");
  const animationFrameRef = useRef<number | null>(null);

  const setCurrentSection = useCallback((section: string) => {
    if (activeSectionRef.current === section) return;

    activeSectionRef.current = section;
    setActiveSection(section);
  }, []);

  const collectSections = useCallback(() => {
    sectionElementsRef.current = navItems
      .map((item) => document.getElementById(item.section))
      .filter((element): element is HTMLElement => element !== null);
  }, []);

  const updateActiveSection = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;

      const scrollY = window.scrollY;
      const sections = sectionElementsRef.current;

      if (scrollY < 200) {
        setCurrentSection("home");
        return;
      }

      const activationPosition = scrollY + 200;

      for (let index = sections.length - 1; index >= 0; index--) {
        const section = sections[index];

        if (activationPosition >= section.offsetTop) {
          setCurrentSection(section.id);
          return;
        }
      }

      setCurrentSection("home");
    });
  }, [setCurrentSection]);

  useEffect(() => {
    collectSections();
    updateActiveSection();

    const handleScroll = () => {
      updateActiveSection();
    };

    const handleResize = () => {
      collectSections();
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [collectSections, updateActiveSection]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    section: string,
  ) => {
    event.preventDefault();

    const element = document.getElementById(section);

    if (!element) return;

    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });

    setIsExpanded(false);
  };

  return (
    <MotionWrapper
      animationType="fadeLeft"
      transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 15 }}
      className="sticky top-0 h-screen shrink-0 overflow-y-scroll bg-background/95 py-6 select-none scrollbar-none backdrop-blur-sm sm:bg-background/20 sm:backdrop-blur-[1px]"
    >
      <motion.nav
        id="side-navbar"
        aria-label="Side navigation"
        animate={{
          width: isExpanded ? 220 : 64,
        }}
        transition={{
          width: {
            type: "spring",
            stiffness: 350,
            damping: 28,
          },
        }}
        className="h-full flex flex-col"
      >
        {/* line */}
        <MotionWrapper animationType="fade" duration={2}>
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-2 w-px bg-linear-to-b from-transparent via-accent/20 to-transparent"
          />
        </MotionWrapper>

        {/* line glow */}
        <MotionWrapper animationType="fade" delay={1} duration={2}>
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-0 z-2 h-1/2 w-0.5 -translate-y-1/2 bg-linear-to-b from-transparent via-accent to-transparent blur-xl"
          />
        </MotionWrapper>

        <div className="flex h-full flex-col sm:justify-between">
          {/* header */}
          <header className="relative mb-8 flex h-14 items-center justify-between px-4">
            <div className="flex min-w-0 flex-1 items-center">
              <AnimatePresence mode="wait">
                {isExpanded && <Logo size="xs" className="shrink-0" />}
              </AnimatePresence>
            </div>

            {/* expand / collapse */}
            <button
              type="button"
              onClick={() => setIsExpanded((previous) => !previous)}
              aria-label={
                isExpanded
                  ? "Collapse side navigation"
                  : "Expand side navigation"
              }
              aria-expanded={isExpanded}
              className="z-10 flex shrink-0 cursor-pointer items-center justify-between text-accent transition-transform hover:scale-110"
            >
              <motion.div
                animate={{
                  rotate: isExpanded ? 0 : 180,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="flex items-center justify-center"
              >
                <ChevronRight size={32} strokeWidth={1} />
              </motion.div>
            </button>
          </header>

          {/* navigation */}
          <Navigation
            activeSection={activeSection}
            isExpanded={isExpanded}
            onNavClick={handleNavClick}
          />

          {/* section navigator */}
          <div className="flex items-center justify-center pb-2 pt-4">
            <SectionNavigator
              navItems={navItems}
              activeSection={activeSection}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </div>
        </div>
      </motion.nav>
    </MotionWrapper>
  );
};

export default SideNavbar;
