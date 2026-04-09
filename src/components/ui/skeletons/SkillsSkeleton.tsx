import "./skeleton.css";

interface SkillsSkeletonProps {
  count?: number;
}

export const SkillsSkeleton = ({ count = 3 }: SkillsSkeletonProps) => {
  return (
    <section className="min-h-screen py-17 px-6 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#1a1919] to-[#0d0d0d]">
      <div className="skeleton-particles" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="skeleton-label-line" />
            <span className="skeleton-label-text" />
            <span className="skeleton-label-line" />
          </div>
          <h2 className="skeleton-title mx-auto" />
          <p className="skeleton-description mx-auto" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-tab" />
          ))}
        </div>

        {/* Mobile Category Indicator */}
        <div className="sm:hidden">
          <div className="skeleton-mobile-indicator mx-auto mb-4" />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {Array.from({ length: count * 3 }).map((_, index) => (
            <div key={index} className="skeleton-skill-card">
              {/* Icon and Title Row */}
              <div className="flex items-center gap-3 mb-3">
                <div className="skeleton-skill-icon" />
                <div className="skeleton-skill-title" />
              </div>
              {/* Description */}
              <div className="skeleton-skill-description" />
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div className="border-t border-white/[0.06] pt-12">
          <div className="skeleton-languages-title mx-auto mb-8" />
          <div className="flex flex-wrap justify-center gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="skeleton-language-card">
                <div className="flex items-center gap-4">
                  <div className="skeleton-language-flag" />
                  <div className="flex-1">
                    <div className="skeleton-language-name" />
                    <div className="skeleton-language-desc" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSkeleton;
