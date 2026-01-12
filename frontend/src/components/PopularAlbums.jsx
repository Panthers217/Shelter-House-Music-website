import image2 from "../assets/image 2.png";
import React, { useState } from "react";
import { useApiData } from "../context/ApiDataContext.jsx";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";

//  
// SingleImageCarousel: mobile-only, shows one album at a time with carousel controls
const SingleImageCarousel = ({ albums, centerIdx, handlePrev, handleNext }) => {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  if (!albums || albums.length === 0) return null;
  const album = albums[centerIdx % albums.length];
  
  const handleAlbumClick = () => {
    if (album.artist_id) {
      navigate(`/store/${album.artist_id}?albumId=${album.id}`);
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className="relative w-full flex justify-center items-center touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center z-30 transition"
          aria-label="Previous"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <img
          key={album.id}
          src={album.image}
          alt={album.title}
          onClick={handleAlbumClick}
          className="w-[17.5625rem] h-[17.5625rem] aspect-[1/1] object-cover rounded-xl shadow-xl mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center z-30 transition"
          aria-label="Next"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="mt-2 text-center text-lg font-semibold text-white truncate w-full max-w-[90vw]">
        {album.title}
      </div>
    </div>
  );
};

// Replace these with your actual album images and titles
// const albums = [
//   {
//     title: "Album 1",
//     image: image2,
//     className:
//       "z-0 w-24 md:w-36 lg:w-48 aspect-[3/4] rounded-xl shadow-lg [transform:rotateY(20deg)] -translate-x-10 opacity-70",
//   },
//   {
//     title: "Album 2",
//     image: image2,
//     className:
//       "z-10 w-28 md:w-44 lg:w-56 aspect-[1/1] rounded-2xl shadow-xl [transform:rotateY(10deg)] -translate-x-4",
//   },
//   {
//     title: "Album 3",
//     image: image2,
//     className:
//       "z-20 w-36 md:w-56 lg:w-72 aspect-[1/1] rounded-2xl shadow-2xl border-4 border-yellow-400 bg-yellow-300 [transform:rotateY(0deg)]",
//   },
//   {
//     title: "Album 4",
//     image: image2,
//     className:
//       "z-10 w-28 md:w-44 lg:w-56 aspect-[1/1] rounded-2xl shadow-xl [transform:rotateY(-10deg)] translate-x-4",
//   },
//   {
//     title: "Album 5",
//     image: image2,
//     className:
//       "z-0 w-24 md:w-36 lg:w-48 aspect-[3/4] rounded-xl shadow-lg [transform:rotateY(-20deg)] translate-x-10 opacity-70",
//   },
// ];

const PopularAlbumsCarousel = () => {
  const { dbSnapshot } = useApiData();
  let albums = [];
  if (dbSnapshot) {
    // console.log(
    //   "artist_images array from dbSnapshot:",
    //   dbSnapshot.artist_images.records
    // );
    albums = dbSnapshot.albums.records.map((img, index) => ({
      id: img.id || index,
      image: img.cover_url,
      alt: img.description || `Image ${index + 1}`,
      title: img.title || `Image ${index + 1}`,
      artist_id: img.artist_id,
    }));
  }

  const [centerIdx, setCenterIdx] = useState(2);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  const handlePrev = () =>
    setCenterIdx((idx) => (idx - 1 + albums.length) % albums.length);
  const handleNext = () => setCenterIdx((idx) => (idx + 1) % albums.length);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Calculate visible albums (always show 5 with wrapping)
  const getVisibleAlbums = () => {
    if (albums.length === 0) return [];
    if (albums.length <= 5) return albums;

    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const idx = (centerIdx + i + albums.length) % albums.length;
      visible.push(albums[idx]);
    }
    return visible;
  };

  const visibleAlbums = getVisibleAlbums();

  // Triangular pyramid positioning - staggered vertically with center card as peak
  const getAlbumStyle = (position) => {
    const styles = {
      0: {
        // Far left
        size: "w-[10rem] md:w-[5rem] lg:w-[5rem] xlg:w-[18rem]",
        translateY: "translate-y-[3rem]", // Higher up (more offset from bottom)
        zIndex: "z-0",
        opacity: "opacity-70",
      },
      1: {
        // Left
        size: "w-[14rem] md:w-[9rem] lg:w-[9rem] xlg:w-[18rem]",
        translateY: "translate-y-[1.8rem]", // Medium height
        zIndex: "z-10",
        opacity: "opacity-85",
      },
      2: {
        // Center - peak of pyramid
        size: "w-[20rem] md:w-[13rem] lg:w-[20rem] xlg:w-[24rem]",
        translateY: "translate-y-0", // Lowest (at bottom)
        zIndex: "z-20",
        opacity: "opacity-100",
      },
      3: {
        // Right
        size: "w-[14rem] md:w-[9rem] lg:w-[9rem] xlg:w-[18rem]",
        translateY: "translate-y-[1.8rem]", // Medium height
        zIndex: "z-10",
        opacity: "opacity-85",
      },
      4: {
        // Far right
        size: "w-[10rem] md:w-[5rem] lg:w-[5rem] xlg:w-[18rem]",
        translateY: "translate-y-[3rem]", // Higher up (more offset from bottom)
        zIndex: "z-0",
        opacity: "opacity-70",
      },
    };
    return styles[position] || styles[2];
  };

  // VisibleAlbums component
  const navigate = useNavigate();
  
  const handleAlbumClick = (album) => {
    if (album.artist_id) {
      navigate(`/store/${album.artist_id}?albumId=${album.id}`);
    }
  };
  
  const VisibleAlbums = ({ albums, getAlbumStyle }) => (
    <>
      {albums.map((album, i) => {
        const style = getAlbumStyle(i);
        return (
          <img
            key={`${album.id}-${i}`}
            src={album.image}
            alt={album.title}
            onClick={() => handleAlbumClick(album)}
            className={`${style.size} ${style.translateY} ${style.zIndex} ${style.opacity} rounded-xl shadow-xl transition-all duration-500 object-cover aspect-square cursor-pointer hover:scale-105`}
          />
        );
      })}
    </>
  );

  return (
    <section className="pb-[2.5%] lg:pb-[5%] w-full flex flex-col items-center py-8 bg-gradient-to-b from-[#232b2d] to-[#4d5c5f] [perspective:1000px] overflow-hidden">
      <div className="[transform:scale(1.2)] transition-transform duration-500">
        <h2 className="sm:text-2xl text-3xl md:text-5xl font-bold text-[#8b9697] mb-8 tracking-wide text-center md:pt-[3%] lg:pt-[3%] xl:pt-[3%]">
          POPULAR ALBUMS
        </h2>
        {/* Mobile: Use SingleImageCarousel */}
        <div className="block md:hidden lg:hidden xl:hidden w-full">
          <SingleImageCarousel
            albums={visibleAlbums}
            centerIdx={centerIdx}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>
        {/* Tablet and up: Use VisibleAlbums */}
        <div 
          className="hidden md:flex lg:flex xl:flex relative w-full justify-center items-end min-h-[350px] md:pb-[10%] touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Carousel Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center z-30 transition"
            aria-label="Previous"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-row justify-center items-start gap-none md:gap-none lg:gap-none w-full max-w-6xl">
            <VisibleAlbums
              albums={visibleAlbums}
              getAlbumStyle={getAlbumStyle}
            />
          </div>
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center z-30 transition"
            aria-label="Next"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularAlbumsCarousel;
