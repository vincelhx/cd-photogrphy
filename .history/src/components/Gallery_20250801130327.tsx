import React, { useEffect, useRef, useState } from 'react';


type Photo = {
  id: number;
  title: string;
  src: string;
};

type GalleryProps = {
  photos: Photo[];
};

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveSlide = () => {
    if (!galleryRef.current) return;

    const galleryRect = galleryRef.current.getBoundingClientRect();
    const centerX = galleryRect.left + galleryRect.width / 2;

    let minDistance = Infinity;
    let closestIndex = 0;

    const slides = Array.from(galleryRef.current.children) as HTMLElement[];

    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - slideCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const ref = galleryRef.current;
    if (!ref) return;
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        scrollToIndex(Math.min(photos.length - 1, activeIndex + 1));
      }
      if (e.key === 'ArrowLeft') {
        scrollToIndex(Math.max(0, activeIndex - 1));
      }
    };
  
    ref.addEventListener('scroll', updateActiveSlide);
    window.addEventListener('keydown', handleKeyDown); // <-- écoute globale
  
    window.addEventListener('resize', updateActiveSlide);
    updateActiveSlide();
  
    return () => {
      ref.removeEventListener('scroll', updateActiveSlide);
      window.removeEventListener('resize', updateActiveSlide);
      window.removeEventListener('keydown', handleKeyDown); // <-- nettoyage
    };
  }, [activeIndex, photos.length]);
  

  const scrollToIndex = (index: number) => {
    if (!galleryRef.current) return;

    const slide = galleryRef.current.children[index] as HTMLElement;
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  return (
    <div className="gallery-wrapper">
      <button
        className="nav-arrow left"
        onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
      >
        ◀
      </button>

      <div className="gallery-container" ref={galleryRef}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`gallery-slide ${index === activeIndex ? 'active' : 'blurred'}`}
          >
            <img src={photo.src} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>

      <button
        className="nav-arrow right"
        onClick={() => scrollToIndex(Math.min(photos.length - 1, activeIndex + 1))}
      >
        ▶
      </button>
    </div>
  );
};

export default Gallery;
