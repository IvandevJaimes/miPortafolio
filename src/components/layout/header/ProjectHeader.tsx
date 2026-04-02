import "./header.css";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";
import { Logo } from "../../ui/logo/Logo";
import { useNavigate } from "react-router-dom";

const ProjectHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-2 pl-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a
              onClick={() => {
                void navigate(-1);
              }}
              className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
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
            </a>
            <a href="/" className="flex items-center">
              <Logo />
            </a>
          </div>

          <div className="hidden md:block">
            <PrimaryButton className="text-sm">Descargar CV</PrimaryButton>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <div className="block md:hidden">
              <PrimaryButton className="sm:text-[12px] text-xs">
                Descargar CV
              </PrimaryButton>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ProjectHeader;
