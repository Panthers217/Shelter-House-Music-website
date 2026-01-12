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
      <div className="min-h-screen">
         <HomePageLayout />
      </div>
    </>
    // <section className="bg-gray-100 text-gray-800">
    //   {/* Hero Section */}
    //   <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-16 px-6 text-center">
    //     <h2 className="text-4xl font-bold mb-4">Home Page</h2>
    //     <p className="text-lg">Welcome to Soul Felt Music!</p>
    //   </div>

    //   {/* New Arrivals Section */}
    //   <div className="container mx-auto px-4 py-8">
    //     <h3 className="text-2xl font-semibold mb-6 text-center">New Arrivals</h3>
    //     <NewArrivals />
    //   </div>

    //   {/* Feature Section */}
    //   <div className="bg-white py-8">
    //     <div className="container mx-auto px-4">
    //       <h3 className="text-2xl font-semibold mb-6 text-center">Features</h3>
    //       <Feature />
    //     </div>
    //   </div>

    //   {/* Artist Section */}
    //   <div className="bg-gray-200 py-8">
    //     <div className="container mx-auto px-4">
    //       <h3 className="text-2xl font-semibold mb-6 text-center">Artists</h3>
    //       <Artist />
    //     </div>
    //   </div>

    //   {/* Videos Section */}
    //   <div className="bg-white py-8">
    //     <div className="container mx-auto px-4">
    //       <h3 className="text-2xl font-semibold mb-6 text-center">Videos</h3>
    //       <Videos />
    //     </div>
    //   </div>

    //   {/* Community Section */}
    //   <div className="bg-gray-200 py-8">
    //     <div className="container mx-auto px-4">
    //       <h3 className="text-2xl font-semibold mb-6 text-center">Community</h3>
    //       <Community />
    //     </div>
    //   </div>

    //   {/* Footer Section */}
    //   <Footer />
    // </section>
  );
};

export default Home;
