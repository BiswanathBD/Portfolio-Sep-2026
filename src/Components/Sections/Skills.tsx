import { skillCategories, statsData } from "@/data/skillsData";
import { SkillCard } from "../SkillCard";
import { StatsGrid } from "../StatsGrid";
import Container from "../Container";

const Skills = () => {
  // SEO Schema markup for Skills / Occupation
  const skillsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Technical Skills & Competencies",
    itemListElement: skillCategories.flatMap((category, catIdx) =>
      category.skills.map((skill, skillIdx) => ({
        "@type": "ListItem",
        position: catIdx * 10 + skillIdx + 1,
        name: skill.name,
        description: `${category.title} skill with ${skill.level}% proficiency`,
      })),
    ),
  };

  return (
    <section aria-label="Skills and Expertise">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsSchema) }}
      />

      <Container>
        {/* Ambient Background Lights */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Additional Stats */}
        <StatsGrid stats={statsData} />
      </Container>
    </section>
  );
};

export default Skills;
