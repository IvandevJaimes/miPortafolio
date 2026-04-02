import { useEffect, useState } from "react";
import "./alert.css";

type AlertType = "success" | "error";

interface AlertProps {
  type: AlertType;
  title?: string;
  message?: string;
  show: boolean;
  onClose: () => void;
  onRetry?: () => void;
  autoClose?: number;
}

const icons = {
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const typeClasses = {
  success: "bg-emerald-900/90 border-emerald-500 text-emerald-100",
  error: "bg-red-900/90 border-red-500 text-red-100",
};

const iconColors = {
  success: "text-emerald-300",
  error: "text-red-300",
};

const buttonStyles = {
  success: "bg-emerald-500/30 hover:bg-emerald-500/50 text-emerald-100",
  error: "bg-red-500/30 hover:bg-red-500/50 text-red-100",
};

const closeBtnStyles = {
  success: "bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300",
  error: "bg-red-500/20 hover:bg-red-500/40 text-red-300",
};

export const Alert = ({
  type,
  title,
  message,
  show,
  onClose,
  onRetry,
  autoClose = 5000,
}: AlertProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!show || autoClose <= 0) return;
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300);
    }, autoClose);
    return () => clearTimeout(timer);
  }, [show, autoClose, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-[9999] flex items-center gap-[5px] px-2 py-2 rounded-lg shadow-lg pointer-events-auto text-xs sm:text-sm md:text-base ${typeClasses[type]} ${isExiting ? "animate-[alert-disappear_0.3s_ease_forwards]" : "animate-[alert-appear_0.3s_ease-out]"}`}
      role="alert"
    >
      <div
        className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${iconColors[type]}`}
      >
        {icons[type]}
      </div>

      <span className="font-medium">{title}</span>
      {message && <p>{message}</p>}

      {onRetry && (
        <button
          className={`ml-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded font-medium text-[10px] sm:text-xs ${buttonStyles[type]}`}
          onClick={onRetry}
          type="button"
        >
          Reintentar
        </button>
      )}

      <button
        className={`ml-1 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded cursor-pointer transition-colors ${closeBtnStyles[type]}`}
        onClick={onClose}
        type="button"
        aria-label="Cerrar"
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          width="12"
          height="12"
          className="sm:w-4 sm:h-4"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
