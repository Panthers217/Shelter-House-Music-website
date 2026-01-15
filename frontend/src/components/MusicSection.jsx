import React, { useRef } from "react";
import TrackCard from "./TrackCard";
import AlbumCard from "./AlbumCard";

const MusicSection = ({ 
  section, 
  sectionItems, 
  viewMode, 
  isMobile, 
  getTrackImage, 
  getArtistName,
  useSwipe 
}) => {
  // Create ref for this section's scroll container
  const scrollRef = useRef(null);
  const swipeHandlers = useSwipe(scrollRef);

  // Scroll functions for arrow buttons
  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = isMobile ? scrollRef.current.offsetWidth : 350; // Approximate card width
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = isMobile ? scrollRef.current.offsetWidth : 350;
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  if (sectionItems.length === 0) return null;

  return (
    <div key={section.key} className="mb-8 ">
      <h2 className="text-shelter-honey text-3xl font-bold mb-6 font-['Public_Sans'] text-center">
        {section.label}
      </h2>
      {/* Container with arrows and scrollable content */}
      <div className="flex items-center gap-4">
        {/* Previous Arrow - Hidden on mobile */}
        {!isMobile && (
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-shelter-slate border-2 border-shelter-honey hover:bg-shelter-honey hover:border-shelter-honey hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-[0_0_20px_rgba(212,162,76,0.5)] focus:ring-2 focus:ring-shelter-honey"
            aria-label="Previous"
          >
            <svg 
              className="w-6 h-6 text-shelter-honey group-hover:text-shelter-charcoal transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Scrollable container */}
        <div 
          ref={scrollRef}
          {...swipeHandlers}
          className={`
            overflow-x-auto overflow-y-hidden
            custom-scrollbar
            ${isMobile ? 'snap-x snap-mandatory' : ''}
            pb-4 px-2
            cursor-grab
            select-none
            flex-1
          `}
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin'
          }}
        >
          <div 
            className={`
              flex-1 md:inline-flex lg:inline-flex xl:inline-flex gap-0 sm:gap-[8rem] xl:gap-[10rem]
              ${isMobile ? 'w-full' : ''}
            `}
          >
            {viewMode === "tracks" ? (
              sectionItems.map((track) => (
                <div 
                  key={track.id}
                  className={isMobile ? 'snap-center flex-shrink-0 w-full flex justify-center' : 'flex-shrink-0'}
                >
                  <TrackCard
                    track={track}
                    purchaseLink={track.purchase_link}
                    albumCoverUrl={getTrackImage(track)}
                    artistName={getArtistName(track.artist_id)}
                  />
                </div>
              ))
            ) : (
              sectionItems.map((album) => (
                <div 
                  key={album.id}
                  className={isMobile ? 'snap-center flex-shrink-0 w-full flex justify-center' : 'flex-shrink-0'}
                >
                  <AlbumCard
                    album={{
                      ...album,
                      artist_name: getArtistName(album.artist_id)
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Next Arrow - Hidden on mobile */}
        {!isMobile && (
          <button
            onClick={scrollRight}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-shelter-slate border-2 border-shelter-honey hover:bg-shelter-honey hover:border-shelter-honey hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-[0_0_20px_rgba(212,162,76,0.5)] focus:ring-2 focus:ring-shelter-honey"
            aria-label="Next"
          >
            <svg 
              className="w-6 h-6 text-shelter-honey group-hover:text-shelter-charcoal transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default MusicSection;
