"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/utils/lenisController";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 1.5,
      touchMultiplier: 1,
    });

    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const element = document.querySelector(hash);
      if (element instanceof HTMLElement) {
        lenis.scrollTo(element, {
          offset: window.innerWidth < 640 ? -88 : 0,
          duration: 1.2,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("hashchange", scrollToHash);

    const refresh = window.setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
      scrollToHash();
    }, 120);

    return () => {
      window.clearTimeout(refresh);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", scrollToHash);
      gsap.ticker.remove(update);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
