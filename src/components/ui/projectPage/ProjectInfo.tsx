import "./projectInfo.css";

interface ProjectInfoProps {
  title: string;
  description?: string;
  tags: string[];
  featured: boolean;
  deployed: boolean;
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

export const ProjectInfo = ({
  title,
  description,
  tags,
  featured,
  deployed,
}: ProjectInfoProps) => {
  return (
    <div className="project-info">
      <div className="project-info-badges">
        {featured && (
          <span className="project-badge-featured">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Destacado
          </span>
        )}
        {deployed && (
          <span className="project-badge-deployed">
            <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
            En producción
          </span>
        )}
      </div>

      <h1 className="project-info-title">{title}</h1>

      {description && <p className="project-info-description">{description}</p>}

      <div className="project-info-tags">
        <span className="project-info-tags-label">Tecnologías:</span>
        <div className="project-info-tags-list">
          {tags.map((tag) => (
            <span key={tag} className={`project-tag ${tagColors[tag] || "tag-default"}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;