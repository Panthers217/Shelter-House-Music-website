import React, { useState, useEffect, useRef } from "react";
import { useApiData } from "../context/ApiDataContext";
import { useFeatures } from "../context/FeaturesContext";
import MusicSection from "./MusicSection";
import SearchBar from "./SearchBar";
import CartSummary from "./CartSummary";
import SEO from "./SEO";
import DemoBanner from "./DemoBanner";
import axios from "axios";

const Music = () => {
  const { dbSnapshot } = useApiData();
  const { isEnabled } = useFeatures();
  const [activeTabs, setActiveTabs] = useState(["all"]);
  const [genres, setGenres] = useState([]);
  const [viewMode, setViewMode] = useState("tracks"); // "tracks" or "albums"
  const [searchResults, setSearchResults] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const isStripeEnabled = isEnabled("enable_stripe");

  // Swipe handling
  const useSwipe = (scrollRef) => {
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const isDown = useRef(false);
    const hasMoved = useRef(false);

    const handleStart = (clientX) => {
      if (!scrollRef.current) return;
      isDown.current = true;
      hasMoved.current = false;
      startX.current = clientX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
      scrollRef.current.style.cursor = "grabbing";
      scrollRef.current.style.userSelect = "none";
    };

    const handleMove = (clientX) => {
      if (!isDown.current || !scrollRef.current) return;
      hasMoved.current = true;
      const x = clientX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 2; // Scroll speed multiplier
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleEnd = () => {
      if (!scrollRef.current) return;
      isDown.current = false;
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.userSelect = "auto";
    };

    return {
      onMouseDown: (e) => handleStart(e.pageX),
      onMouseMove: (e) => handleMove(e.pageX),
      onMouseUp: handleEnd,
      onMouseLeave: handleEnd,
      onTouchStart: (e) => handleStart(e.touches[0].pageX),
      onTouchMove: (e) => handleMove(e.touches[0].pageX),
      onTouchEnd: handleEnd,
    };
  };

  // Detect screen size for mobile vs desktop behavior
  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Fetch active genres from database
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/genres/active`
        );
        setGenres(response.data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    fetchGenres();
  }, []);

  // Static tabs (non-genre filters)
  const staticTabs = [
    { key: "all", label: "All" },
    { key: "featured", label: "Featured" },
    { key: "new", label: "New Releases" },
    { key: "popular", label: "Popular" },
    { key: "recommended", label: "Recommended" },
  ];

  // Combine static tabs with genres from database
  const menuTabs = [
    ...staticTabs,
    ...genres.map((genre) => ({
      key: genre.name.toLowerCase().replace(/\s+/g, ""),
      label: genre.name,
      genreName: genre.name, // Store original name for matching
    })),
  ];

  // Get promotional tracks and albums from database
  const tracks = dbSnapshot?.promotional_tracks?.records || [];
  const albums = dbSnapshot?.albums?.records || [];
  const artistImages = dbSnapshot?.artist_images?.records || [];
  const artists = dbSnapshot?.artists?.records || [];

  // Helper function to get artist name by artist_id
  const getArtistName = (artistId) => {
    const artist = artists.find((a) => a.id === artistId);
    return artist?.artist_name || artist?.name || "Unknown Artist";
  };

  // Helper function to get album cover URL by album_id
  const getAlbumCoverUrl = (albumId) => {
    const album = albums.find((a) => a.id === albumId);
    return album?.cover_url;
  };

  // Helper function to get artist image for promotional track
  const getTrackImage = (track) => {
    // Try artist_image_id first
    if (track.artist_image_id) {
      const artistImage = artistImages.find(
        (img) => img.id === track.artist_image_id
      );
      if (artistImage?.image_url) {
        return artistImage.image_url;
      }
    }
    // Fallback to album cover
    return getAlbumCoverUrl(track.album_id);
  };

  // Debug logging
  // console.log("Albums:", albums);
  // console.log("Promotional Tracks:", tracks);

  // Toggle tab selection
  const handleTabClick = (key) => {
    if (key === "all") {
      setActiveTabs(["all"]);
    } else {
      setActiveTabs((prev) => {
        const isActive = prev.includes(key);
        let next;
        if (isActive) {
          next = prev.filter((tab) => tab !== key);
        } else {
          next = prev.filter((tab) => tab !== "all").concat(key);
        }
        return next.length === 0 ? ["all"] : next;
      });
    }
  };

  // Section definitions - combine static sections with genre sections
  const allSections = [
    { key: "all", label: viewMode === "tracks" ? "All Tracks" : "All Albums" },
    {
      key: "featured",
      label: viewMode === "tracks" ? "Featured Tracks" : "Featured Albums",
    },
    { key: "new", label: "New Releases" },
    { key: "popular", label: "Popular" },
    { key: "recommended", label: "Recommended For You" },
    ...genres.map((genre) => ({
      key: genre.name.toLowerCase().replace(/\s+/g, ""),
      label: genre.name,
      genreName: genre.name,
    })),
  ];

  // Get sections to display
  const sectionsToShow = activeTabs.includes("all")
    ? allSections.map((s) => s.key)
    : activeTabs;

  return (
    <>
      <SEO
        title="Music - Stream & Discover Soul Felt Music"
        description="Stream music samples and discover soul tracks and albums. Browse featured releases, new arrivals, and popular music from talented artists."
        keywords={`soul music, music streaming, ${genres
          .map((g) => g.name)
          .join(", ")}, tracks, albums, featured music, new releases`}
        url="https://soulfeltmusic.com/music"
      />
     
      <section className="w-full min-h-screen bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal  flex flex-col items-center py-10 px-4 md:px-12 opacity-80">
        
        {/* Overlay div to hide scrolling content - Only visible on lg/xl screens */}
        {/* <div className="overlayBlock hidden lg:block fixed xl:absolute lg:top-[27rem] xl:top-[30rem] left-0 w-full h-[10rem] bg-shelter-charcoal z-[200] pointer-events-none"></div> */}

        {/* Header - Normal flow on mobile, fixed/scaled on lg/xl */}
        <div className="MusicStore-header relative lg:fixed lg:scale-50 lg:origin-top lg:h-[none] xl:absolute xl:scale-[0.75] xl:origin-top xl:h-[none] z-[100] w-full max-w-7xl bg-shelter-slate rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-12">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-5xl md:text-6xl font-extrabold font-['Roboto'] mb-4 text-center drop-shadow-lg xl:scale-[1] xl:origin-top xl:h-[50%]">
            Stream & Discover Shelter House Music
          </h1>
          <p className="text-shelter-white text-lg md:text-xl font-semibold text-center mb-8 xl:scale-[1.5] xl:origin-top xl:h-[50%]">
            Play samples, discover new artists, and purchase your favorite
            tracks and albums.
          </p>

          {/* View Toggle */}
          <div className="flex justify-center mb-6 xl:scale-[1.5] xl:origin-top xl:h-[50%]">
            <div className="inline-flex rounded-lg bg-shelter-charcoal p-1 border-2 border-shelter-honey">
              <button
                onClick={() => setViewMode("tracks")}
                className={`px-6 py-2 rounded-md font-bold text-base transition-all duration-200 focus:ring-2 focus:ring-shelter-honey ${
                  viewMode === "tracks"
                    ? "bg-shelter-honey text-shelter-charcoal shadow-lg"
                    : "text-shelter-honey hover:text-shelter-white"
                }`}
              >
                Tracks
              </button>
              <button
                onClick={() => setViewMode("albums")}
                className={`px-6 py-2 rounded-md font-bold text-base transition-all duration-200 focus:ring-2 focus:ring-shelter-honey ${
                  viewMode === "albums"
                    ? "bg-shelter-honey text-shelter-charcoal shadow-lg"
                    : "text-shelter-honey hover:text-shelter-white"
                }`}
              >
                Albums
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar onSearchResults={setSearchResults} viewMode={viewMode} />

          {/* Menu Tabs */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center xl:scale-[1.2] xl:origin-top xl:h-[50%]">
            {menuTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`px-5 py-2 rounded-full font-bold text-lg transition-colors border-2 border-shelter-honey focus:outline-none focus:ring-2 focus:ring-shelter-honey ${
                  activeTabs.includes(tab.key)
                    ? "bg-shelter-honey text-shelter-charcoal"
                    : "bg-shelter-charcoal text-shelter-white hover:bg-shelter-amber hover:text-shelter-charcoal"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Normal flow on mobile, with padding on lg/xl for scaled header */}
        <div className="Music-Content sm:flex relative z-[50] w-full max-w-7xl bg-shelter-slate rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-12 lg:pt-[50%] xl:pt-[25%] ">

          {/* Cart display - only show when Stripe is enabled */}
          {isStripeEnabled && (
            <div className="w-full flex justify-center">
              <CartSummary />
            </div>
          )}

          {/* Display selected sections */}
          {allSections
            .filter((section) => sectionsToShow.includes(section.key))
            .map((section) => {
              let sectionItems;

              // Use search results if search is active
              const sourceData = {
                tracks: searchResults ? searchResults.tracks : tracks,
                albums: searchResults ? searchResults.albums : albums,
              };

              if (viewMode === "tracks") {
                // Track filtering
                if (section.key === "all") {
                  sectionItems = sourceData.tracks;
                } else if (section.key === "featured") {
                  sectionItems = sourceData.tracks.filter(
                    (track) => track.featured === 1
                  );
                } else if (section.key === "new") {
                  sectionItems = sourceData.tracks.filter(
                    (track) => track.new_release === 1
                  );
                } else if (section.key === "popular") {
                  sectionItems = sourceData.tracks.filter(
                    (track) => track.popular === 1
                  );
                } else if (section.key === "recommended") {
                  sectionItems = sourceData.tracks.filter(
                    (track) => track.recommended === 1
                  );
                } else {
                  // Genre filtering for tracks
                  const genreName = section.genreName || section.label;
                  sectionItems = sourceData.tracks.filter((track) => {
                    if (!track.genre) return false;
                    const trackGenres = track.genre
                      .split(",")
                      .map((g) => g.trim().toLowerCase());
                    return trackGenres.includes(genreName.toLowerCase());
                  });
                }
              } else {
                // Album filtering
                if (section.key === "all") {
                  sectionItems = sourceData.albums;
                } else if (section.key === "featured") {
                  sectionItems = sourceData.albums.filter(
                    (album) => album.featured === 1
                  );
                } else if (section.key === "new") {
                  sectionItems = sourceData.albums.filter(
                    (album) => album.new_release === 1
                  );
                } else if (section.key === "popular") {
                  sectionItems = sourceData.albums.filter(
                    (album) => album.popular === 1
                  );
                } else if (section.key === "recommended") {
                  sectionItems = sourceData.albums.filter(
                    (album) => album.recommended === 1
                  );
                } else {
                  // Genre filtering for albums
                  const genreName = section.genreName || section.label;
                  sectionItems = sourceData.albums.filter((album) => {
                    if (!album.genre) return false;
                    const albumGenres = album.genre
                      .split(",")
                      .map((g) => g.trim().toLowerCase());
                    return albumGenres.includes(genreName.toLowerCase());
                  });
                }
              }

              return (
                <MusicSection
                  key={section.key}
                  section={section}
                  sectionItems={sectionItems}
                  viewMode={viewMode}
                  isMobile={isMobile}
                  getTrackImage={getTrackImage}
                  getArtistName={getArtistName}
                  useSwipe={useSwipe}
                />
              );
            })}
          <div className="w-full flex flex-col items-center mt-8">
            <h2 className="text-shelter-honey text-2xl font-bold mb-2 font-['Public_Sans'] text-center">
              Why Buy Shelter House Music?
            </h2>
            <ul className="text-shelter-white text-base md:text-lg font-medium text-center list-disc list-inside">
              <li>Support your favorite artists directly</li>
              <li>Get high-quality audio downloads</li>
              <li>Exclusive access to bonus tracks and content</li>
              <li>Join a passionate music community</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
export default Music;
