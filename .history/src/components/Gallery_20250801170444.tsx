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
      {/* Slides */}
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
              className={`shrink-0 w-[45vw] max-w-[700px] h-[60vh] flex flex-col justify-between bg-white rounded-xl overflow-hidden shadow-xl snap-center transition-all duration-300 ${
                index === activeIndex
                  ? "w-[60vw] max-w-[9000px] scale-100 opacity-100 blur-0 z-20"
                  : "w-[40vw] max-w-[600px] scale-90 opacity-60 blur-sm z-10"
              }`}>
              {/* Image container */}
              <div className="relative w-full h-full bg-black">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />

                {/* ◀ LEFT */}
                {index === activeIndex && (
                  <button
                    onClick={() => {
                      shiftLeft();
                      console.log("Clicked ▶");
                      //scrollToIndex(activeIndex - 1);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white text-black font-bold rounded-full shadow border border-black px-4 py-2 text-[clamp(2rem,4vw,3rem)]"
                                          ◀
                  </button>
                )}

                {/* ▶ RIGHT */}
                {index === activeIndex && (
                  <button
                    onClick={() => {
                      shiftRight();
                      console.log("Clicked ◀");
                      //scrollToIndex(activeIndex + 1);
                    }}
                    className="absolute top-1/2 right-1/2 translate-x-full -translate-y-1/2 z-50 bg-white text-black font-bold rounded-full shadow border border-black px-5 py-3 text-[clamp(2rem,5vw,4rem)]">
                    ▶
                  </button>
                )}
              </div>

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
