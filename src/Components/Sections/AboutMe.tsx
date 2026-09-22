import React from "react";
import { aboutData } from "@/data/aboutMe";
import { SectionHeader } from "../Shared/sectionHeader";
import Container from "../Container";
import { AboutMeImage } from "../HomePage/aboutMeImage";
import { AboutMeContent } from "../HomePage/aboutMeContent";

const AboutMe: React.FC = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: aboutData.contentProps.name,
    jobTitle: "MERN Stack Web Developer",
    image: aboutData.imageProps.imageSrc,
    description: aboutData.contentProps.paragraphs.join(" "),
    knowsAbout: aboutData.contentProps.skills.map((s) => s.title),
  };

  return (
    <Container id="about" aria-labelledby="about-heading">
      <section className="relative text-foreground py-6 lg:yp-12 xl:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        {/* Header Component */}
        <SectionHeader
          id="about-heading"
          titlePrefix={aboutData.titlePrefix}
          titleHighlight={aboutData.titleHighlight}
          subtitle={aboutData.subtitle}
        />

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center mt-20">
          <AboutMeImage
            {...aboutData.imageProps}
            skills={aboutData.contentProps.skills}
          />
          <AboutMeContent
            namePrefix={aboutData.contentProps.namePrefix}
            name={aboutData.contentProps.name}
            paragraphs={aboutData.contentProps.paragraphs}
          />
        </div>
      </section>
    </Container>
  );
};

export default AboutMe;
