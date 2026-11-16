"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { SkillItem } from "@/data/heroData";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useInView,
  type MotionValue,
} from "framer-motion";
import { MotionWrapper } from "../Shared/MotionWrapper";

export interface ProfileShowcaseProps {
  profileImage: string;
  name?: string;
  skillSets: {
    innerCircle: SkillItem[];
    middleCircle: SkillItem[];
    thirdCircle: SkillItem[];
    outerCircle: SkillItem[];
  };
}

const circleSize = ["w-[64%]", "w-[76%]", "w-[88%]", "w-[100%]"];

const getDeterministicSize = (circleIdx: number, skillIdx: number) => {
  const base = 28;
  const offset = ((circleIdx * 2 + skillIdx * 8) % 4) * 2;
  return `${base + offset}px`;
};

const getInitialRotation = (circleIdx: number) => {
  const offsets = [0, 55, 85, 25];
  return offsets[circleIdx % offsets.length];
};

interface OrbitingRingProps {
  circleKey: string;
  skills: SkillItem[];
  circleIdx: number;
  smoothVelocity: MotionValue<number>;
  isInView: boolean;
}

const OrbitingRing: React.FC<OrbitingRingProps> = ({
  circleKey,
  skills,
  circleIdx,
  smoothVelocity,
  isInView,
}) => {
  const ringRef = useRef<HTMLDivElement>(null);
  const circleSizeClass = circleSize[circleIdx] || "w-[100%]";
  const isClockwise = circleIdx % 2 === 0;
  const initialAngle = getInitialRotation(circleIdx);
  const ringRotation = useMotionValue(initialAngle);
  const counterRotation = useTransform(ringRotation, (r) => -r);

  // Pinwheel (chorki) drag & flick physics state
  const isDraggingRef = useRef(false);
  const extraVelocityRef = useRef(0); // in deg/ms
  const centerRef = useRef({ x: 0, y: 0 });
  const lastAngleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocitySamplesRef = useRef<{ v: number; t: number }[]>([]);

  // Dynamic glow and border opacity reacting to scroll or flick velocity
  const ringGlow = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [
      "drop-shadow(0 0 12px rgba(134, 77, 203, 0.75))",
      "drop-shadow(0 0 0px rgba(134, 77, 203, 0))",
      "drop-shadow(0 0 12px rgba(134, 77, 203, 0.75))",
    ],
  );

  const ringBorderOpacity = useTransform(
    smoothVelocity,
    [-1500, 0, 1500],
    [0.9, 0.35, 0.9],
  );

  // Speed: full rotation in 36s + circleIdx * 10s
  const durationSec = 36 + circleIdx * 10;
  const baseDegPerMs = (360 / (durationSec * 1000)) * (isClockwise ? 1 : -1);

  useAnimationFrame((time, delta) => {
    if (!isInView) return;

    if (isDraggingRef.current) {
      // While dragging, angle is directly updated by pointer movements
      return;
    }

    // Decay flick velocity with natural pinwheel friction
    const friction = Math.pow(0.965, delta / 16.66);
    extraVelocityRef.current *= friction;

    if (Math.abs(extraVelocityRef.current) < 0.0001) {
      extraVelocityRef.current = 0;
    }

    // Scroll velocity boost
    const vel = Math.abs(smoothVelocity.get());
    const boost = 1 + Math.min(vel / 200, 6.5);
    const ambientSpeed = baseDegPerMs * boost;

    // Combined angular movement
    const totalSpeed = ambientSpeed + extraVelocityRef.current;
    const moveBy = totalSpeed * delta;
    const current = ringRotation.get();
    ringRotation.set((current + moveBy) % 360);
  });

  // Pinwheel drag handlers attached to icons
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}

    isDraggingRef.current = true;
    extraVelocityRef.current = 0; // stop ongoing inertia when grabbed

    const rect = ringRef.current?.getBoundingClientRect();
    if (rect) {
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }

    const { x: cx, y: cy } = centerRef.current;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    lastAngleRef.current = angle;
    lastTimeRef.current = performance.now();
    velocitySamplesRef.current = [];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const { x: cx, y: cy } = centerRef.current;
    const newAngle =
      Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    let dAngle = newAngle - lastAngleRef.current;

    // Handle wrap-around between -180 and +180
    if (dAngle > 180) dAngle -= 360;
    else if (dAngle < -180) dAngle += 360;

    const now = performance.now();
    const dt = now - lastTimeRef.current;

    // Update ring rotation directly with user's hand
    ringRotation.set((ringRotation.get() + dAngle) % 360);

    if (dt > 0) {
      const v = dAngle / dt; // in deg/ms
      velocitySamplesRef.current.push({ v, t: now });
      velocitySamplesRef.current = velocitySamplesRef.current.filter(
        (s) => now - s.t < 100,
      );
    }

    lastAngleRef.current = newAngle;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    // Calculate release flick momentum
    const now = performance.now();
    const recent = velocitySamplesRef.current.filter((s) => now - s.t < 100);

    if (recent.length > 0) {
      const avgV = recent.reduce((sum, s) => sum + s.v, 0) / recent.length;
      // Cap maximum flick speed for smooth physics
      const maxFlick = 2.4; // ~2400 deg/s
      extraVelocityRef.current = Math.max(-maxFlick, Math.min(maxFlick, avgV));
    } else {
      extraVelocityRef.current = 0;
    }
  };

  const zIndexClass = `z-[${10 - circleIdx}]`;

  return (
    <MotionWrapper
      key={circleKey}
      animationType="scale"
      transitionType="spring"
      delay={0.2 + circleIdx * 0.15}
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${zIndexClass}`}
    >
      {/* 1. Border / Ring only — has dynamic opacity + glow */}
      <motion.div
        className={`absolute ${circleSizeClass} aspect-square rounded-full border border-border-color pointer-events-none`}
        style={{
          rotate: ringRotation,
          filter: ringGlow,
          opacity: ringBorderOpacity,
          willChange: "transform",
          transformOrigin: "center center",
        }}
      />

      {/* 2. Icons container — always full opacity */}
      <motion.div
        ref={ringRef}
        className={`button absolute ${circleSizeClass} aspect-square pointer-events-none`}
        style={{
          rotate: ringRotation,
          willChange: "transform",
          transformOrigin: "center center",
        }}
      >
        {skills.map((skill, skillIdx) => {
          const dynamicDimension = getDeterministicSize(circleIdx, skillIdx);

          return (
            <motion.div
              key={skill.name || skillIdx}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`absolute p-1.5 aspect-square rounded-full border border-primary/60 bg-linear-to-br from-border-color to-accent/15 shadow-[0_0_10px_var(--border-color)] scale-60 sm:scale-70 md:scale-100 lg:scale-50 xl:scale-100 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-grab active:cursor-grabbing select-none
                ${skillIdx === 0 && "top-0 left-1/2"} 
                ${skillIdx === 1 && "top-1/2 left-full"} 
                ${skillIdx === 2 && "top-full left-1/2"} 
                ${skillIdx === 3 && "top-1/2 left-0"} 
              `}
              style={{
                width: dynamicDimension,
                height: dynamicDimension,
                willChange: "transform",
                touchAction: "none",
              }}
              title={skill.name}
              animate={{
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 3 + skillIdx * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: skillIdx * 0.2,
              }}
              whileHover={{
                scale: 1.25,
                boxShadow: "0px 0px 20px var(--accent)",
              }}
            >
              {/* Gyroscopic upright skill icon */}
              {skill.icon && (
                <motion.div
                  className="relative w-full h-full flex items-center justify-center select-none"
                  style={{
                    rotate: counterRotation,
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name || "skill icon"}
                    fill
                    unoptimized
                    sizes="40px"
                    draggable={false}
                    className="object-contain pointer-events-none select-none"
                  />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </MotionWrapper>
  );
};

const ProfileShowcase = ({
  profileImage,
  name = "Profile Image",
  skillSets,
}: ProfileShowcaseProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 45,
    stiffness: 280,
    mass: 0.5,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full flex justify-center items-center"
    >
      <div className="relative z-20 flex items-center justify-center w-[52%]">
        {/* bg glow */}
        <MotionWrapper
          animationType="scale"
          delay={0.2}
          duration={1}
          className="absolute inset-0 bg-primary/60 rounded-full blur-[100px] z-0 pointer-events-none"
        />

        {/* Profile Image Wrapper */}
        <MotionWrapper
          animationType="scale"
          transitionType="spring"
          className="relative z-10 group w-full aspect-square rounded-full border-2 border-primary/50 overflow-hidden bg-background flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]"
        >
          {profileImage && (
            <Image
              src={profileImage}
              alt={name}
              fill
              priority
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover group-hover:scale-105 transition-all duration-500"
            />
          )}
        </MotionWrapper>
      </div>

      {/* Orbiting Skill Sets reacting to scroll velocity */}
      {skillSets &&
        Object.entries(skillSets).map(([circleKey, skills], circleIdx) => {
          if (!skills || skills.length < 1) return null;

          return (
            <OrbitingRing
              key={circleKey}
              circleKey={circleKey}
              skills={skills}
              circleIdx={circleIdx}
              smoothVelocity={smoothVelocity}
              isInView={isInView}
            />
          );
        })}
    </section>
  );
};

export default ProfileShowcase;