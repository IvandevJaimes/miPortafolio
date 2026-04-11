import { fetchApi } from "./api";
import type { ContactMessage } from "../types/types";

export const sendContactMessage = async (
  data: ContactMessage,
): Promise<{ success: boolean; message: string }> => {
  return fetchApi<{ success: boolean; message: string }>("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
