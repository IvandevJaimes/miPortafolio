import { useEffect, useCallback, useState, useRef, type MouseEvent, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import "./lightbox.css";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export const Lightbox = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  projectTitle,
}: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [prevIndex, setPrevIndex] = useState<number>(initialIndex);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const minSwipeDistance = 50;

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setPrevIndex(currentIndex);
    setSlideDirection("right");
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => {
      setSlideDirection(null);
      setIsAnimating(false);
    }, 350);
  }, [images.length, isAnimating, currentIndex]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setPrevIndex(currentIndex);
    setSlideDirection("left");
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => {
      setSlideDirection(null);
      setIsAnimating(false);
    }, 350);
  }, [images.length, isAnimating, currentIndex]);

  const onTouchStart = (e: TouchEvent) => {
    touchEndX.current = 0;
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setPrevIndex(initialIndex);
      setIsAnimating(false);
      setSlideDirection(null);
      document.body.style.overflow = "hidden";
      
      requestAnimationFrame(() => {
        contentRef.current?.focus();
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, goToPrevious, goToNext]);

  if (!isOpen || images.length === 0) return null;

  return createPortal(
    <div
      className="lightbox-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-label="Galería de imágenes"
    >
      <div
        ref={contentRef}
        className="lightbox-content"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="lightbox-close"
          aria-label="Cerrar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main image */}
        <div className="lightbox-image-container">
          {/* Previous image (salida) */}
          {isAnimating && prevIndex !== currentIndex && (
            <img
              key={`out-${prevIndex}`}
              src={images[prevIndex]}
              alt=""
              aria-hidden="true"
              className={`lightbox-image lightbox-image-out slide-out-${slideDirection}`}
            />
          )}
          {/* Current image (entrada) */}
          <img
            key={`in-${currentIndex}`}
            src={images[currentIndex]}
            alt={`${projectTitle} - Imagen ${currentIndex + 1}`}
            className={`lightbox-image ${isAnimating && slideDirection ? `lightbox-image-in slide-in-${slideDirection}` : ""}`}
          />
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="lightbox-nav lightbox-nav-prev"
              aria-label="Imagen anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="lightbox-nav lightbox-nav-next"
              aria-label="Siguiente imagen"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Counter */}
        <div className="lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Indicators */}
        {images.length > 1 && (
          <div className="lightbox-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`lightbox-indicator ${index === currentIndex ? "active" : ""}`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;
