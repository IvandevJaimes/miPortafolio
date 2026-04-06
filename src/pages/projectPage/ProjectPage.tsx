import ProjectHeader from "../../components/layout/header/ProjectHeader";
import { ImageCarousel } from "../../components/ui/carousel/ImageCarousel";
import { ImageGrid } from "../../components/ui/carousel/ImageGrid";
import { ProjectInfo } from "../../components/ui/projectPage/ProjectInfo";
import { ProjectLinks } from "../../components/ui/projectPage/ProjectLinks";
import "./projectPage.css";

interface ProjectPageProps {
  project?: {
    title: string;
    description?: string;
    tags: string[];
    featured: boolean;
    deployed: boolean;
    images: string[];
    github?: string;
    githubBackend?: string;
    githubCrud?: string;
    demo?: string;
    monorepo?: string;
  };
}

// Mock data para testing - luego conectamos el service
const mockProject = {
  title: "E-commerce Dashboard",
  description:
    "Un dashboard completo para gestión de ventas, inventario y clientes. Incluye gráficos en tiempo real, gestión de pedidos, sistema de notificaciones y panel de administración.",
  tags: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Socket.io",
    "TailwindCSS",
  ],
  featured: true,
  deployed: true,
  images: [],
  github: "https://github.com/username/ecommerce-dashboard",
  demo: "https://demo.ecommerce-dashboard.com",
};

const ProjectPage = ({ project = mockProject }: ProjectPageProps) => {
  return (
    <>
      <ProjectHeader />
      <main className="project-page">
        <div className="project-page-container">
          <ImageCarousel images={project.images} projectTitle={project.title} />
          <ImageGrid images={project.images} projectTitle={project.title} />

          <ProjectInfo
            title={project.title}
            description={project.description}
            tags={project.tags}
            featured={project.featured}
            deployed={project.deployed}
          />

          <ProjectLinks
            github={project.github}
            githubBackend={project.githubBackend}
            githubCrud={project.githubCrud}
            demo={project.demo}
            monorepo={project.monorepo}
          />
        </div>
      </main>
    </>
  );
};

export default ProjectPage;
