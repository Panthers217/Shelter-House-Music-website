import React, { useState } from "react";

const MobileTabletNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#0c0504] w-full">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <span className="text-[#e6cfa7] text-xs tracking-widest">SOULFELT</span>
          <span className="text-[#e6cfa7] text-lg font-medium tracking-widest">MUSIC</span>
          <div className="w-20 h-1 bg-[#f7c900] mt-1 mb-1" />
          <span className="text-[#e6cfa7] text-[7px] tracking-widest">FEEL THE VIBES</span>
        </div>
        {/* Hamburger */}
        <button
          className="text-[#e6cfa7] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
            <rect y="8" width="32" height="2" rx="1" fill="#e6cfa7" />
            <rect y="15" width="32" height="2" rx="1" fill="#e6cfa7" />
            <rect y="22" width="32" height="2" rx="1" fill="#e6cfa7" />
          </svg>
        </button>
      </div>
      {/* Menu */}
      {menuOpen && (
        <div className="bg-[#0c0504] border-t border-[#1a1312] w-full">
          <ul className="flex flex-col py-2 px-4 space-y-3 text-[#e6cfa7] text-base">
            <li>Home</li>
            <li>Store</li>
            <li>Music</li>
            <li>Artists</li>
            <li>News</li>
            <li>Videos</li>
            <li>Community</li>
            <li>Contact</li>
          </ul>
          <div className="px-4 pb-4">
            <div className="border border-[#1a1312] rounded-md p-3 w-40 flex flex-col gap-2">
              <a href="#" className="text-[#1976d2] text-base">Sign Up</a>
              <a href="#" className="text-[#1976d2] text-base">Login</a>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border border-[#c90036] rounded-full px-3 py-1 text-[#e6cfa7] w-full text-sm focus:outline-none"
                />
                <span className="absolute right-2 top-1.5">
                  <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                    <circle cx="8" cy="8" r="7" stroke="#c90036" strokeWidth="2" />
                    <line x1="13" y1="13" x2="17" y2="17" stroke="#c90036" strokeWidth="2" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default MobileTabletNavbar;
