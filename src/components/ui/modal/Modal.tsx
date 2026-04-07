import { type ReactNode, type MouseEvent } from "react";
import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  className?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
}: ModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm modal-overlay"
      onClick={handleBackdropClick}
    >
      <div
        className={`w-full max-w-lg relative rounded-2xl modal-container ${className}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 modal-header">
          <div className="flex-1 pr-4 text-white modal-title-wrapper">
            {title}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all duration-200 modal-close-button"
            aria-label="Cerrar modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 modal-body">{children}</div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 modal-footer">
          {footer}
        </div>
      </div>
    </div>
  );
};
