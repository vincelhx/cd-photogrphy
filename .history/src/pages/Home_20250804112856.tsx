import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Section principale en plein écran avec image floue */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center bg-gray-100 overflow-hidden">
        {/* Image floue en arrière-plan */}
        <div className="absolute inset-0">
          <img
            src="public/image.png" // Change ce chemin vers ta propre photo floue
            alt="Fond flou"
            className="w-full h-full object-cover filter blur-sm brightness-75"
          />
        </div>

        {/* Contenu au premier plan */}
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Bienvenue sur mon portfolio photo
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto drop-shadow-md">
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

      {/* Section À propos */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">À propos</h2>
        <p className="max-w-xl mx-auto text-gray-600">
          Je suis spécialisé en photographie de paysages, de portraits et
          d'événements. Mon but est de raconter des histoires à travers mes
          images.
        </p>
      </section>

      {/* Pied de page */}
      <footer className="py-6 bg-gray-100 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Célia Dupont – Tous droits réservés
      </footer>
    </div>
  );
};

export default Home;
