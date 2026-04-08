import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./skills.css";
import { SkillsSkeleton } from "../../ui/skeletons/SkillsSkeleton";
import { getSkills } from "../../../services/skillsApi";

const getLevelConfig = (level: string) => {
  switch (level) {
    case "advanced":
      return { bar: "bar-advanced", badge: "badge-advanced", percentage: 90 };
    case "intermediate":
      return {
        bar: "bar-intermediate",
        badge: "badge-intermediate",
        percentage: 60,
      };
    default:
      return { bar: "bar-basic", badge: "badge-basic", percentage: 30 };
  }
};

const getLevelLabel = (level: string): string => {
  switch (level) {
    case "advanced":
      return "Avanzado";
    case "intermediate":
      return "Intermedio";
    default:
      return "Básico";
  }
};

const getSkillLevel = (displayOrder: number): string => {
  if (displayOrder > 5) return "advanced";
  if (displayOrder > 2) return "intermediate";
  return "basic";
};

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
                  const level = getSkillLevel(skill.display_order);
                  const config = getLevelConfig(level);
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
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-base font-semibold text-slate-50">
                          {skill.name}
                        </h3>
                        <span
                          className={`text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide ${config.badge}`}
                        >
                          {getLevelLabel(level)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-4 h-8">
                        {skill.description}
                      </p>
                      <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${config.bar}`}
                          style={{
                            width: isVisible
                              ? String(config.percentage) + "%"
                              : "0%",
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-slate-600">
                          {skill.display_order}{" "}
                          {skill.display_order === 1 ? "año" : "años"} exp
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {config.percentage}%
                        </span>
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
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{lang.flag}</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-50">
                      {lang.name}
                    </h4>
                    <p className="text-sm text-slate-500">{lang.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">{lang.level}</span>
                    <span className="text-slate-400 font-medium">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bar-advanced"
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
