import React from "react";
import heroImage from "../assets/Shelter-House-img3.png";

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Container */}
      <div className="relative w-full">
        {/* Image Container - Responsive aspect ratio */}
        <div className="relative w-full aspect-video md:aspect-[16/9] lg:aspect-[21/9]">
          <img
            src={heroImage}
            alt="Shelter House Music"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          
          {/* Optional Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>

        {/* Optional: Content overlay - Uncomment if you want to add text over the image */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              Welcome to Shelter House Music
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl drop-shadow-md">
              Songs of Healing, Hope, and Faith
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
