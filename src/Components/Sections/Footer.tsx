"use client";

import React from "react";
import Link from "next/link";
import { navItems } from "@/data/navData";
import { socialsData } from "@/data/contactData";
import { MotionWrapper } from "../Shared/MotionWrapper";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background">
      {/* Background Glow Elements */}
      <MotionWrapper
        className="pointer-events-none absolute left-1/4 top-0 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-[100px]"
        animationType="scale"
        duration={15}
      />

      <MotionWrapper
        className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[100px]"
        animationType="scale"
        duration={12}
      />

      <div className="container mx-auto px-4 pb-8 pt-12 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo & Description */}
          <div className="space-y-3 text-center md:text-left">
            {/* Name and Title */}
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <MotionWrapper animationType="fadeUp" delay={0.1}>
                <span className="font-display text-xl font-bold tracking-wide text-foreground">
                  Biswanath Sarker
                </span>
              </MotionWrapper>
              <MotionWrapper animationType="heightIncrease" delay={0.3}>
                <div className="h-6 w-px bg-linear-to-b from-primary/50 to-accent/50" />
              </MotionWrapper>

              <MotionWrapper animationType="fadeUp" delay={0.3}>
                <span className="text-sm font-medium animate-pulse bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  MERN Stack Developer
                </span>
              </MotionWrapper>
            </div>

            {/* Subtitle */}
            <MotionWrapper animationType="fadeUp" delay={0.4}>
              <p className="mx-auto max-w-sm text-sm italic leading-relaxed text-foreground/70 md:mx-0">
                &quot;Building modern web applications with clean code and
                creative solutions.&quot;
              </p>
            </MotionWrapper>
          </div>

          {/* Quick Links */}
          <MotionWrapper
            className="text-center"
            animationType="fadeUp"
            delay={0.2}
          >
            <h3 className="mb-4 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-lg font-bold text-transparent">
              Quick Links
            </h3>
            <nav
              className="flex flex-wrap justify-center gap-4"
              aria-label="Footer Navigation"
            >
              {navItems.map((item, index) => (
                <MotionWrapper
                  key={item.name}
                  animationType="fadeUp"
                  delay={0.2 + index * 0.1}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground/70 transition-colors duration-300 hover:text-accent hover:-translate-y-1"
                  >
                    {item.name}
                  </Link>
                </MotionWrapper>
              ))}
            </nav>
          </MotionWrapper>

          {/* Social Links */}
          <MotionWrapper
            className="text-center md:text-right"
            animationType="fadeUp"
            delay={0.4}
          >
            <h3 className="mb-4 bg-linear-to-r from-accent via-primary to-accent bg-clip-text text-lg font-bold text-transparent">
              Connect With Me
            </h3>
            <div className="flex justify-center space-x-3 md:justify-end">
              {socialsData.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <MotionWrapper
                    key={social.name}
                    animationType="fadeUp"
                    delay={0.3 + index * 0.1}
                  >
                    <MotionWrapper animationType="button">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block hover:-translate-y-1 transition-all duration-500"
                        title={social.name}
                        aria-label={social.name}
                      >
                        {/* Unique Glow effect on hover */}
                        <div
                          className={`absolute inset-0 rounded-lg bg-linear-to-r ${social.glow} blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                        />

                        {/* Icon container with customized color, border & shadow */}
                        <div
                          className={`relative flex h-8 w-8 items-center justify-center rounded-lg border border-border-color bg-card-bg text-foreground/70 transition-all duration-300 ${social.color} ${social.borderColor} ${social.shadowColor} group-hover:shadow-lg`}
                        >
                          <IconComponent className="text-base" />
                        </div>
                      </a>
                    </MotionWrapper>
                  </MotionWrapper>
                );
              })}
            </div>
          </MotionWrapper>
        </div>

        {/* Divider */}
        <MotionWrapper
          animationType="widthIncrease"
          delay={0.4}
          duration={0.8}
          className="my-8 h-px bg-linear-to-r from-transparent via-border-color to-transparent"
        />

        {/* Copyright */}
        <MotionWrapper
          className="text-center text-sm text-foreground/60"
          animationType="fadeUp"
          delay={0.2}
        >
          <p>© {currentYear} Biswanath Sarker. All rights reserved.</p>
        </MotionWrapper>
      </div>
    </footer>
  );
};

export default Footer;
