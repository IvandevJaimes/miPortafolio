import "./card.css";

export interface ProjectCardData {
  id: number;
  title: string;
  description?: string;
  image: string;
  tags: string[];
  github?: string;
  githubBackend?: string;
  githubCrud?: string;
  demo?: string;
  featured: boolean;
  deployed: boolean;
  monorepo?: string | null;
  isPlaceholder: boolean;
}

interface ProjectCardProps {
  project: ProjectCardData;
  onClick?: () => void;
  animationDelay?: number;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

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

export const ProjectCard = ({
  project,
  onClick,
  animationDelay,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) => {
  return (
    <article
      className={`project-card cursor-pointer ${project.featured ? "featured" : ""} ${isHovered ? "hovered" : ""}`}
      style={{
        animationDelay: animationDelay ? `${animationDelay}s` : undefined,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative h-32 md:h-40 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`project-image-img ${project.isPlaceholder ? "opacity-70" : ""}`}
          loading="lazy"
        />
        <div className="absolute inset-0" />
        <div className="absolute top-2 right-2 flex gap-1.5 items-center">
          {project.deployed && (
            <span className="project-badge-deployed">
              <span className="flex items-center gap-1">
                <span className="w-[7px] h-[7px] bg-emerald-300 rounded-full animate-pulse" />
                En producción
              </span>
            </span>
          )}
          {project.featured && (
            <span className="project-star">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 text-amber-900 drop-shadow-sm"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
          )}
        </div>
      </div>

      <div className="p-3 md:p-4">
        <h3 className="text-base md:text-lg font-bold text-slate-50 mb-1 project-title-text">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-2 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-2">
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

        <div className="flex flex-col gap-1.5">
          {project.monorepo ? (
            <a
              href={project.monorepo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ver código de ${project.title} en GitHub`}
              className="project-link bg-slate-800/90 border border-slate-400 hover:bg-slate-700 text-slate-300 w-fit"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 text-slate-300"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-slate-300 text-xs">Código</span>
            </a>
          ) : (
            <div className="flex gap-1.5">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Ver código frontend de ${project.title} en GitHub`}
                  className="project-link bg-slate-800/90 border border-slate-400 hover:bg-slate-700 text-slate-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-slate-300"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-slate-300 text-xs">Frontend</span>
                </a>
              )}
              {project.githubBackend && (
                <a
                  href={project.githubBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Ver código backend de ${project.title} en GitHub`}
                  className="project-link bg-slate-800/90 border border-emerald-400 hover:bg-slate-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-emerald-400"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-emerald-400 text-xs">Backend</span>
                </a>
              )}
              {project.githubCrud && (
                <a
                  href={project.githubCrud}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Ver código CRUD de ${project.title} en GitHub`}
                  className="project-link bg-slate-800/90 border border-amber-400 hover:bg-slate-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5 text-amber-400"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-amber-400 text-xs">CRUD</span>
                </a>
              )}
            </div>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Ver demo de ${project.title}`}
              className="project-link project-link-demo w-fit"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5"
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
  );
};
