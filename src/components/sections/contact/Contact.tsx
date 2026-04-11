import { useState } from "react";
import { useForm } from "react-hook-form";
import "./contact.css";
import { SecondaryButton } from "../../ui/buttons/SecondaryButton";
import portfolioData from "../../../data/portfolioData.json";
import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "@/services/contactApi";
import { Alert } from "@/components/ui/alerts/Alert";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendContactMessage,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const { links } = portfolioData;

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const onSubmit = (data: ContactFormData) => {
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
    setErrorMessage("");

    mutate(data, {
      onSuccess: () => {
        setShowSuccessAlert(true);
        reset();
      },
      onError: (error) => {
        const apiError = error as { message?: string };
        setErrorMessage(apiError.message || "Error al enviar el mensaje");
        setShowErrorAlert(true);
      },
    });
  };

  return (
    <section id="contacto" className="contact-section">
      {showErrorAlert && (
        <Alert
          type="error"
          title="Error al enviar"
          message={errorMessage}
          show={showErrorAlert}
          onClose={() => setShowErrorAlert(false)}
        />
      )}
      {showSuccessAlert && (
        <Alert
          type="success"
          title="Enviado"
          message="Gracias por contactarme. Te responderé pronto."
          show={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
      <div className="contact-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-15">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col items-center gap-5 justify-center">
              <div className="flex items-center gap-3">
                <span className="contact-line" />
                <span className="contact-label-text">Contacto</span>
                <span className="contact-line-schild" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-50">
                trabajemos <span className="title-accent">juntos</span>
              </h2>
              <p className="text-slate-400 max-w-md leading-relaxed flex text-center">
                ¿Tenés un proyecto en mente o querés trabajar juntos? Escribime
                y charlemos sobre tu idea.
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              {links.gmail && (
                <a href={`mailto:${links.gmail}`} className="contact-link-item">
                  <div className="flex items-center justify-center w-5 h-5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span>Email</span>
                </a>
              )}
              {links.linkedin && (
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </div>
                  <span>LinkedIn</span>
                </a>
              )}
              {links.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2 relative">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-400"
                >
                  Nombre
                </label>
                {errors?.name && (
                  <span className="contact-form-error text-red-500">
                    {errors.name.message}
                  </span>
                )}
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "El nombre es requerido",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    maxLength: { value: 200, message: "Demasiados caracteres" },
                  })}
                  className={`contact-form-input ${errors.name ? "error" : ""}`}
                  placeholder="Tu nombre"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-400"
                >
                  Email
                </label>
                {errors?.email && (
                  <span className="contact-form-error text-red-500">
                    {errors.email.message}
                  </span>
                )}
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "El email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email inválido",
                    },
                  })}
                  className={`contact-form-input ${errors.email ? "error" : ""}`}
                  placeholder="tu@email.com"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-400"
                >
                  Mensaje
                </label>
                {errors?.message && (
                  <span className="contact-form-error text-red-500">
                    {errors.message.message}
                  </span>
                )}
                <textarea
                  id="message"
                  {...register("message", {
                    required: "El mensaje es requerido",
                    minLength: { value: 10, message: "Mínimo 10 caracteres" },
                    maxLength: {
                      value: 2000,
                      message: "Máximo 2000 caracteres",
                    },
                  })}
                  className={`contact-form-input resize-none min-h-[120px] ${errors.message ? "error" : ""}`}
                  placeholder="Tu mensaje..."
                  rows={5}
                />
              </div>

              <SecondaryButton type="submit" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Mensaje"
                )}
              </SecondaryButton>
            </form>
          </div>
        </div>

        <div className="contact-decoration contact-decoration-1">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="contact-decoration contact-decoration-2">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Contact;
