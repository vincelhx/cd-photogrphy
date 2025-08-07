import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-[20vh] bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto h-full px-10 flex items-center justify-between">
        {/* Nom à gauche */}
        <div className="text-4xl font-bold text-gray-900 tracking-wider">
          Célia Dupont
        </div>

        {/* Liens à droite — bien espacés, gros, clean */}
        <div className="flex gap-16 pr-4">
          <a
            href="#presentation"
            className="text-xl text-gray-800 font-medium hover:text-black transition">
            Présentation
          </a>
          <a
            href="#gallery"
            className="text-xl text-gray-800 font-medium hover:text-black transition">
            Galerie
          </a>
          <a
            href="#contact"
            className="text-xl text-gray-800 font-medium hover:text-black transition">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
