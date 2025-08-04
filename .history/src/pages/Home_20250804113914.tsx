import React from "react";
import Navbar from "./NavBar";

const Home: React.FC = () => {
  return (
    <div className="font-sans">
      <Navbar />

      <section
        className="h-screen flex items-center justify-center relative bg-cover bg-center"
        style={{ backgroundImage: `url("/photos/photo1.png")` }}
        id="presentation">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Photographer | Storyteller | Dreamer
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-6">
            Je vous emmène dans un voyage visuel à travers les émotions, la
            lumière et les instants suspendus.
          </p>
          <a href="#gallery">
            <button className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200 transition">
              Voir la galerie
            </button>
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-gray-50 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="mb-4 max-w-md mx-auto text-gray-600">
          Vous avez un projet, une question ou envie de discuter ? Écrivez-moi !
        </p>
        <p className="text-lg font-medium">
          📧{" "}
          <a
            href="mailto:contact@celiadupont.com"a
            className="text-blue-600 underline">
            contact@celiadupont.com
          </a>
        </p>
      </section>

      <footer className="py-6 bg-white text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Célia Dupont – Tous droits réservés
      </footer>
    </div>
  );
};

export default Home;
