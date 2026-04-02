import { useState, useCallback, useEffect, useRef } from "react";
import "./header.css";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";
import { Logo } from "../../ui/logo/Logo";
import { ModalSkeleton } from "../../ui/skeletons/ModalSkeleton";
import { useModal } from "../../../context/ModalContext";
import { useFetch } from "../../../hooks/useFetch";
import { getProfile } from "../../../services/profileApi";

const navLinks = [
  { name: "Perfil", href: "#perfil" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Habilidades", href: "#habilidades" },
  { name: "Contacto", href: "#contacto" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useModal();
  const modalOpenedWithSkeleton = useRef(false);

  const fetchProfile = useCallback(
    (signal?: AbortSignal) => getProfile(signal),
    [],
  );
  const { data: profile, isLoading } = useFetch(fetchProfile, []);

  useEffect(() => {
    if (!isLoading && profile && modalOpenedWithSkeleton.current) {
      modalOpenedWithSkeleton.current = false;
      const cvUrl = profile.cv;
      if (cvUrl) {
        const isPdf = cvUrl.toLowerCase().endsWith(".pdf");
        const isDocx = cvUrl.toLowerCase().endsWith(".docx");
        const fileName = getFileName(cvUrl);

        const renderIcon = () => {
          if (isPdf) {
            return (
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 sm:w-10 sm:h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1zm4 3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5zm3.5-3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5zm0 3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5z" />
                </svg>
              </div>
            );
          }
          if (isDocx) {
            return (
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-7 h-7 sm:w-10 sm:h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 3h8v2H8v-2zm0 3h5v2H8v-2z" />
                </svg>
              </div>
            );
          }
          return (
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-7 h-7 sm:w-10 sm:h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
            </div>
          );
        };

        openModal(
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Descargar CV
          </h2>,
          <div className="text-gray-300">
            <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 min-w-0">
              {renderIcon()}
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-semibold text-white break-all">
                  {fileName}
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  {isPdf
                    ? "Documento PDF"
                    : isDocx
                      ? "Documento Word"
                      : "Archivo"}
                </p>
              </div>
            </div>
            <a
              href={cvUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 hover:bg-green-400 text-black font-medium rounded-lg transition-colors text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Descargar CV
            </a>
          </div>,
        );
      }
    }
  }, [isLoading, profile, openModal]);

  const getFileName = (url: string) => {
    const parts = url.split("/");
    const fullName = parts[parts.length - 1];
    const name = fullName.split("_")[0] + "." + fullName.split(".").pop();
    if (name.length > 30) {
      const ext = name.split(".").pop() || "";
      const baseName = name.slice(0, 25);
      return `${baseName}...${ext}`;
    }
    return name;
  };

  const handleDownloadCV = () => {
    if (isLoading) {
      modalOpenedWithSkeleton.current = true;
      openModal(
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Descargar CV
        </h2>,
        <ModalSkeleton />,
      );
      return;
    }

    if (!profile?.cv) {
      openModal(
        <h2 className="text-xl font-bold text-white">CV no disponible</h2>,
        <div className="text-gray-300">
          <p>El CV no está disponible actualmente.</p>
        </div>,
      );
      return;
    }

    const cvUrl = profile.cv;
    const isPdf = cvUrl.toLowerCase().endsWith(".pdf");
    const isDocx = cvUrl.toLowerCase().endsWith(".docx");
    const fileName = getFileName(cvUrl);

    const renderIcon = () => {
      if (isPdf) {
        return (
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-7 h-7 sm:w-10 sm:h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8.5 13c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1zm4 3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5zm3.5-3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5zm0 3.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28-.22.5-.5.5z" />
            </svg>
          </div>
        );
      }

      if (isDocx) {
        return (
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-7 h-7 sm:w-10 sm:h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2l5 5h-5V4zM8 12h8v2H8v-2zm0 3h8v2H8v-2zm0 3h5v2H8v-2z" />
            </svg>
          </div>
        );
      }

      return (
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="w-7 h-7 sm:w-10 sm:h-10 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
          </svg>
        </div>
      );
    };

    openModal(
      <h2 className="text-lg sm:text-xl font-bold text-white">Descargar CV</h2>,
      <div className="text-gray-300">
        <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 min-w-0">
          {renderIcon()}
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-semibold text-white break-all">
              {fileName}
            </p>
            <p className="text-xs sm:text-sm text-gray-400">
              {isPdf ? "Documento PDF" : isDocx ? "Documento Word" : "Archivo"}
            </p>
          </div>
        </div>

        <a
          href={cvUrl}
          download
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-green-500 hover:bg-green-400 text-black font-medium rounded-lg transition-colors text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Descargar CV
        </a>
      </div>,
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-2 pl-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center">
            <Logo />
          </a>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#39ff88] to-[#00ff9c] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <PrimaryButton className="text-sm" onClick={handleDownloadCV}>
              Descargar CV
            </PrimaryButton>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="block md:hidden">
              <PrimaryButton
                className="sm:text-[12px] text-xs"
                onClick={handleDownloadCV}
              >
                Descargar CV
              </PrimaryButton>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-70 bg-black" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-3 space-y-2 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
