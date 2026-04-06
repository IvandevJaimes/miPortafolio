import { useRef, useCallback } from "react";
import "./imageGrid.css";

interface ImageGridProps {
  images: string[];
  projectTitle: string;
}

export const ImageGrid = ({ images, projectTitle }: ImageGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  if (images.length === 0) {
    return (
      <div className="image-grid-empty">
        <div className="image-grid-empty-icon">
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

  return (
    <div className="image-grid-container">
      <button
        onClick={() => scroll("left")}
        className="image-grid-nav image-grid-nav-prev"
        aria-label="Imagen anterior"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="image-grid-scroll" ref={scrollRef}>
        {images.map((image, index) => (
          <div key={index} className="image-grid-item">
            <img
              src={image}
              alt={`${projectTitle} - Imagen ${index + 1}`}
              className="image-grid-img"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="image-grid-nav image-grid-nav-next"
        aria-label="Siguiente imagen"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default ImageGrid;