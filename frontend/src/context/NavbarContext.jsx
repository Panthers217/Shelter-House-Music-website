import React, { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export function NavbarProvider({ children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

  const toggleNavbar = () => {
    setIsNavbarOpen(prev => !prev);
  };

  const openNavbar = () => {
    setIsNavbarOpen(true);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <NavbarContext.Provider value={{ isNavbarOpen, toggleNavbar, openNavbar, closeNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
