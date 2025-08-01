import React, { useEffect, useRef, useState } from 'react';
import '../css/.css'; // Assuming you have some styles for the gallery

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

    const slides = Array.from(galleryRef.current.children) as HTMLElement[];

    let closest = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(centerX - slideCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  };

  const scrollToIndex = (index: number) => {
    if (!galleryRef.current) return;

    const slide = galleryRef.current.children[index] as HTMLElement;
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      scrollToIndex(Math.min(photos.length - 1, activeIndex + 1));
    }
    if (e.key === 'ArrowLeft') {
      scrollToIndex(Math.max(0, activeIndex - 1));
    }
  };

  useEffect(() => {
    const ref = galleryRef.current;
    if (!ref) return;

    ref.addEventListener('scroll', updateActiveSlide);
    window.addEventListener('resize', updateActiveSlide);
    window.addEventListener('keydown', handleKeyDown);

    updateActiveSlide();

    return () => {
      ref.removeEventListener('scroll', updateActiveSlide);
      window.removeEventListener('resize', updateActiveSlide);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, photos.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* ← Flèche gauche */}
      <button
        className="absolute left-[2vw] top-1/2 -translate-y-1/2 z-10 bg-white/85 hover:bg-white shadow rounded-full text-2xl px-3 py-1"
        onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
      >
        ◀
      </button>

      {/* Galerie horizontale */}
      <div
        ref={galleryRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth scroll-snap-x scroll-snap-mandatory gap-8 px-[30vw] py-8 no-scrollbar"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`flex-none w-[40vw] max-w-[600px] scroll-snap-center rounded-xl overflow-hidden bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 ${
              index === activeIndex
                ? 'opacity-100 scale-100 blur-0'
                : 'opacity-60 scale-95 blur-[3px]'
            }`}
          >
            <img src={photo.src} alt={photo.title} className="w-full h-auto block" />
            <p className="text-center text-[1.2rem] font-medium p-4 text-gray-800 bg-gray-100 m-0">
              {photo.title}
            </p>
          </div>
        ))}
      </div>

      {/* → Flèche droite */}
      <button
        className="absolute right-[2vw] top-1/2 -translate-y-1/2 z-10 bg-white/85 hover:bg-white shadow rounded-full text-2xl px-3 py-1"
        onClick={() => scrollToIndex(Math.min(photos.length - 1, activeIndex + 1))}
      >
        ▶
      </button>
    </div>
  );
};

export default Gallery;
