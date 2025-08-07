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
  const [photoList, setPhotoList] = useState(photos);
  const [activeIndexViz, setActiveIndexViz] = useState(0); // quel index centrer

  const shiftRight = () => {
    setPhotoList((prev) => {
      const updated = [...prev];
      const first = updated.shift();
      if (first) updated.push(first);
      return updated;
    });
  };

  const shiftLeft = () => {
    setPhotoList((prev) => {
      const updated = [...prev];
      const last = updated.pop();
      if (last) updated.unshift(last);
      return updated;
    });
  };

  /*
  const scrollToIndex = (index: number) => {
    const container = galleryRef.current;
    const slides = container?.querySelectorAll("[data-slide]");
    const slide = slides?.[index] as HTMLElement;

    if (container && slide) {
      const containerCenter = container.offsetWidth / 2;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const scrollPosition = slideCenter - containerCenter;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      // ✅ force visual update immediately so buttons don't disappear
      setActiveIndex(index);
    }
  };

  const updateActiveSlide = () => {
    const container = galleryRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + container.offsetWidth / 2;

    let closest = 0;
    let minDistance = Infinity;

    Array.from(container.querySelectorAll("[data-slide]")).forEach(
      (child, index) => {
        const el = child as HTMLElement;
        const box = el.getBoundingClientRect();
        const slideCenter = box.left + box.width / 2;
        const distance = Math.abs(centerX - slideCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      }
    );

    setActiveIndex(closest);
  };
  */

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

    //container.addEventListener("scroll", updateActiveSlide);
    //window.addEventListener("resize", updateActiveSlide);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      //container.removeEventListener("scroll", updateActiveSlide);
      //window.removeEventListener("resize", updateActiveSlide);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      const firstSlide = container.querySelector("[data-slide]") as HTMLElement;
      if (!firstSlide) return;

      const containerCenter = container.offsetWidth / 2;
      const slideCenter = firstSlide.offsetLeft + firstSlide.offsetWidth / 2;
      const scrollPosition = slideCenter - containerCenter;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    });
  }, [photoList]);

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

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center bg-white">
      {/* PHOTOS */}

      <div
        ref={galleryRef}
        className="flex overflow-x-scroll scroll-smooth gap-8 py-8 no-scrollbar snap-x snap-mandatory"
        style={{
          paddingLeft: "calc(50% - 30vw)", // center 60vw slide
          scrollBehavior: "smooth",
        }}>
        {photoList.map((photo, index) => {
          const isFirst = index === 0;
          return (
            <div
              key={photo.id}
              data-slide
              style={{
                marginLeft: isFirst ? "calc(50% - 30vw)" : undefined, // 30vw = la moitié de 60vw
              }}
              className={`
        ${isFirst ? "relative z-20 overflow-visible" : "z-10 overflow-hidden"}
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
              {index === 0 && (
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
