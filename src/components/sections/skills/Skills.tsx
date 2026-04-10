import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import "./skills.css";
import { SkillsSkeleton } from "../../ui/skeletons/SkillsSkeleton";
import { getSkills } from "../../../services/skillsApi";
import { getSkillIconWithFallback } from "../../../utils/iconUtils";
import portfolioData from "../../../data/portfolioData.json";

interface SkillsProps {
  onError?: (error: Error) => void;
}

interface SvgChild {
  type: string;
  props: Record<string, unknown>;
}

interface SvgIconConfig {
  viewBox: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  className: string;
  children: SvgChild[];
}

const renderSvgFromConfig = (config: SvgIconConfig): React.ReactNode => {
  const elements = config.children.map((child, index) => {
    const props = child.props as Record<string, unknown>;
    return React.createElement(child.type, { key: index, ...props });
  });

  return React.createElement(
    "svg",
    {
      viewBox: config.viewBox,
      fill: config.fill,
      stroke: config.stroke,
      strokeWidth: config.strokeWidth,
      className: config.className,
    },
    ...elements,
  );
};

const getCategoryIcon = (name: string): React.ReactNode => {
  const icons = portfolioData.skillCategoryIcons as Record<
    string,
    SvgIconConfig
  >;
  const iconConfig = icons[name] || icons.tools;
  return renderSvgFromConfig(iconConfig);
};

const Skills = ({ onError }: SkillsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [indicatorKey, setIndicatorKey] = useState(0);

  const {
    data: categories = [],
    isLoading,
    error,
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
    (cat) => String(cat.id) === activeCategory,
  );

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  if (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    onError?.(errorObj);
    return null; // El padre maneja la renderización del error
  }

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

        <div>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(String(cat.id));
                  setIndicatorKey((prev) => prev + 1);
                }}
                className={`skills-tab ${activeCategory === String(cat.id) ? "active" : ""}`}
              >
                {getCategoryIcon(cat.name)}
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>

          {currentCategory && (
            <div>
              <div className="flex sm:hidden items-center justify-center">
                <p
                  key={indicatorKey}
                  className="category-indicator text-green-400 font-medium mb-4 text-center animate-fade-in-up"
                >
                  {currentCategory.label}
                </p>
              </div>

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
                        <div className="flex items-center gap-3">
                          <div className="skill-icon-container">
                            <Icon
                              icon={getSkillIconWithFallback(skill.name)}
                              className="skill-icon"
                              fallback={
                                <Icon
                                  icon="mdi:cube"
                                  className="skill-icon text-slate-500"
                                />
                              }
                            />
                          </div>
                          <h3 className="skill-card-title">{skill.name}</h3>
                        </div>
                        <span className="skill-card-dot"></span>
                      </div>

                      <p className="skill-card-description">
                        {skill.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="border-t border-white/[0.06] pt-12">
            <h3 className="text-xl font-bold text-slate-50 text-center mb-8">
              Idiomas
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {(
                portfolioData.languages as Array<{
                  name: string;
                  flag: string;
                  level: string;
                  description: string;
                }>
              ).map((lang) => (
                <div
                  key={lang.name}
                  className="language-card flex-1 min-w-[280px] max-w-[400px]"
                >
                  <div className="language-card-glow" />
                  <div className="flex items-center gap-4">
                    <span className="language-card-flag">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="language-card-title">{lang.name}</h4>
                        <span className="language-card-level">{lang.level}</span>
                      </div>
                      <p className="language-card-desc">{lang.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
