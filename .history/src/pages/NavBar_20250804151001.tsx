import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-[20vh] bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto h-full px-8 flex items-center justify-between">
        {/* Nom à gauche */}
        <div className="text-3xl font-semibold text-gray-900 tracking-wide">
          Célia Dupont
        </div>

        {/* Liens à droite */}
        <div className="flex items-center gap-12">
          <a
            href="#presentation"
            className="text-lg text-gray-700 hover:text-black transition">
            Présentation
          </a>
          <a
            href="#gallery"
            className="text-lg text-gray-700 hover:text-black transition">
            Galerie
          </a>
          <a
            href="#contact"
            className="text-lg text-gray-700 hover:text-black transition">
            Contact ddddd
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
