import { heroData } from "@/data/heroData";
import ProfileShowcase from "./ProfileShowcase";
import HeroContent from "./HeroContent";
import Container from "../Container";
import Header from "./Header";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <section className="relative py-6 lg:py-0 grow grid items-center mt-24 sm:mt-12 lg:-mt-12">
        <Container className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative h-full">
          {/* Left Side Content Component */}
          <aside className="mt-[8vw] lg:mt-0 order-2 lg:order-1 mx-auto">
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
          </aside>

          {/* Profile Showcase Component (Right Side) */}
          <aside className="mx-auto w-10/12 order-1 lg:order-2">
            <ProfileShowcase
              profileImage={heroData.profileImage}
              skillSets={heroData.skills}
            />
          </aside>
        </Container>
      </section>
    </section>
  );
};

export default Hero;
