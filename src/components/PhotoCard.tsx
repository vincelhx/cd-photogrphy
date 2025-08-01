import React from 'react';

type Photo = {
  id: number;
  title: string;
  src: string;
};

type PhotoCardProps = {
  photo: Photo;
};

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  return (
    <div className="photo-card">
      <img src={photo.src} alt={photo.title} />
      <p>{photo.title}</p>
    </div>
  );
};

export default PhotoCard;
