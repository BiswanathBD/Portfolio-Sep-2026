import AboutMe from "@/Components/Sections/AboutMe";
import Education from "@/Components/Sections/Education";
import HeroSection from "@/Components/Sections/HeroSection";
import Skills from "@/Components/Sections/Skills";

export default function Home() {
  return (
    <main className="grow space-y-12 sm:space-y-24 lg:space-y-32 h-screen overflow-y-auto overflow-x-hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
      <HeroSection />
      <AboutMe />
      <Education />
      <Skills />
    </main>
  );
}
