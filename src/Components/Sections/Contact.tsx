import React from "react";
import { ContactInfoCard } from "../ContactInfoCard";
import { SocialLinks } from "../SocialLinks";
import { ContactForm } from "../ContactForm";

export const Contact = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description:
      "Get in touch with us for collaborations, inquiries, or support.",
    mainEntity: {
      "@type": "Organization",
      name: "Your Brand / Portfolio",
      url: "https://yourdomain.com",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        availableLanguage: ["English", "Bengali"],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        id="contact"
        className="container relative z-20 mx-auto px-4 py-20 md:px-8 lg:px-16 xl:px-24"
      >
        <div className="pointer-events-none absolute top-20 left-10 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />

        {/* Main Grid Layout */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_auto_1fr]">
          <ContactInfoCard />
          <SocialLinks />
          <ContactForm />
        </div>
      </section>
    </>
  );
};
