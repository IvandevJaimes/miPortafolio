import "./dataError.css";

interface DataErrorProps {
  onRetry: () => void;
  errorMessage?: string | string[] | undefined;
  section?: string;
}

export const DataError = ({ onRetry, errorMessage, section = "data" }: DataErrorProps) => {
  const titles: Record<string, string> = {
    projects: "Error al cargar proyectos",
    skills: "Error al cargar habilidades",
    data: "Error al cargar la información",
  };

  const messages: Record<string, string> = {
    projects: "No se pudieron obtener los proyectos. Verificá tu conexión e intentá nuevamente.",
    skills: "No se pudieron obtener las habilidades. Verificá tu conexión e intentá nuevamente.",
    data: "Ocurrió un problema al cargar los datos. Verificá tu conexión e intentá nuevamente.",
  };

  return (
    <section className="min-h-[50vh] py-17 px-6 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#1a1919] to-[#0d0d0d]">
      <div className="data-error-particles" />
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="data-error-icon-container">
          <div className="data-error-icon">
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
          <div className="data-error-ring" />
        </div>

        <div className="text-center mt-8 flex items-center flex-col">
          <h3 className="data-error-title">{titles[section] || titles.data}</h3>
          {errorMessage && <h4 className="text-red-400">{errorMessage}</h4>}
          <p className="data-error-message">
            {messages[section] || messages.data}
          </p>
        </div>

        <button onClick={onRetry} className="data-error-retry">
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
          <span>Reintentar</span>
        </button>
      </div>
    </section>
  );
};

export default DataError;