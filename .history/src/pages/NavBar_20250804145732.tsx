import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Nom à gauche */}
        <div className="text-lg font-bold text-gray-800">Célia Dupont</div>

        {/* Liens à droite avec bon espacement */}
        <div className="flex space-x-8 text-gray-700 text-sm font-medium">
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
