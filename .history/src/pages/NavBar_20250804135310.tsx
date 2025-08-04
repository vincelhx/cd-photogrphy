import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-10 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Nom à gauche */}
        <div className="text-lg md:text-xl font-semibold tracking-wide">
          Célia Dupont
        </div>

        {/* Liens à droite */}
        <ul className="flex space-x-10 text-sm md:text-base text-gray-700 font-medium">
          <li>
            <a href="#presentation" className="hover:text-black transition">
              Présentation
            </a>
          </li>
          <li>
            <a href="#gallery" className="hover:text-black transition">
              Galerie
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-black transition">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
