import React from 'react';
import PhotoCard from './PhotoCard';
import './Gallery.css'; // <-- à ajouter en haut

type Photo = {
  id: number;
  title: string;
  src: string;
};

type GalleryProps = {
  photos: Photo[];
};

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  return (
    <div className="gallery">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default Gallery;
