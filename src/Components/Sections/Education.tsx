"use client";

import React from "react";
import { educationData } from "@/data/educationData";
import Container from "../Shared/Container";
import { EducationTimeline } from "../EducationTimeline";
import { MotionWrapper } from "../Shared/MotionWrapper";

export const Education = () => {
  const educationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: educationData.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: item.degree,
        credentialCategory: item.field,
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: item.institution,
          address: item.location,
        },
        description: item.description,
      },
    })),
  };

  return (
    <>
      {/* seo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationSchema),
        }}
      />

      {/* section */}
      <section className="relative py-4 lg:py-8">
        <Container>
          <MotionWrapper
            animationType="scale"
            delay={0.2}
            duration={1}
            className="pointer-events-none absolute -left-20 top-1/4 -z-10 size-96 rounded-full bg-accent/10 blur-[120px]"
          />
          <MotionWrapper
            animationType="scale"
            delay={0.2}
            duration={1}
            className="pointer-events-none absolute bottom-10 right-0 -z-10 size-80 rounded-full bg-primary/10 blur-[100px]"
          />

          <EducationTimeline data={educationData} />
        </Container>
      </section>
    </>
  );
};

export default Education;
