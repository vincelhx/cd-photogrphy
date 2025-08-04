import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Nom */}
        <div className="text-xl font-semibold font-signature">Célia Dupont</div>

        {/* Liens */}
        <ul className="flex gap-6 text-gray-700 text-sm md:text-base font-medium">
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
