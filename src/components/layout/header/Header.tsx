import { useState } from "react";
import "./header.css";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";
import { Logo } from "../../ui/logo/Logo";
import { useCVDownload } from "@/hooks/useCVDownload";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Perfil", href: "/" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Habilidades", href: "#habilidades" },
  { name: "Contacto", href: "#contacto" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleDownloadCV } = useCVDownload();

  const path = useLocation();
  const navigate = useNavigate();

  const isHome = path.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-5">
            {!isHome && (
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center cursor-pointer w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
                aria-label="Volver atrás"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            )}

            <a href="/" className="flex items-center">
              <Logo />
            </a>
          </div>

          {isHome && (
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
          )}

          <div className="hidden md:block">
            <PrimaryButton className="text-sm" onClick={handleDownloadCV}>
              Descargar CV
            </PrimaryButton>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <PrimaryButton
              className="sm:text-[12px] text-xs"
              onClick={handleDownloadCV}
            >
              Descargar CV
            </PrimaryButton>

            {isHome && (
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
            )}
          </div>
        </div>
      </nav>

      {isHome && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300  ${
            isOpen ? "max-h-64" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-2">
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
      )}
    </header>
  );
};

export default Header;
