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
    <div className="bg-green-500 text-white p-4 text-xl">
  ✅ TAILWIND EST BIEN EN TRAIN DE TOURNER
</div>
    <div className="min-h-screen bg-gray-100 px-4 py-10">
    <h1 className="text-3xl text-center font-bold mb-8">Ma Galerie</h1>
    <Gallery photos={samplePhotos} />
    </div>
  );
};

export default Portfolio;
