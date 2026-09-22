"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP Plugin Register
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollWrapperProps {
  children: React.ReactNode;
}

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Container-এর ভেতরের সব সরাসরি Children Section গুলোকে সিলেক্ট করা
      const sections = gsap.utils.toArray<HTMLElement>(
        containerRef.current.children,
      );

      sections.forEach((section) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scrub: 1, // Smooth scrub
            start: "top bottom", // সেকশনের Top যখন ভিউপোর্টের Bottom-এ
            end: "bottom top", // সেকশনের Bottom যখন ভিউপোর্টের Top-এ
            invalidateOnRefresh: true, // Resize বা Height Change হলে রিসেট হবে
          },
        });

        tl.fromTo(
          section,
          {
            opacity: 0,
            scale: 0.5,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            duration: 0.3,
          },
        )
          .to(section, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            duration: 0.4,
          })
          .to(section, {
            opacity: 0,
            scale: 0.5,
            filter: "blur(8px)",
            ease: "none",
            duration: 0.3,
          });
      });

      // সব ইমেজ ও কম্পোনেন্ট লোড হওয়ার পর ScrollTrigger রিফ্রেশ করা
      ScrollTrigger.refresh();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
}
