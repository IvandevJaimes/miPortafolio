import { useState, useEffect, type ReactNode } from "react";
import "./skills.css";

interface Skill {
  name: string;
  level: "basic" | "intermediate" | "advanced";
  years: number;
  description: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: ReactNode;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    skills: [
      {
        name: "HTML5",
        level: "advanced",
        years: 4,
        description: "Semantic markup, accessibility, SEO optimization",
      },
      {
        name: "CSS3",
        level: "advanced",
        years: 4,
        description: "Flexbox, Grid, animations, responsive design",
      },
      {
        name: "JavaScript (ES6+)",
        level: "advanced",
        years: 4,
        description: "Async/await, closures, DOM manipulation",
      },
      {
        name: "React",
        level: "advanced",
        years: 3,
        description: "Hooks, context, state management",
      },
      {
        name: "Tailwind CSS",
        level: "advanced",
        years: 2,
        description: "Utility-first styling, custom configs",
      },
      {
        name: "Bootstrap",
        level: "intermediate",
        years: 3,
        description: "Grid system, components, responsive utilities",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4M7 8h2M7 12h4" />
      </svg>
    ),
    skills: [
      {
        name: "Node.js",
        level: "advanced",
        years: 3,
        description: "Event loop, streams, file system, buffers",
      },
      {
        name: "Express",
        level: "advanced",
        years: 3,
        description: "Middleware, routing, REST APIs",
      },
      {
        name: "APIs REST",
        level: "advanced",
        years: 3,
        description: "CRUD operations, HTTP methods, status codes",
      },
      {
        name: "JWT",
        level: "intermediate",
        years: 2,
        description: "Token authentication, refresh tokens, security",
      },
      {
        name: "Java",
        level: "intermediate",
        years: 2,
        description: "OOP, collections, concurrency basics",
      },
    ],
  },
  {
    id: "databases",
    label: "Bases de Datos",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    skills: [
      {
        name: "MongoDB",
        level: "advanced",
        years: 3,
        description: "Document-based, aggregation pipeline, indexing",
      },
      {
        name: "MySQL",
        level: "intermediate",
        years: 2,
        description: "Relational modeling, queries, optimization",
      },
      {
        name: "Firebase",
        level: "intermediate",
        years: 2,
        description: "Firestore, auth, hosting, functions",
      },
    ],
  },
  {
    id: "languages",
    label: "Lenguajes",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      {
        name: "JavaScript",
        level: "advanced",
        years: 4,
        description: "Full-stack development, ES6+ features",
      },
      {
        name: "TypeScript",
        level: "advanced",
        years: 3,
        description: "Type safety, generics, interfaces",
      },
      {
        name: "Python",
        level: "intermediate",
        years: 2,
        description: "Scripting, automation, basic data analysis",
      },
      {
        name: "Java",
        level: "intermediate",
        years: 2,
        description: "Enterprise applications, Android basics",
      },
      {
        name: "C# / .NET",
        level: "basic",
        years: 1,
        description: "Basic syntax, .NET framework concepts",
      },
    ],
  },
  {
    id: "tools",
    label: "Herramientas",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: [
      {
        name: "Git",
        level: "advanced",
        years: 4,
        description: "Branching, merging, conflict resolution",
      },
      {
        name: "GitHub",
        level: "advanced",
        years: 4,
        description: "Pull requests, code review, CI/CD basics",
      },
      {
        name: "Docker",
        level: "intermediate",
        years: 2,
        description: "Containers, images, docker-compose",
      },
      {
        name: "Postman",
        level: "advanced",
        years: 3,
        description: "API testing, collections, environments",
      },
      {
        name: "MySQL Workbench",
        level: "intermediate",
        years: 2,
        description: "Schema design, query builder, ER diagrams",
      },
    ],
  },
];

const languages = [
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
];

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

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const currentCategory = categories.find((c) => c.id === activeCategory);

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

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
              }}
              className={`skills-tab ${activeCategory === cat.id ? "active" : ""}`}
            >
              {cat.icon}
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>

        {currentCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {currentCategory.skills.map((skill) => {
              const config = getLevelConfig(skill.level);
              const isHovered = hoveredSkill === skill.name;
              return (
                <div
                  key={skill.name}
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
                      {getLevelLabel(skill.level)}
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
                      {skill.years} {skill.years === 1 ? "año" : "años"} exp
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

        <div className="border-t border-white/[0.06] pt-12">
          <h3 className="text-xl font-bold text-slate-50 text-center mb-8">
            Idiomas
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {languages.map((lang) => (
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
