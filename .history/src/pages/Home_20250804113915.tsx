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
        <div className="relative z-10 text-center text-white w-full max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Photographer | Storyteller | Dreamer
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Je vous emmène dans un voyage visuel à travers les émotions, la
            lumière et les instants suspendus.
          </p>
          <a href="#contact">
            <button className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition shadow">
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
