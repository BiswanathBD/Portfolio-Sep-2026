"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronsUp, LucideIcon } from "lucide-react";
import { lenisInstance } from "@/utils/SmoothScroll";

interface NavItem {
  name: string;
  href: string;
  section: string;
  icon: LucideIcon;
}

interface SectionNavigatorProps {
  navItems: NavItem[];
  activeSection: string;
  isExpanded: boolean;
}

export const SectionNavigator: React.FC<SectionNavigatorProps> = ({
  navItems,
  activeSection,
  isExpanded,
}) => {
  const [animatingBtn, setAnimatingBtn] = useState<
    "prev" | "next" | "top" | null
  >(null);

  const currentIndex = navItems.findIndex(
    (item) => item.section === activeSection,
  );

  const isAtBottom = currentIndex === navItems.length - 1;

  // Smooth Scroll Helper
  const scrollToSection = (sectionId: string) => {
    const scrollOptions = {
      duration: 2.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    };

    if (sectionId === "home") {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, scrollOptions);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      if (lenisInstance) {
        lenisInstance.scrollTo(element, { offset: 0, ...scrollOptions });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const triggerClickAnimation = (
    btnType: "prev" | "next" | "top",
    action: () => void,
  ) => {
    setAnimatingBtn(btnType);
    action();
    setTimeout(() => {
      setAnimatingBtn(null);
    }, 550);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      triggerClickAnimation("prev", () => {
        const prevSection = navItems[currentIndex - 1].section;
        scrollToSection(prevSection);
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < navItems.length - 1) {
      triggerClickAnimation("next", () => {
        const nextSection = navItems[currentIndex + 1].section;
        scrollToSection(nextSection);
      });
    }
  };

  const handleScrollToTop = () => {
    triggerClickAnimation("top", () => {
      scrollToSection("home");
    });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const tooltipVariants: Variants = {
    hidden: { opacity: 0, x: -5 },
    hover: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  };

  const getFlyOutVariants = (yDirection: number): Variants => ({
    initial: { opacity: 1, scale: 1, y: 0 },
    exit: {
      opacity: 0,
      scale: 2,
      y: yDirection,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  });

  const buttonEnterVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      className={`flex items-center justify-center ${
        isExpanded ? "w-full gap-8" : "flex-col gap-6 w-12"
      }`}
    >
      {isAtBottom ? (
        /* Bottom-most State: Back to Top Icon */
        <div className="relative flex items-center justify-center w-10 h-10">
          <AnimatePresence mode="wait">
            {animatingBtn === "top" ? (
              <motion.div
                key="top-animating"
                variants={getFlyOutVariants(-40)}
                initial="initial"
                animate="exit"
                className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
              >
                <ChevronsUp size={20} className="text-accent" />
              </motion.div>
            ) : (
              <motion.button
                key="top-static"
                type="button"
                onClick={handleScrollToTop}
                aria-label="Scroll back to top"
                variants={buttonEnterVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap={{ scale: 0.85 }}
                className="group relative flex cursor-pointer items-center justify-center p-2 text-accent opacity-60 hover:opacity-100 transition-opacity duration-200"
              >
                <motion.div
                  variants={{ hover: { y: -4, scale: 1.2 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <ChevronsUp size={20} />
                </motion.div>

                {!isExpanded && (
                  <motion.div
                    variants={tooltipVariants}
                    className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-background border border-border-color/50 px-2.5 py-1 text-xs font-medium text-foreground shadow-xl"
                  >
                    Back to Top
                  </motion.div>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center gap-4 ${
            isExpanded ? "flex-row" : "flex-col"
          }`}
        >
          {/* Previous Arrow Button */}
          <div className="relative flex items-center justify-center w-10 h-10">
            <AnimatePresence mode="wait">
              {animatingBtn === "prev" ? (
                <motion.div
                  key="prev-animating"
                  variants={getFlyOutVariants(-40)}
                  initial="initial"
                  animate="exit"
                  className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                >
                  <ChevronUp size={20} className="text-accent" />
                </motion.div>
              ) : (
                <motion.button
                  key="prev-static"
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  aria-label="Go to previous section"
                  variants={buttonEnterVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={currentIndex !== 0 ? "hover" : undefined}
                  whileTap={currentIndex !== 0 ? { scale: 0.85 } : undefined}
                  className={`group relative flex items-center justify-center p-2 transition-opacity duration-200 ${
                    currentIndex === 0
                      ? "pointer-events-none cursor-not-allowed text-shadow-color opacity-30"
                      : "cursor-pointer text-accent opacity-60 hover:opacity-100"
                  }`}
                >
                  <motion.div
                    variants={{ hover: { y: -4, scale: 1.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <ChevronUp size={20} />
                  </motion.div>

                  {!isExpanded && currentIndex !== 0 && (
                    <motion.div
                      variants={tooltipVariants}
                      className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-background border border-border-color/50 px-2.5 py-1 text-xs font-medium text-foreground shadow-xl"
                    >
                      Previous Section
                    </motion.div>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Next Arrow Button */}
          <div className="relative flex items-center justify-center w-10 h-10">
            <AnimatePresence mode="wait">
              {animatingBtn === "next" ? (
                <motion.div
                  key="next-animating"
                  variants={getFlyOutVariants(40)}
                  initial="initial"
                  animate="exit"
                  className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                >
                  <ChevronDown size={20} className="text-accent" />
                </motion.div>
              ) : (
                <motion.button
                  key="next-static"
                  type="button"
                  onClick={handleNext}
                  aria-label="Go to next section"
                  variants={buttonEnterVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap={{ scale: 0.85 }}
                  className="group relative flex cursor-pointer items-center justify-center p-2 text-accent opacity-60 hover:opacity-100 transition-opacity duration-200"
                >
                  <motion.div
                    variants={{ hover: { y: 4, scale: 1.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>

                  {!isExpanded && (
                    <motion.div
                      variants={tooltipVariants}
                      className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md bg-background border border-border-color/50 px-2.5 py-1 text-xs font-medium text-foreground shadow-xl"
                    >
                      Next Section
                    </motion.div>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
};
