// src/components/Artist.js
import React from 'react';
import ImageCarousel from './ImageCarousel'; // Import the ImageCarousel component

const Artist = () => {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Artist Interviews</h2>
        <p className="text-center text-gray-600 mb-8">
          Discover exclusive artist interviews and profiles.
        </p>
        {/* Image Carousel */}
        <div className="max-w-lg mx-auto">
          <ImageCarousel visibleImages={1} />
        </div>
      </div>
    </section>
  );
};
export default Artist;
