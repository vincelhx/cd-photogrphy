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
  const initialIndex = Math.floor(photos.length / 2);

  const scrollToIndex = (index: number) => {
    const container = galleryRef.current;
    const slide = container?.children[index] as HTMLElement;

    if (container && slide) {
      const containerCenter = container.offsetWidth / 2;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const scrollPosition = slideCenter - containerCenter;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const updateActiveSlide = () => {
    const container = galleryRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + container.offsetWidth / 2;

    let closest = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const box = el.getBoundingClientRect();
      const slideCenter = box.left + box.width / 2;
      const distance = Math.abs(centerX - slideCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  };

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        scrollToIndex(Math.min(activeIndex + 1, photos.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        scrollToIndex(Math.max(activeIndex - 1, 0));
      }
    };

    container.addEventListener('scroll', updateActiveSlide);
    window.addEventListener('resize', updateActiveSlide);
    window.addEventListener('keydown', onKeyDown);

    // Scroll to initial center
    setTimeout(() => scrollToIndex(initialIndex), 50);

    return () => {
      container.removeEventListener('scroll', updateActiveSlide);
      window.removeEventListener('resize', updateActiveSlide);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, photos.length]);

  useEffect(() => {
    // On mount, set the initial index so arrows behave correctly from start
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center bg-white">

      {/* Slides */}
      <div
        ref={galleryRef}
        className="flex overflow-x-scroll scroll-smooth gap-8 py-8 no-scrollbar px-8 snap-x snap-mandatory"
      >
{photos.map((photo, index) => (
  <div
    key={photo.id}
    className={`shrink-0 w-[45vw] max-w-[700px] h-[60vh] flex flex-col justify-between bg-white rounded-xl overflow-hidden shadow-xl snap-center transition-all duration-300 ${
      index === activeIndex
        ? 'scale-100 opacity-100 blur-0'
        : 'scale-95 opacity-60 blur-sm'
    }`}
  >
    {/* Image container */}
    <div className="relative w-full h-full">
      <img
        src={photo.src}
        alt={photo.title}
        className="w-full h-full object-cover"
      />

      {/* ← Flèche gauche */}
      {index === activeIndex - 1 && (
        <button
          onClick={() => scrollToIndex(activeIndex - 1)}
className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full shadow p-2 text-xl"
        >
          ◀
        </button>
      )}

      {/* → Flèche droite */}
      {index === activeIndex + 1 && (
        <button
          onClick={() => scrollToIndex(activeIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full shadow p-2 text-xl"
          >
          ▶
        </button>
      )}
    </div>

    {/* Title */}
    <p className="text-center text-gray-800 bg-gray-100 py-4 font-medium">
      {photo.title}
    </p>
  </div>
))}


      </div>


    </div>
  );
};

export default Gallery;
