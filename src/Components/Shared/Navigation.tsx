"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navData";
import { MotionWrapper } from "./MotionWrapper";

interface NavigationProps {
  activeSection: string;
  isExpanded: boolean;
}

const Navigation = ({ activeSection, isExpanded }: NavigationProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // অ্যাক্টিভ ইনডেক্স ক্যালকুলেশন
  const activeIndex = useMemo(() => {
    if (isHomePage) {
      return navItems.findIndex((item) => item.section === activeSection);
    }

    const currentRootPath = pathname.split("/")[1];

    return navItems.findIndex((item) => {
      if (!item.route || item.route === "/") return false;
      const itemRootPath = item.route.replace(/^\//, "");
      return (
        currentRootPath === itemRootPath || pathname.startsWith(item.route)
      );
    });
  }, [pathname, isHomePage, activeSection]);

  return (
    <nav aria-label="Primary navigation" className="flex flex-col">
      <ul className="relative m-0 flex list-none flex-col gap-2 p-0">
        {/* অ্যাক্টিভ ইন্ডিকেটর ব্যাকগ্রাউন্ড */}
        {activeIndex !== -1 && (
          <MotionWrapper
            animationType="fadeLeft"
            transitionType="spring"
            delay={0.5}
            className="absolute w-full"
          >
            <div
              className="absolute left-0 right-0 top-0 z-0 h-12 overflow-hidden rounded-l-2xl border-y border-l border-accent/10 bg-linear-to-r from-accent/20 via-accent/10 to-transparent transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)"
              style={{
                transform: `translateY(${activeIndex * 56}px)`,
              }}
            >
              <div className="absolute left-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
            </div>
          </MotionWrapper>
        )}

        {/* নেভিগেশন আইটেম তালিকা */}
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          const Icon = item.icon;

          // টার্গেট Href ফরম্যাটিং
          const targetHref = isHomePage
            ? item.href.startsWith("/") && item.href.includes("#")
              ? item.href.substring(item.href.indexOf("#"))
              : item.href
            : item.href.startsWith("#")
              ? `/${item.href}`
              : item.href;

          // কনটেন্ট ইলিমেন্ট
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
                  <span className="ml-3 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:ml-3.5 group-hover:rotate-4 group-hover:text-accent">
                    {item.name}
                  </span>
                </MotionWrapper>
              )}

              {!isExpanded && (
                <div className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100">
                  {item.name}
                </div>
              )}
            </>
          );

          const commonClassName = `group relative flex h-12 cursor-pointer items-center rounded-xl px-3 transition-colors duration-300 ${
            isActive
              ? "font-medium text-foreground"
              : "text-foreground/60 hover:text-foreground/90"
          }`;

          return (
            <MotionWrapper
              key={item.section}
              animationType="fadeLeft"
              transitionType="spring"
              delay={0.5 + index * 0.15}
            >
              <li className="relative z-10">
                {/* হোম পেজে থাকলে Next.js Link ব্যবহার করবে (SPA Transition), নেস্টেড পেজে থাকলে <a> ট্যাগ ব্যবহার করবে (Full Reload) */}
                {isHomePage ? (
                  <Link
                    href={targetHref}
                    aria-current={isActive ? "page" : undefined}
                    className={commonClassName}
                  >
                    {linkContent}
                  </Link>
                ) : (
                  <a
                    href={targetHref}
                    aria-current={isActive ? "page" : undefined}
                    className={commonClassName}
                  >
                    {linkContent}
                  </a>
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
