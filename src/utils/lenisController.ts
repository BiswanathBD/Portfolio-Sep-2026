import type Lenis from "lenis";

type LenisListener = (instance: Lenis | null) => void;

let lenisInstance: Lenis | null = null;
const listeners = new Set<LenisListener>();
let pendingSection: string | null = null;

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

export const setPendingSection = (section: string | null) => {
  pendingSection = section;
};

export const getPendingSection = () => pendingSection;

export const getScrollOffset = () => (window.innerWidth < 640 ? -88 : 0);

export const scrollToTarget = (
  target: number | string | HTMLElement,
  options?: {
    onComplete?: () => void;
    duration?: number;
    offset?: number;
    immediate?: boolean;
  },
) => {
  const offset = options?.offset ?? getScrollOffset();
  const lenis = lenisInstance;

  if (lenis) {
    lenis.scrollTo(target, {
      offset,
      duration: options?.immediate ? 0 : (options?.duration ?? 1.2),
      immediate: options?.immediate ?? false,
      lock: true,
      force: true,
      programmatic: true,
      onComplete: options?.onComplete,
    });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({
      top: Math.max(0, target + offset),
      behavior: options?.immediate ? "auto" : "smooth",
    });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({
      behavior: options?.immediate ? "auto" : "smooth",
      block: "start",
    });
  } else {
    target.scrollIntoView({
      behavior: options?.immediate ? "auto" : "smooth",
      block: "start",
    });
  }

  window.setTimeout(() => options?.onComplete?.(), 800);
};

export const scrollToSectionElement = (
  sectionId: string,
  options?: {
    immediate?: boolean;
    duration?: number;
    offset?: number;
    onComplete?: () => void;
    maxRetries?: number;
  },
): Promise<boolean> => {
  const cleanId = sectionId.replace(/^#/, "").toLowerCase();

  if (!cleanId || cleanId === "home") {
    scrollToTarget(0, {
      immediate: options?.immediate,
      duration: options?.duration,
      offset: 0,
      onComplete: options?.onComplete,
    });
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let retries = 0;
    const maxRetries = options?.maxRetries ?? 30; // 30 * 40ms = 1200ms

    const checkAndScroll = () => {
      const element = document.getElementById(cleanId);
      if (element) {
        scrollToTarget(element, {
          duration: options?.duration,
          immediate: options?.immediate,
          offset: options?.offset,
          onComplete: () => {
            options?.onComplete?.();
            resolve(true);
          },
        });
        return;
      }

      if (retries < maxRetries) {
        retries++;
        window.setTimeout(checkAndScroll, 40);
      } else {
        resolve(false);
      }
    };

    checkAndScroll();
  });
};

