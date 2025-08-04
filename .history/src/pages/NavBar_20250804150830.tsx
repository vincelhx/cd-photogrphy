import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-[20vh] bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto h-full px-8 flex flex-col justify-center">
        <div className="flex items-center justify-between">
          {/* Nom */}
          <div className="text-3xl font-semibold text-gray-900 tracking-wide">
            Célia Dupont
          </div>

          {/* Liens (plus gros, espacés, bien alignés) */}
          <div className="flex gap-12 text-lg font-light text-gray-700">
            <a href="#presentation" className="hover:text-black transition">Présentation</a>
            <a href="#gallery" className="hover:text-black transition">Galerie</a>
            <a href="#contact" className="hover:text-black transition">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
