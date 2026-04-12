import { fetchApi } from "./api";
import type { Profile } from "../types/types";

export const getProfile = async (signal?: AbortSignal): Promise<Profile> => {
  return fetchApi<Profile>("/profile", { signal });
};
