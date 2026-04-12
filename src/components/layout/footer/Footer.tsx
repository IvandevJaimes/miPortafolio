import portfolioData from "../../../data/portfolioData.json";
import "./footer.css";
import { Logo } from "@/components/ui/logo/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links: Record<string, string> = {
    github: portfolioData.links.github,
    linkedin: portfolioData.links.linkedin,
    gmail: portfolioData.links.gmail,
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-glow" />

      <div className="max-w-[1200px] mx-auto relative z-10 px-6">
        {/* Top Row: Brand + Back to Top */}
        <div className="flex justify-between items-start mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-1">
            <span className="text-lg">
              <Logo></Logo>
            </span>
            <span className="text-sm text-[#39ff88] font-medium">
              {portfolioData.title}
            </span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="footer-back-to-top"
            aria-label="Volver arriba"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>

        {/* Social Links - Centered */}
        <div className="flex justify-center gap-4 mb-8">
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          )}
          {links.gmail && (
            <a
              href={`mailto:${links.gmail}`}
              className="footer-social-link"
              aria-label="Email"
            >
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          )}
        </div>

        {/* Quick Links */}
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          <button
            onClick={() => scrollToSection("proyectos")}
            className="footer-quick-link"
          >
            Proyectos
          </button>
          <button
            onClick={() => scrollToSection("habilidades")}
            className="footer-quick-link"
          >
            Habilidades
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className="footer-quick-link"
          >
            Contacto
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39ff88]" />
          <span className="w-16 h-px bg-gradient-to-r from-transparent via-[rgba(57,255,136,0.3)] to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#39ff88]" />
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-xs text-slate-500">
          <span>
            © {currentYear} {portfolioData.name}. Todos los derechos reservados.
          </span>
          <span className="hidden md:inline">•</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
