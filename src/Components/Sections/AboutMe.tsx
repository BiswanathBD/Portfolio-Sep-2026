import React from "react";
import { aboutData } from "@/data/aboutMe";
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
    <>
      {/* seo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* section */}
      <section id="about" className="text-foreground w-full">
        <Container>
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
        </Container>
      </section>
    </>
  );
};

export default AboutMe;
