import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import "./projects.css";
import "../../ui/cards/card.css";
import { ProjectsSkeleton } from "../../ui/skeletons/ProjectsSkeleton";
import { ProjectsError } from "../../ui/errorComponents/ProjectsError";
import { ProjectsEmpty } from "../../ui/errorComponents/ProjectsEmpty";
import { ProjectCard } from "../../ui/cards/ProjectCard";
import { getProjects } from "../../../services/projectsApi";
import type { Project } from "../../../types/types";
import placeholderData from "../../../data/projects.json";

const getPlaceholderImage = (id: number) => {
  const images = placeholderData.placeholderImages || [];
  const index = id % images.length;
  return images[index] || "";
};

const adaptProject = (apiProject: Project) => {
  const hasRealImage =
    apiProject.images?.[0]?.url && apiProject.images[0].url.length > 0;
  return {
    id: apiProject.project_id,
    title: apiProject.title,
    description: apiProject.description,
    image: hasRealImage
      ? apiProject.images[0].url
      : getPlaceholderImage(apiProject.project_id),
    tags: apiProject.tags?.map((t) => t.tag) || [],
    github: apiProject.github,
    githubBackend: apiProject.github_backend,
    githubCrud: apiProject.github_crud,
    demo: apiProject.demo,
    featured: apiProject.featured === 1,
    deployed: apiProject.deployed === 1,
    monorepo: apiProject.monorepo,
    isPlaceholder: !hasRealImage,
  };
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const navigate = useNavigate();

  const {
    data: apiProjects = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  const projectsData = apiProjects.map(adaptProject);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (isLoading) {
    return <ProjectsSkeleton count={3} />;
  }

  if (error) {
    return (
      <ProjectsError onRetry={() => refetch()} errorMessage={error?.message} />
    );
  }

  if (projectsData.length === 0) {
    return <ProjectsEmpty />;
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
            <ProjectCard
              key={project.id}
              project={project}
              animationDelay={index * 0.1}
              isHovered={hoveredProject === project.id}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => navigate(`/project/${project.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
