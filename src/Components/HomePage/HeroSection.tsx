import { heroData } from "@/data/heroData";
import ProfileShowcase from "./ProfileShowcase";
import HeroContent from "./HeroContent";
import Container from "../Container";
import Header from "./Header";

const Hero = () => {
  return (
    <>
      <Header />
      <section className="relative py-8 md:py-12 lg:py-16">
        <Container>
          <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-8 items-center relative">
            {/* Left Side Content Component */}
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

            {/* Profile Showcase Component (Right Side) */}
            <div className="flex-1 w-full flex justify-center">
              <ProfileShowcase
                profileImage={heroData.profileImage}
                skillSets={heroData.skills}
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Hero;
