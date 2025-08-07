import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Nom à gauche */}
        <div className="text-lg font-bold text-gray-800">Célia Dupont</div>

        {/* Liens à droite — PAS de bullet, 100% horizontal */}
        <div className="space-x-8 text-gray-700 text-sm font-medium">
          <a href="#presentation" className="hover:text-black">
            Présentation
          </a>
          <a href="#gallery" className="hover:text-black">
            Galerie
          </a>
          <a href="#contact" className="hover:text-black">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
