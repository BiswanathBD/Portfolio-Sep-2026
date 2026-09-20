"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const codeElements = [
  // Core / Symbols
  { text: "</>", x: -46, y: -30, rotate: -12, size: "text-2xl" },
  { text: "{ }", x: -37, y: 4, rotate: 8, size: "text-xl" },
  { text: "const", x: -27, y: -39, rotate: -5, size: "text-sm" },
  { text: "=>", x: -43, y: 30, rotate: -8, size: "text-2xl" },
  { text: "01", x: -25, y: 40, rotate: 6, size: "text-sm" },
  { text: "npm", x: -10, y: -44, rotate: -4, size: "text-xs" },
  { text: "git", x: 15, y: -42, rotate: 7, size: "text-sm" },
  { text: "</>", x: 43, y: -30, rotate: 10, size: "text-2xl" },
  { text: "tsx", x: 47, y: 4, rotate: -7, size: "text-sm" },
  { text: "{...}", x: 35, y: 34, rotate: 8, size: "text-xl" },
  { text: "&&", x: 10, y: 43, rotate: -6, size: "text-2xl" },
  { text: "01", x: 48, y: 36, rotate: 5, size: "text-xs" },
  { text: "React", x: 31, y: 8, rotate: -3, size: "text-xs" },
  { text: "CSS", x: -31, y: -13, rotate: 5, size: "text-xs" },

  // JS & Next.js Keywords
  { text: "return", x: -55, y: -14, rotate: -9, size: "text-sm" },
  { text: "async", x: -52, y: 17, rotate: 6, size: "text-xs" },
  { text: "await", x: -20, y: 55, rotate: -4, size: "text-sm" },
  { text: "useState", x: 5, y: -55, rotate: 7, size: "text-xs" },
  { text: "useEffect", x: 24, y: 52, rotate: -8, size: "text-xs" },
  { text: "API", x: 55, y: -8, rotate: 5, size: "text-sm" },
  { text: "JSON", x: 54, y: 18, rotate: -6, size: "text-xs" },
  { text: "Next.js", x: -6, y: 55, rotate: 5, size: "text-sm" },
  { text: "TypeScript", x: -45, y: 48, rotate: -4, size: "text-xs" },
  { text: "import", x: -16, y: -55, rotate: 8, size: "text-xs" },
  { text: "export", x: 35, y: -51, rotate: -5, size: "text-xs" },
  { text: "function", x: 54, y: -39, rotate: 6, size: "text-xs" },
  { text: "map()", x: 52, y: 47, rotate: -7, size: "text-sm" },
  { text: "API()", x: -53, y: 39, rotate: 8, size: "text-xs" },

  // Commands & Statuses
  { text: "200 OK", x: -39, y: -52, rotate: -6, size: "text-sm" },
  { text: "404", x: 40, y: -54, rotate: 7, size: "text-sm" },
  { text: "git push", x: -57, y: -38, rotate: -4, size: "text-xs" },
  { text: "pnpm", x: 59, y: 2, rotate: 5, size: "text-sm" },
  { text: "dev", x: 38, y: 54, rotate: -8, size: "text-xs" },
  { text: "true", x: -58, y: 52, rotate: 6, size: "text-xs" },
  { text: "false", x: 20, y: 58, rotate: -5, size: "text-xs" },
  { text: "v5.0", x: 58, y: 29, rotate: 8, size: "text-sm" },
  { text: "node", x: -54, y: 2, rotate: -7, size: "text-xs" },
  { text: "UI/UX", x: 7, y: -62, rotate: 5, size: "text-sm" },
  { text: "<div>", x: -60, y: -1, rotate: 4, size: "text-xs" },
  { text: "</div>", x: 60, y: -20, rotate: -5, size: "text-xs" },

  // NEW EXPANDED BG ELEMENTS (Dense Outer Ring)
  { text: "Tailwind", x: -68, y: -28, rotate: -10, size: "text-xs" },
  { text: "useMemo", x: 68, y: -32, rotate: 12, size: "text-xs" },
  { text: "useCallback", x: -65, y: 28, rotate: -6, size: "text-xs" },
  { text: "GraphQL", x: 65, y: 35, rotate: 9, size: "text-sm" },
  { text: "Prisma", x: -28, y: -65, rotate: -8, size: "text-xs" },
  { text: "Docker", x: 28, y: -65, rotate: 7, size: "text-xs" },
  { text: "Turbopack", x: -62, y: -50, rotate: -15, size: "text-xs" },
  { text: "Zustand", x: 62, y: -48, rotate: 11, size: "text-xs" },
  { text: "Vite", x: -18, y: 65, rotate: -5, size: "text-sm" },
  { text: "Bun", x: 22, y: 66, rotate: 6, size: "text-sm" },
  { text: "class", x: -70, y: 8, rotate: -4, size: "text-xs" },
  { text: "interface", x: 70, y: -8, rotate: 8, size: "text-xs" },
  { text: "type", x: -48, y: -60, rotate: -3, size: "text-xs" },
  { text: "enum", x: 48, y: -60, rotate: 5, size: "text-xs" },
  { text: "try/catch", x: -63, y: 45, rotate: -7, size: "text-xs" },
  { text: "Promise", x: 63, y: 48, rotate: 6, size: "text-xs" },
  { text: "500", x: -35, y: 60, rotate: -12, size: "text-sm" },
  { text: "301", x: 35, y: 60, rotate: 10, size: "text-sm" },
  { text: "<main>", x: -72, y: -12, rotate: -5, size: "text-xs" },
  { text: "</main>", x: 72, y: 15, rotate: 7, size: "text-xs" },
  { text: "props", x: -12, y: -68, rotate: -4, size: "text-xs" },
  { text: "state", x: 12, y: -68, rotate: 6, size: "text-xs" },
  { text: "null", x: -50, y: -18, rotate: -8, size: "text-xs" },
  { text: "undefined", x: 50, y: -15, rotate: 5, size: "text-xs" },
];

const stars = [
  { x: -42, y: -34, size: 2, delay: 0 },
  { x: -32, y: -8, size: 3, delay: 0.7 },
  { x: -22, y: -43, size: 2, delay: 1.3 },
  { x: -8, y: -28, size: 3, delay: 0.4 },
  { x: 8, y: -44, size: 2, delay: 1.8 },
  { x: 24, y: -31, size: 3, delay: 0.9 },
  { x: 38, y: -43, size: 2, delay: 1.5 },
  { x: 48, y: -22, size: 3, delay: 0.2 },
  { x: -48, y: 8, size: 2, delay: 1.1 },
  { x: -27, y: 14, size: 2, delay: 1.9 },
  { x: -11, y: 7, size: 3, delay: 0.5 },
  { x: 13, y: 10, size: 2, delay: 1.6 },
  { x: 29, y: 6, size: 3, delay: 0.8 },
  { x: 47, y: 12, size: 2, delay: 1.2 },
  { x: -43, y: 31, size: 3, delay: 0.3 },
  { x: -26, y: 40, size: 2, delay: 1.7 },
  { x: -8, y: 31, size: 2, delay: 0.6 },
  { x: 10, y: 39, size: 3, delay: 1.4 },
  { x: 27, y: 31, size: 2, delay: 0.1 },
  { x: 43, y: 39, size: 3, delay: 1.8 },
  { x: -55, y: 22, size: 2, delay: 0.9 },
  { x: 56, y: 25, size: 2, delay: 0.5 },
  // Extra dense stars
  { x: -65, y: -40, size: 3, delay: 2.1 },
  { x: 65, y: -42, size: 2, delay: 1.0 },
  { x: -62, y: 42, size: 2, delay: 0.3 },
  { x: 62, y: 45, size: 3, delay: 1.7 },
  { x: -20, y: -62, size: 3, delay: 1.2 },
  { x: 20, y: -62, size: 2, delay: 0.8 },
  { x: -18, y: 62, size: 2, delay: 1.4 },
  { x: 18, y: 62, size: 3, delay: 0.6 },
];

type CodeElementProps = {
  item: (typeof codeElements)[number];
  index: number;
  expansion: MotionValue<number>;
  width: number;
  height: number;
};

const CodeElement = ({
  item,
  index,
  expansion,
  width,
  height,
}: CodeElementProps) => {
  const targetX = (width * item.x) / 100;
  const targetY = (height * item.y) / 100;

  // Starts strictly at 0 (center) and smoothly transforms to target coordinate
  const x = useTransform(expansion, [0, 1], [0, targetX]);
  const y = useTransform(expansion, [0, 1], [0, targetY]);

  return (
    <motion.div
      style={{
        x,
        y,
        left: "50%",
        top: "50%",
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.1,
          rotate: 0,
        }}
        animate={{
          opacity: [0, 0.6, 0.35],
          scale: [0.1, 1, 0.95],
          rotate: [0, item.rotate, item.rotate],
        }}
        transition={{
          duration: 5.0, // Slowed initial entrance
          delay: index * 0.03,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <motion.span
          animate={{
            y: [0, -6, 0, 5, 0],
            opacity: [0.2, 0.45, 0.25, 0.4, 0.2],
          }}
          transition={{
            duration: 20 + (index % 5) * 3, // Slow continuous breathing motion
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
          className={`block whitespace-nowrap font-mono font-medium ${item.size}`}
          style={{
            color:
              index % 4 === 0
                ? "color-mix(in srgb, var(--primary) 65%, transparent)"
                : index % 4 === 1
                  ? "color-mix(in srgb, var(--accent) 55%, transparent)"
                  : "color-mix(in srgb, var(--foreground) 35%, transparent)",
            textShadow:
              "0 0 25px color-mix(in srgb, var(--primary) 20%, transparent)",
          }}
        >
          {item.text}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

type StarElementProps = {
  star: (typeof stars)[number];
  index: number;
  expansion: MotionValue<number>;
  width: number;
  height: number;
};

const StarElement = ({
  star,
  index,
  expansion,
  width,
  height,
}: StarElementProps) => {
  const targetX = (width * star.x) / 100;
  const targetY = (height * star.y) / 100;

  const x = useTransform(expansion, [0, 1], [0, targetX]);
  const y = useTransform(expansion, [0, 1], [0, targetY]);

  return (
    <motion.div
      style={{
        x,
        y,
        left: "50%",
        top: "50%",
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: [0.4, 1.3, 0.5],
          opacity: [0.1, 0.85, 0.15],
        }}
        transition={{
          duration: 6 + (index % 4) * 2, // Slow star twinkle animation
          repeat: Infinity,
          ease: "easeInOut",
          delay: star.delay,
        }}
        className="relative rounded-full"
        style={{
          width: star.size,
          height: star.size,
          background: "var(--foreground)",
          boxShadow:
            "0 0 8px color-mix(in srgb, var(--primary) 80%, transparent), 0 0 18px color-mix(in srgb, var(--primary) 45%, transparent)",
        }}
      >
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: star.size * 5,
            height: star.size * 5,
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--primary) 25%, transparent), transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export const GlobalBackground = () => {
  const { scrollYProgress } = useScroll();

  const [viewport, setViewport] = useState({
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // Smooth scroll translation step curve
  const expansion = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 0.25, 0.6, 0.88, 1],
  );

  const centerGlowScale = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [0.7, 1.1, 1.4],
  );

  const centerGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.45, 0.4, 0.25, 0.12],
  );

  const gridScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  const gridOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 0.14, 0.05],
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[var(--background)]">
      {/* Primary Center Glow */}
      <motion.div
        style={{
          scale: centerGlowScale,
          opacity: centerGlowOpacity,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 25%, transparent) 0%, color-mix(in srgb, var(--primary) 8%, transparent) 42%, transparent 72%)",
        }}
        animate={{
          x: [0, 30, -25, 0],
          y: [0, -25, 30, 0],
        }}
        transition={{
          duration: 30, // Extremely smooth slow ambient glow wander
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[45vw] w-[45vw] max-h-[700px] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
      />

      {/* accent Ambient Glow */}
      <motion.div
        style={{
          scale: centerGlowScale,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 20%, transparent) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-[30vw] w-[30vw] max-h-[500px] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
      />

      {/* Code Elements Layer */}
      <div className="absolute inset-0">
        {codeElements.map((item, index) => (
          <CodeElement
            key={`${item.text}-${index}`}
            item={item}
            index={index}
            expansion={expansion}
            width={viewport.width}
            height={viewport.height}
          />
        ))}
      </div>

      {/* Glowing Stars Layer */}
      <div className="absolute inset-0">
        {stars.map((star, index) => (
          <StarElement
            key={`star-${index}`}
            star={star}
            index={index}
            expansion={expansion}
            width={viewport.width}
            height={viewport.height}
          />
        ))}
      </div>

      {/* Horizontal Scan Line */}
      <motion.div
        style={{
          scaleX: gridScale,
          opacity: gridOpacity,
        }}
        className="absolute left-1/2 top-1/2 h-px w-[100vw] -translate-x-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--border-color) 55%, transparent) 20%, color-mix(in srgb, var(--primary) 30%, transparent) 50%, color-mix(in srgb, var(--border-color) 55%, transparent) 80%, transparent)",
          }}
        />
      </motion.div>

      {/* Vertical Scan Line */}
      <motion.div
        style={{
          scaleY: gridScale,
          opacity: gridOpacity,
        }}
        className="absolute left-1/2 top-1/2 h-screen w-px -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, transparent, color-mix(in srgb, var(--border-color) 50%, transparent) 20%, color-mix(in srgb, var(--accent) 25%, transparent) 50%, color-mix(in srgb, var(--border-color) 50%, transparent) 80%, transparent)",
          }}
        />
      </motion.div>

      {/* Digital Grid */}
      <motion.div
        style={{
          scale: gridScale,
          opacity: gridOpacity,
        }}
        className="absolute inset-[-5%]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in srgb, var(--border-color) 30%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in srgb, var(--border-color) 30%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
            maskImage:
              "radial-gradient(ellipse at center, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 10%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Center Core Pulse */}
      <motion.div
        animate={{
          scale: [0.6, 1.8, 0.6],
          opacity: [0.05, 0.3, 0.05],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "var(--primary)",
          boxShadow:
            "0 0 30px color-mix(in srgb, var(--primary) 70%, transparent), 0 0 70px color-mix(in srgb, var(--primary) 30%, transparent)",
        }}
      />
    </div>
  );
};

export default GlobalBackground;
