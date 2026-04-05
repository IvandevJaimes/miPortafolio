import "./skeleton.css";

interface ProjectsSkeletonProps {
  count?: number;
}

export const ProjectsSkeleton = ({ count = 6 }: ProjectsSkeletonProps) => {
  return (
    <section className="min-h-screen py-17 px-6 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#1a1919] to-[#0d0d0d]">
      <div className="skeleton-particles" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="skeleton-label-line" />
            <span className="skeleton-label-text" />
            <span className="skeleton-label-line" />
          </div>
          <h2 className="skeleton-title mx-auto" />
          <p className="skeleton-description mx-auto" />
        </div>

        {/* Grid Skeleton - responsive 1/2/3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="skeleton-project-card">
              {/* Image */}
              <div className="skeleton-project-image" />

              {/* Content */}
              <div className="p-4 md:p-6">
                {/* Title */}
                <div className="skeleton-project-title" />

                {/* Description */}
                <div className="skeleton-project-description" />

                {/* Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="skeleton-project-tag" />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3 my-2 flex-wrap">
                  <div className="skeleton-project-btn" />
                  <div className="skeleton-project-btn" />
                  <div className="skeleton-project-demo-btn" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button Skeleton */}
        <div className="mt-16 flex justify-center">
          <div className="skeleton-view-all-btn" />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSkeleton;
