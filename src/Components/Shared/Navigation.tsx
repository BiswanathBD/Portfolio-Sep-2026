"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navData";
import { MotionWrapper } from "./MotionWrapper";

interface NavigationProps {
  activeSection: string;
  isExpanded: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  onSectionNavigate?: (sectionId: string) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_GAP = 8;
const STEP_OFFSET = ITEM_HEIGHT + ITEM_GAP;

const Navigation = ({
  activeSection,
  isExpanded,
  setIsOpen,
  setIsExpanded,
  onSectionNavigate,
}: NavigationProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const activeIndex = useMemo(() => {
    if (isHomePage) {
      const index = navItems.findIndex(
        (item) => item.section === activeSection,
      );

      return index === -1 ? 0 : index;
    }

    const currentRootPath = pathname.split("/")[1]?.toLowerCase();

    return navItems.findIndex((item) => {
      const itemSection = item.section?.toLowerCase();
      const itemRoute = item.route?.replace(/^\//, "").toLowerCase();
      const itemHref = item.href?.replace(/^\/#?/, "").toLowerCase();

      return (
        (itemSection && itemSection === currentRootPath) ||
        (itemRoute && itemRoute === currentRootPath) ||
        (itemHref && itemHref === currentRootPath) ||
        (item.route && item.route !== "/" && pathname.startsWith(item.route))
      );
    });
  }, [pathname, isHomePage, activeSection]);

  const closeMenus = () => {
    setIsOpen?.(false);
    setIsExpanded?.(false);
  };

  const handleHashClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    closeMenus();
    onSectionNavigate?.(sectionId);
  };

  return (
    <nav aria-label="Primary navigation" className="flex flex-col">
      <ul className="relative m-0 flex list-none flex-col gap-2 p-0">
        {activeIndex !== -1 && (
          <MotionWrapper
            animationType="fadeLeft"
            transitionType="spring"
            delay={0.2}
            className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-12"
          >
            <div
              className="h-full w-full overflow-hidden rounded-l-2xl border-y border-l border-accent/10 bg-linear-to-r from-accent/20 via-accent/10 to-transparent transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
              style={{
                transform: `translateY(${activeIndex * STEP_OFFSET}px)`,
              }}
            >
              <div className="absolute left-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
            </div>
          </MotionWrapper>
        )}

        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;
          const hashHref = `#${item.section}`;
          const pageHref = item.href.startsWith("#")
            ? `/${item.href}`
            : item.href.includes("#")
              ? item.href
              : `/#${item.section}`;

          const commonClassName = `group relative flex h-12 cursor-pointer items-center rounded-xl px-3 transition-colors duration-300 ${
            isActive
              ? "font-medium text-foreground"
              : "text-foreground/60 hover:text-foreground/90"
          }`;

          const linkContent = (
            <>
              <div className="z-10 flex shrink-0 items-center justify-center pl-2">
                <Icon
                  aria-hidden="true"
                  className={`h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:text-accent ${
                    isActive ? "text-primary" : "text-foreground/70"
                  }`}
                />
              </div>

              {isExpanded && (
                <MotionWrapper
                  animationType="staggerChild"
                  delay={index * 0.04}
                  className="z-10"
                >
                  <span className="ml-3 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:ml-3.5 group-hover:text-accent">
                    {item.name}
                  </span>
                </MotionWrapper>
              )}

              {!isExpanded && (
                <div className="pointer-events-none absolute left-full z-50 ml-3 rounded-md bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100">
                  {item.name}
                </div>
              )}
            </>
          );

          return (
            <MotionWrapper
              key={item.section || item.name}
              animationType="fadeLeft"
              transitionType="spring"
              delay={0.3 + index * 0.1}
            >
              <li className="relative z-10">
                {isHomePage ? (
                  <a
                    href={hashHref}
                    aria-current={isActive ? "page" : undefined}
                    className={commonClassName}
                    onClick={(event) => handleHashClick(event, item.section)}
                  >
                    {linkContent}
                  </a>
                ) : (
                  <Link
                    href={pageHref}
                    aria-current={isActive ? "page" : undefined}
                    className={commonClassName}
                    onClick={closeMenus}
                  >
                    {linkContent}
                  </Link>
                )}
              </li>
            </MotionWrapper>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
