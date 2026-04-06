import "./skeleton.css";

export const ProjectPageSkeleton = () => {
  return (
    <div className="project-page-skeleton">
      <div className="project-page-container">
        {/* Skeleton para Carrusel (< 699px) */}
        <div className="skeleton-carousel">
          <div className="skeleton-carousel-image" />
          <div className="skeleton-carousel-nav skeleton-carousel-nav-prev" />
          <div className="skeleton-carousel-nav skeleton-carousel-nav-next" />
          <div className="skeleton-carousel-indicators">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton-carousel-dot" />
            ))}
          </div>
          <div className="skeleton-carousel-counter">1 / 3</div>
        </div>

        {/* Skeleton para Grid (≥ 699px) */}
        <div className="skeleton-image-grid">
          <div className="skeleton-image-grid-nav skeleton-image-grid-nav-prev" />
          <div className="skeleton-image-grid-scroll">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton-image-grid-item" />
            ))}
          </div>
          <div className="skeleton-image-grid-nav skeleton-image-grid-nav-next" />
        </div>

        {/* Skeleton ProjectInfo */}
        <div className="skeleton-project-info">
          <div className="skeleton-project-title" />
          <div className="skeleton-project-description" />
          <div className="skeleton-project-description-2" />
          <div className="skeleton-tags">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-tag" />
            ))}
          </div>
          <div className="skeleton-badges">
            <div className="skeleton-badge-featured" />
            <div className="skeleton-badge-deployed" />
          </div>
        </div>

        {/* Skeleton ProjectLinks */}
        <div className="skeleton-project-links">
          <div className="skeleton-links-row">
            <div className="skeleton-link-btn" />
            <div className="skeleton-link-btn" />
            <div className="skeleton-link-btn" />
          </div>
          <div className="skeleton-link-btn skeleton-link-btn-demo" />
        </div>
      </div>
    </div>
  );
};

export default ProjectPageSkeleton;
