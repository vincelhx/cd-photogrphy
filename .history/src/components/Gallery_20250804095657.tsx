import React, { useEffect, useRef, useState } from "react";

type Photo = {
  id: number;
  title: string;
  src: string;
};

type GalleryProps = {
  photos: Photo[];
};

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const visibleCount = 5;
  const middleIndex = Math.floor(visibleCount / 2);
  const [activeIndex, setActiveIndex] = useState(0);

  const shiftRight = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const shiftLeft = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Crée la fenêtre visible autour de l'index actif (circular)
  const getWindow = () => {
    const padded = [...photos, ...photos, ...photos]; // évite les débordements
    const start = activeIndex + photos.length;
    return padded.slice(start - middleIndex, start + middleIndex + 1);
  };

  const visiblePhotos = getWindow();

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center bg-white">
      <div
        className="flex gap-8 overflow-hidden px-8"
        style={{ paddingLeft: "calc(50% - 30vw)" }}>
        {visiblePhotos.map((photo, index) => {
          const isCenter = index === middleIndex;
          return (
            <div
              key={`${photo.id}-${index}`}
              className={`
                shrink-0 h-[60vh]
                flex flex-col justify-between bg-white rounded-xl shadow-xl
                transition-all duration-300
                ${
                  isCenter
                    ? "w-[60vw] max-w-[900px] scale-100 opacity-100 blur-0 z-20"
                    : "w-[40vw] max-w-[600px] scale-90 opacity-60 blur-sm z-10"
                }
              `}>
              <div className="relative w-full h-full bg-black">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <p className="text-center text-gray-800 bg-gray-100 py-4 font-medium">
                {photo.title}
              </p>

              {/* Arrows */}
              {isCenter && (
                <>
                  <button
                    onClick={shiftLeft}
                    className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 z-30
                    bg-white/80 hover:bg-white text-black rounded-full border border-gray-400
                    shadow-md p-2 transition"
                    aria-label="Précédent">
                    ◀
                  </button>
                  <button
                    onClick={shiftRight}
                    className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 z-30
                    bg-white/80 hover:bg-white text-black rounded-full border border-gray-400
                    shadow-md p-2 transition"
                    aria-label="Suivant">
                    ▶
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
