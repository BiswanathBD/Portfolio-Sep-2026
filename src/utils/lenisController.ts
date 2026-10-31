import type Lenis from "lenis";

type LenisListener = (instance: Lenis | null) => void;

let lenisInstance: Lenis | null = null;
const listeners = new Set<LenisListener>();

export const setLenisInstance = (instance: Lenis | null) => {
  lenisInstance = instance;
  listeners.forEach((listener) => listener(instance));
};

export const getLenisInstance = () => lenisInstance;

export const subscribeLenis = (listener: LenisListener) => {
  listeners.add(listener);
  listener(lenisInstance);

  return () => {
    listeners.delete(listener);
  };
};

const getScrollOffset = () => (window.innerWidth < 640 ? -88 : 0);

export const scrollToTarget = (
  target: number | string | HTMLElement,
  options?: {
    onComplete?: () => void;
    duration?: number;
  },
) => {
  const offset = getScrollOffset();
  const lenis = lenisInstance;

  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration: options?.duration ?? 1.2,
      lock: true,
      force: true,
      programmatic: true,
      onComplete: options?.onComplete,
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target + offset, behavior: "smooth" });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  window.setTimeout(() => options?.onComplete?.(), 800);
};
