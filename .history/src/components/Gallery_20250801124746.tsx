import React, { useState, useRef, useEffect } from 'react';
import '../css/Gallery.css';

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
  const galleryRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollLeft = galleryRef.current?.scrollLeft || 0;
    const width = window.innerWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    gallery?.addEventListener('scroll', handleScroll);
    return () => gallery?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gallery-container" ref={galleryRef}>
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className={`gallery-slide ${index === activeIndex ? 'active' : 'blurred'}`}
        >
          <img src={photo.src} alt={photo.title} />
          <p>{photo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
