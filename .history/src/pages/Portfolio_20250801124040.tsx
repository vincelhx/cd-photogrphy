import React from 'react';
import Gallery from '../components/Gallery';
import '../css/Portfolio.css';

const samplePhotos = [
  {
    id: 1,
    title: 'Coucher de soleil',
    src: '/photos/photo1.jpg',
  },
  {
    id: 2,
    title: 'Portrait en noir et blanc',
    src: '/photos/photo2.jpg',
  },
  {
    id: 3,
    title: 'Paysage de montagne',
    src: '/photos/photo3.png',
  },
];

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio container">
      <h1>Ma Galerie</h1>
      <Gallery photos={samplePhotos} />
    </div>
  );
};

export default Portfolio;
