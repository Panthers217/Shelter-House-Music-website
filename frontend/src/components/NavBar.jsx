// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
//import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>Soul Felt Music</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/store">Store</Link></li>
        <li><Link to="/music">Music</Link></li>
        <li><Link to="/artist">Artists</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/videos">Videos</Link></li>
        <li><Link to="/community">Community</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
