export const API_URL = import.meta.env.VITE_API_URL || "";
export const DEFAULT_TIMEOUT = 10000;

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
  signal?: AbortSignal;
}

export const fetchApi = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> => {
  const {
    timeout = DEFAULT_TIMEOUT,
    signal: externalSignal,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      signal: externalSignal ? externalSignal : controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `Error ${response.status}: ${response.statusText}`,
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new ApiError(0, "Respuesta inválida del servidor");
    }

    const data = await response.json();
    if (!data.success) {
      throw new ApiError(
        response.status,
        data.error || "Error en la solicitud",
      );
    }
    return data.data;
  } catch (error) {
    const err = error as Error & { name?: string; message?: string };
    if (
      err.name === "AbortError" ||
      (err.message && err.message.toLowerCase().includes("abort"))
    ) {
      throw new ApiError(0, "Tiempo de espera agotado");
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, "Error de conexión");
  } finally {
    clearTimeout(timeoutId);
  }
};
