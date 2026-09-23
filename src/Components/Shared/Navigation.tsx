"use client";

import { AnimatePresence, delay, motion } from "framer-motion";
import { MotionWrapper } from "../MotionWrapper";
import { navItems } from "@/data/navData";

interface NavigationProps {
  activeSection: string;
  isExpanded: boolean;
  onNavClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    section: string,
  ) => void;
}

const Navigation = ({
  activeSection,
  isExpanded,
  onNavClick,
}: NavigationProps) => {
  return (
    <nav aria-label="Primary navigation" className="flex flex-col">
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.section;
          const Icon = item.icon;

          return (
            <MotionWrapper
              key={item.section}
              animationType="fadeLeft"
              transition={{
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            >
              <li className="relative">
                <a
                  href={item.href}
                  onClick={(event) => onNavClick(event, item.section)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex h-12 cursor-pointer items-center rounded-xl px-3 transition-all duration-300 ${
                    isActive
                      ? "font-medium text-foreground"
                      : "text-foreground/60 hover:text-foreground/90"
                  }`}
                >
                  {/* active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="glowActiveNav"
                      className="absolute inset-0 -right-1 overflow-hidden rounded-l-2xl border border-accent/10 bg-linear-to-r from-accent/20 via-accent/10 to-transparent"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 32,
                      }}
                    >
                      <div className="absolute top-1/2 left-0 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
                    </motion.div>
                  )}

                  {/* icon */}
                  <div className="z-10 flex shrink-0 items-center justify-center pl-2">
                    <Icon
                      aria-hidden="true"
                      className={`h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:text-accent ${
                        isActive ? "text-primary" : "text-foreground/70"
                      }`}
                    />
                  </div>

                  {/* label */}
                  <AnimatePresence>
                    {isExpanded && (
                      <MotionWrapper
                        animationType="staggerChild"
                        delay={index * 0.04}
                        className="z-10"
                      >
                        <span className="ml-3 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:ml-3.5 group-hover:rotate-4 group-hover:text-accent">
                          {item.name}
                        </span>
                      </MotionWrapper>
                    )}
                  </AnimatePresence>

                  {/* collapsed tooltip */}
                  {!isExpanded && (
                    <div className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100">
                      {item.name}
                    </div>
                  )}
                </a>
              </li>
            </MotionWrapper>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
