// src/components/Header.jsx
import React from "react";

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="bg-purple-700 text-white px-1 rounded">UX</span>
            <span className="text-purple-700">ceptional</span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-purple-700 font-medium">
              Sign In
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
