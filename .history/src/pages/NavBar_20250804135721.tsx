import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Nom à gauche */}
        <div className="text-lg font-bold">Célia Dupont</div>

        {/* Liens à droite */}
        <ul className="flex gap-8 text-gray-800 text-sm font-medium">
          <li>
            <a href="#presentation" className="hover:text-black">
              Présentation
            </a>
          </li>
          <li>
            <a href="#gallery" className="hover:text-black">
              Galerie
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-black">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
