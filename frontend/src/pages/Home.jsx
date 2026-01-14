// src/components/About.js
import React, { useState, useEffect } from "react";
import Feature from "../components/Feature";
import NewArrivals from "../components/NewArrivals";
import Artist from "../components/Artist";
import Videos from "../components/Videos";
import Community from "../components/Community";
import Footer from "../components/Footer";
import HomePageLayout from "../components/HomePageLayout"; // Assuming you have a layout component
import SEO from "../components/SEO";
import DemoBanner from "../components/DemoBanner";
import DemoBannerReset from "../components/DemoBannerReset"; // Development helper
import Hero from "../components/Hero";

const Home = () => {
  const [showBanner, setShowBanner] = useState(true);

  // Check if banner was previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem("demoBannerDismissed");
    if (dismissed) setShowBanner(false);
  }, []);

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("demoBannerDismissed", "true");
  };

  return (
    <>
      <SEO
        title="Soul Felt Music - Experience the Soul of Music"
        description="Discover and stream soulful music from talented artists. Explore albums, tracks, exclusive content, and shop for merchandise at Soul Felt Music."
        keywords="soul music, music streaming, albums, tracks, artists, music store, soul felt music, new releases"
        url="https://soulfeltmusic.com/"
      />
      <div className="min-h-screen bg-transparent">
         <Hero />
         <HomePageLayout />
      </div>
    </>
    
  );
};

export default Home;
