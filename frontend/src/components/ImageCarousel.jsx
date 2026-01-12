import React, { useState } from 'react';
import { useApiData } from '../context/ApiDataContext.jsx';

const ImageCarousel = ({ visibleImages = 1 }) => {
  const { dbSnapshot } = useApiData();

  let images = [];
  if (dbSnapshot) {
    // console.log(
    //   "artist_images array from dbSnapshot:",
    //   dbSnapshot.artist_images.records
    // );
    images = dbSnapshot.artist_images.records.map((img, index) => ({
      id: img.id || index,
      src: img.image_url,
      alt: img.description || `Image ${index + 1}`,
      title: img.artist_name || `Image ${index + 1}`,
    }));
  }
  // const images = [
  //   { id: 1, src: 'https://via.placeholder.com/300', alt: 'Image 1', title: 'Image 1' },
  //   { id: 2, src: 'https://via.placeholder.com/300', alt: 'Image 2', title: 'Image 2' },
  //   { id: 3, src: 'https://via.placeholder.com/300', alt: 'Image 3', title: 'Image 3' },
  //   { id: 4, src: 'https://via.placeholder.com/300', alt: 'Image 4', title: 'Image 4' },
  //   { id: 5, src: 'https://via.placeholder.com/300', alt: 'Image 5', title: 'Image 5' },
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleImages) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - visibleImages : prevIndex - visibleImages
    );
  };

  const displayedImages = images.slice(
    currentIndex,
    currentIndex + visibleImages
  );

  // Handle wrapping around when reaching the end of the array
  if (displayedImages.length < visibleImages) {
    displayedImages.push(
      ...images.slice(0, visibleImages - displayedImages.length)
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Section */}
      <div className="relative flex space-x-4">
        {displayedImages.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
        >
          &#8250;
        </button>
      </div>
      {/* Image Title */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center">
          {images.length > 0 && images[currentIndex] ? images[currentIndex].title : "No images available"}
        </h3>
      </div>
    </div>
  );
};

export default ImageCarousel;