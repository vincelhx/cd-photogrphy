import React from 'react';
import Gallery from '../components/Gallery';

const samplePhotos = [
  {
    id: 1,
    title: 'Coucher de soleil',
    src: '/photos/photo1.png',
  },
  {
    id: 2,
    title: 'Portrait en noir et blanc',
    src: '/photos/photo2.png',
  },
  {
    id: 3,
    title: 'Paysage de montagne',
    src: '/photos/photo3.png',
  },
];

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Ma Galerie</h1>
      <Gallery photos={samplePhotos} />
    </div>
  );
};

export default Portfolio;
