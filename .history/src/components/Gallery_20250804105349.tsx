import React, { useState, useRef, useEffect } from "react";

type Photo = {
  id: number;
  title: string;
  src: string;
};

type GalleryProps = {
  photos: Photo[];
};

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const shiftLeft = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const shiftRight = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  // Swipe tactile
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (Math.abs(deltaX) > 50) {
        deltaX > 0 ? shiftLeft() : shiftRight();
      }
    };

    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    wrapper.addEventListener("touchend", onTouchEnd);

    return () => {
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Flèches clavier
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") shiftRight();
      if (e.key === "ArrowLeft") shiftLeft();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative w-full h-[80vh] flex flex-col items-center justify-center bg-white overflow-hidden">
      <div
        ref={wrapperRef}
        className="flex transition-transform duration-500 ease-in-out w-full h-full"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}>
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="w-full shrink-0 flex flex-col items-center justify-between px-4 sm:px-16">
            <div className="w-full h-[60vh] max-w-[900px] rounded-xl overflow-hidden shadow-lg">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-4 text-center text-gray-700 font-medium">
              {photo.title}
            </p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={shiftLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow border"
        aria-label="Précédent">
        ◀
      </button>
      <button
        onClick={shiftRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full p-3 shadow border"
        aria-label="Suivant">
        ▶
      </button>
    </div>
  );
};

export default Gallery;
