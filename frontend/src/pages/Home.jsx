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
        title="Shelter House Music| Christian Music Ministry Serving Eastern North Carolina "
        description="A Christian music ministry serving churches, worship leaders, and gospel artists through faith-centered music. Discover worship resources and support the ministry."
        keywords="christian music ministry, worship music, gospel music, church worship, worship leaders, faith-based music, christian artists, church music resources, Shelter House Music, Eastern North Carolina"
        url="https://shelterhousemusic.com/"
      />
      <div className="min-h-screen bg-transparent">
         <Hero />
         <HomePageLayout />
      </div>
    </>
    
  );
};

export default Home;
