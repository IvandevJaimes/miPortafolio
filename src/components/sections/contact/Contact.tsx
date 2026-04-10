import { useState, type ChangeEvent, type FormEvent } from "react";
import "./contact.css";
import { SecondaryButton } from "../../ui/buttons/SecondaryButton";
import portfolioData from "../../../data/portfolioData.json";

interface ContactProps {
  onError?: (error: Error) => void;
}

const Contact = ({ onError }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  void onError;

  const { links } = portfolioData;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    setTimeout(() => {
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  if (formStatus === "sent") {
    return (
      <section id="contacto" className="contact-section">
        <div className="contact-container">
          <div className="contact-success">
            <div className="contact-success-icon">✓</div>
            <h2 className="contact-success-title">¡Mensaje Enviado!</h2>
            <p className="contact-success-desc">
              Gracias por contactarme. Te responderé lo antes posible.
            </p>
            <SecondaryButton onClick={() => setFormStatus("idle")}>
              Enviar otro mensaje
            </SecondaryButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="contact-section">
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-400"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-form-input"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-form-input"
                  placeholder="tu@email.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-400"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="contact-form-input resize-none min-h-[120px]"
                  placeholder="Tu mensaje..."
                  rows={5}
                />
              </div>

              <SecondaryButton
                type="submit"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending" ? "Enviando..." : "Enviar Mensaje"}
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
