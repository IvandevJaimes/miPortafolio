import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./skills.css";
import { SkillsSkeleton } from "../../ui/skeletons/SkillsSkeleton";
import { getSkills } from "../../../services/skillsApi";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const {
    data: categories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills(),
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(String(categories[0].id));
    }
  }, [categories, activeCategory]);

  const currentCategory = categories.find(
    (cat) => String(cat.id) === activeCategory
  );

  return (
    <section
      id="habilidades"
      className="min-h-screen py-17 px-6 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#1a1919] to-[#0d0d0d]"
    >
      <div
        className={`max-w-6xl mx-auto relative z-10 ${isVisible ? "visible" : ""}`}
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="label-line" />
            <span className="label-text">Conocimiento</span>
            <span className="label-line" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-50 mb-5">
            Habilidades y <span className="title-accent">Tecnologías</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Tecnologías que domino para construir soluciones completas y
            escalables.
          </p>
        </div>

        {isLoading ? (
          <SkillsSkeleton />
        ) : error ? (
          <div className="text-center">
            <p className="text-red-400 mb-4">Error al cargar habilidades</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(String(cat.id));
                  }}
                  className={`skills-tab ${activeCategory === String(cat.id) ? "active" : ""}`}
                >
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              ))}
            </div>

            {currentCategory && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                {currentCategory.skills?.map((skill) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <div
                      key={skill.id}
                      className={`skill-card ${isHovered ? "hovered" : ""}`}
                      onMouseEnter={() => {
                        setHoveredSkill(skill.name);
                      }}
                      onMouseLeave={() => {
                        setHoveredSkill(null);
                      }}
                    >
                      <div className="skill-card-glow" />
                      
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="skill-card-title">
                          {skill.name}
                        </h3>
                        <span className="skill-card-dot"></span>
                      </div>
                      
                      <p className="skill-card-description">
                        {skill.description}
                      </p>
                      
                      <div className="skill-card-meta">
                        <span className="skill-card-category">{currentCategory.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="border-t border-white/[0.06] pt-12">
          <h3 className="text-xl font-bold text-slate-50 text-center mb-8">
            Idiomas
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                name: "Español",
                level: "Nativo",
                flag: "🇪🇸",
                percentage: 100,
                description: "Lectura, escritura, conversación fluida",
              },
              {
                name: "Inglés",
                level: "Técnico Básico",
                flag: "🇺🇸",
                percentage: 40,
                description: "Lectura técnica, documentación, comandos",
              },
            ].map((lang) => (
              <div
                key={lang.name}
                className="language-card flex-1 min-w-[280px] max-w-[400px]"
              >
                <div className="language-card-glow" />
                <div className="flex items-center gap-4">
                  <span className="language-card-flag">{lang.flag}</span>
                  <div className="flex-1">
                    <h4 className="language-card-title">
                      {lang.name}
                    </h4>
                    <p className="language-card-desc">{lang.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="language-card-level">{lang.level}</span>
                    <span className="text-slate-400 font-medium">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="language-card-progress">
                    <div
                      className="language-card-progress-bar"
                      style={{
                        width: isVisible ? String(lang.percentage) + "%" : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
