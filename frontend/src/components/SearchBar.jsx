import React, { useState, useEffect } from 'react';
import { useApiData } from '../context/ApiDataContext';

function SearchBar({ onSearchResults, viewMode }) {
  const { dbSnapshot } = useApiData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const performSearch = (query) => {
    if (!query.trim() || !dbSnapshot) {
      onSearchResults(null);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const results = {
      tracks: [],
      albums: [],
      artists: [],
      promotional_tracks: [],
      promotional_videos: [],
      merchandise: []
    };

    // Search artists by name first (check both 'name' and 'artist_name' fields)
    if (dbSnapshot.artists?.records) {
      results.artists = dbSnapshot.artists.records.filter(artist => 
        artist.name?.toLowerCase().includes(searchTerm) ||
        artist.artist_name?.toLowerCase().includes(searchTerm)
      );
      console.log('🔍 SearchBar - Found artists:', results.artists.length);
    }

    // Get artist IDs from matching artists
    const matchingArtistIds = results.artists.map(artist => artist.id);
    
    // console.log('Search term:', searchTerm);
    // console.log('Matching artists:', results.artists);
    // console.log('Matching artist IDs:', matchingArtistIds);

    // Search tracks by title OR artist_id
    if (dbSnapshot.tracks?.records) {
      // Debug: Check artist_id types
      const sampleTrack = dbSnapshot.tracks.records[0];
      // console.log('Sample track artist_id:', sampleTrack?.artist_id, 'Type:', typeof sampleTrack?.artist_id);
      // console.log('Looking for artist_ids:', matchingArtistIds, 'Types:', matchingArtistIds.map(id => typeof id));
      
      results.tracks = dbSnapshot.tracks.records.filter(track => 
        track.title?.toLowerCase().includes(searchTerm) ||
        (track.artist_id && matchingArtistIds.includes(track.artist_id))
      );
      // console.log('Matching tracks:', results.tracks.length);
    }

    // Search albums by title OR artist_id
    if (dbSnapshot.albums?.records) {
      results.albums = dbSnapshot.albums.records.filter(album => 
        album.title?.toLowerCase().includes(searchTerm) ||
        (album.artist_id && matchingArtistIds.includes(album.artist_id))
      );
      // console.log('Matching albums:', results.albums.length);
    }

    // Search promotional tracks by title OR artist_id
    if (dbSnapshot.promotional_tracks?.records) {
      results.promotional_tracks = dbSnapshot.promotional_tracks.records.filter(promoTrack => 
        promoTrack.title?.toLowerCase().includes(searchTerm) ||
        (promoTrack.artist_id && matchingArtistIds.includes(promoTrack.artist_id))
      );
    }

    // Search promotional videos by title OR artist_id
    if (dbSnapshot.promotional_videos?.records) {
      results.promotional_videos = dbSnapshot.promotional_videos.records.filter(promoVideo => 
        promoVideo.title?.toLowerCase().includes(searchTerm) ||
        (promoVideo.artist_id && matchingArtistIds.includes(promoVideo.artist_id))
      );
    }

    // Search merchandise by title OR artist_id
    if (dbSnapshot.merchandise?.records) {
      results.merchandise = dbSnapshot.merchandise.records.filter(merch => 
        merch.title?.toLowerCase().includes(searchTerm) ||
        (merch.artist_id && matchingArtistIds.includes(merch.artist_id))
      );
      // console.log('Matching merchandise:', results.merchandise.length);
    }

      onSearchResults(results);
    };

    if (!searchQuery.trim()) {
      // Clear search results when input is empty
      onSearchResults(null);
      return;
    }

    setIsSearching(true);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, dbSnapshot, viewMode, onSearchResults]);

  const handleClear = () => {
    setSearchQuery('');
    onSearchResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#aa2a46]">
          <span className={`i-lucide-search text-xl ${isSearching ? 'animate-pulse' : ''}`} />
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search for ${viewMode === 'tracks' ? 'tracks, artists' : 'albums, artists'}...`}
          className="w-full pl-12 pr-12 py-4 bg-[#1d1e26] text-[#fffced] text-lg rounded-xl border-2 border-[#aa2a46]/30 focus:border-[#aa2a46] focus:outline-none transition-all duration-300 placeholder-[#fffced]/40"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#aa2a46] hover:text-[#fffced] transition-colors duration-200"
          >
            <span className="i-lucide-x text-xl" />
          </button>
        )}
      </div>

      {/* Search Info */}
      {searchQuery && (
        <div className="mt-2 text-center text-[#fffced]/60 text-sm">
          {isSearching ? (
            <span className="flex items-center justify-center gap-2">
              <span className="i-lucide-loader-2 animate-spin" />
              Searching...
            </span>
          ) : (
            <span>
              Searching for "{searchQuery}"
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
