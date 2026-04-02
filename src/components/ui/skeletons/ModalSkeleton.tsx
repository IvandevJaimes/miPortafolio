import "./skeleton.css";

interface ModalSkeletonProps {
  className?: string;
}

export const ModalSkeleton = ({ className = "" }: ModalSkeletonProps) => {
  return (
    <div className={`modal-skeleton ${className}`}>
      <div className="modal-skeleton-content">
        <div className="flex items-center gap-2">
          <div className="modal-skeleton-icon" />
          <div className="modal-skeleton-info">
            <div className="modal-skeleton-title" />
            <div className="modal-skeleton-subtitle" />
          </div>
        </div>
        <div className="modal-skeleton-button" />
      </div>
    </div>
  );
};
