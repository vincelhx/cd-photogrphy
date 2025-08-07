import React from "react";

const NavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Nom */}
        <div className="text-xl font-signature font-semibold tracking-wide">
          Célia Dupont
        </div>

        {/* Menu de navigation */}
        <ul className="flex space-x-6 text-sm md:text-base font-medium text-gray-700">
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

export default NavBar;
