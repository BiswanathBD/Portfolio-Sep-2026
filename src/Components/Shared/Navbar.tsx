"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Mail,
  LucideIcon,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { MotionWrapper } from "../MotionWrapper";
import ScrollToTop from "../ScrollToTop";

interface NavItem {
  name: string;
  href: string;
  section: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#", section: "home", icon: Home },
  { name: "About", href: "#about", section: "about", icon: User },
  {
    name: "Education",
    href: "#education",
    section: "education",
    icon: GraduationCap,
  },
  { name: "Skills", href: "#skills", section: "skills", icon: Code2 },
  {
    name: "Projects",
    href: "#projects",
    section: "projects",
    icon: FolderGit2,
  },
  {
    name: "Contact",
    href: "#contact",
    section: "contact",
    icon: Mail,
  },
];

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = navItems[i].section;

        if (section === "home") continue;

        const element = document.getElementById(section);

        if (element && scrollPos >= element.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string,
  ) => {
    setActiveSection(section);

    if (window.innerWidth < 640) {
      setIsOpen(false);
    }

    if (section === "home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <MotionWrapper
      animationType="fadeLeft"
      className="fixed inset-y-0 right-0 z-50 h-screen sm:relative sm:inset-auto sm:right-auto"
    >
      {/* mobile screen hamburger */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setIsExpanded(true);
        }}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="navbar"
        className="fixed top-6 right-4 z-50 flex size-12 cursor-pointer items-center justify-center rounded-xl border border-primary/40 bg-linear-to-br from-primary/10 to-accent/10 sm:hidden"
      >
        {" "}
        <Menu aria-hidden="true" />{" "}
      </button>

      {/* menubar */}
      <motion.aside
        id="navbar"
        aria-label="Main navigation"
        animate={{ width: isExpanded ? 220 : 60 }}
        transition={{
          width: {
            type: "spring",
            stiffness: 350,
            damping: 28,
          },
        }}
        className={`relative flex h-screen flex-col bg-background/95 sm:bg-background/20 sm:backdrop-blur-[1px] py-6 select-none transition-transform duration-300 ease-out sm:relative sm:translate-x-0 ${
          isOpen
            ? "fixed inset-y-0 right-0 z-50 translate-x-0"
            : "fixed inset-y-0 right-0 z-50 translate-x-full sm:relative sm:inset-y-auto sm:right-auto sm:z-auto sm:translate-x-0 sm:flex"
        }`}
      >
        {/* line */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 z-2 w-px bg-linear-to-b from-transparent via-accent/20 to-transparent"
        />
        {/* line glow */}
        <div
          aria-hidden="true"
          className="absolute h-1/2 top-1/2 -translate-y-1/2 left-0 z-2 w-0.5 bg-linear-to-b from-transparent via-accent to-transparent blur-xl"
        />

        <div className="flex flex-col h-full sm:justify-between">
          {/* Header Section Collapse/Expand Button */}
          <header className="relative mb-8 flex h-14 items-center justify-between px-4">
            <div className="flex min-w-0 flex-1 items-center">
              <AnimatePresence mode="wait">
                {isExpanded && (
                  <MotionWrapper
                    animationType="springUp"
                    key="logo"
                    className="shrink-0"
                  >
                    <Logo size="xs" />
                  </MotionWrapper>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Expand / Collapse Toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={
                isExpanded ? "Collapse navigation" : "Expand navigation"
              }
              className="z-10 hidden shrink-0 cursor-pointer items-center justify-between text-accent transition-transform hover:scale-110 sm:flex"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 0 : 180 }}
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

            {/* Mobile Menu Close Toggle */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsExpanded(false);
              }}
              aria-label="Close navigation"
              className="z-10 flex shrink-0 cursor-pointer items-center justify-center text-accent transition-transform hover:scale-110 sm:hidden"
            >
              <X size={32} strokeWidth={1} />
            </button>
          </header>

          {/* Navigation Links */}
          <nav aria-label="Primary navigation" className="flex flex-col">
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.section;
                const Icon = item.icon;

                return (
                  <li
                    key={item.name}
                    onClick={() => {
                      if (window.innerWidth >= 640) {
                        setIsExpanded(false);
                      }
                    }}
                    className="relative"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.section)}
                      aria-current={isActive ? "page" : undefined}
                      className={`group relative flex h-12 cursor-pointer items-center rounded-xl px-3 transition-all duration-200 ${
                        isActive
                          ? "font-medium text-white"
                          : "text-foreground/60 hover:text-foreground/90"
                      }`}
                    >
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
                          <div className="absolute left-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
                        </motion.div>
                      )}

                      {/* Icon Container */}
                      <div className="z-10 flex shrink-0 items-center justify-center pl-2">
                        <Icon
                          aria-hidden="true"
                          className={`h-5 w-5 transition-transform duration-300 group-hover:scale-105 ${
                            isActive ? "text-primary" : "text-foreground/70"
                          }`}
                        />
                      </div>

                      {/* Animated Label */}
                      <AnimatePresence>
                        {isExpanded && (
                          <MotionWrapper
                            animationType="staggerChild"
                            delay={index * 0.04}
                            className="z-10"
                          >
                            <span className="ml-3 overflow-hidden whitespace-nowrap text-sm font-medium">
                              {item.name}
                            </span>
                          </MotionWrapper>
                        )}
                      </AnimatePresence>

                      {/* Tooltip for Collapsed Mode */}
                      {!isExpanded && (
                        <div className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#170926] px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-xl transition-all duration-200 group-hover:opacity-100">
                          {item.name}
                        </div>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Go To Top Button Container */}
          <div className="flex items-center justify-center pb-2">
            {/* <ScrollToTop /> */}
          </div>
        </div>
      </motion.aside>
    </MotionWrapper>
  );
};

export default Navbar;
