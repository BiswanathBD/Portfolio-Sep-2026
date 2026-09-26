import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { experienceData } from "@/data/experienceData";
import Container from "../Shared/Container";
import ExperienceCards from "../ExperienceCards";
import { MotionWrapper } from "../Shared/MotionWrapper";

export const Experiences = () => {
  const experience = experienceData[0];

  const experienceSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Biswanath Sarker",
    jobTitle: experience.role,
    url: "https://biswanath.vercel.app",
    worksFor: {
      "@type": "Organization",
      name: experience.company,
      url: experience.companyUrl,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: experience.role,
      occupationLocation: {
        "@type": "Country",
        name: "Bangladesh",
      },
      skills: experience.skills.join(", "),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(experienceSchema),
        }}
      />

      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="relative overflow-hidden py-4 lg:py-8"
      >
        <Container>
          <div className="relative">
            <div className="w-fit mb-6 lg:mb-12">
              <MotionWrapper className="flex gap-4 lg:items-center">
                {/* Company Logo */}
                <MotionWrapper animationType="scale" delay={0.2}>
                  <div className="flex shrink-0 items-center p-4">
                    <div className="relative flex size-20 sm:size-36 lg:size-48 items-center justify-center rounded-full border border-border-color p-2 shadow-[0_0_90px_var(--color-border-color)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_0_100px_var(--color-border-color)]">
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-primary/5 blur-xl" />

                      <Image
                        src={experience.companyLogo}
                        alt={`${experience.company} logo`}
                        width={160}
                        height={160}
                        className="relative z-10 size-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </MotionWrapper>

                {/* Experience Info */}
                <div className="min-w-0 flex-1 my-auto md:p-6 md:border-l md:border-border-color/80">
                  <MotionWrapper
                    animationType="fadeRight"
                    transitionType="spring"
                    delay={0.35}
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span className="h-px w-4 bg-accent sm:w-8" />

                      <span className="text-[10px] font-bold tracking-[0.16em] text-accent">
                        PROFESSIONAL EXPERIENCE
                      </span>
                    </div>
                  </MotionWrapper>

                  <MotionWrapper
                    animationType="fadeRight"
                    transitionType="spring"
                    delay={0.45}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      {experience.companyUrl ? (
                        <Link
                          href={experience.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1.5 font-extrabold text-accent transition-colors duration-300 hover:text-primary sm:text-2xl"
                        >
                          {experience.company}

                          <ExternalLink className="size-3.5 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      ) : (
                        <span className="text-2xl font-extrabold text-accent sm:text-3xl">
                          {experience.company}
                        </span>
                      )}

                      <span className="text-foreground/25">/</span>

                      <span className="text-sm font-medium text-foreground/60">
                        {experience.employmentType}
                      </span>
                    </div>
                  </MotionWrapper>

                  <MotionWrapper
                    animationType="fadeUp"
                    transitionType="spring"
                    delay={0.5}
                  >
                    <h2
                      id="experience-heading"
                      className="mt-1 mb-4 font-extrabold leading-tight text-foreground sm:text-3xl lg:text-4xl"
                    >
                      {experience.role}
                    </h2>
                  </MotionWrapper>

                  <MotionWrapper
                    animationType="fadeUp"
                    transitionType="spring"
                    delay={0.6}
                  >
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-foreground/55 sm:text-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-primary" />
                        {experience.location}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-3.5 text-accent" />
                        {experience.startDate} – {experience.endDate}
                      </span>

                      {experience.endDate === "Present" && (
                        <span className="inline-flex items-center gap-2 text-success">
                          <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                          </span>
                          Currently working
                        </span>
                      )}
                    </div>
                  </MotionWrapper>
                </div>
              </MotionWrapper>
            </div>

            <ExperienceCards experience={experience} />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Experiences;
