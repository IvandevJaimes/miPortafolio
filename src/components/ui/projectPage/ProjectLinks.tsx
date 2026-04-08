import { ShareButton } from "../share/ShareButton";
import { GitHubIcon } from "../icons/GitHubIcon";
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import "./projectLinks.css";

interface ProjectLinksProps {
  github?: string;
  githubBackend?: string;
  githubCrud?: string;
  demo?: string;
  monorepo?: string;
  title?: string;
  description?: string;
}

export const ProjectLinks = ({
  github,
  githubBackend,
  githubCrud,
  demo,
  monorepo,
  title,
  description,
}: ProjectLinksProps) => {
  const hasAnyLink = github || githubBackend || githubCrud || demo || monorepo;

  if (!hasAnyLink && !title) {
    return null;
  }

  return (
    <div className="project-links">
      <div className="project-links-header">
        <h2 className="project-links-title">Links del Proyecto</h2>
        {title && <ShareButton title={title} description={description} />}
      </div>

      <div className="project-links-grid">
        {monorepo && (
          <a
            href={monorepo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-card project-link-github"
          >
            <div className="project-link-icon">
              <GitHubIcon />
            </div>
            <div className="project-link-content">
              <span className="project-link-label">Código</span>
              <span className="project-link-url">Ver en GitHub</span>
            </div>
          </a>
        )}

        {!monorepo && github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-card project-link-frontend"
          >
            <div className="project-link-icon">
              <GitHubIcon />
            </div>
            <div className="project-link-content">
              <span className="project-link-label">Frontend</span>
              <span className="project-link-url">Ver código</span>
            </div>
          </a>
        )}

        {!monorepo && githubBackend && (
          <a
            href={githubBackend}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-card project-link-backend"
          >
            <div className="project-link-icon">
              <GitHubIcon />
            </div>
            <div className="project-link-content">
              <span className="project-link-label">Backend</span>
              <span className="project-link-url">Ver código</span>
            </div>
          </a>
        )}

        {!monorepo && githubCrud && (
          <a
            href={githubCrud}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-card project-link-crud"
          >
            <div className="project-link-icon">
              <GitHubIcon />
            </div>
            <div className="project-link-content">
              <span className="project-link-label">CRUD</span>
              <span className="project-link-url">Ver código</span>
            </div>
          </a>
        )}

        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-card project-link-demo"
          >
            <div className="project-link-icon">
              <ExternalLinkIcon />
            </div>
            <div className="project-link-content">
              <span className="project-link-label">Demo</span>
              <span className="project-link-url">Ver en vivo</span>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectLinks;
