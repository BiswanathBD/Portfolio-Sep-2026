"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function SectionWrapper({
  children,
  id,
  className = "",
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      timeline
        .fromTo(
          content,
          {
            opacity: 0,
            scale: 0.6,
            filter: "blur(2px)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "none",
            duration: 0.5,
          },
        )
        .to(content, {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
          duration: 0.5,
        })
        .to(content, {
          opacity: 0,
          scale: 0.6,
          filter: "blur(2px)",
          ease: "none",
          duration: 0.5,
        });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className={`w-full ${className}`}>
      <div ref={contentRef} className="w-full will-change-transform">
        {children}
      </div>
    </section>
  );
}
