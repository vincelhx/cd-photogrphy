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
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndexViz, setActiveIndexViz] = useState(0); // quel index centrer

  const shiftRight = () => {
    setActiveIndexViz((prev) => (prev + 1) % photos.length);
  };

  const shiftLeft = () => {
    setActiveIndexViz((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // 1. Attach events (scroll, resize, clavier)
  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        shiftRight(); // ✅ utilise ta logique de décalage circulaire
      } else if (e.key === "ArrowLeft") {
        shiftLeft();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;

      // Seuil minimum pour considérer comme un vrai swipe
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          shiftLeft(); // swipe vers la droite → on recule
        } else {
          shiftRight(); // swipe vers la gauche → on avance
        }
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const visibleCount = 3;
  const middleIndex = Math.floor(visibleCount / 2);

  // Ajoute les deux derniers au début et les deux premiers à la fin
  const paddedPhotos = [
    ...photos.slice(-middleIndex), // les 2 derniers
    ...photos,
    ...photos.slice(0, middleIndex), // les 2 premiers
  ];

  // Décale pour centrer l'index actif
  const photosCircular = paddedPhotos.slice(
    activeIndexViz,
    activeIndexViz + visibleCount
  );
  console.log(photosCircular);
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center bg-white">
      {/* PHOTOS */}

      <div
        ref={galleryRef}
        className="flex scroll-smooth gap-8 py-8 no-scrollbar snap-x snap-mandatory"
        style={
          {
            transform: `translateX(-${(100 / visibleCount) * middleIndex}vw)`,
          }
        }>
        {photosCircular.map((photo, index) => {
          const isFirst = index === middleIndex;
          return (
            <div
              key={`${photo.id}-${index}`} // ← unique même si id dupliqué
              data-slide
              className={`
              ${
                isFirst
                  ? "relative z-20 overflow-visible"
                  : "z-10 overflow-hidden"
              }
              shrink-0 w-[45vw] max-w-[700px] h-[60vh]
              flex flex-col justify-between bg-white rounded-xl shadow-xl snap-center transition-all duration-300
              ${
                isFirst
                  ? "w-[60vw] max-w-[900px] scale-100 opacity-100 blur-0"
                  : "w-[40vw] max-w-[600px] scale-90 opacity-60 blur-sm"
              }
            `}>
              {/* Image container */}
              <div className="relative w-full h-full bg-black">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {index === middleIndex && (
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

              {/* Title */}
              <p className="text-center text-gray-800 bg-gray-100 py-4 font-medium">
                {photo.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
