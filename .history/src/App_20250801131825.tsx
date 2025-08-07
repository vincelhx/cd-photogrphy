import React, { useRef, useEffect, useState } from 'react';

const photos = [
  {
    id: 1,
    title: 'Coucher de soleil',
    src: 'https://picsum.photos/id/1015/800/500',
  },
  {
    id: 2,
    title: 'Portrait en noir et blanc',
    src: 'https://picsum.photos/id/1025/800/500',
  },
  {
    id: 3,
    title: 'Paysage de montagne',
    src: 'https://picsum.photos/id/1035/800/500',
  },
];

export default function App() {
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
    <div className="relative w-full min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold pt-6">Ma Galerie</h1>

      <div
        ref={galleryRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory px-[30vw] gap-8 py-8 no-scrollbar"
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`flex-none w-[40vw] max-w-[600px] bg-white rounded-xl overflow-hidden shadow-lg snap-center transition-all duration-300 ${
              index === activeIndex
                ? 'scale-100 opacity-100 blur-0'
                : 'scale-95 opacity-60 blur-sm'
            }`}
          >
            <img src={photo.src} alt={photo.title} className="w-full h-auto" />
            <p className="text-center font-medium text-gray-800 p-4 bg-gray-100">
              {photo.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
