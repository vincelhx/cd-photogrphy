import React from "react";
import Navbar from "./NavBar";

const Home: React.FC = () => {
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden scroll-smooth">
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="presentation"
        className="h-screen flex items-center justify-center relative bg-cover bg-center px-4"
        style={{ backgroundImage: `url("/photos/photo1.png")` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Content */}
        <div className="relative z-10 bg-white/70 backdrop-blur-sm text-gray-800 p-8 rounded-md shadow-lg max-w-2xl w-full text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Photographer | Author | Creative Educator
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Avec un regard sensible porté sur les grands espaces naturels, je
            capture des histoires visuelles de l’Arctique aux déserts lointains.
            Basée en France, je collabore avec des marques, lieux, et projets
            inspirants pour créer des visuels qui marquent.
          </p>
          <a href="#contact">
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded transition">
              Me contacter
            </button>
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-20 px-6 bg-gray-50 text-center overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <p className="text-lg mb-4 text-gray-600">
            Vous avez un projet, une question ou envie de discuter ? Écrivez-moi
            ici :
          </p>
          <p className="text-lg font-medium">
            📧{" "}
            <a
              href="mailto:contact@celiadupont.com"
              className="text-blue-600 underline">
              contact@celiadupont.com
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 bg-white text-center text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Célia Dupont – Tous droits réservés
      </footer>
    </div>
  );
};

export default Home;
