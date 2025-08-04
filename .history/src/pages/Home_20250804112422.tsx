import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      <header className="bg-gray-100 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenue sur mon portfolio photo
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Photographe passionné, je capture l'instant avec émotion et précision.
        </p>
        <Link to="/portfolio">
          <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
            Voir la galerie →
          </button>
        </Link>
      </header>

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">À propos</h2>
        <p className="max-w-xl mx-auto text-gray-600">
          Je suis spécialisé en photographie de paysages, de portraits et
          d'événements. Mon but est de raconter des histoires à travers mes
          images.
        </p>
      </section>

      <footer className="footer">
        <div className="container">
          &copy; {new Date().getFullYear()} Mon Nom – Tous droits réservés
        </div>
      </footer>
    </div>
  );
};

export default Home;
