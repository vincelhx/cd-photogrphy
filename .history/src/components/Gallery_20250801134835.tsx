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
  <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
  <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full px-3 py-1 text-2xl"
        onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
      >
        ◀
      </button>

      <div
        ref={galleryRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory px-[30vw] gap-8 py-8"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`shrink-0 w-[40vw] max-w-[600px] rounded-xl bg-white overflow-hidden shadow-xl snap-center transition-all duration-300 ${
              index === activeIndex
                ? 'scale-100 opacity-100 blur-0'
                : 'scale-95 opacity-60 blur-sm'
            }`}
          >
            <img src={photo.src} alt={photo.title} className="w-full h-auto block" />
            <p className="text-center text-gray-800 bg-gray-100 p-4 font-medium">{photo.title}</p>
          </div>
        ))}
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full px-3 py-1 text-2xl"
        onClick={() => scrollToIndex(Math.min(photos.length - 1, activeIndex + 1))}
      >
        ▶
      </button>
    </div>
  );
};

export default Gallery;
