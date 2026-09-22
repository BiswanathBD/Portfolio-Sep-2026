import AboutMe from "@/Components/Sections/AboutMe";
import Education from "@/Components/Sections/Education";
import HeroSection from "@/Components/Sections/HeroSection";
import Skills from "@/Components/Sections/Skills";
import SectionWrapper from "@/Components/SectionWrapper";

export default function Home() {
  return (
    <main className="w-full space-y-12 sm:space-y-24 lg:space-y-32 h-screen overflow-y-auto overflow-x-hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
      <SectionWrapper><HeroSection /></SectionWrapper>
      <SectionWrapper><HeroSection /></SectionWrapper>
      <SectionWrapper><HeroSection /></SectionWrapper>
      
      <AboutMe />
      <Education />
      <Skills />
    </main>
  );
}
