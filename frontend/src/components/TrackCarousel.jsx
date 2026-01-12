import React, { useState, useRef, useEffect } from 'react';
import TrackCard from './TrackCard';

function TrackCarousel({ tracks, getTrackImage, getArtistName, itemsPerView = 'responsive' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const carouselRef = useRef(null);

  // Determine items to show based on screen size and prop
  useEffect(() => {
    const updateItemsToShow = () => {
      if (itemsPerView === 'all') {
        setItemsToShow(tracks.length);
      } else if (itemsPerView === 'responsive') {
        // sm: 1 item, md and above: 3 items
        if (window.innerWidth < 426) {
          setItemsToShow(1);
        } else {
          setItemsToShow(3);
        }
      } else if (typeof itemsPerView === 'number') {
        setItemsToShow(itemsPerView);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, [itemsPerView, tracks.length]);

  const maxIndex = Math.max(0, tracks.length - itemsToShow);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Show all cards if itemsPerView is 'all'
  if (itemsPerView === 'all' || tracks.length <= itemsToShow) {
    return (
      <div className="flex flex-wrap gap-8 justify-center">
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            purchaseLink={track.purchase_link}
            albumCoverUrl={getTrackImage(track)}
            artistName={getArtistName(track.artist_id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#aa2a46] hover:bg-[#8a1f36] text-white rounded-full p-3 shadow-lg transition-all duration-300 -ml-4"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Carousel Container */}
      <div className="overflow-hidden" style={{ padding: itemsToShow === 1 ? '0 calc(50% - 120px)' : '0 1rem' }}>
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out gap-8"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsToShow}% - ${(itemsToShow - 1) * 32 / itemsToShow}px)` }}
            >
              <TrackCard
                track={track}
                purchaseLink={track.purchase_link}
                albumCoverUrl={getTrackImage(track)}
                artistName={getArtistName(track.artist_id)}
              />
            </div>
          ))}
        </div>
      </div>

      {currentIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#aa2a46] hover:bg-[#8a1f36] text-white rounded-full p-3 shadow-lg transition-all duration-300 -mr-4"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Dots Indicator */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-[#aa2a46]'
                  : 'w-2 bg-[#aa2a46]/30 hover:bg-[#aa2a46]/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackCarousel;
