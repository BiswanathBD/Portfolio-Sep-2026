"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  children,
  className = "",
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Lenis-এর কাস্টম স্ক্রল কন্টেইনার রেফারেন্স ধরা
    const scroller = el.closest("main");

    const ctx = gsap.context(() => {
      // ১. Entry Animation: Top Bottom -> Top Center
      gsap.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.8,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            scroller: scroller || undefined, // কাস্টম র্যাপার স্ক্রলার সিঙ্ক
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      // ২. Exit Animation: Bottom Center -> Bottom Top
      gsap.to(el, {
        opacity: 0,
        scale: 0.8,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          scroller: scroller || undefined,
          start: "bottom center",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`w-full will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
