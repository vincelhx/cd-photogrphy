import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-[20vh] bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto h-full px-6 flex flex-col justify-center">
        <div className="flex items-center justify-between">
          {/* Nom */}
          <div className="text-2xl font-serif font-semibold text-gray-900 tracking-wide">
            Célia Dupont
          </div>

          {/* Liens */}
          <div className="flex space-x-10 text-gray-600 text-base">
            <a
              href="#presentation"
              className="hover:text-black transition duration-150 text-2xl md:text-3xl font-semibold mb-4">
              Présentation
            </a>
            <a
              href="#gallery"
              className="hover:text-black transition duration-150">
              Galerie
            </a>
            <a
              href="#contact"
              className="hover:text-black transition duration-150">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
