import { heroData } from "@/data/heroData";
import Container from "../Container";
import Header from "../HomePage/Header";
import HeroContent from "../HomePage/HeroContent";
import ProfileShowcase from "../HomePage/ProfileShowcase";

const Hero = () => {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="min-h-screen flex flex-col">
        <Header />

        <section
          className="relative py-6 lg:py-0 grow grid items-center mt-24 sm:mt-12 lg:-mt-12"
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
              className="mx-auto w-10/12 sm:w-11/12 md:w-9/12 lg:w-full order-1 lg:order-2"
              aria-label="Profile Showcase and Skills"
            >
              <ProfileShowcase
                profileImage={heroData.profileImage}
                skillSets={heroData.skills}
              />
            </aside>
          </Container>
        </section>
      </header>
    </>
  );
};

export default Hero;
