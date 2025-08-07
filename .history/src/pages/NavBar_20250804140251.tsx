import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="py-6 bg-white text-center text-sm text-gray-500 border-t">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Nom */}
        <div className="text-lg font-bold text-gray-800">Célia Dupont</div>

        {/* Liens */}
        <div className="flex gap-6 text-gray-700 text-sm font-medium">
          <a href="#presentation" className="hover:text-black no-underline">
            Présentation
          </a>
          <a href="#gallery" className="hover:text-black no-underline">
            Galerie
          </a>
          <a href="#contact" className="hover:text-black no-underline">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
