import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./projects.css";
import { SecondaryButton } from "../../ui/buttons/SecondaryButton";
import { getProjects, type Project } from "./data";

const tagColors: Record<string, string> = {
  "Node.js": "tag-nodejs",
  Express: "tag-express",
  TypeScript: "tag-typescript",
  React: "tag-react",
  "React Native": "tag-react",
  PostgreSQL: "tag-database",
  MongoDB: "tag-database",
  Redis: "tag-database",
  MySQL: "tag-database",
  JWT: "tag-auth",
  Stripe: "tag-payment",
  AWS: "tag-cloud",
  "Socket.io": "tag-realtime",
  Redux: "tag-state",
  TailwindCSS: "tag-styling",
  Vite: "tag-tool",
  "D3.js": "tag-visualization",
  "Chart.js": "tag-visualization",
  SendGrid: "tag-email",
  "AWS S3": "tag-cloud",
};

const Projects = () => {
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getProjects();
        setProjectsData(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    void loadProjects();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <section
        id="proyectos"
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d0d] via-[#1a1919] to-[#0d0d0d]"
      >
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <div className="loader-spinner" />
          <span className="text-sm">Cargando proyectos...</span>
        </div>
      </section>
    );
  }

  return (
    <section
      id="proyectos"
      className="min-h-screen py-17 px-6 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#1a1919] to-[#0d0d0d]"
    >
      <div className={`projects-container ${isVisible ? "visible" : ""}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="label-line" />
            <span className="label-text">Proyectos Destacados</span>
            <span className="label-line" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-50 mb-5">
            Construcciones <span className="title-accent">Recientes</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            Una selección de proyectos que demuestran mi capacidad para crear
            soluciones robustas, escalables y con excelente experiencia de
            usuario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
          {projectsData.map((project, index) => (
            <article
              key={project.id}
              className={`project-card cursor-pointer ${project.featured ? "featured" : ""} ${hoveredProject === project.id ? "hovered" : ""}`}
              style={{ animationDelay: `${(index * 0.1).toString()}s` }}
              onMouseEnter={() => {
                setHoveredProject(project.id);
              }}
              onMouseLeave={() => {
                setHoveredProject(null);
              }}
              onClick={() => navigate("/project")}
            >
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image-img"
                  loading="lazy"
                />
                <div className="absolute inset-0 " />
                {project.featured && (
                  <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-slate-900 bg-gradient-to-r from-green-400 to-green-300 rounded-md">
                    ⭐ Destacado
                  </span>
                )}
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-slate-50 mb-2 project-title-text">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className={`project-tag ${tagColors[tag] || "tag-default"}`}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="project-tag tag-more">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 sm:gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-code"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Código
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-demo"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="project-card-glow" />
            </article>
          ))}
        </div>

        <div className=" mt-16 flex justify-center">
          <SecondaryButton className="view-all-btn flex items-center">
            <span>Ver Todos</span>
          </SecondaryButton>
        </div>
      </div>
    </section>
  );
};

export default Projects;
