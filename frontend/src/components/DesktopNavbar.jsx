import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const DesktopNavbar = () => {
  return (
    <nav className="bg-[#1a0b0d] w-full flex items-center">
      <section>
        
      </section>
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center px-6 py-2 bg-[#0c0504]" style={{ minWidth: 145 }}>
        <span className="text-[#e6cfa7] text-xs tracking-widest">SOULFELT</span>
        <span className="text-[#e6cfa7] text-lg font-medium tracking-widest">MUSIC</span>
        <div className="w-28 h-1 bg-[#f7c900] mt-1 mb-1" />
        <span className="text-[#e6cfa7] text-[7px] tracking-widest">FEEL THE VIBES</span>
      </div>
      {/* Nav Links */}
      <div className="flex-1 flex justify-center items-center gap-[1rem] md:gap-[1rem] xl:gap-16 lg:text-md xl:text-[1.5rem] text-[#e6cfa7] xl:text-lg text-[1rem] font-normal">
        <Link>Home</Link>
        <Link>Store</Link>
        <Link>Music</Link>
        <Link>Artists</Link>
        <Link>News</Link>
        <Link>Videos</Link>
        <Link>Community</Link>
        <Link>Contact</Link>
      </div>
      {/* Auth/Search Section */}
      <div className="flex items-center gap-6 px-6 py-2 bg-[#1a0b0d]" style={{ minWidth: 220 }}>
        <a href="#" className="text-[#1976d2] text-lg font-medium">Sign Up</a>
        <a href="#" className="text-[#1976d2] text-lg font-medium">Login</a>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border border-[#c90036] rounded-full px-3 py-1 text-[#e6cfa7] w-24 text-sm focus:outline-none"
          />
          <span className="absolute right-2 top-1.5">
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <circle cx="8" cy="8" r="7" stroke="#c90036" strokeWidth="2" />
              <line x1="13" y1="13" x2="17" y2="17" stroke="#c90036" strokeWidth="2" />
            </svg>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default DesktopNavbar;
