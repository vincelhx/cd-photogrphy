import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      <header className="hero">
        <div className="hero-content container">
          <h1>Bienvenue sur mon portfolio photo</h1>
          <p>
            Photographe passionné, je capture l'instant avec émotion et
            précision.
          </p>
          <Link to="/portfolio">
            <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
              Voir la galerie →
            </button>
          </Link>
        </div>
      </header>

      <section className="about container">
        <h2>À propos</h2>
        <p>
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
