import { useState } from "react";
import { NormalButton } from "../buttons/NormalButton";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";
import "./errorScreen.css";

interface ErrorScreenProps {
  error: Error | string | string[] | null;
  onRetry?: () => unknown;
  onClick?: () => void;
}

const isNotFound = (error: Error | string | string[] | null): boolean => {
  if (!error) return false;
  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : error[0];
  return (
    message.toLowerCase().includes("not found") ||
    message.toLowerCase().includes("no encontrado") ||
    message.toLowerCase().includes("404")
  );
};

export const ErrorScreen = ({ error, onRetry, onClick }: ErrorScreenProps) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const notFound = isNotFound(error);

  const handleRetry = () => {
    setIsRetrying(true);
    onRetry?.();
    setTimeout(() => setIsRetrying(false), 2000);
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d0d] via-[#111] to-[#0d0d0d] px-6 py-20 relative overflow-hidden">
      <div className="project-error-particles" />

      <div className="flex flex-col items-center justify-center text-center z-10 max-w-[500px]">
        <div className="relative w-40 h-40 flex items-center justify-center mb-8">
          {notFound ? (
            <div className="flex gap-2">
              <span className="project-error-404-text">4</span>
              <span className="project-error-404-text">0</span>
              <span className="project-error-404-text">4</span>
            </div>
          ) : (
            <div className="project-error-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.019-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
          )}
          <div className="project-error-ring" />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            {notFound
              ? "Proyecto no encontrado"
              : "Error al cargar el proyecto"}
          </h1>
          {!notFound && error && (
            <p className="text-red-400 text-base md:text-lg leading-relaxed">
              {typeof error === "string"
                ? error
                : Array.isArray(error)
                  ? error.join(", ")
                  : error.message}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-3">
          <NormalButton
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full sm:w-auto"
          >
            <span className="flex items-center gap-2 justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {isRetrying ? "Reintentando..." : "Reintentar"}
            </span>
          </NormalButton>

          <SecondaryButton
            onClick={handleGoBack}
            className="w-full sm:w-auto"
          >
            <span className="flex items-center gap-2 justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Volver
            </span>
          </SecondaryButton>
        </div>
      </div>
    </main>
  );
};

export default ErrorScreen;
