      "use client";

      import { motion } from "framer-motion";

      export const GlobalBackground = () => {
        return (
          <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">

            {/* Modern Subtle Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Animated Floating Glow (Top-Left Accent) */}
            <motion.div
              className="absolute bottom-1/2 -left-50 w-125 aspect-square rounded-full bg-primary/20 blur-[200px]"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Animated Floating Glow Orb (bottom center) */}
            <motion.div
              className="absolute top-3/4 right-0 w-1/2 aspect-square rounded-full bg-foreground/5 blur-[200px]"
              animate={{
                x: [0, -40, 0],
                y: [0, -50, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Subtle Vignette Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
          </div>
        );
      };

      export default GlobalBackground;
