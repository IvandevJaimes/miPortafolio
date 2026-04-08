import "./skeleton.css";

interface SkillsSkeletonProps {
  count?: number;
}

export const SkillsSkeleton = ({ count = 3 }: SkillsSkeletonProps) => {
  return (
    <section className="min-h-screen py-17 px-6 relative overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#1a1919] to-[#0d0d0d]">
      <div className="skeleton-particles" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="skeleton-label-line" />
            <span className="skeleton-label-text" />
            <span className="skeleton-label-line" />
          </div>
          <h2 className="skeleton-title mx-auto" />
          <p className="skeleton-description mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-tab" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {Array.from({ length: count * 3 }).map((_, index) => (
            <div key={index} className="skeleton-skill-card">
              <div className="flex justify-between items-center mb-3">
                <div className="skeleton-skill-title" />
                <div className="skeleton-badge" />
              </div>
              <div className="skeleton-skill-description" />
              <div className="skeleton-progress-bar" />
              <div className="skeleton-skill-footer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSkeleton;
