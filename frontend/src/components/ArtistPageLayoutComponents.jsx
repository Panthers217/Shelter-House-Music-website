import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useApiData } from "../context/ApiDataContext";
import SearchBar from "./SearchBar";
import SEO from "./SEO";
import DemoBanner from "./DemoBanner";
import {
  trackcardImage,
  topTrackcardImage,
  trackHeaderPic,
} from "../assets/artist_mockup_pics /artistImages.js";
import bannerImage from "../assets/Shelter-house-banner3.png"; 

// --- DUMMY DATA (will be replaced by database) ---
// topTracks will be loaded from database in component

// Keeping for fallback images only
const FALLBACK_topTracks = [
  {
    title: "Woman Like Me",
    artist: "Little Mix Feat. Nicki Minaj",
    img: topTrackcardImage[0],
  },
  {
    title: "Later Bitches",
    artist: "The Prince Karma",
    img: topTrackcardImage[1],
  },
  {
    title: "Happier",
    artist: "Marshmello & Bastille",
    img: topTrackcardImage[2],
  },
  {
    title: "ZEZE",
    artist: "Kodak Black Feat. Offset &",
    img: topTrackcardImage[3],
  },
  {
    title: "Electricity",
    artist: "Silk City & Dua Lipa Feat.",
    img: topTrackcardImage[4],
  },
  {
    title: "In My Mind",
    artist: "Dynoro & Gigi D’Agostino",
    img: topTrackcardImage[5],
  },
];

// topTracks will be loaded from database in component

// --- POSITION DATA ---
const artistTabletPositions = [
  { left: 0, top: 0 },
  { left: 188, top: 0 },
  { left: 376, top: 0 },
  { left: 564, top: 0 },
  { left: 0, top: 244 },
  { left: 188, top: 244 },
  { left: 376, top: 244 },
  { left: 564, top: 244 },
  { left: 0, top: 488 },
  { left: 188, top: 488 },
  { left: 376, top: 488 },
  { left: 564, top: 488 },
  { left: 0, top: 732 },
  { left: 188, top: 732 },
  { left: 376, top: 732 },
  { left: 564, top: 732 },
  { left: 0, top: 976 },
  { left: 188, top: 976 },
];

const artistDesktopPositions = [
  { left: 0, top: 0 },
  { left: 184, top: 0 },
  { left: 368, top: 0 },
  { left: 552, top: 0 },
  { left: 0, top: 240 },
  { left: 184, top: 240 },
  { left: 368, top: 240 },
  { left: 552, top: 240 },
  { left: 0, top: 480 },
  { left: 184, top: 480 },
  { left: 368, top: 480 },
  { left: 552, top: 480 },
  { left: 0, top: 720 },
  { left: 184, top: 720 },
  { left: 368, top: 720 },
  { left: 552, top: 720 },
  { left: 0, top: 960 },
  { left: 184, top: 960 },
];

// Unsplash API call to fetch artist image by name
async function fetchArtistImage() {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/users/marlorouse109/collections/?client_id=${accessKey}`;
  try {
    const response = await axios.get(url);
    // Return the first image URL or null if not found
    return response.data[0] || null;
  } catch (error) {
    console.error("Unsplash API error:", error);
    return null;
  }
}

const ArtistPageComponent = () => {
  const { dbSnapshot } = useApiData();
  
  // --- INTERACTIVE STATE (MUST BE AT TOP) ---
  const [selectedCountry, setSelectedCountry] = useState("All countries");
  const [selectedPartnerType, setSelectedPartnerType] = useState("All");
  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [trackModal, setTrackModal] = useState({ open: false, track: null });
  const [searchResults, setSearchResults] = useState(null);
  const [albumImage, setAlbumImage] = useState(null);

  // Custom hook for media queries
  function useMediaQuery(query) {
    const [matches, setMatches] = React.useState(
      () => window.matchMedia(query).matches
    );

    React.useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) setMatches(media.matches);
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
  }

  // Media queries
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await fetchArtistImage();
      setAlbumImage(imageUrl);
      // console.log("Fetched image URL:", imageUrl);
    };
    fetchImage();
  }, []);

  // Get artists from database
  const dbArtists = dbSnapshot?.artists?.records || [];

  // Debug logging to see what fields are available
  // console.log("DB Artists sample:", dbArtists[0]);

  // Get promotional_tracks from database
  const promotionalTracks = dbSnapshot?.promotional_tracks?.records || [];
  const artistImages = dbSnapshot?.artist_images?.records || [];
  
  // Get tracks from database and filter for top tracks
  const dbTracks = dbSnapshot?.tracks?.records || [];
  const albums = dbSnapshot?.albums?.records || [];

  // console.log("Albums from database:", albums);
  // console.log("artist from database:", dbArtists);
  // console.log("Promotional tracks from database:", promotionalTracks);
  // console.log("Promotional tracks count:", promotionalTracks.length);
  // console.log("Sample promotional track:", promotionalTracks[0]);
  // console.log("Sample promotional track ALL KEYS:", promotionalTracks[0] ? Object.keys(promotionalTracks[0]) : 'no tracks');
  // console.log("Sample promotional track featured_track field:", promotionalTracks[0]?.featured_track);
  // console.log("Sample promotional track featured field:", promotionalTracks[0]?.featured);
  // console.log("Sample promotional track featured field TYPE:", typeof promotionalTracks[0]?.featured);
  // console.log("Sample promotional track artist_id:", promotionalTracks[0]?.artist_id);
  
  // Helper function to get image for promotional track
  const getPromotionalTrackImage = (track) => {
    // First, try to get artist image using artist_image_id
    if (track.artist_image_id) {
      const artistImage = artistImages.find((img) => img.id === track.artist_image_id);
      if (artistImage?.image_url) {
        return artistImage.image_url;
      }
    }
    
    // Fallback to album cover if artist_image_id is not set
    if (track.album_id) {
      const album = albums.find((a) => a.id === track.album_id);
      if (album?.cover_url) {
        return album.cover_url;
      }
    }
    
    // Final fallback to default images
    return null;
  };
  
  // Derive artists array with name and img properties
  const artists = dbArtists.map((artist, idx) => {
    // Filter promotional tracks for this artist where featured = 1
    const artistPromotionalTracks = promotionalTracks.filter(
      (track) => track.artist_id === artist.id
    );
    
    const artistFeaturedTracks = artistPromotionalTracks.filter(
      (track) => track.promote_track === 1 || track.promote_track === true
    );
    
    if (idx === 0) {
      // console.log(`First artist (${artist.artist_name || artist.name}):`);
      // console.log("  - All promotional tracks for this artist:", artistPromotionalTracks.length);
      // console.log("  - Featured tracks for this artist:", artistFeaturedTracks.length);
      // console.log("  - Sample promotional track:", artistPromotionalTracks[0]);
    }
    
    const mappedFeaturedTracks = artistFeaturedTracks.map((track) => ({
      ...track,
      img: getPromotionalTrackImage(track),
      // Ensure promo_audio_url is included
      promo_audio_url: track.promo_audio_url,
      // Add artist_name for display
      artist_name: artist.artist_name || artist.name
    }));
    
    return {
      id: artist.id,
      genre:artist.genre,
      name: artist.artist_name || artist.name,
      img:
        artist.image_url ||
        artist.profile_url ||
        trackcardImage[idx % trackcardImage.length],
      country: artist.artist_country || artist.country,
      bio: artist.bio,
      career_highlights: artist.Career_Highlights,
      influences: artist.Influences,
      featured_tracks: mappedFeaturedTracks,
      rating: artist.rating,
      monthly_listeners: artist.monthly_listeners,
      albums_released: artist.albums_released,
      church_partner: artist.church_partner === 1 || artist.church_partner === true,
      // Social media URLs
      spotify_url: artist.spotify_url,
      instagram_url: artist.instagram_url,
      twitter_url: artist.twitter_url,
      youtube_url: artist.youtube_url,
      apple_music_url: artist.apple_music_url,
      tiktok_url: artist.tiktok_url,
      facebook_url: artist.facebook_url,
    };
  });
  
  // console.log("artists with genre from database:", artists);
  // console.log("Featured tracks for first artist:", artists[0]?.featured_tracks);

  // Helper function to get album cover URL by album_id
  const getAlbumCoverUrl = (albumId) => {
    const album = albums.find((a) => a.id === albumId);
    return album?.cover_url;
  };

  // Filter tracks where top_tracks is true (1)
  const topTracks = dbTracks
    .filter((track) => track.top_tracks === 1 || track.top_tracks === true)
    .map((track, idx) => ({
      id: track.id,
      title: track.title,
      artist: track.artist_name,
      img:
        getAlbumCoverUrl(track.album_id) ||
        topTrackcardImage[idx % topTrackcardImage.length],
      audio_url: track.audio_url,
    }));

  // console.log("Top Track Cards from database:", topTracks);

  // console.log("Top Tracks from database:", topTracks);

  // Derive unique countries from database, with \"All countries\" as first option
  const uniqueCountries = [
    ...new Set(artists.map((a) => a.country).filter(Boolean)),
  ];
  const countries = ["All countries", ...uniqueCountries.sort()];

  const handleSearchResults = React.useCallback((results) => {
    // console.log("🔍 Search results received:", results);
    setSearchResults(results);
  }, []);

  // // console.log(albumImage);
  // --- FILTER ARTISTS BY COUNTRY ---
  const artistCountryMap = React.useMemo(() => {
    const map = {};
    artists.forEach((a) => {
      map[a.name] = a.country;
    });
    return map;
  }, [artists]);
  
  // Use search results if available, otherwise use all artists
  const sourceArtists = React.useMemo(() => {
    if (!searchResults) {
      // console.log("📋 Using all artists:", artists.length);
      return artists;
    }
    
    console.log("🔍 Search results artists:", searchResults.artists?.length || 0);
    
    // Get IDs from search results
    const searchedIds = searchResults.artists?.map(a => a.id) || [];
    console.log("🔍 Searched artist IDs:", searchedIds);
    
    // Filter our transformed artists array by matching IDs
    const filtered = artists.filter(a => searchedIds.includes(a.id));
    console.log("✅ Filtered to matching artists:", filtered.length);
    
    return filtered;
  }, [searchResults, artists]);

  const filteredArtists = React.useMemo(() => {
    const filtered = sourceArtists.filter((a) => {
      // Filter by country
      const countryMatch = selectedCountry === "All countries" || a.country === selectedCountry;
      
      // Filter by partner type
      let partnerMatch = true;
      if (selectedPartnerType === "Artist") {
        partnerMatch = !a.church_partner;
      } else if (selectedPartnerType === "Church Partners") {
        partnerMatch = a.church_partner;
      }
      
      return countryMatch && partnerMatch;
    });
    
    // console.log("🌍 Country filter:", selectedCountry, "→", filtered.length, "artists");
    return filtered;
  }, [sourceArtists, selectedCountry, selectedPartnerType]);

  // --- REUSABLE COMPONENTS ---
  const Banner = ({ image, title, className = "" }) => (
    <div className={`relative w-full ${className}`}>
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src={image}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-shelter-charcoal from-10% to-black/0" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex flex-col items-start px-8">
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white font-bold font-['Roboto'] text-5xl md:text-7xl leading-tight">
          {title}
        </div>
      </div>
    </div>
  );

  const CountryTags = ({
    countries,
    lefts,
    topFirstRow,
    topSecondRow,
    selected,
    onSelect,
  }) => (
    <div className="relative w-full h-20">
      {countries.map((country, idx) => {
        const left = lefts[idx % lefts.length];
        const top = idx < lefts.length / 2 ? topFirstRow : topSecondRow;
        const isActive = selected === country;
        return (
          <button
            key={country}
            type="button"
            style={{ left, top, position: "absolute" }}
            className={`px-2 py-[5px] rounded-sm flex justify-center items-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-shelter-honey transition-all duration-150
            ${
              isActive
                ? "bg-shelter-honey text-shelter-charcoal font-bold scale-105"
                : "bg-shelter-slate text-shelter-white/60 font-medium hover:bg-shelter-honey/20"
            }`}
            onClick={() => onSelect(country)}
          >
            <span className="text-sm font-['Roboto'] leading-tight">
              {country}
            </span>
          </button>
        );
      })}
    </div>
  );

  const PartnerTypeFilter = ({ selected, onSelect }) => {
    const options = ["All", "Artist", "Church Partners"];
    return (
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => {
          const isActive = selected === option;
          return (
            <button
              key={option}
              type="button"
              className={`px-4 py-2 rounded-sm flex justify-center items-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-shelter-honey transition-all duration-150
              ${
                isActive
                  ? "bg-shelter-honey text-shelter-charcoal font-bold scale-105"
                  : "bg-shelter-slate text-shelter-white/60 font-medium hover:bg-shelter-honey/20"
              }`}
              onClick={() => onSelect(option)}
            >
              <span className="text-sm font-['Roboto'] leading-tight">
                {option}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  const ArtistGrid = ({
    artists,
    positions,
    cardClass = "",
    hovered,
    setHovered,
  }) => {
    return (
      <div className="ArtistLinks relative w-full h-[1200px]">
        {artists.map((art, idx) => (
          <Link
            key={art.name}
            to={`/artist/${encodeURIComponent([art.name])}`}
            state={{ art, albumImage }}
            onClick={() => {
              // console.log("Navigating to artist:", art.name);
              // console.log("Featured tracks being passed:", art.featured_tracks);
              sessionStorage.setItem(`album:${art.id}`, JSON.stringify(art));
            }}
            style={{ ...positions[idx], position: "absolute" }}
            className={`w-44 h-60 p-4 transition-all duration-150 ${cardClass} ${
              hovered === art.name
                ? "ring-4 ring-shelter-honey scale-105 z-10"
                : ""
            }`}
            onMouseEnter={() => setHovered(art.name)}
            onMouseLeave={() => setHovered(null)}
            tabIndex={0}
            onFocus={() => setHovered(art.name)}
            onBlur={() => setHovered(null)}
          >
            <div className="rounded-[3px] flex flex-col items-center">
              <div className="h-36 w-36 relative rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={art.img}
                  alt={art.name}
                />
              </div>
              <div className="py-4 flex flex-col items-center">
                <div className="text-center text-shelter-white/60 text-base font-normal font-['Roboto']">
                  {art.name}
                </div>
                {hovered === art.name && (
                  <div className="mt-2 text-shelter-honey text-xs">
                    Country: {artistCountryMap[art.name]}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  const TopTracks = ({ tracks, headerPic, onTrackClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Extract all track images for the slideshow
    const trackImages = tracks.map((track) => track.img).filter(Boolean);

    // Auto-rotate images every 4 seconds
    useEffect(() => {
      if (trackImages.length === 0) return;

      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % trackImages.length);
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }, [trackImages.length]);

    return (
      <div className="w-80 flex flex-col items-start">
        <div className="relative w-80 h-52 rounded-[3px] mb-4 overflow-hidden bg-shelter-slate">
          {/* Rotating background images */}
          {trackImages.length > 0 ? (
            trackImages.map((img, idx) => (
              <img
                key={idx}
                className={`w-full h-full object-contain rounded-[3px] absolute top-0 left-0 transition-opacity duration-1000 ${
                  idx === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
                src={img}
                alt={`Track ${idx + 1}`}
              />
            ))
          ) : (
            <img
              className="w-full h-full object-contain rounded-[3px] absolute top-0 left-0"
              src={headerPic}
              alt="Top Tracks"
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full bg-black/25 rounded-[3px]" />
          <div className="absolute w-full h-full flex flex-col justify-center items-center p-12 z-10">
            <div className="text-center text-shelter-white text-2xl font-bold font-['Roboto'] leading-10">
              Top Tracks
            </div>
            <div className="text-center text-shelter-gray text-base font-normal font-['Roboto'] leading-normal">
              Discover what's trending now.
            </div>
          </div>
        </div>
        <div className="mb-2 text-shelter-white/60 text-base font-medium font-['Roboto']">
          Top tracks
        </div>
        <div>
          {tracks.map((track) => (
            <button
              key={track.title}
              className="w-full h-20 px-4 flex items-center mb-2 bg-transparent hover:bg-shelter-honey/10 rounded transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-shelter-honey"
              onClick={() => onTrackClick(track)}
            >
              <div className="w-16 h-16 rounded-[3px] overflow-hidden flex-shrink-0">
                <img
                  className="w-full h-full object-cover rounded-[3px]"
                  src={track.img}
                  alt={track.title}
                />
              </div>
              <div className="flex-1 px-5 flex flex-col justify-center">
                <div className="text-shelter-white text-base font-medium font-['Roboto']">
                  {track.title}
                </div>
                <div className="text-shelter-gray text-base font-normal font-['Roboto']">
                  {track.artist}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // --- DESKTOP COMPONENT ---
  const ArtistDesktopPage = () => (
    <div className="w-full flex justify-center items-center bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal overflow-hidden">
      <div className="w-[1152px] flex flex-col items-start">
        <Banner image={bannerImage} title="Artists" className="h-72 mb-8" />
        <div className="flex flex-row w-full">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full pb-4 flex flex-row items-start">
              <div className="py-2 flex flex-col justify-center items-start">
                <div className="h-16 flex flex-col justify-start items-start">
                  <div className="text-shelter-white text-base font-normal font-['Roboto']">
                    Type
                  </div>
                </div>
              </div>
              <div className="px-4 flex flex-col justify-center items-start w-full">
                <PartnerTypeFilter
                  selected={selectedPartnerType}
                  onSelect={setSelectedPartnerType}
                />
              </div>
            </div>
            {/*/<div className="w-full pb-6 flex flex-row items-start">
              <div className="py-2 flex flex-col justify-center items-start">
                <div className="h-16 flex flex-col justify-start items-start">
                  <div className="text-shelter-white text-base font-normal font-['Roboto']">
                    Countries
                  </div>
                </div>
              </div>
              <div className="px-4 flex flex-col justify-center items-start w-full">
                <CountryTags
                  countries={countries}
                  lefts={[
                    4, 116.56, 204.64, 284.81, 360.1, 449.83, 4, 115.02, 231.1,
                    367.42,
                  ]}
                  topFirstRow={4}
                  topSecondRow={43}
                  selected={selectedCountry}
                  onSelect={setSelectedCountry}
                />
              </div>
            </div>*/}
            <ArtistGrid
              artists={filteredArtists}
              positions={artistDesktopPositions}
              hovered={hoveredArtist}
              setHovered={setHoveredArtist}
            />
          </div>
          <div className="w-16" />
          <TopTracks
            tracks={topTracks}
            headerPic={trackHeaderPic}
            onTrackClick={(track) => setTrackModal({ open: true, track })}
          />
        </div>
      </div>
    </div>
  );

  // --- TABLET COMPONENT ---
  const ArtistPageTablet = () => (
    <div className="w-full bg-shelter-charcoal flex flex-col items-center">
      <div className="w-[768px] flex flex-col items-start">
        <Banner image={bannerImage} title="Artists" className="h-96 mb-8" />
        <div className="w-full pb-4 flex flex-row items-start">
          <div className="py-2 flex flex-col justify-center items-start">
            <div className="h-16 flex flex-col justify-start items-start">
              <div className="text-shelter-white text-base font-normal font-['Roboto']">
                Type
              </div>
            </div>
          </div>
          <div className="px-4 flex flex-col justify-center items-start w-full">
            <PartnerTypeFilter
              selected={selectedPartnerType}
              onSelect={setSelectedPartnerType}
            />
          </div>
        </div>
       {/*} <div className="w-full pb-6 flex flex-row items-start">
          <div className="py-2 flex flex-col justify-center items-start">
            <div className="h-16 flex flex-col justify-start items-start">
              <div className="text-shelter-white text-base font-normal font-['Roboto']">
                Countries
              </div>
            </div>
          </div>
          <div className="px-4 flex flex-col justify-center items-start w-full">
            <CountryTags
              countries={countries}
              lefts={[
                4, 116.56, 204.64, 284.81, 360.1, 449.83, 4, 115.02, 231.1,
                367.42,
              ]}
              topFirstRow={4}
              topSecondRow={43}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />
          </div>
        </div> */}
        <ArtistGrid
          artists={filteredArtists}
          positions={artistTabletPositions}
          cardClass="max-w-48"
          hovered={hoveredArtist}
          setHovered={setHoveredArtist}
        />
        <TopTracks
          tracks={topTracks}
          headerPic={trackHeaderPic}
          onTrackClick={(track) => setTrackModal({ open: true, track })}
        />
      </div>
    </div>
  );

  // --- MOBILE COMPONENT ---
  const ArtistMobilePage = () => (
    <div className="w-full max-w-[767px] min-h-screen bg-shelter-charcoal flex flex-col items-center overflow-x-hidden">
      <div className="w-full flex-1 flex flex-col items-center">
        <div className="w-full p-4 flex flex-col items-center">
          <Banner
            image={bannerImage}
            title="Artists"
            className="max-w-[390px] aspect-square mb-8"
          />
          <div className="w-full pb-4">
            <div className="text-shelter-white text-base font-normal font-['Roboto'] mb-2">
              Type
            </div>
            <PartnerTypeFilter
              selected={selectedPartnerType}
              onSelect={setSelectedPartnerType}
            />
          </div>
          {/*<div className="w-full pb-6 flex flex-row items-start">
            <div className="py-2 flex flex-col justify-center items-start">
              <div className="h-12 flex flex-col justify-start items-start">
                <div className="text-shelter-white text-base font-normal font-['Roboto']">
                  Countries
                </div>
              </div>
            </div>
            <div className="flex-1 px-4 flex flex-col justify-center items-start">
              <div className="w-full grid grid-cols-3 gap-2">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    className={`px-2 py-[5px] rounded-sm flex justify-center items-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-shelter-honey transition-all duration-150
                    ${
                      selectedCountry === country
                        ? "bg-shelter-honey text-shelter-charcoal font-bold scale-105"
                        : "bg-shelter-slate text-shelter-white/60 font-medium hover:bg-shelter-honey/20"
                    }`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    <span className="text-center text-sm font-['Roboto'] leading-tight">
                      {country}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>*/}
          <div className="w-full grid grid-cols-3 gap-y-2 gap-x-[1.5rem]">
            {filteredArtists.map((art) => (
              <Link
                key={art.name}
                to={`/artist/${encodeURIComponent([art.name])}`}
                state={{ art, albumImage }}
                onClick={() => {
                  sessionStorage.setItem(`album:${art.id}`, JSON.stringify(art));
                }}
                className="flex flex-col items-center p-2 cursor-pointer touch-manipulation"
              >
                <div className="rounded-[3px] flex flex-col items-center">
                  <div className="h-24 w-24 relative rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={art.img}
                      alt={art.name}
                    />
                  </div>
                  <div className="py-2 flex flex-col items-center">
                    <div className="text-center text-shelter-white/60 text-base font-normal font-['Roboto']">
                      {art.name}
                    </div>
                    <div className="mt-1 text-shelter-honey text-xs">
                      Country: {artistCountryMap[art.name]}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <TopTracks
            tracks={topTracks}
            headerPic={trackHeaderPic}
            onTrackClick={(track) => setTrackModal({ open: true, track })}
          />
        </div>
      </div>
    </div>
  );

  // --- TRACK MODAL ---
  const TrackModal = ({ open, track, onClose }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const audioRef = React.useRef(null);

    // Reset playing state when modal closes or track changes
    React.useEffect(() => {
      if (!open) {
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    }, [open, track]);

    const handlePlayPause = () => {
      if (!audioRef.current || !track?.audio_url) return;
      
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    };

    if (!open || !track) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-shelter-slate rounded-lg shadow-lg p-8 max-w-md w-full relative">
          <button
            className="absolute top-2 right-2 text-shelter-white text-xl hover:text-shelter-honey transition-colors focus:ring-2 focus:ring-shelter-honey"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex flex-col items-center">
            <img
              src={track.img}
              alt={track.title}
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <div className="text-shelter-white text-2xl font-bold mb-2">
              {track.title}
            </div>
            <div className="text-shelter-gray text-lg mb-2">{track.artist}</div>
            <div className="text-shelter-honey text-base mb-4">
              Chart position:{" "}
              {topTracks.findIndex((t) => t.title === track.title) + 1}
            </div>
            
            {/* Play Button */}
            {track.audio_url ? (
              <>
                <button
                  onClick={handlePlayPause}
                  className="mt-4 px-8 py-3 bg-shelter-honey hover:bg-shelter-amber text-shelter-charcoal font-bold rounded-full transition-all duration-150 flex items-center gap-2 shadow-lg hover:shadow-shelter-honey/50 focus:ring-2 focus:ring-shelter-honey"
                >
                  {isPlaying ? (
                    <>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Play
                    </>
                  )}
                </button>
                <audio
                  ref={audioRef}
                  src={track.audio_url}
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                />
              </>
            ) : (
              <div className="mt-4 text-shelter-gray text-sm">
                Audio preview not available
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Memoize the rendered components to prevent re-creation on state changes
  const desktopView = React.useMemo(() => <ArtistDesktopPage artisImage={albumImage} />, [albumImage, filteredArtists, hoveredArtist, selectedCountry, selectedPartnerType]);
  const tabletView = React.useMemo(() => <ArtistPageTablet artisImage={albumImage} />, [albumImage, filteredArtists, hoveredArtist, selectedCountry, selectedPartnerType]);
  const mobileView = React.useMemo(() => <ArtistMobilePage artisImage={albumImage} />, [albumImage, filteredArtists, hoveredArtist, selectedCountry, selectedPartnerType]);

  // Wait for data to load
  if (!dbSnapshot) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-shelter-charcoal text-shelter-white">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Artist & Church Partners | Shelter House Music"
        description="Meet our church partners including worship leaders, gospel artists, and church musicians. Discover faith-centered music and support Christian artists serving the community."
        keywords="christian artists, church, churches, ministry partners, worship leaders, gospel artists, church musicians, faith-based artists, christian music ministry, worship music artists"
        url="https://shelterhousemusic.com/artists"
      />
      
      <div className="bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal ">
        {/* SearchBar at top level - prevents re-creation on view changes */}
        <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-4">
          <SearchBar onSearchResults={handleSearchResults} viewMode="artists" />
        </div>
        
        {isDesktop && desktopView}
        {isTablet && tabletView}
        {isMobile && mobileView}
        <TrackModal
          open={trackModal.open}
          track={trackModal.track}
          onClose={() => setTrackModal({ open: false, track: null })}
        />
      </div>
    </>
  );
};

export default ArtistPageComponent;
