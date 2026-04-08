import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/layout/header/Header";
import { ImageCarousel } from "../../components/ui/carousel/ImageCarousel";
import { ImageGrid } from "../../components/ui/carousel/ImageGrid";
import { ProjectInfo } from "../../components/ui/projectPage/ProjectInfo";
import { ProjectLinks } from "../../components/ui/projectPage/ProjectLinks";
import { ProjectPageSkeleton } from "../../components/ui/skeletons/ProjectPageSkeleton";
import { ErrorScreen } from "../../components/ui/errorComponents/ErrorScreen";
import { getProjectById } from "../../services/projectsApi";
import { getProjectImages } from "../../utils/imageUtils";
import type { Project } from "../../types/types";
import siteData from "../../data/site.json";
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

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: project,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () =>
      projectId ? getProjectById(projectId) : Promise.resolve(null),
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="project-page">
          <div className="project-page-container">
            <ProjectPageSkeleton />
          </div>
        </main>
      </>
    );
  }

  if (error || !project) {
    return (
      <ErrorScreen
        error={error}
        onRetry={() => refetch()}
        onClick={() => navigate(-1)}
      />
    );
  }

  const projectData = mapProjectToView(project);
  const { url, ogImage } = siteData;

  return (
    <>
      <Helmet>
        <title>{projectData.title} | Ivan Jaimes</title>
        <meta
          name="description"
          content={projectData.description || `Proyecto: ${projectData.title}`}
        />
        <meta
          property="og:title"
          content={`${projectData.title} | Ivan Jaimes`}
        />
        <meta
          property="og:description"
          content={projectData.description || `Proyecto: ${projectData.title}`}
        />
        <meta
          property="og:image"
          content={projectData.images[0] || ogImage}
        />
        <meta
          property="og:url"
          content={`${url}/project/${projectId}`}
        />
        <meta
          name="twitter:title"
          content={`${projectData.title} | Ivan Jaimes`}
        />
        <meta
          name="twitter:description"
          content={projectData.description || `Proyecto: ${projectData.title}`}
        />
        <meta
          name="twitter:image"
          content={projectData.images[0] || ogImage}
        />
      </Helmet>
      <Header />
      <main className="project-page">
        <div className="project-page-container">
          <ImageCarousel
            images={projectData.images}
            projectTitle={projectData.title}
          />
          <ImageGrid
            images={projectData.images}
            projectTitle={projectData.title}
          />

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
            title={projectData.title}
            description={projectData.description}
          />
        </div>
      </main>
    </>
  );
};

export default ProjectPage;
