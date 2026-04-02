import { useState, useCallback } from "react";
import "./hero.css";
import { PrimaryButton } from "../../ui/buttons/PrimaryButton";
import { SecondaryButton } from "../../ui/buttons/SecondaryButton";
import { Skeleton } from "../../ui/skeletons/Skeleton";
import { useFetch } from "../../../hooks/useFetch";
import { getProfile } from "../../../services/profileApi";
import { Alert } from "../../ui/alerts/Alert";
import profileData from "../../../data/profile.json";

const Hero = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  const fetchProfile = useCallback(
    (signal?: AbortSignal) => getProfile(signal),
    [],
  );

  const {
    data: apiProfile,
    isLoading,
    error,
    setError,
  } = useFetch(fetchProfile, [retryCount]);

  const handleRetry = () => {
    setError(null);
    setShowAlert(true);
    setRetryCount((prev) => prev + 1);
  };

  const shouldShowAlert = showAlert && error && !apiProfile;

  if (isLoading) {
    return (
      <section className="hero-section" id="perfil">
        <Skeleton />
      </section>
    );
  }

  const links = profileData.links;

  return (
    <section className="hero-section" id="perfil">
      {shouldShowAlert && (
        <Alert
          type="error"
          message={error.message}
          show={showAlert}
          onClose={() => setShowAlert(false)}
          onRetry={handleRetry}
        />
      )}
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-greeting">
            <span className="hero-wave">👋</span>
            <span className="hero-hello">Hola, soy</span>
          </div>

          <h1 className="hero-name">
            {profileData.name.split(" ")[0]}{" "}
            <span className="hero-name-accent">
              {profileData.name.split(" ")[1]}
            </span>
          </h1>

          <div className="hero-typing-container">
            <span className="hero-typing-text">
              {apiProfile?.tags ? apiProfile.tags : profileData.title}
            </span>
            <span className="hero-typing-cursor">|</span>
          </div>

          <div className="hero-description">
            {apiProfile?.presentation ? (
              <p>{apiProfile.presentation}</p>
            ) : (
              <p>{profileData.presentation}</p>
            )}
          </div>

          <div className="hero-cta">
            <PrimaryButton>Ver Proyectos</PrimaryButton>
            <SecondaryButton>Contactar</SecondaryButton>
          </div>

          <div className="hero-social">
            {links.github && (
              <a
                href={links.github}
                className="hero-social-link"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="hero-social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {links.linkedin && (
              <a
                href={links.linkedin}
                className="hero-social-link"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="hero-social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
            {links.x && (
              <a
                href={links.x}
                className="hero-social-link"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="hero-social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <div className="hero-image-glow"></div>
            <div className="hero-image-placeholder">
              {apiProfile?.image_url ? (
                <img
                  src={apiProfile.image_url}
                  alt={`Foto de perfil de ${profileData.name}`}
                  className="hero-image-profile"
                />
              ) : (
                <span className="hero-image-initials">IJ</span>
              )}
            </div>
          </div>

          <div className="hero-decoration hero-decoration-1">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="hero-decoration hero-decoration-2">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
