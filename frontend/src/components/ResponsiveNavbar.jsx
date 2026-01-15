import { BrowserRouter as Router, Route, Routes, Link,  } from "react-router-dom";
// import React, { useState, useMemo } from "react";
import { useApiData } from "../context/ApiDataContext";
import { useFeatures } from "../context/FeaturesContext";
import { useCart } from "../context/CartContext";
import { useNavbar } from "../context/NavbarContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import SearchBar from "./SearchBar";
import shelterLogo from "../assets/Shelter-house-logo.png";

export default function ResponsiveNavbar() {
  const { websiteUser, websiteSettings } = useApiData();
  const { isEnabled } = useFeatures();
  const { getCartCount } = useCart();
  // const location = useLocation();
  const isMerchandiseEnabled = isEnabled('enable_merchandise');
  const isVideosEnabled = isEnabled('enable_videos');
  const isUserAccountsEnabled = isEnabled('enable_user_accounts');
  
  const cartCount = getCartCount();
  
  
  // Fallback logo 2 with customizable text
  const defaultLogo2 = (
    <div className="flex flex-col items-center">
      <span className="logoLine1 text-shelter-honey text-xs tracking-widest">
        {websiteSettings?.logo_line1 || null}
      </span>
      <span className="logoLine2 text-shelter-honey text-lg font-medium tracking-widest">
        {websiteSettings?.logo_line2 || null}
      </span>
    </div>
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const MobileTabletNavbar = () => {
    const { isNavbarOpen, toggleNavbar, closeNavbar } = useNavbar();
  
    return (
      <nav className="bg-shelter-charcoal w-full  fixed top-0 left-0 right-0 z-[100]">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" onClick={closeNavbar}>
            {websiteSettings?.logo_url ? (
              <img 
                src={websiteSettings.logo_url} 
                alt="Soul Felt Music" 
                className="h-12 w-auto object-contain"
              />
            ) : (
              <img 
                src={shelterLogo} 
                alt="Shelter House Music" 
                className="h-12 w-auto object-contain"
              />
            )}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-2xl font-['Brush_Script_MT','Lucida_Handwriting','cursive'] italic">
              Shelter House Music
            </span>
          </Link>
          
          {/* Right Side - Cart & Hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative" onClick={closeNavbar}>
              <svg className="w-7 h-7 text-shelter-white hover:text-shelter-honey transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-shelter-amber text-shelter-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Hamburger */}
            <button
              className="text-shelter-white focus:outline-none"
              onClick={toggleNavbar}
              aria-label="Toggle menu"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <rect y="8" width="32" height="2" rx="1" fill="currentColor" />
                <rect y="15" width="32" height="2" rx="1" fill="currentColor" />
                <rect y="22" width="32" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
        {/* Menu */}
        {isNavbarOpen && (
          <div className="bg-shelter-charcoal border-t border-shelter-slate w-full">
            <ul className="flex flex-col py-2 px-4 space-y-3 text-shelter-white text-base">
              <Link to="/" onClick={closeNavbar}>Home</Link>
              {isMerchandiseEnabled && <Link to="/store" onClick={closeNavbar}>Store</Link>}
              <Link to="/music" onClick={closeNavbar}>Music</Link>
              <Link to="/artists" onClick={closeNavbar}>Artists</Link>
              {/* <Link to="/news" onClick={closeNavbar}>News</Link> */}
              {isVideosEnabled && <Link to="/videos" onClick={closeNavbar}>Videos</Link>}
              <Link to="/community" onClick={closeNavbar}>Community/News</Link>
              <Link to="/about" onClick={closeNavbar}>About</Link>
              <Link to="/contact" onClick={closeNavbar}>Contact</Link>
              {websiteUser?.isAdmin && (
                <>
                  <Link to="/admin/dashboard" className="text-shelter-honey font-semibold" onClick={closeNavbar}>🔧 Admin Dashboard</Link>
                  <Link to="/admin/newsletter" className="text-shelter-honey font-semibold" onClick={closeNavbar}>📧 Newsletter</Link>
                  <Link to="/admin/faq" className="text-shelter-honey font-semibold" onClick={closeNavbar}>❓ FAQ Management</Link>
                </>
              )}
            </ul>
            <div className="px-4 pb-4">
              <div className="border border-shelter-slate rounded-md p-3 w-40 flex flex-col gap-2">
                {websiteUser ? (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-shelter-honey flex items-center justify-center">
                        <span className="text-shelter-charcoal font-bold text-sm">
                          {websiteUser.email?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-shelter-white text-xs truncate max-w-[100px]">
                          {websiteUser.email}
                        </span>
                      </div>
                    </div>
                    <Link 
                      to="/purchase-history"
                      className="text-shelter-white text-base hover:text-shelter-honey transition-colors flex items-center gap-2"
                      onClick={closeNavbar}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Purchases
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        closeNavbar();
                      }}
                      className="text-shelter-amber text-base hover:text-shelter-honey transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    {(isUserAccountsEnabled || websiteUser?.isAdmin) && (
                      <>
                        <Link to="/sign-up" className="text-shelter-honey text-base hover:text-shelter-amber" onClick={closeNavbar}>Sign Up</Link>
                        <Link to="/login" className="text-shelter-honey text-base hover:text-shelter-amber" onClick={closeNavbar}>Login</Link>
                      </>
                    )}
                  </>
                )}
                {/* {showSearchBar && (
                  <div className="mt-2" style={{ maxWidth: '100%' }}>
                    <div className="relative">
                      <div className="[&>div]:max-w-full [&>div]:mx-0 [&>div]:mb-0 [&_input]:bg-transparent [&_input]:border-[#c90036] [&_input]:text-[#e6cfa7] [&_input]:text-sm [&_input]:py-1 [&_input]:px-3 [&_input]:rounded-full [&_input]:pl-3 [&_input]:pr-8 [&_input]:focus:border-[#c90036] [&_.absolute.left-4]:hidden [&_.absolute.right-4]:right-2 [&_.absolute.right-4]:top-2 [&_.mt-2]:hidden">
                        <SearchBar key="mobile-search" onSearchResults={setSearchResults} viewMode="all" />
                      </div>
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <circle cx="8" cy="8" r="7" stroke="#c90036" strokeWidth="2" />
                          <line x1="13" y1="13" x2="17" y2="17" stroke="#c90036" strokeWidth="2" />
                        </svg>
                      </span>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        )}
      </nav>
    );
  };

  const DesktopNavbar = () => {
    return (
      <nav className="bg-shelter-charcoal w-full flex items-center flex-wrap fixed top-0 left-0 right-0 z-[100]">
        {/* Logo Section */}
        <Link to="/" className="flex items-center justify-center gap-4 px-6 py-2 bg-[#0c0504]" style={{ minWidth: 145 }}>
          {websiteSettings?.logo_url ? (
            <img 
              src={websiteSettings.logo_url} 
              alt="Soul Felt Music" 
              className="h-16 w-auto object-contain"
            />
          ) : (
            <img 
              src={shelterLogo} 
              alt="Shelter House Music" 
              className="h-16 w-auto object-contain"
            />
          )}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-3xl font-['Brush_Script_MT','Lucida_Handwriting','cursive'] italic whitespace-nowrap">
            Shelter House Music
          </span>
        </Link>
        {/* Nav Links */}
        <ul className="flex-1 flex justify-center items-center gap-[1rem] md:gap-[1rem] xl:gap-16 lg:text-md xl:text-[1.5rem] text-[#e6cfa7] xl:text-lg text-[1rem] font-normal">
          <Link to="/">Home</Link>
          {isMerchandiseEnabled && <Link to="/store">Store</Link>}
          <Link to="/music">Music</Link>
          <Link to="/artists">Artists</Link>
          {/* <Link to="/news">News</Link> */}
          {isVideosEnabled && <Link to="/videos">Videos</Link>}
          <Link to="/community">Community/News</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {websiteUser?.isAdmin && (
            <>
              <Link to="/admin/dashboard" className="text-[#f7c900] font-semibold">🔧 Admin</Link>
              <Link to="/admin/newsletter" className="text-[#f7c900] font-semibold">📧 Newsletter</Link>
              <Link to="/admin/faq" className="text-[#f7c900] font-semibold">❓ FAQ</Link>
            </>
          )}
        </ul>
        {/* Auth/Search/Cart Section */}
        <div className="flex items-center gap-6 px-6 py-2 bg-[#1a0b0d]" style={{ minWidth: 220 }}>
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <svg className="w-7 h-7 text-[#e6cfa7] hover:text-[#f7c900] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c90036] text-[#e6cfa7] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {websiteUser ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c90036] flex items-center justify-center">
                  <span className="text-[#e6cfa7] font-bold text-lg">
                    {websiteUser.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#e6cfa7] text-sm font-medium truncate max-w-[120px]">
                    {websiteUser.email}
                  </span>
                  <Link 
                    to="/purchase-history"
                    className="text-[#e6cfa7] text-xs hover:text-[#f7c900] transition-colors text-left flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    My Purchases
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-[#c90036] text-xs hover:text-[#1976d2] transition-colors text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {(isUserAccountsEnabled || websiteUser?.isAdmin) && (
                <>
                  <Link to="/sign-up" className="text-[#1976d2] text-lg font-medium">Sign Up</Link>
                  <Link to="/login" className="text-[#1976d2] text-lg font-medium">Login</Link>
                </>
              )}
            </>
          )}
          {/* {showSearchBar && (
            <div className="relative" style={{ width: '140px' }}>
              <div className="[&>div]:max-w-full [&>div]:mx-0 [&>div]:mb-0 [&_input]:bg-transparent [&_input]:border-[#c90036] [&_input]:text-[#e6cfa7] [&_input]:text-sm [&_input]:py-1 [&_input]:px-3 [&_input]:rounded-full [&_input]:w-full [&_input]:pl-3 [&_input]:pr-8 [&_input]:focus:border-[#c90036] [&_input]:focus:w-full [&_.absolute.left-4]:hidden [&_.absolute.right-4]:right-2 [&_.absolute.right-4]:top-2 [&_.mt-2]:hidden">
                <SearchBar key="desktop-search" onSearchResults={setSearchResults} viewMode="all" />
              </div>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <circle cx="8" cy="8" r="7" stroke="#c90036" strokeWidth="2" />
                  <line x1="13" y1="13" x2="17" y2="17" stroke="#c90036" strokeWidth="2" />
                </svg>
              </span>
            </div>
          )} */}
        </div>
      </nav>
    );
  };
  

  return (
    <>
      {/* Mobile & Tablet: <lg */}
      <div className="block lg:hidden xl:hidden">
        <MobileTabletNavbar />
      </div>
      {/* Desktop & Laptop: lg+ */}
      <div className="hidden lg:flex xl:flex">
        <DesktopNavbar />
      </div>
      {/* <div className="hidden lg:flex xl:hidden">
        <LaptopNavbar />
      </div>   */}
    </>
  );
}