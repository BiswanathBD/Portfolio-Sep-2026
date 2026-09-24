import { heroData } from "@/data/heroData";
import Container from "../Shared/Container";
import Header from "../HomePage/Header";
import HeroContent from "../HomePage/HeroContent";
import ProfileShowcase from "../HomePage/ProfileShowcase";

const HeroSection = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: heroData.name,
    jobTitle: heroData.role,
    description: heroData.description,
    sameAs: heroData.socialLinks?.map((link) => link.href) || [],
  };

  return (
    <>
      {/* seo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* section */}
      <section className="flex flex-col justify-center">
        <Header />

        <div
          className="relative py-4 lg:py-8 grow grid items-center mt-38 sm:mt-16 lg:mt-0"
          aria-label="Hero Section"
        >
          <Container className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative h-full">
            {/* Left Side Content Component */}
            <article className="mt-[8vw] lg:mt-0 order-2 lg:order-1 mx-auto">
              <HeroContent
                data={{
                  greeting: heroData.greeting,
                  name: heroData.name,
                  role: heroData.role,
                  description: heroData.description,
                  resumeUrl: heroData.resumeUrl,
                  socialLinks: heroData.socialLinks,
                }}
              />
            </article>

            {/* Profile Showcase Component (Right Side) */}
            <aside
              className="mx-auto w-11/12 lg:w-full order-1 lg:order-2"
              aria-label="Profile Showcase and Skills"
            >
              <ProfileShowcase
                profileImage={heroData.profileImage}
                skillSets={heroData.skills}
              />
            </aside>
          </Container>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
