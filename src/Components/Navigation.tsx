"use client";

import { MotionWrapper } from "./Shared/MotionWrapper";
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
  const activeIndex = navItems.findIndex(
    (item) => item.section === activeSection,
  );

  return (
    <nav aria-label="Primary navigation" className="flex flex-col">
      <ul className="relative m-0 flex list-none flex-col gap-2 p-0">
        {/*  Active Indicator */}
        {activeIndex !== -1 && (
          <MotionWrapper
            animationType="fadeLeft"
            transitionType="spring"
            delay={0.5}
            className="absolute w-full"
          >
            <div
              className={`absolute left-0 top-0 h-12 z-0 -right-1 overflow-hidden rounded-l-2xl border border-accent/10 bg-linear-to-r from-accent/20 via-accent/10 to-transparent transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) translate-y-${activeIndex * 56}px`}
              style={{
                transform: `translateY(${activeIndex * 56}px)`,
              }}
            >
              <div className="absolute top-1/2 left-0 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
            </div>
          </MotionWrapper>
        )}

        {navItems.map((item, index) => {
          const isActive = activeSection === item.section;
          const Icon = item.icon;

          return (
            <MotionWrapper
              key={item.section}
              animationType="fadeLeft"
              transitionType="spring"
              delay={0.5 + index * 0.15}
            >
              <li className="relative z-10">
                <a
                  href={item.href}
                  onClick={(event) => onNavClick(event, item.section)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex h-12 cursor-pointer items-center rounded-xl px-3 transition-colors duration-300 ${
                    isActive
                      ? "font-medium text-foreground"
                      : "text-foreground/60 hover:text-foreground/90"
                  }`}
                >
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
