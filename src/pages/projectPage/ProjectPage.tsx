import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import ProjectHeader from "../../components/layout/header/ProjectHeader";
import { ImageCarousel } from "../../components/ui/carousel/ImageCarousel";
import { ImageGrid } from "../../components/ui/carousel/ImageGrid";
import { ProjectInfo } from "../../components/ui/projectPage/ProjectInfo";
import { ProjectLinks } from "../../components/ui/projectPage/ProjectLinks";
import { ProjectsSkeleton } from "../../components/ui/skeletons/ProjectsSkeleton";
import { getProjectById } from "../../services/projectsApi";
import { getProjectImages } from "../../utils/imageUtils";
import type { Project } from "../../types/types";
import "./projectPage.css";

const mapProjectToView = (project: Project) => ({
  title: project.title,
  description: project.description,
  tags: project.tags.map((t) => t.tag),
  featured: project.featured === 1,
  deployed: project.deployed === 1,
  images: getProjectImages(project.images.map((img) => img.url)),
  github: project.github,
  githubBackend: project.github_backend,
  githubCrud: project.github_crud,
  demo: project.demo,
  monorepo: project.monorepo,
});

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id, 10) : null;

  const {
    data: project,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => (projectId ? getProjectById(projectId) : Promise.resolve(null)),
    enabled: !!projectId,
  });

  if (!projectId) {
    return (
      <>
        <ProjectHeader />
        <main className="project-page">
          <div className="project-page-container">
            <p className="text-slate-400">Proyecto no encontrado</p>
          </div>
        </main>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <ProjectHeader />
        <main className="project-page">
          <div className="project-page-container">
            <ProjectsSkeleton count={1} />
          </div>
        </main>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <ProjectHeader />
        <main className="project-page">
          <div className="project-page-container">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-200 mb-4">Error al encontrar el proyecto</h2>
              <p className="text-slate-400">{error?.message || "El proyecto no existe o no se encontró"}</p>
              <button
                onClick={() => refetch()}
                className="mt-6 px-6 py-2 bg-green-neon text-black font-semibold rounded-lg hover:opacity-90 transition"
              >
                Reintentar
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  const projectData = mapProjectToView(project);

  return (
    <>
      <ProjectHeader />
      <main className="project-page">
        <div className="project-page-container">
          <ImageCarousel images={projectData.images} projectTitle={projectData.title} />
          <ImageGrid images={projectData.images} projectTitle={projectData.title} />

          <ProjectInfo
            title={projectData.title}
            description={projectData.description}
            tags={projectData.tags}
            featured={projectData.featured}
            deployed={projectData.deployed}
          />

          <ProjectLinks
            github={projectData.github}
            githubBackend={projectData.githubBackend}
            githubCrud={projectData.githubCrud}
            demo={projectData.demo}
            monorepo={projectData.monorepo}
          />
        </div>
      </main>
    </>
  );
};

export default ProjectPage;