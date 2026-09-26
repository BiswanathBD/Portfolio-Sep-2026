"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { ChevronUp, ChevronDown, LucideIcon } from "lucide-react";
import { MotionWrapper } from "./Shared/MotionWrapper";

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
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SectionNavigator: React.FC<SectionNavigatorProps> = ({
  navItems,
  activeSection,
  isExpanded,
  setIsExpanded,
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
        setIsExpanded(false);
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < navItems.length - 1) {
      triggerClickAnimation("next", () => {
        scrollToSection(navItems[currentIndex + 1].section);
        setIsExpanded(false);
      });
    }
  };

  const handleScrollToTop = () => {
    triggerClickAnimation("top", () => {
      scrollToSection("home");
      setIsExpanded(false);
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

  const getFlyOutVariants = (yDirection: number): Variants => ({
    initial: { opacity: 1, scale: 1, y: 0 },
    exit: {
      opacity: 0,
      scale: 2,
      y: yDirection,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  });

  const smoothSpring: Transition = {
    type: "spring",
    stiffness: 260,
    damping: 22,
  };

  return (
    <MotionWrapper animationType="scale" transitionType="spring" delay={1.2}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        className={`group flex items-center justify-center ${
          isExpanded ? "w-full gap-8" : "w-12 flex-col gap-6"
        }`}
      >
        <motion.div
          layout
          transition={smoothSpring}
          className={`flex items-center justify-center ${
            isExpanded && !isAtBottom
              ? "flex-row"
              : isAtBottom
                ? "flex-col gap-0"
                : "flex-col gap-2"
          }`}
        >
          {/* up arrow */}
          <motion.div
            layout
            className="relative flex h-10 w-10 items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {animatingBtn === "prev" || animatingBtn === "top" ? (
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
                  layout
                  onClick={isAtBottom ? handleScrollToTop : handlePrev}
                  disabled={currentIndex === 0 && !isAtBottom}
                  aria-label={
                    isAtBottom ? "Scroll to top" : "Go to previous section"
                  }
                  whileHover={
                    currentIndex !== 0 || isAtBottom
                      ? { scale: 1.15 }
                      : undefined
                  }
                  whileTap={
                    currentIndex !== 0 || isAtBottom
                      ? { scale: 0.85 }
                      : undefined
                  }
                  transition={smoothSpring}
                  className={`group relative flex items-center justify-center p-2 transition-opacity duration-200 ${
                    currentIndex === 0 && !isAtBottom
                      ? "pointer-events-none cursor-not-allowed text-shadow-color opacity-30"
                      : "cursor-pointer text-accent opacity-60 hover:opacity-100"
                  }`}
                >
                  <ChevronUp size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* down arrow*/}
          <motion.div
            layout
            className={`relative flex h-10 w-10 items-center justify-center transition-all duration-500 ${isAtBottom ? "-mt-8" : " mt-0"}`}
          >
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
                  layout
                  onClick={isAtBottom ? handleScrollToTop : handleNext}
                  aria-label={
                    isAtBottom ? "Scroll to top" : "Go to next section"
                  }
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  animate={{
                    rotate: isAtBottom ? 180 : 0,
                  }}
                  transition={smoothSpring}
                  className="group relative flex cursor-pointer items-center justify-center p-2 text-accent opacity-60 transition-opacity duration-200 hover:opacity-100"
                >
                  <ChevronDown size={20} />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </MotionWrapper>
  );
};
