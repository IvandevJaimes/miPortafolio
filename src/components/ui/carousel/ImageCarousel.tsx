import { useState, useCallback, useRef, type TouchEvent, type MouseEvent } from "react";
import { isPlaceholderImage } from "../../../utils/imageUtils";
import "./imageCarousel.css";

interface ImageCarouselProps {
  images: string[];
  projectTitle: string;
}

export const ImageCarousel = ({ images, projectTitle }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchMove = (e: TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeTime = 300;
    const timeDiff = Date.now() - touchStartTime.current;
    const diff = Math.abs(translateX);

    if (diff > swipeThreshold && timeDiff < swipeTime) {
      if (translateX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setTranslateX(0);
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const swipeThreshold = 50;
    const diff = Math.abs(translateX);

    if (diff > swipeThreshold) {
      if (translateX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    setIsDragging(false);
    setTranslateX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTranslateX(0);
    }
  };

  if (images.length === 0) {
    return (
      <div className="carousel-empty">
        <div className="carousel-empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        <p>Sin imágenes disponibles</p>
      </div>
    );
  }

  const hasPlaceholders = images.some((img) => isPlaceholderImage(img));

  return (
    <div className="carousel-container">
      {hasPlaceholders && (
        <div className="carousel-placeholder-badge">Imágenes ilustrativas</div>
      )}
      <div
        className="carousel-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={`carousel-slide ${isPlaceholderImage(image) ? "placeholder" : ""}`}>
              <img
                src={image}
                alt={`${projectTitle} - Imagen ${index + 1}`}
                className={`carousel-image ${isPlaceholderImage(image) ? "opacity-60" : ""}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="carousel-nav carousel-nav-prev"
              aria-label="Imagen anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="carousel-nav carousel-nav-next"
              aria-label="Siguiente imagen"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="carousel-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;