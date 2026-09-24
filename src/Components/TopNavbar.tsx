"use client";

import React, { useState, useEffect, useRef } from "react";
import Logo from "./Shared/Logo";
import { ListIndentIncrease } from "lucide-react";
import Container from "./Shared/Container";

const TopNavbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // check scroll top
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // always visible on top
      if (currentScrollY <= 10) {
        setIsVisible(true);
      }
      // hide on scroll down
      else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }
      // show on scroll up
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`w-full fixed top-4 z-50 ${isScrolled ? "px-4" : "px-0 "}`}>
      <Container
        className={`flex items-center justify-between gap-4 transition-all duration-800 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-30 pointer-events-none"
        } ${
          isScrolled
            ? "p-4 bg-card border border-border-color rounded-3xl shadow-lg backdrop-blur-md"
            : "p-0 bg-transparent border-transparent"
        }`}
      >
        <Logo />

        <div className="relative group p-[0.5px] rounded-xl overflow-hidden flex items-center justify-center">
          {/* glowing border */}
          <div className="absolute inset-[-200%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,var(--color-primary)_360deg)] blur-xs opacity-80" />

          {/* Inner Content Container */}
          <div
            role="button"
            className={`relative size-11 flex items-center justify-center rounded-xl border border-border-color/60 ${isScrolled ? "bg-background" : "bg-background/80"} text-accent z-10 cursor-pointer rotate-180`}
          >
            <ListIndentIncrease className="size-7" strokeWidth={1} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default TopNavbar;
