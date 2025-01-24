import React, { useState } from "react";
import { AlignJustify } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-purple-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">CoinPulse</div>

       
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-400">
            Home
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            About
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            Contact
          </a>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <AlignJustify />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-purple-800 text-white p-4 space-y-4">
          <a href="#" className="block hover:text-gray-400">
            Home
          </a>
          <a href="#" className="block hover:text-gray-400">
            About
          </a>
          <a href="#" className="block hover:text-gray-400">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
