"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Home,
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Mail,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";
import Logo from "./Logo";

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

const desktopNavItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.2 + i * 0.05,
      ease: "easeOut",
    },
  }),
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const menuItemVariants: Variants = {
  hidden: { x: -15, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      delay: i * 0.05,
      ease: "easeOut",
    },
  }),
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.section);
      const scrollPos = window.scrollY + 120;

      if (scrollPos < 200) {
        setActiveSection("home");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section === "home") continue;

        const element = document.querySelector(`#${section}`) as HTMLElement;
        if (element && scrollPos >= element.offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <motion.nav
      aria-label="Main Navigation"
      className="fixed top-0 left-0 right-0 w-full py-3.5 z-40 container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 transition-all duration-300"
    >
      <header
        className={`flex justify-between items-center transition-all duration-500 rounded-2xl border ${
          isScrolled
            ? "bg-card-bg/80 border-border-color backdrop-blur-xl px-4 py-2.5 shadow-lg shadow-black/5"
            : "bg-transparent border-transparent px-2 py-2"
        }`}
      >
        <Logo />

        {/* Desktop Navigation Menu */}
        <ol className="hidden md:flex items-center gap-1.5 font-medium text-sm list-none m-0 p-0">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.section;
            const Icon = item.icon;

            return (
              <motion.li
                key={item.name}
                custom={index}
                variants={desktopNavItemVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.section)}
                  className={`relative px-3 py-1.5 rounded-xl flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {/* Active Indicator Backdrop */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon
                      className="w-4 h-4 shrink-0"
                      aria-hidden="true"
                    />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.span
                        key="active-label"
                        className="text-sm whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        {item.name}
                      </motion.span>
                    ) : (
                      <span className="text-sm font-medium whitespace-nowrap opacity-80 hover:opacity-100">
                        {item.name}
                      </span>
                    )}
                  </AnimatePresence>
                </a>
              </motion.li>
            );
          })}
        </ol>

        {/* Mobile Toggle Button */}
        <motion.button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="md:hidden text-foreground bg-card-bg border border-border-color backdrop-blur-md rounded-xl p-2.5 flex justify-center items-center shadow-md cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </motion.div>
        </motion.button>
      </header>

      {/* Mobile Menu Section */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            aria-label="Mobile Navigation"
            className="absolute top-full left-0 right-0 md:hidden px-4 mt-2 z-50"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-card-bg/95 border border-border-color backdrop-blur-2xl rounded-2xl p-4 shadow-2xl">
              <ul className="flex flex-col space-y-1 font-medium list-none m-0 p-0">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.section;
                  const Icon = item.icon;

                  return (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <a
                        href={item.href}
                        onClick={() => {
                          handleNavClick(item.section);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                            isActive
                              ? "bg-primary/15 border-primary/30 text-primary"
                              : "bg-border-color/20 border-border-color text-foreground/70"
                          }`}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <span className="text-sm">{item.name}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
