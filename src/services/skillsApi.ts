import { fetchApi } from "./api";
import type { SkillCategory } from "../types/types";

export const getSkills = (signal?: AbortSignal): Promise<SkillCategory[]> => {
  return fetchApi<SkillCategory[]>("/skills/with-skills", { signal });
};
