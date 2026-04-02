import { useEffect, useState } from "react";
import type { DependencyList } from "react";
import { ApiError } from "../services/api";

export const useFetch = <T>(
  fetchFn: (signal?: AbortSignal) => Promise<T>,
  deps: DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchFn(controller.signal);
        setData(result);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        if (err instanceof ApiError) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
    return () => {
      controller.abort();
    };
  }, [fetchFn, ...deps]);

  return { data, isLoading, error, setError };
};