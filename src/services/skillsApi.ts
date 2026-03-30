import { fetchApi } from "./api";
import type { SkillCategory } from "../types/types";

export const getCategorys = (): Promise<SkillCategory[]> => {
  return fetchApi<SkillCategory[]>("/skills");
};
export const getSkills = (): Promise<SkillCategory[]> => {
  return fetchApi<SkillCategory[]>("/skills/with-skills");
};
