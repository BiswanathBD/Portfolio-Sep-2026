"use client";

import React from "react";
import { aboutData } from "@/data/aboutMe";
import { AboutMeImage } from "../aboutMeImage";
import { AboutMeContent } from "../aboutMeContent";
import { SectionHeader } from "../Shared/sectionHeader";
import Container from "../Container";

const AboutMe: React.FC = () => {
  // Structured Data (JSON-LD) for SEO schema markup
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: aboutData.contentProps.name,
    jobTitle: "MERN Stack Web Developer",
    image: aboutData.imageProps.imageSrc,
    description: aboutData.contentProps.paragraphs.join(" "),
    knowsAbout: aboutData.contentProps.skills.map((s) => s.text),
  };

  return (
    <section
      className="py-20 container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative text-foreground"
      id="about"
      aria-labelledby="about-heading"
    >
      {/* Schema.org JSON-LD Script for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Background Glow */}
      <div
        className="absolute top-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Extracted Header Component */}
      <SectionHeader
        id="about-heading"
        titlePrefix={aboutData.titlePrefix}
        titleHighlight={aboutData.titleHighlight}
      />

      {/* Main Grid Section */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Section (Image) */}
          <AboutMeImage {...aboutData.imageProps} />

          {/* Right Section (Content) */}
          <AboutMeContent {...aboutData.contentProps} />
        </div>
      </Container>
    </section>
  );
};

export default AboutMe;
