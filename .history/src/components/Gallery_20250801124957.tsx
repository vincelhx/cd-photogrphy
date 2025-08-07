import React, { useEffect, useRef, useState } from 'react';
import '../css/Gallery.css';

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

    ref.addEventListener('scroll', updateActiveSlide);
    window.addEventListener('resize', updateActiveSlide);

    updateActiveSlide(); // initial

    return () => {
      ref.removeEventListener('scroll', updateActiveSlide);
      window.removeEventListener('resize', updateActiveSlide);
    };
  }, []);

  return (
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
  );
};

export default Gallery;
