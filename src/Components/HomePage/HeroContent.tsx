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
      return <FaGithub className="w-4 h-4 group-hover:scale-110" />;

    case "linkedin":
      return <FaLinkedin className="w-4 h-4 group-hover:scale-110" />;

    case "mail":
      return <IoMail className="w-4 h-4 group-hover:scale-110" />;

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
    <div className="flex-1 flex flex-col-reverse sm:flex-row items-center gap-6 sm:gap-0">
      <nav
        aria-label="social links"
        className="flex sm:flex-col items-center gap-5 px-2"
      >
        <div className="hidden sm:block h-16 w-px overflow-hidden">
          <MotionWrapper
            animationType="heightIncrease"
            className="h-full"
            transition={{
              duration: topLineDuration,
              delay: topLineDelay,
              ease: "easeInOut",
            }}
          >
            <span className="block h-full w-px bg-accent/10" />
          </MotionWrapper>
        </div>

        {data.socialLinks.map((social, idx) => (
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
              className="group w-8 h-8 bg-linear-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20 flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 hover:scale-120 transition-all duration-500 shadow-xs"
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
        ))}

        <div className="hidden sm:block h-16 w-px overflow-hidden">
          <MotionWrapper
            animationType="heightIncrease"
            className="h-full"
            transition={{
              duration: topLineDuration,
              delay: bottomLineDelay,
              ease: "easeInOut",
            }}
          >
            <span className="block h-full w-px bg-accent/10" />
          </MotionWrapper>
        </div>
      </nav>

      <main className="space-y-5 text-center md:text-left md:ml-10 order-2 md:order-1">
        <MotionWrapper animationType="fadeRight" delay={0.2} duration={0.7}>
          <header>
            <motion.h1 className="font-sans text-xl md:text-3xl tracking-tight text-accent font-bold">
              <motion.span
                className="inline-block text-3xl md:text-4xl"
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
              </motion.span>{" "}
              {data.greeting} <br />
              <span className="text-4xl sm:text-6xl md:text-7xl text-foreground font-extrabold tracking-tight">
                {data.name}
              </span>
            </motion.h1>
          </header>
        </MotionWrapper>

        <MotionWrapper animationType="fadeRight" delay={0.4} duration={0.7}>
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl md:text-4xl">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
              {data.role}
            </span>
          </h2>
        </MotionWrapper>

        <MotionWrapper animationType="fadeRight" delay={0.6} duration={0.7}>
          <p className="text-foreground/70 text-base md:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
            {data.description}
          </p>
        </MotionWrapper>

        <MotionWrapper animationType="fadeUp" delay={0.8} duration={0.7}>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center md:justify-start">
            <MotionWrapper animationType="button">
              <a
                className="group relative px-6 py-3 bg-linear-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/30 text-foreground font-medium transition-all overflow-hidden flex items-center gap-2 hover:border-primary/60"
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download Resume</span>

                <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
              </a>
            </MotionWrapper>
          </div>
        </MotionWrapper>
      </main>
    </div>
  );
};

export default HeroContent;
