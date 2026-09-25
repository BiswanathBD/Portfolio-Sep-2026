import React from "react";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import {
  contactHeaderData,
  contactInfoData,
  ContactInfoItem,
} from "@/data/contactData";
import { MotionWrapper } from "./Shared/MotionWrapper";

export const ContactInfoCard = () => {
  return (
    <aside className="relative flex h-full items-center justify-between border-l border-border-color/40 p-6 text-left lg:border-l-0 lg:border-r lg:text-right">
      {/* bg glow */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 aspect-square w-1/3 rounded-full bg-primary/40 blur-[80px] lg:left-auto lg:right-0" />

      <div className="relative z-10 flex min-h-0 w-full flex-col items-start gap-5 lg:items-end pb-6 border-b border-border-color/40">
        {/* Header Section */}
        <MotionWrapper animationType="fadeUp" delay={0.2} className="w-full">
          <header className="flex flex-col items-start lg:items-end">
            <h3 className="mb-1 block text-lg font-bold tracking-wider text-accent uppercase md:text-xl">
              {contactHeaderData.title}
            </h3>

            <p className="text-sm text-foreground">
              {contactHeaderData.subtitle}
            </p>
          </header>
        </MotionWrapper>

        {/* Contact List */}
        <nav
          aria-label="Contact Methods"
          className="relative z-10 flex min-h-0 w-full flex-1 flex-col space-y-4 overflow-y-auto pr-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <address className="flex w-full flex-col space-y-4 not-italic">
            {contactInfoData.map((info: ContactInfoItem, idx: number) => {
              const IconComponent = info.icon;
              const isPrimaryAccent = idx % 2 === 0;

              return (
                <MotionWrapper
                  key={info.label}
                  animationType="fadeUp"
                  delay={0.3 + idx * 0.1}
                  className="w-full"
                >
                  <Link
                    href={info.link}
                    target={info.link.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      info.link.startsWith("http") ? "noopener noreferrer" : ""
                    }
                    className={`group relative flex w-full items-center justify-start gap-3.5 bg-linear-to-r from-card-bg to-transparent py-2.5 pl-2 pr-3 text-left transition-all duration-300 hover:text-primary lg:bg-linear-to-l lg:justify-end lg:pl-3 lg:pr-2 lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 ${
                      isPrimaryAccent
                        ? "border-primary/80 hover:border-primary"
                        : "border-accent/80 hover:border-accent"
                    }`}
                  >
                    {/* Icon Container */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-color/80 bg-background/60 text-foreground transition-all duration-300 group-hover:scale-105 group-hover:border-primary/60 lg:order-last">
                      <IconComponent
                        className={`text-sm transition-colors duration-300 ${
                          isPrimaryAccent ? "text-primary" : "text-accent"
                        }`}
                      />
                    </div>

                    {/* Label & Value */}
                    <div className="flex flex-col items-start lg:items-end">
                      <span className="text-[10px] font-bold tracking-wider text-foreground/50 uppercase">
                        {info.label}
                      </span>
                      <span className="text-xs font-semibold text-foreground transition-colors duration-200 group-hover:text-primary md:text-sm">
                        {info.value}
                      </span>
                    </div>

                    {/* Arrow Icon Indicator */}
                    <FaArrowUpRightFromSquare className="ml-auto text-xs text-shadow-color transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground lg:ml-0 lg:mr-3 lg:order-first" />
                  </Link>
                </MotionWrapper>
              );
            })}
          </address>
        </nav>
      </div>
    </aside>
  );
};
