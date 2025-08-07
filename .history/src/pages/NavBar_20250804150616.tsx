import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white h-[20vh] shadow-md top-0 z-50">
      <div className="max-w-6xl mx-auto h-full px-6 flex flex-col justify-center">
        <div className="flex items-center justify-between">
          {/* Nom à gauche */}
          <div className="text-xl font-bold text-gray-800">Célia Dupont</div>

          {/* Liens à droite */}
          <div className="flex space-x-10 text-gray-700 text-sm font-medium">
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
      </div>
    </nav>
  );
};

export default Navbar;
