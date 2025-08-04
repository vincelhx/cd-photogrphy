import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Nom à gauche */}
        <div className="text-lg font-semibold text-gray-800">Célia Dupont</div>

        {/* Liens à droite */}
        <div className="flex gap-8 text-gray-700 text-sm font-medium">
          <a href="#presentation" className="hover:text-black transition">
            Présentation
          </a>
          <a href="#gallery" className="hover:text-black transition">
            Galerie
          </a>
          <a href="#contact" className="hover:text-black transition">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
