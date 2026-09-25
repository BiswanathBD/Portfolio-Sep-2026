"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navData";
import { MotionWrapper } from "./MotionWrapper";

interface NavigationProps {
  activeSection: string;
  isExpanded: boolean;
}

const ITEM_HEIGHT = 48; // h-12 = 48px
const ITEM_GAP = 8; // gap-2 = 8px
const STEP_OFFSET = ITEM_HEIGHT + ITEM_GAP; // 56px

const Navigation = ({
  activeSection: parentActiveSection,
  isExpanded,
}: NavigationProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [localActiveSection, setLocalActiveSection] = useState<string>("");
  const isClickScrolling = useRef<boolean>(false);

  useEffect(() => {
    if (!isHomePage) return;

    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      const observedElements: HTMLElement[] = [];

      navItems.forEach((item) => {
        if (item.section) {
          const el = document.getElementById(item.section);
          if (el) observedElements.push(el);
        }
      });

      if (observedElements.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          if (isClickScrolling.current) return;

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setLocalActiveSection(entry.target.id);
            }
          });
        },
        {
          root: null,
          rootMargin: "-20% 0px -40% 0px",
          threshold: 0.1,
        },
      );

      observedElements.forEach((el) => observer?.observe(el));
    };

    const timeoutId = setTimeout(setupObserver, 300);

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        isClickScrolling.current = true;

        setTimeout(() => {
          setLocalActiveSection(hash);
          element.scrollIntoView({ behavior: "smooth" });

          setTimeout(() => {
            isClickScrolling.current = false;
          }, 800);
        }, 200);
      }
    }

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [pathname, isHomePage]);

  const effectiveActiveSection = useMemo(() => {
    if (!isHomePage) return "";
    return localActiveSection || parentActiveSection || "";
  }, [isHomePage, localActiveSection, parentActiveSection]);

  const activeIndex = useMemo(() => {
    if (isHomePage) {
      const index = navItems.findIndex(
        (item) => item.section === effectiveActiveSection,
      );

      if (index !== -1) return index;
      if (typeof window !== "undefined" && window.location.hash) {
        const hashSection = window.location.hash.replace("#", "");
        const hashIndex = navItems.findIndex(
          (item) => item.section === hashSection,
        );
        if (hashIndex !== -1) return hashIndex;
      }

      return 0;
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
  }, [pathname, isHomePage, effectiveActiveSection]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetHref: string,
    sectionId?: string,
  ) => {
    if (isHomePage && targetHref.startsWith("#")) {
      e.preventDefault();
      const targetId = targetHref.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        isClickScrolling.current = true;
        if (sectionId) setLocalActiveSection(sectionId);

        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", targetHref);

        setTimeout(() => {
          isClickScrolling.current = false;
        }, 800);
      }
    }
  };

  return (
    <nav aria-label="Primary navigation" className="flex flex-col">
      <ul className="relative m-0 flex list-none flex-col gap-2 p-0">
        {/* Active Highlight Indicator */}
        {activeIndex !== -1 && (
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-12 overflow-hidden rounded-l-2xl border-y border-l border-accent/10 bg-linear-to-r from-accent/20 via-accent/10 to-transparent transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)"
            style={{
              transform: `translateY(${activeIndex * STEP_OFFSET}px)`,
            }}
          >
            <div className="absolute left-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
          </div>
        )}

        {/* Navigation List Items */}
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;
          const targetHref = isHomePage
            ? item.href.startsWith("/") && item.href.includes("#")
              ? item.href.substring(item.href.indexOf("#"))
              : item.href.startsWith("#")
                ? item.href
                : `/#${item.section}`
            : item.href.startsWith("#")
              ? `/${item.href}`
              : item.href.includes("#")
                ? item.href
                : `/#${item.section}`;

          const commonClassName = `group relative flex h-12 cursor-pointer items-center rounded-xl px-3 transition-colors duration-300 ${
            isActive
              ? "font-medium text-foreground"
              : "text-foreground/60 hover:text-foreground/90"
          }`;

          return (
            <MotionWrapper
              key={item.section || item.name}
              animationType="fadeLeft"
              transitionType="spring"
              delay={0.3 + index * 0.1}
            >
              <li className="relative z-10">
                <Link
                  href={targetHref}
                  aria-current={isActive ? "page" : undefined}
                  className={commonClassName}
                  onClick={(e) => handleLinkClick(e, targetHref, item.section)}
                >
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
                </Link>
              </li>
            </MotionWrapper>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
