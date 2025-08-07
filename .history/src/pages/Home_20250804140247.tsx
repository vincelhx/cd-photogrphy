import React from "react";
import Navbar from "./NavBar";

const Home: React.FC = () => {
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      <Navbar />

      {/* Main */}
      <main className="pt-20">
        <section
          id="presentation"
          className="h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url("/photos/photo1.png")` }}>
          <div className="px-4">
            <div className="bg-white/80 backdrop-blur-sm text-gray-800 p-8 rounded-md shadow-lg max-w-2xl mx-auto text-center">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                Photographer | Author | Creative Educator
              </h1>
              <p className="text-base md:text-lg text-gray-700 mb-6">
                Avec un regard sensible porté sur les grands espaces naturels...
              </p>
              <a href="#contact">
                <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
                  Me contacter
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <p className="text-lg mb-4 text-gray-600">
            Vous avez un projet ou une question ? Écrivez-moi :
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

      {/* Footer */}
      <footer className="py-6 bg-white text-center text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} Célia Dupont – Tous droits réservés
      </footer>
    </div>
  );
};

export default Home;
