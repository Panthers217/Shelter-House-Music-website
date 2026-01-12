// src/components/NewArrivals.js
import React from 'react';
import ImageCarousel from './ImageCarousel';

const NewArrivals = () => {
  return (
    <section>
      <h2>New Arrivals</h2>
      <ImageCarousel visibleImages={3} />
    </section>
  );
};

export default NewArrivals;
