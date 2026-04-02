import "./skeleton.css";

export const Skeleton = () => {
  return (
    <section className="skeleton-section md:mt-2 xl:mt-2" id="perfil">
      <div className="skeleton-particles" />

      <div className="skeleton-container">
        <div className="skeleton-content">
          <div className="skeleton-greeting">
            <span className="skeleton-wave"></span>
            <span className="skeleton-hello"></span>
          </div>

          <h1 className="skeleton-name rounded-lg">
            <span className="skeleton-name-accent "></span>
          </h1>

          <div className="skeleton-typing-container">
            <span className="skeleton-typing"></span>
            <span className="skeleton-cursor"></span>
          </div>

          <div className="skeleton-description"></div>

          <div className="skeleton-cta">
            <span className="skeleton-btn-primary"></span>
            <span className="skeleton-btn-secondary"></span>
          </div>
        </div>

        <div className="skeleton-image-container">
          <div className="skeleton-image-wrapper md:mt-5 xl:mt-5">
            <div className="skeleton-image-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};