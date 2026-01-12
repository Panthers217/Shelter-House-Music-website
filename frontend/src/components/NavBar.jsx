// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFeatures } from '../context/FeaturesContext';

//import './NavBar.css';

const NavBar = () => {
  const { isEnabled } = useFeatures();
  const isMerchandiseEnabled = isEnabled('enable_merchandise');

  return (
    <nav className="flex bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Soul Felt Music</h1>
        <button
          className="block md:hidden text-white focus:outline-none"
          id="menu-toggle"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <ul
          className="hidden md:flex space-x-6 text-lg font-medium"
          id="menu"
        >
          <li><Link to="/" className="hover:text-red-200">Home</Link></li>
          {isMerchandiseEnabled && <li><Link to="/store" className="hover:text-gray-200">Store</Link></li>}
          <li><Link to="/music" className="hover:text-gray-200">Music</Link></li>
          <li><Link to="/artist" className="hover:text-gray-200">Artists</Link></li>
          <li><Link to="/news" className="hover:text-gray-200">News</Link></li>
          <li><Link to="/videos" className="hover:text-gray-200">Videos</Link></li>
          <li><Link to="/community" className="hover:text-gray-200">Community</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
          <li><Link to="/about" className="hover:text-gray-200">About Us</Link></li>
        </ul>
      </div>
      <div className="md:hidden">
        <ul
          className="hidden flex-col space-y-4 text-center bg-blue-600 text-white py-4"
          id="mobile-menu"
        >
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          {isMerchandiseEnabled && <li><Link to="/store" className="hover:text-gray-200">Store</Link></li>}
          <li><Link to="/music" className="hover:text-gray-200">Music</Link></li>
          <li><Link to="/artist" className="hover:text-gray-200">Artists</Link></li>
          <li><Link to="/news" className="hover:text-gray-200">News</Link></li>
          <li><Link to="/videos" className="hover:text-gray-200">Videos</Link></li>
          <li><Link to="/community" className="hover:text-gray-200">Community</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
          <li><Link to="/about" className="hover:text-gray-200">About Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
