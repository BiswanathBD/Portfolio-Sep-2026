"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./Shared/Logo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./Shared/Container";
import { MotionWrapper } from "./Shared/MotionWrapper";
import { navItems } from "@/data/navData";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "./Shared/Navigation";

const TopNavbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const navRef = useRef<HTMLElement | null>(null);

  const lastScrollY = useRef<number>(0);
  const sectionElementsRef = useRef<HTMLElement[]>([]);
  const activeSectionRef = useRef<string>("home");
  const animationFrameRef = useRef<number | null>(null);

  // Active section management
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

  // Handle Navbar Visibility and Section Tracking
  useEffect(() => {
    collectSections();
    updateActiveSection();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check scroll top
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide/Show navbar based on scroll direction
      if (currentScrollY <= 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
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

  // Smooth Navigation Handler
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    section: string,
  ) => {
    event.preventDefault();
    setIsOpen(false);

    const element = document.getElementById(section);
    if (!element) return;

    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  };

  const handleOutsideClick = useCallback(
    (event: PointerEvent) => {
      if (!isOpen || !navRef.current) return;

      const target = event.target as Node;

      if (!navRef.current.contains(target)) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  return (
    <nav className="sm:hidden">
      <div
        className={`fixed top-4 z-50 w-full transition-all duration-500 ${
          isScrolled ? "px-4" : "px-0"
        }`}
      >
        <Container
          className={`flex items-center justify-between gap-4 transition-all duration-500 ease-in-out ${
            isVisible ? "translate-y-0" : "-translate-y-30 pointer-events-none"
          } ${
            isScrolled
              ? "rounded-[20px] border border-primary/20 bg-background/60 p-0! px-3.5! py-2! shadow-lg backdrop-blur-xs"
              : "border-transparent bg-transparent p-0"
          }`}
        >
          <Logo size="sm" />

          <MotionWrapper
            onClick={() => setIsOpen(true)}
            animationType="fadeLeft"
            transitionType="spring"
            delay={0.3}
            className="button relative z-10 -mr-1 cursor-pointer text-accent"
          >
            <MotionWrapper animationType="button">
              <div>
                <ChevronLeft size={40} strokeWidth={1} />
                <span className="absolute inset-0 flex items-center justify-center blur-xs">
                  <ChevronLeft size={40} strokeWidth={1} />
                </span>
              </div>
            </MotionWrapper>
          </MotionWrapper>
        </Container>
      </div>

      {/* Mobile Drawer Overlay and Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Navigation Panel */}
            <motion.aside
              ref={navRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
              }}
              className="fixed -right-10 top-0 z-50 h-screen min-w-60 select-none overflow-y-auto overflow-x-hidden bg-background/80 shadow-2xl backdrop-blur-sm"
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

              <div className="flex h-full flex-col gap-8 pb-8">
                <span className="flex justify-end py-6 pr-14">
                  <MotionWrapper
                    onClick={() => setIsOpen(false)}
                    animationType="fadeLeft"
                    transitionType="spring"
                    delay={0.3}
                    className="button relative z-10 cursor-pointer text-accent"
                  >
                    <MotionWrapper animationType="button">
                      <div>
                        <ChevronRight size={40} strokeWidth={1} />
                        <span className="absolute inset-0 flex items-center justify-center blur-xs">
                          <ChevronRight size={40} strokeWidth={1} />
                        </span>
                      </div>
                    </MotionWrapper>
                  </MotionWrapper>
                </span>
                <Navigation
                  activeSection={activeSection}
                  isExpanded={true}
                  onNavClick={handleNavClick}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TopNavbar;
