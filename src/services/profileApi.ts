import { fetchApi } from "./api";
import type { Profile } from "../types/types";

export const getProfile = (): Promise<Profile> => {
  return fetchApi<Profile>("/profile");
};
