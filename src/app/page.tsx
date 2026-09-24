import AboutMe from "@/Components/Sections/AboutMe";
import Education from "@/Components/Sections/Education";
import HeroSection from "@/Components/Sections/HeroSection";
import Projects from "@/Components/Sections/Projects";
import Skills from "@/Components/Sections/Skills";
import SectionWrapper from "@/Components/SectionWrapper";

export default function Home() {
  return (
    <>
      <SectionWrapper id="home">
        <HeroSection />
      </SectionWrapper>

      <SectionWrapper id="about">
        <AboutMe />
      </SectionWrapper>

      <SectionWrapper id="education">
        <Education />
      </SectionWrapper>

      <SectionWrapper id="skills">
        <Skills />
      </SectionWrapper>

      <SectionWrapper id="projects">
        <Projects />
      </SectionWrapper>
    </>
  );
}
