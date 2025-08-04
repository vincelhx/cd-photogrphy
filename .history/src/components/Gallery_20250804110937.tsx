import React, { useState, useEffect } from "react";

export type Photo = {
  id: number;
  title: string;
  src: string;
};

type GalleryProps = {
  photos: Photo[];
};

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3; // Doit être impair
  const middleIndex = Math.floor(visibleCount / 2);

  const shiftRight = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const shiftLeft = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const getVisiblePhotos = () => {
    const window: { photo: Photo; key: string }[] = [];
    for (let offset = -middleIndex; offset <= middleIndex; offset++) {
      const idx = (activeIndex + offset + photos.length) % photos.length;
      window.push({ photo: photos[idx], key: `${photos[idx].id}-${offset}` });
    }
    return window;
  };

  const visiblePhotos = getVisiblePhotos();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") shiftRight();
      else if (e.key === "ArrowLeft") shiftLeft();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onTouch = {
      startX: 0,
      handleStart: (e: TouchEvent) => {
        onTouch.startX = e.touches[0].clientX;
      },
      handleEnd: (e: TouchEvent) => {
        const delta = e.changedTouches[0].clientX - onTouch.startX;
        if (delta > 50) shiftLeft();
        else if (delta < -50) shiftRight();
      },
    };
    window.addEventListener("touchstart", onTouch.handleStart);
    window.addEventListener("touchend", onTouch.handleEnd);
    return () => {
      window.removeEventListener("touchstart", onTouch.handleStart);
      window.removeEventListener("touchend", onTouch.handleEnd);
    };
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Galerie d’images"
      className="relative w-full h-[80vh] flex items-center justify-center bg-white overflow-hidden">
      <div className="flex gap-6 items-center">
        {visiblePhotos.map(({ photo, key }, index) => {
          const isActive = index === middleIndex;
          return (
            <div
              key={key}
              className={`transition-all duration-300 shrink-0 h-[60vh] rounded-xl shadow-xl flex flex-col justify-between bg-white
                ${
                  isActive
                    ? "w-[70vw] md:w-[60vw] scale-100 opacity-100 blur-0 z-10 overflow-visible"
                    : "w-[30vw] md:w-[40vw] scale-90 opacity-50 blur-sm z-0"

                    ? "w-[70vw] md:w-[60vw] scale-100 opacity-100 blur-0"
                    : "w-[30vw] md:w-[40vw] scale-90 opacity-50 blur-sm"
                  
                }`}>
              <div className="relative w-full h-full">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-gray-800 bg-gray-100 py-4 font-medium">
                {photo.title}
              </p>

              {isActive && (
                <>
                  {/* ◀ Bouton gauche */}
                  <button
                    onClick={shiftLeft}
                    className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 z-30
    bg-white/80 hover:bg-white text-black rounded-full border border-gray-400
    shadow-md p-2 transition"
                    aria-label="Précédent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* ▶ Bouton droit */}
                  <button
                    onClick={shiftRight}
                    className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 z-30
    bg-white/80 hover:bg-white text-black rounded-full border border-gray-400
    shadow-md p-2 transition"
                    aria-label="Suivant">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
