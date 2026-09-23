"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronsUp, LucideIcon } from "lucide-react";
import { MotionWrapper } from "./MotionWrapper";

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

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
        scrollToSection(navItems[currentIndex - 1].section);
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < navItems.length - 1) {
      triggerClickAnimation("next", () => {
        scrollToSection(navItems[currentIndex + 1].section);
      });
    }
  };

  const handleScrollToTop = () => {
    triggerClickAnimation("top", () => {
      scrollToSection("home");
    });
  };

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const getFlyOutVariants = (yDirection: number): Variants => ({
    initial: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 2,
      y: yDirection,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  });

  const buttonEnterVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  return (
    <MotionWrapper
      animationType="scale"
      transition={{ delay: 0.8, type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.5,
        }}
        className={`flex items-center justify-center ${
          isExpanded ? "w-full gap-8" : "w-12 flex-col gap-6"
        }`}
      >
        {isAtBottom ? (
          <div className="relative flex h-10 w-10 items-center justify-center">
            <AnimatePresence mode="wait">
              {animatingBtn === "top" ? (
                <motion.div
                  key="top-animating"
                  variants={getFlyOutVariants(-40)}
                  initial="initial"
                  animate="exit"
                  className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
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
                  className="group relative flex cursor-pointer items-center justify-center p-2 text-accent opacity-60 transition-opacity duration-200 hover:opacity-100"
                >
                  <motion.div
                    variants={{
                      hover: {
                        y: -4,
                        scale: 1.2,
                      },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    <ChevronsUp size={20} />
                  </motion.div>
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
            <div className="relative flex h-10 w-10 items-center justify-center">
              <AnimatePresence mode="wait">
                {animatingBtn === "prev" ? (
                  <motion.div
                    key="prev-animating"
                    variants={getFlyOutVariants(-40)}
                    initial="initial"
                    animate="exit"
                    className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
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
                    whileHover={
                      currentIndex !== 0
                        ? {
                            scale: 1,
                          }
                        : undefined
                    }
                    whileTap={
                      currentIndex !== 0
                        ? {
                            scale: 0.85,
                          }
                        : undefined
                    }
                    className={`group relative flex items-center justify-center p-2 transition-opacity duration-200 ${
                      currentIndex === 0
                        ? "pointer-events-none cursor-not-allowed text-shadow-color opacity-30"
                        : "cursor-pointer text-accent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <motion.div
                      whileHover={{
                        y: -4,
                        scale: 1.2,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <ChevronUp size={20} />
                    </motion.div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            <div className="relative flex h-10 w-10 items-center justify-center">
              <AnimatePresence mode="wait">
                {animatingBtn === "next" ? (
                  <motion.div
                    key="next-animating"
                    variants={getFlyOutVariants(40)}
                    initial="initial"
                    animate="exit"
                    className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
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
                    whileHover={{
                      scale: 1,
                    }}
                    whileTap={{
                      scale: 0.85,
                    }}
                    className="group relative flex cursor-pointer items-center justify-center p-2 text-accent opacity-60 transition-opacity duration-200 hover:opacity-100"
                  >
                    <motion.div
                      whileHover={{
                        y: 4,
                        scale: 1.2,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>
    </MotionWrapper>
  );
};
