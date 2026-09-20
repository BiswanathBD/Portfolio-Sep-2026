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
  { name: "Contact", href: "#contact", section: "contact", icon: Mail },
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
    <MotionWrapper animationType="fadeLeft" className="h-screen z-50">
      {/* mobile screen hamburger */}
      <div
        onClick={() => {
          setIsOpen(true);
          setIsExpanded(true);
        }}
        className="absolute flex justify-center items-center top-6 right-4 size-12 rounded-xl border border-primary/40 bg-linear-to-br from-primary/10 to-accent/10 sm:hidden cursor-pointer z-50"
      >
        <Menu />
      </div>

      {/* menubar */}
      <motion.aside
        id="navbar"
        animate={{ width: isExpanded ? 220 : 68 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className={`relative h-screen bg-background backdrop-blur-xs flex flex-col justify-between py-6 transition-colors duration-300 select-none ${
          isOpen ? "flex fixed inset-y-0 left-0 z-50" : "hidden sm:flex"
        }`}
      >
        {/* line */}
        <div className="inset-y-0 w-px absolute left-0 bg-linear-to-b from-transparent via-accent/20 to-transparent z-2" />

        <div className="flex flex-col h-screen">
          {/* Header Section Collapse/Expand Button */}
          <div className="flex items-center justify-between mb-8 h-10 px-4 relative">
            <div className="flex-1 flex items-center min-w-0">
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
              aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
              className="hidden text-accent hover:scale-110 transition-transform cursor-pointer sm:flex items-center justify-between shrink-0 z-10"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 0 : 180 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
              aria-label="Close Mobile Sidebar"
              className="flex text-accent hover:scale-110 transition-transform cursor-pointer sm:hidden items-center justify-center shrink-0 z-10"
            >
              <X size={32} strokeWidth={1} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center">
            <ul className="flex flex-col gap-2 p-0 m-0 list-none">
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
                      className={`relative flex items-center h-12 px-3 rounded-xl transition-all duration-200 group cursor-pointer ${
                        isActive
                          ? "text-white font-medium"
                          : "text-foreground/60 hover:text-foreground/90"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="glowActiveNav"
                          className="absolute -right-1 inset-0 rounded-l-2xl bg-linear-to-r from-accent/20 via-accent/10 to-transparent border border-accent/10 overflow-hidden"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                        >
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-accent rounded-r-full shadow-[0_0_12px_var(--color-accent)]" />
                        </motion.div>
                      )}

                      {/* Icon Container */}
                      <div className="flex items-center justify-center shrink-0 z-10 pl-3">
                        <Icon
                          className={`w-5 h-5 transition-transform duration-300 group-hover:scale-105 ${
                            isActive ? "text-primary" : "text-foreground/70"
                          }`}
                        />
                      </div>

                      {/* Animated Label with staggerChild */}
                      <AnimatePresence>
                        {isExpanded && (
                          <MotionWrapper
                            animationType="staggerChild"
                            delay={index * 0.04}
                            className="z-10"
                          >
                            <span className="ml-3 text-sm font-medium whitespace-nowrap overflow-hidden">
                              {item.name}
                            </span>
                          </MotionWrapper>
                        )}
                      </AnimatePresence>

                      {/* Tooltip for Collapsed Mode */}
                      {!isExpanded && (
                        <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#170926] border border-white/10 text-foreground text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-xl z-50">
                          {item.name}
                        </div>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </motion.aside>
    </MotionWrapper>
  );
};

export default Navbar;
