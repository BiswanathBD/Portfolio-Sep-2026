import React from "react";

export default function Loading() {
  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-72 bg-primary/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-48 bg-accent/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Animated concentric spinners */}
        <div className="relative size-16 flex items-center justify-center">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent/40 animate-spin" />
          
          {/* Middle ring */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary border-l-primary/40 animate-[spin_1.5s_linear_infinite_reverse]" />
          
          {/* Center glowing core */}
          <div className="size-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)] animate-pulse" />
        </div>

        {/* Text indicator */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-[0.25em] bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
            Loading
          </span>
          <span className="flex gap-1">
            <span className="size-1 rounded-full bg-accent animate-bounce [animation-delay:-0.3s]" />
            <span className="size-1 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
            <span className="size-1 rounded-full bg-accent animate-bounce" />
          </span>
        </div>
      </div>
    </div>
  );
}

