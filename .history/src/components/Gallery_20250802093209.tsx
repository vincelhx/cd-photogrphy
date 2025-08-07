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
  const [activeIndex, setActiveIndex] = useState(0);
  const initialIndex = Math.floor(photos.length / 2);
  const [photoList, setPhotoList] = useState(photos);

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

  const scrollToIndex = (index: number) => {
    console.log(index);
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

  // 1. Attach events (scroll, resize, clavier)
  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;

    const onKeyDown = (e: KeyboardEvent) => {
      setActiveIndex((prev) => {
        const next =
          e.key === "ArrowRight"
            ? Math.min(prev + 1, photos.length - 1)
            : e.key === "ArrowLeft"
            ? Math.max(prev - 1, 0)
            : prev;

        scrollToIndex(next);
        return next;
      });
    };

    container.addEventListener("scroll", updateActiveSlide);
    window.addEventListener("resize", updateActiveSlide);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("scroll", updateActiveSlide);
      window.removeEventListener("resize", updateActiveSlide);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  // 2. Scroll initial une seule fois
  useEffect(() => {
    scrollToIndex(initialIndex);
  }, []);
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center bg-white">
      {/* PHOTOS */}

      <div
        ref={galleryRef}
        style={{
          scrollBehavior: "smooth",
          overflowX: "scroll",
          display: "flex",
        }}
        className="flex overflow-x-scroll scroll-smooth gap-8 py-8 no-scrollbar px-8 snap-x snap-mandatory">
        {photoList.map((photo, index) => {
          console.log({ index, activeIndex });
          return (
            <div
              key={photo.id}
              data-slide
              className={`
              ${
                index === activeIndex
                  ? "relative z-20 overflow-visible"
                  : "z-10 overflow-hidden"
              }
              shrink-0 w-[45vw] max-w-[700px] h-[60vh]
              flex flex-col justify-between bg-white rounded-xl shadow-xl snap-center transition-all duration-300
              ${
                index === activeIndex
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
              {index === activeIndex && (
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
