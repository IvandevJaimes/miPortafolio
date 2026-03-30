import { fetchApi } from "./api";
import type { Project } from "../types/types";
export const getProjects = (): Promise<Project[]> => {
  return fetchApi<Project[]>("/projects");
};
export const getProjectById = (id: number): Promise<Project> => {
  if (!id || id < 1) {
    throw new Error("ID inválido");
  }
  return fetchApi<Project>(`/projects/project/${id}`);
};
