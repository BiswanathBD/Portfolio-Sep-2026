"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { HeroData, SocialLink } from "@/data/heroData";
import { MotionWrapper } from "../MotionWrapper";

interface HeroContentProps {
  data: Pick<
    HeroData,
    "greeting" | "name" | "role" | "description" | "resumeUrl" | "socialLinks"
  >;
}

const renderSocialIcon = (iconName: SocialLink["iconName"]) => {
  switch (iconName) {
    case "github":
      return (
        <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
      );

    case "linkedin":
      return (
        <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
      );

    case "mail":
      return (
        <IoMail className="w-4 h-4 group-hover:scale-110 transition-transform" />
      );

    default:
      return null;
  }
};

const HeroContent = ({ data }: HeroContentProps) => {
  const topLineDuration = 0.7;
  const topLineDelay = 0.2;

  const iconStartDelay = topLineDelay + topLineDuration + 0.15;
  const iconDuration = 0.4;
  const iconStagger = 0.18;

  const lastIconEnd =
    iconStartDelay +
    Math.max(data.socialLinks.length - 1, 0) * iconStagger +
    iconDuration;

  const bottomLineDelay = lastIconEnd + 0.2;

  return (
    <aside className="flex-1 mt-8 flex items-center gap-6 sm:gap-8">
      {/* social links */}
      <nav
        aria-label="social links"
        className="flex flex-col items-center gap-5 px-2"
      >
        <div className="relative h-16 w-px overflow-hidden">
          <MotionWrapper
            animationType="heightIncrease"
            className="h-full w-full"
            transition={{
              duration: topLineDuration,
              delay: topLineDelay,
              ease: "easeInOut",
            }}
          >
            <span className="block h-full w-full bg-linear-to-t from-accent" />
          </MotionWrapper>
        </div>
        {data.socialLinks.map((social, idx) => {
          const brandColor = social.color || "var(--primary)";

          return (
            <MotionWrapper
              key={social.label}
              animationType="fadeDown"
              transition={{
                duration: iconDuration,
                delay: iconStartDelay + idx * iconStagger,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <a
                aria-label={social.label}
                className="group w-8 h-8 bg-linear-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20 flex items-center justify-center text-foreground hover:scale-110 transition-all duration-300 shadow-xs hover:border-(--brand-color) hover:text-(--brand-color) hover:shadow-[0_0_20px_var(--brand-color)]"
                style={
                  {
                    "--brand-color": brandColor,
                  } as React.CSSProperties
                }
                href={social.href}
                target={"_blank"}
                rel={
                  social.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
              >
                {renderSocialIcon(social.iconName)}
              </a>
            </MotionWrapper>
          );
        })}

        <div className="h-16 w-px overflow-hidden">
          <MotionWrapper
            animationType="heightIncrease"
            className="h-full"
            transition={{
              duration: topLineDuration,
              delay: bottomLineDelay,
              ease: "easeInOut",
            }}
          >
            <span className="block h-full w-full bg-linear-to-b from-accent" />
          </MotionWrapper>
        </div>
      </nav>

      <main className="space-y-2 max-w-sm sm:max-w-sm md:max-w-lg lg:w-full">
        <MotionWrapper animationType="fadeRight" delay={0.2} duration={0.7}>
          <header>
            <motion.h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-4xl tracking-tight text-accent font-bold">
              <motion.span
                className="inline-block text-2xl sm:text-4xl mr-1"
                style={{ transformOrigin: "70% 70%" }}
                animate={{
                  rotate: [0, 20, -10, 20, -5, 15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
              >
                👋🏼
              </motion.span>
              {data.greeting} <br />
              <span className="flex flex-col text-4xl sm:text-5xl md:text-7xl lg:text-5xl xl:text-7xl text-foreground font-extrabold tracking-tight mt-2">
                <span
                  className={`${data.name.split(" ")[1] && " text-3xl sm:text-4xl md:text-6xl lg:text-4xl xl:text-6xl"}`}
                >
                  {data.name.split(" ")[0]}
                </span>
                {data.name.split(" ")[1] && (
                  <span>{data.name.split(" ")[1]}</span>
                )}
              </span>
            </motion.h1>
          </header>
        </MotionWrapper>

        {/* Dynamic Rotating Gradient Role */}
        <MotionWrapper animationType="fadeRight" delay={0.4} duration={0.7}>
          <h2 className="font-sans font-semibold text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-4xl">
            <motion.span
              className="bg-clip-text text-transparent bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto]"
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {data.role}
            </motion.span>
          </h2>
        </MotionWrapper>

        <MotionWrapper animationType="fadeRight" delay={0.6} duration={0.7}>
          <p className="text-foreground/70 text-base sm:text-lg md:text-xl lg:text-base xl:text-xl leading-relaxed">
            {data.description}
          </p>
        </MotionWrapper>

        <MotionWrapper animationType="fadeUp" delay={0.8} duration={0.7}>
          <div className="flex items-center gap-4 mt-8">
            <MotionWrapper animationType="button">
              <div className="relative p-px rounded-2xl overflow-hidden flex items-center justify-center group">
                {/* Rotating border glow */}
                <MotionWrapper animationType="fade" delay={1} duration={1}>
                  <MotionWrapper
                    animationType="rotate"
                    duration={5}
                    className="absolute inset-[-250%] bg-[conic-gradient(from_0deg,transparent_0_180deg,var(--primary)_330deg,var(--accent)_360deg)] opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none"
                  />
                </MotionWrapper>

                {/* Main Resume Link Button */}
                <a
                  className="relative flex items-center gap-2 hover:gap-3 px-6 py-3 rounded-[calc(1rem-1px)] overflow-hidden bg-background/90 backdrop-blur-md bg-linear-to-br from-primary/10 to-accent/10 border border-primary/20 text-accent font-medium z-10 transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Biswanath's Resume"
                >
                  <span>Download Resume</span>

                  <Download className="w-4 h-4 text-foreground group-hover:scale-110 transition-all duration-500" />
                </a>
              </div>
            </MotionWrapper>
          </div>
        </MotionWrapper>
      </main>
    </aside>
  );
};

export default HeroContent;
