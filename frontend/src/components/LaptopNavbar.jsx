
import React from "react";

export default function LaptopNavbar() {
  return (
    <nav
      className="bg-[#1a0b0d]    flex items-center mx-auto"
      style={{ maxWidth: "1439px", minWidth: "1024px", width: "100%" }}
    >
      {/* Logo Section */}
      <div
        className="flex flex-col items-center justify-center px-0 py-0 bg-[#0c0504] h-[63px]"
        style={{ minWidth: 145 }}
      >
        <span className="text-[#e6cfa7] text-xs tracking-widest mt-2">SOULFELT</span>
        <span className="text-[#e6cfa7] text-lg font-medium tracking-widest">MUSIC</span>
        <div className="w-36 h-0.5 bg-[#f7c900] mt-1 mb-1" />
        <span className="text-[#e6cfa7] text-[7px] tracking-widest mb-1">FEEL THE VIBES</span>
      </div>
      {/* Nav Links */}
      <ul className=" flex-1 flex justify-center items-center gap-14 text-[#e6cfa7] text-base font-normal h-[63px]">
        <li><a href="#" className="hover:text-[#e6cfa7]">Home</a></li>
        <li><a href="#" className="hover:text-[#e6cfa7]">Store</a></li>
        <li><a href="#" className="hover:text-[#e6cfa7]">Music</a></li>
        <li><a href="#" className="hover:text-[#e6cfa7]">Artists</a></li>
        <li><a href="#" className="hover:text-[#e6cfa7]">News</a></li>
        <li><a href="#" className="hover:text-[#e6cfa7]">Videos</a></li>
        <li><a href="#" className="hover:text-[#e6cfa7]">Community</a></li>
        <li><a href="#" className="hover:text-[#e6cfa7]">Contact</a></li>
      </ul>
      {/* Auth/Search Section */}
      <div className="flex items-center gap-6 px-6 py-0 bg-[#1a0b0d] h-[63px]" style={{ minWidth: 220 }}>
        <a href="#" className="text-[#1976d2] text-base font-medium">Sign Up</a>
        <a href="#" className="text-[#1976d2] text-base font-medium">Login</a>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border border-[#c90036] rounded-full px-3 py-1 text-[#e6cfa7] w-20 text-sm focus:outline-none"
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
