import React, { useState, useEffect } from "react";
import { useApiData } from "../context/ApiDataContext";
import SearchBar from "./SearchBar";
import VideoPlayerComponent from "./VideoPlayerComponent";
import ArtistPlaylist from "./ArtistPlaylist";
import axios from "axios";
import ZoomFit from "./ZoomFit.jsx";

const Videos = () => {
  const { dbSnapshot } = useApiData();
  const [activeTabs, setActiveTabs] = useState(["all"]);
  const [genres, setGenres] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [filteredVideoUrls, setFilteredVideoUrls] = useState([]);

  // Fetch active genres from database
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/genres/active`);
        setGenres(response.data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
    fetchGenres();
  }, []);

  // Static tabs (non-genre filters)
  const staticTabs = [
    { key: "all", label: "All" },
    { key: "featured", label: "Featured" },
    { key: "new", label: "New Releases" },
  ];

  // Combine static tabs with genres from database
  const menuTabs = [
    ...staticTabs,
    ...genres.map(genre => ({
      key: genre.name.toLowerCase().replace(/\s+/g, ''),
      label: genre.name,
      genreName: genre.name
    }))
  ];

  // Filter videos based on search results or active tabs
  useEffect(() => {
    // Get videos from database - show all videos since there's no active field
    const allVideos = dbSnapshot?.videos?.records || [];
    
        // console.log('=== Videos Debug ===');
        // console.log('Total videos in DB:', dbSnapshot?.videos?.records?.length);
    if (dbSnapshot?.videos?.records?.length > 0) {
      // console.log('Sample video fields:', Object.keys(dbSnapshot.videos.records[0]));
      // console.log('Sample video:', dbSnapshot.videos.records[0]);
    }
    
    let videosToFilter = allVideos;

    // If there are search results, use those
    if (searchResults?.videos) {
      videosToFilter = searchResults.videos;
    }

    // Filter by active tabs
    let filtered = videosToFilter;
    if (!activeTabs.includes("all")) {
      filtered = videosToFilter.filter(video => {
        // Check static tabs
        if (activeTabs.includes("featured") && video.featured) return true;
        if (activeTabs.includes("new")) {
          const releaseDate = new Date(video.release_date);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          if (releaseDate >= thirtyDaysAgo) return true;
        }

        // Check genre tabs - compare with genres array directly
        const genreTabs = activeTabs.filter(tab => 
          !staticTabs.some(st => st.key === tab)
        );
        
        if (genreTabs.length > 0) {
          return genreTabs.some(tab => {
            const matchingGenre = genres.find(g => 
              g.name.toLowerCase().replace(/\s+/g, '') === tab
            );
            return matchingGenre && video.genre?.toLowerCase() === matchingGenre.name?.toLowerCase();
          });
        }

        return false;
      });
    }

    // Extract video URLs for VideoPlayerComponent
    const videoUrls = filtered.map(v => v.video_url).filter(url => url);
    // console.log('Filtered videos:', filtered.length);
    // console.log('Video URLs to display:', videoUrls);
    setFilteredVideoUrls(videoUrls);
  }, [dbSnapshot, searchResults, activeTabs, genres]);

  // Toggle tab selection
  const toggleTab = (tabKey) => {
    if (tabKey === "all") {
      setActiveTabs(["all"]);
    } else {
      setActiveTabs(prev => {
        const newTabs = prev.filter(t => t !== "all");
        if (newTabs.includes(tabKey)) {
          const filtered = newTabs.filter(t => t !== tabKey);
          return filtered.length === 0 ? ["all"] : filtered;
        }
        return [...newTabs, tabKey];
      });
    }
  };

  return (
    <ZoomFit>
    <section className="w-full min-h-screen bg-shelter-charcoal flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-7xl flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-4xl md:text-5xl font-extrabold font-['Roboto'] mb-4 drop-shadow-lg">
            Shelter House Music Videos
          </h2>
        </div>

        {/* Search Bar */}
        <SearchBar onSearchResults={setSearchResults} viewMode="videos" />

        {/* Menu Tabs */}
        <div className="flex flex-wrap gap-3 justify-center">
          {menuTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => toggleTab(tab.key)}
              className={`px-5 py-2 rounded-full font-bold text-lg transition-all duration-300 border-2 border-shelter-honey focus:outline-none focus:ring-2 focus:ring-shelter-honey ${
                activeTabs.includes(tab.key)
                  ? "bg-shelter-honey text-shelter-charcoal scale-105"
                  : "bg-shelter-slate text-shelter-honey hover:bg-shelter-honey hover:text-shelter-charcoal"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Video Player Component */}
        {filteredVideoUrls.length > 0 ? (
          <VideoPlayerComponent videoUrls={filteredVideoUrls} />
        ) : (
          <div className="w-full max-w-5xl mx-auto bg-shelter-slate rounded-lg shadow-lg p-12 text-center ring-1 ring-shelter-honey/20">
            <p className="text-shelter-white text-xl font-bold mb-4">
              No videos available
            </p>
            <p className="text-shelter-gray text-sm">
              Add videos in the Admin Dashboard and mark them as active to display them here.
            </p>
          </div>
        )}

        {/* Artist Playlist Section */}
        <div className="mt-8">
          <ArtistPlaylist />
        </div>
      </div>
    </section>
    </ZoomFit>
  );
};

export default Videos;
