import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero section full height */}
      <header className="h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texte à gauche */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue sur mon portfolio photo
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-md mb-6">
              Photographe passionné, je capture l'instant avec émotion et
              précision.
            </p>
            <Link to="/portfolio">
              <button className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
                Voir la galerie →
              </button>
            </Link>
          </div>

          {/* Photos floutées à droite */}
          <div className="flex flex-col gap-4">
            <img
              src="/photos/photo1.png"
              alt="Photo 1"
              className="w-full h-48 object-cover rounded-xl filter blur-sm"
            />
            <img
              src="/photos/photo2.png"
              alt="Photo 2"
              className="w-full h-48 object-cover rounded-xl filter blur-sm"
            />
            <img
              src="/photos/photo3.png"
              alt="Photo 3"
              className="w-full h-48 object-cover rounded-xl filter blur-sm"
            />
          </div>
        </div>
      </header>

      {/* À propos */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">À propos</h2>
        <p className="max-w-xl mx-auto text-gray-600">
          Je suis spécialisé en photographie de paysages, de portraits et
          d'événements. Mon but est de raconter des histoires à travers mes
          images.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Célia Dupont – Tous droits réservés
      </footer>
    </div>
  );
};

export default Home;
