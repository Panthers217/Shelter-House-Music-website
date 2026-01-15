// Demo merch products
import React, { useState, useEffect, useRef } from "react";
import { useApiData } from "../context/ApiDataContext.jsx";
import SearchBar from "./SearchBar.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useFeatures } from "../context/FeaturesContext.jsx";
import NotAvailableModal from "./modal/NotAvailableModal.jsx";
import TrackCard from "./TrackCard.jsx";
import CartSummary from "./CartSummary.jsx";
import { getArtistDataById } from "../utils/artistDataHelper.js";
import ZoomFit from "./ZoomFit.jsx";
import DemoBanner from "./DemoBanner.jsx";

const demoMerchProducts = [
  {
    type: "Digital Album",
    title: "Neon Dreams - Digital Album",
    price: "$12.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Vinyl Record",
    title: "Synthwave Nights Vinyl",
    price: "$29.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Apparel",
    title: "Luna Starlight T-Shirt",
    price: "$24.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Apparel",
    title: "Retro Wave Hoodie",
    price: "$49.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Limited Edition",
    title: "Cosmic Journey - Limited Edition",
    price: "$19.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Posters & Art",
    title: "Synthwave Poster Set",
    price: "$15.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Digital Album",
    title: "Midnight Frequencies EP",
    price: "$8.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Accessories",
    title: "Neon Keychain",
    price: "$9.99",
    img: "https://placehold.co/265x265",
  },
];

function ArtistStoreNav({
  storeName,
  cartCount,
  tabs,
  activeTab,
  setActiveTab,
}) {
  return (
    <nav className="w-full bg-shelter-slate outline outline-[0.04rem] outline-offset-[-0.04rem] outline-shelter-gray/20 flex flex-col pb-[0.04rem]">
      <div className="flex justify-between items-center w-full py-[1rem] px-[6%]">
        <span className="text-shelter-white text-[1.2rem] md:text[1.5rem] lg:text-[2rem] xl:text-[2rem] font-bold font-['Roboto'] ">
          {storeName}
        </span>
        <div className="px-[0.7rem] py-[0.5rem] bg-shelter-charcoal rounded-xs outline outline-[0.04rem] outline-offset-[-0.04rem] outline-shelter-gray/20 flex items-center">
          <span className="text-shelter-white text-[0.7rem] lg:text-[1rem] xl:text-[2rem] font-medium font-['Roboto']">
            Cart ({cartCount})
          </span>
        </div>
      </div>
      <div className="flex sm:flex-col justify-center items-center gap-3 px-[6%] pb-[0.7rem]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-bold text-base transition-all duration-200 shadow-sm border-2 border-shelter-honey focus:outline-none focus:ring-2 focus:ring-shelter-honey
              ${
                activeTab === tab
                  ? "bg-shelter-honey text-shelter-charcoal scale-105 shadow-lg"
                  : "bg-shelter-charcoal text-shelter-white hover:bg-shelter-amber hover:text-shelter-charcoal"
              }
            `}
            style={{ minWidth: "120px" }}
          >
            <span className="text-[0.9rem] sm:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] font-normal font-['Roboto'] leading-tight tracking-wide">
              {tab}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function ArtistStoreHeader({
  title = "Official Music & Merchandise",
  description = "Support Luna Starlight directly by purchasing official music releases and exclusive merchandise. All proceeds help fund future creative projects.",
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 px-[5%] pt-[0.5rem] pb-[0.2rem] ">
      <div className="w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-[1.7rem] lg:text-[2.2rem] xl:text-[2.7rem] font-extrabold font-['Roboto'] leading-[2.2rem] drop-shadow-lg">
        {title}
      </div>
      <div className="w-full text-center text-shelter-white text-opacity-80 text-[1.1rem] lg:text-[1.3rem] xl:text-[1.5rem] font-semibold font-['Roboto'] leading-[1.7] px-2 py-2 rounded-lg bg-shelter-slate/60 shadow-md">
        {description}
      </div>
    </div>
  );
}

// Component to display album with associated tracks
function AlbumWithTracks({ album, tracks, dbSnapshot, isStripeEnabled, onAddToCart, isHighlighted, albumRef }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    if (album.artistId) {
      navigate(`/store/${album.artistId}`);
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (isStripeEnabled) {
      onAddToCart();
    } else {
      if (!album.purchaseLink) {
        e.preventDefault();
        setShowModal(true);
      }
    }
  };

  return (
    <div 
      ref={albumRef}
      className={`flex flex-col lg:flex-row gap-6 w-full bg-shelter-slate/50 rounded-lg p-6 border transition-all duration-500 ${
        isHighlighted 
          ? 'border-shelter-honey border-2 shadow-lg shadow-shelter-honey/50' 
          : 'border-shelter-gray/20'
      }`}
    >
      <NotAvailableModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      
      {/* Album Card */}
      <div
        className="flex flex-col w-full max-w-[17rem] h-[23rem] bg-shelter-slate rounded-md outline outline-[0.04rem] outline-offset-[-0.04rem] outline-shelter-gray/20 overflow-hidden flex-shrink-0 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-shelter-honey/50 hover:-translate-y-2"
        style={{ minWidth: "220px", minHeight: "320px" }}
      >
        <div
          className="flex-shrink-0 w-full h-[65%] flex items-center justify-center relative cursor-pointer group"
          onClick={handleImageClick}
        >
          <img
            className="w-[95%] h-[95%] object-contain rounded-t-md transition-transform duration-300 group-hover:scale-110"
            src={album.img}
            alt={album.title}
          />
          {album.artistId && (
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Store
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-start gap-2 w-full h-[35%] px-[6%] pt-[5%] pb-[6%]">
          <div className="text-shelter-honey text-[1.5rem] font-medium font-['Roboto'] uppercase leading-3 tracking-tight">
            {album.type}
          </div>
          <div className="text-shelter-white text-[1rem] xl:text-[1.2rem] font-medium font-['Roboto'] leading-none">
            {album.title}
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="text-shelter-white text-sm xl:text-[1.2rem]  font-bold font-['Roboto'] leading-tight">
              {album.price}
            </div>
            {isStripeEnabled ? (
              <button
                className="px-[0.7rem] py-[0.35rem] bg-shelter-honey rounded-xs flex flex-col justify-center items-center hover:bg-shelter-amber transition-colors duration-200 focus:ring-2 focus:ring-shelter-honey"
                onClick={handleButtonClick}
              >
                <span className="text-center text-shelter-charcoal text-[0.8rem] xl:text-[1.2rem] font-semibold font-['Roboto'] leading-[0.9rem]">
                  Add to Cart
                </span>
              </button>
            ) : (
              <a
                href={album.purchaseLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleButtonClick}
                className="px-[0.7rem] py-[0.35rem] bg-shelter-honey rounded-xs flex flex-col justify-center items-center hover:bg-shelter-amber transition-colors duration-200 focus:ring-2 focus:ring-shelter-honey"
              >
                <span className="text-center text-shelter-charcoal text-[0.8rem] xl:text-[1.2rem] font-semibold font-['Roboto'] leading-[0.9rem]">
                  Buy Now
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Tracks List */}
      {tracks.length > 0 && (
        <div className="flex-1">
          <h3 className="text-shelter-white text-xl font-bold mb-4 font-['Roboto']">
            Album Tracks ({tracks.length})
          </h3>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {tracks.map((track, idx) => (
              <TrackListItem
                key={idx}
                track={track}
                albumCover={album.img}
                trackNumber={idx + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Component for individual track in album list
function TrackListItem({ track, albumCover, trackNumber }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  // Always show play button, whether there's audio or not
  const hasAudio = track.promo_audio_url;

  return (
    <div className="bg-shelter-charcoal rounded-lg p-3 flex items-center gap-4 hover:bg-shelter-slate transition-all duration-200 group">
      {/* Track Number */}
      <div className="flex-shrink-0 w-8 text-center">
        <span className="text-shelter-white/60 text-sm font-bold">{trackNumber}</span>
      </div>
      
      {/* Album Cover */}
      <div className="flex-shrink-0">
        <img
          src={albumCover}
          alt={track.title}
          className="w-16 h-16 rounded-md object-cover"
        />
      </div>
      
      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="text-shelter-white text-xl text-base font-semibold font-['Roboto'] truncate">
          {track.title || "Untitled Track"}
        </div>
        <div className="text-shelter-honey text-lg font-medium">
          {track.artist_name || "Unknown Artist"}
        </div>
      </div>
      
      {/* Play Button - Always visible */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <button
          onClick={handlePlayPause}
          disabled={!hasAudio}
          className={`w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center group-hover:scale-110 focus:ring-2 focus:ring-shelter-honey ${
            hasAudio 
              ? 'bg-shelter-honey hover:bg-shelter-amber cursor-pointer' 
              : 'bg-shelter-gray cursor-not-allowed opacity-50'
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
          title={hasAudio ? (isPlaying ? "Pause" : "Play preview") : "No preview available"}
        >
          {isPlaying ? (
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-shelter-charcoal rounded-sm"></div>
              <div className="w-1 h-4 bg-shelter-charcoal rounded-sm"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-shelter-charcoal border-b-[6px] border-b-transparent ml-1"></div>
          )}
        </button>
        {hasAudio && (
          <audio
            ref={audioRef}
            src={track.promo_audio_url}
            onEnded={handleEnded}
          />
        )}
      </div>
    </div>
  );
}

function ArtistMerchCard({
  type,
  title,
  price,
  img,
  buttonLabel = "Add to Cart",
  onAddToCart,
  artistId,
  purchaseLink,
  isStripeEnabled = true,
  audioUrl = null,
  isTrack = false,
}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  const handleImageClick = () => {
    if (artistId) {
      navigate(`/store/${artistId}`);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (isStripeEnabled) {
      // Use Add to Cart when Stripe is enabled
      onAddToCart();
    } else {
      // Use purchaseLink when Stripe is disabled
      if (!purchaseLink) {
        e.preventDefault();
        setShowModal(true);
      }
      // If purchaseLink exists, let the <a> tag handle navigation naturally
    }
  };

  return (
    <div
      className="flex flex-col w-full max-w-[17rem] h-[auto] bg-shelter-slate rounded-md outline outline-[0.04rem] outline-offset-[-0.04rem] outline-shelter-gray/20 overflow-hidden flex-grow transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-shelter-honey/50 hover:-translate-y-2"
      style={{ minWidth: "220px", minHeight: "320px" }}
    >
      <NotAvailableModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      <div
        className="flex-shrink-0 w-full h-[65%] flex items-center justify-center relative cursor-pointer group"
        onClick={handleImageClick}
      >
        <img
          className="w-[95%] h-[95%] object-contain rounded-t-md transition-transform duration-300 group-hover:scale-110"
          src={img}
          alt={title}
        />
        {artistId && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Store
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full h-[35%] px-[6%] pt-[20%] pb-[6%]">
        <div className={`${type === 'Digital Album' ? 'text-shelter-honey' : 'text-shelter-honey'} text-[1rem] font-medium font-['Roboto'] uppercase leading-3 tracking-tight`}>
          {type}
        </div>
        <div className="text-shelter-white text-[1rem] xl:text-[1.2rem] font-medium font-['Roboto'] leading-none">
          {title}
        </div>
        {/* Preview Button for Tracks */}
        {isTrack && audioUrl && (
          <div className="w-full mb-2">
            <button
              onClick={handlePlayPause}
              className="w-full px-[0.7rem] py-[0.35rem] bg-shelter-charcoal border-2 border-shelter-honey rounded-xs flex items-center justify-center gap-2 hover:bg-shelter-honey transition-colors duration-200 group focus:ring-2 focus:ring-shelter-honey"
            >
              {isPlaying ? (
                <>
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-shelter-honey group-hover:bg-shelter-charcoal rounded-sm"></div>
                    <div className="w-1 h-3 bg-shelter-honey group-hover:bg-shelter-charcoal rounded-sm"></div>
                  </div>
                  <span className="text-center text-shelter-honey group-hover:text-shelter-charcoal text-[0.8rem] xl:text-[1rem] font-semibold font-['Roboto']">
                    Pause Preview
                  </span>
                </>
              ) : (
                <>
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-shelter-honey group-hover:border-l-shelter-charcoal border-b-[5px] border-b-transparent"></div>
                  <span className="text-center text-shelter-honey group-hover:text-shelter-charcoal text-[0.8rem] xl:text-[1rem] font-semibold font-['Roboto']">
                    Play Preview
                  </span>
                </>
              )}
            </button>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
            />
          </div>
        )}
        
        <div className="flex justify-between items-center w-full mb-[10%]">
          <div className="text-shelter-white text-sm xl:text-[1.2rem]  font-bold font-['Roboto'] leading-tight">
            {price}
          </div>
          {isStripeEnabled ? (
            <button
              className="px-[0.7rem] py-[0.35rem] bg-shelter-honey rounded-xs flex flex-col justify-center items-center hover:bg-shelter-amber transition-colors duration-200 focus:ring-2 focus:ring-shelter-honey"
              onClick={handleButtonClick}
            >
              <span className="text-center text-shelter-charcoal text-[0.8rem] xl:text-[1.2rem] font-semibold font-['Roboto'] leading-[0.9rem]">
                {buttonLabel}
              </span>
            </button>
          ) : (
            <a
              href={purchaseLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleButtonClick}
              className="px-[0.7rem] py-[0.35rem] bg-shelter-honey rounded-xs flex flex-col justify-center items-center hover:bg-shelter-amber transition-colors duration-200 focus:ring-2 focus:ring-shelter-honey"
            >
              <span className="text-center text-shelter-charcoal text-[0.8rem] xl:text-[1.2rem] font-semibold font-['Roboto'] leading-[0.9rem]">
                Buy Now
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const ArtistStore = ({ artistId = null, artistName = "Artist" }) => {
  const { dbSnapshot } = useApiData();
  const { cart, addToCart, removeFromCart, getCartCount, getCartTotal } =
    useCart();
  const { isEnabled } = useFeatures();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightedAlbumId = searchParams.get('albumId');
  const albumRefs = useRef({});
  const tabs = ["All Products", "Music", "Merchandise"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [viewMode, setViewMode] = useState("all"); // "all", "albums", "tracks"
  const [searchResults, setSearchResults] = useState(null);

  const isStripeEnabled = isEnabled("enable_stripe");

  // Get artist data for background image (only for individual artist stores)
  const artistData = artistId && dbSnapshot?.artists?.records
    ? dbSnapshot.artists.records.find(artist => artist.id === parseInt(artistId))
    : null;
  const artistImageUrl = artistData?.image_url || null;
  
  // Debug: Log artist image URL
  React.useEffect(() => {
    if (artistId) {
      // console.log('Artist ID:', artistId);
      // console.log('Artist Data:', artistData);
      // console.log('Artist Image URL:', artistImageUrl);
    }
  }, [artistId, artistData, artistImageUrl]);

  // Scroll to highlighted album when component loads
  useEffect(() => {
    if (highlightedAlbumId && albumRefs.current[highlightedAlbumId]) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        albumRefs.current[highlightedAlbumId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 300);
    }
  }, [highlightedAlbumId, dbSnapshot]);

  // Use search results if available, otherwise use full data
  const sourceAlbums = searchResults
    ? searchResults.albums
    : dbSnapshot?.albums?.records || [];
  const sourceTracks = searchResults
    ? searchResults.tracks
    : dbSnapshot?.tracks?.records || [];
  const sourceMerchandise = searchResults
    ? searchResults.merchandise
    : dbSnapshot?.merchandise?.records || []; // Merch not included in search yet

  // Get albums from database, optionally filtered by artist
  let albumProducts = [];
  if (dbSnapshot && dbSnapshot.albums && dbSnapshot.albums.records) {
    const filteredAlbums = artistId
      ? sourceAlbums.filter((album) => album.artist_id === parseInt(artistId))
      : sourceAlbums;

    albumProducts = filteredAlbums.map((album) => {
      // Parse price - handle both string and number formats
      let parsedPrice = 0;
      if (album.album_pricing != null && album.album_pricing !== "") {
        const priceValue =
          typeof album.album_pricing === "string"
            ? parseFloat(album.album_pricing)
            : Number(album.album_pricing);

        // Check if conversion was successful
        if (!isNaN(priceValue)) {
          parsedPrice = priceValue / 100; // Convert cents to dollars
        }
      }

      return {
        id: album.id,
        trackId: null,
        albumId: album.id,
        artistId: album.artist_id,
        artist_name: getArtistDataById(album.artist_id, dbSnapshot)?.name || 'Unknown Artist',
        type:
          album.album_type === "digital"
            ? "Digital Album"
            : album.album_type === "vinyl"
            ? "Vinyl Record"
            : "Limited Edition",
        title: album.title || "Untitled Album",
        price: parsedPrice > 0 ? `$${parsedPrice.toFixed(2)}` : "$0.00",
        img: album.cover_url || "https://placehold.co/265x265",
        album_type: album.album_type || 'digital',
        merch_type: undefined,
        purchaseLink: album.purchase_link || '',
        audioUrl: undefined,
      };
    });
  }

  // Get tracks from database, optionally filtered by artist
  let trackProducts = [];
  if (dbSnapshot && dbSnapshot.promotional_tracks && dbSnapshot.promotional_tracks.records) {
    const filteredTracks = artistId
      ? dbSnapshot.promotional_tracks.records.filter((track) => {
          // First try direct artist_id match
          if (
            track.artist_id &&
            track.artist_id === parseInt(artistId)
          ) {
            return true;
          }
          // If no direct artist_id, check through album relationship
          if (
            track.album_id &&
            dbSnapshot.albums &&
            dbSnapshot.albums.records
          ) {
            const album = dbSnapshot.albums.records.find(
              (a) => a.id === track.album_id
            );
            return album && album.artist_id === parseInt(artistId);
          }
          return false;
        })
      : dbSnapshot.promotional_tracks.records;

    trackProducts = filteredTracks.map((track) => {
      // Parse price - handle both string and number formats
      let parsedPrice = 0;
      if (track.track_pricing != null && track.track_pricing !== "") {
        const priceValue =
          typeof track.track_pricing === "string"
            ? parseFloat(track.track_pricing)
            : Number(track.track_pricing);

        if (!isNaN(priceValue)) {
          parsedPrice = priceValue / 100; // Convert cents to dollars
        }
      }

      // Get album cover from album_id
      const album = dbSnapshot.albums.records.find(
        (a) => a.id === track.album_id
      );

      return {
        id: track.id,
        trackId: track.id,
        albumId: track.album_id || null,
        artistId: track.artist_id,
        artist_name: getArtistDataById(track.artist_id, dbSnapshot)?.name || 'Unknown Artist',
        type: "Track",
        title: track.title || "Untitled Track",
        price: parsedPrice > 0 ? `$${parsedPrice.toFixed(2)}` : "$0.00",
        img: album?.cover_url || "https://placehold.co/265x265",
        isTrack: true,
        album_type: undefined,
        merch_type: undefined,
        purchaseLink: track.purchase_link || '',
        audioUrl: track.promo_audio_url || '',
      };
    });
  }

  // Get merchandise from database, optionally filtered by artist
  let merchandiseProducts = [];
  if (dbSnapshot && dbSnapshot.merchandise && dbSnapshot.merchandise.records) {
    const filteredMerch = artistId
      ? sourceMerchandise.filter(
          (merch) => merch.artist_id === parseInt(artistId)
        )
      : sourceMerchandise;

    merchandiseProducts = filteredMerch.map((merch) => {
      // Parse price - NUMERIC format (already in dollars)
      let parsedPrice = 0;
      if (merch.price != null && merch.price !== "") {
        parsedPrice =
          typeof merch.price === "string"
            ? parseFloat(merch.price)
            : Number(merch.price);
      }

      return {
        id: merch.id,
        type: "Merchandise",
        category: merch.merch_type || "General",
        title: merch.title || "Untitled Item",
        price: parsedPrice > 0 ? `$${parsedPrice.toFixed(2)}` : "$0.00",
        img: merch.image_url || "https://placehold.co/265x265",
        merch_type: merch.merch_type,
        artistId: merch.artist_id,
        purchaseLink: merch.purchase_link,
      };
    });
  }

  // Combine all products: albums, tracks, merchandise from DB, and demo products (only if no artistId)
  const allProducts = [
    ...albumProducts,
    ...trackProducts,
    ...merchandiseProducts,
    ...(artistId ? [] : demoMerchProducts),
  ];

  // Filter products by tab and view mode
  const filteredProducts = allProducts.filter((product) => {
    // First filter by tab
    let tabMatch = false;

    if (activeTab === "All Products") {
      tabMatch = true;
    } else if (activeTab === "Music") {
      // For tracks
      if (product.isTrack) {
        tabMatch = true;
      }
      // For albums from database, check album_type
      else if (product.album_type) {
        tabMatch =
          product.album_type === "digital" || product.album_type === "vinyl";
      }
      // For demo products, check type
      else {
        tabMatch =
          product.type === "Digital Album" ||
          product.type === "Vinyl Record" ||
          product.type === "Limited Edition";
      }
    } else if (activeTab === "Merchandise") {
      // For merchandise from database, check merch_type exists
      if (product.merch_type) {
        tabMatch = true;
      }
      // For demo products, filter by type
      else {
        tabMatch =
          product.type === "Apparel" ||
          product.type === "Accessories" ||
          product.type === "Posters & Art";
      }
    }

    if (!tabMatch) return false;

    // Then filter by view mode (only applies when Music tab is active)
    if (activeTab === "Music") {
      if (viewMode === "albums") {
        return (
          product.album_type ||
          product.type === "Digital Album" ||
          product.type === "Vinyl Record" ||
          product.type === "Limited Edition"
        );
      } else if (viewMode === "tracks") {
        return product.isTrack;
      }
    }

    return true;
  });

  // Add to cart using CartContext
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Helper function to determine grid columns for lg/xl
  const getMerchCardGridClass = () => {
    // If showing albums with tracks in Music tab, use vertical stack layout
    const isShowingAlbumsWithTracks = (activeTab === "Music") && (viewMode === "all" || viewMode === "albums");
    
    if (isShowingAlbumsWithTracks) {
      return "MerchCardDiv w-full flex flex-col gap-8";
    }
    
    if (filteredProducts.length <= 1) {
      return "MerchCardDiv w-full flex flex-wrap justify-center ";
    }
    return "MerchCardDiv w-full flex flex-wrap justify-center items-stretch gap-8 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-3 ";
  };

  // Optimize background image URL for performance
  const getOptimizedImageUrl = (url) => {
    if (!url) return null;
    
    // If it's a Cloudinary URL, add optimization parameters
    if (url.includes('cloudinary.com')) {
      // Insert transformation parameters before the upload path
      const optimized = url.replace(
        '/upload/',
        '/upload/f_auto,q_auto,w_1920,/'
      );
      return optimized;
    }
    
    return url;
  };

  const optimizedBackgroundUrl = getOptimizedImageUrl(artistImageUrl);

  return (
    <>
    <ZoomFit> 
      <div className="w-full min-h-screen bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal flex flex-col items-center relative overflow-hidden mt-[1%] minMobile:mt-[5%] sm:mt-[2%] lg:mt-[5%] ">
        {/* Artist Background Image - Only visible on individual artist pages */}
        {optimizedBackgroundUrl && (
          <div 
            className="fixed inset-0 opacity-60 pointer-events-none z-0"
            style={{
              backgroundImage: `url(${optimizedBackgroundUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
            }}
          >
            {/* Multi-layer gradient overlays for modern effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-shelter-charcoal/80 via-shelter-charcoal/50 to-shelter-charcoal/80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-shelter-charcoal/70 via-transparent to-shelter-charcoal/70"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-shelter-charcoal/70 via-transparent to-transparent"></div>
          </div>
        )}
        
        {/* Overlay div to hide scrolling content */}
        <div className="overlayBlock fixed sm:pt-[20rem] md:pt-[25rem] lg:pt-[27rem] xl:pt-[30rem] left-0 w-full h-[10rem] bg-shelter-charcoal z-[100] pointer-events-none "></div>
        
        {/* Content layer with relative positioning */}
        <div className="StoreHeader relative z-[100] w-full flex flex-col items-center  sm:fixed sm:scale-50 sm:origin-top sm:h-[50%] md:fixed lg:fixed xl:fixed">
            <div className="relative z-10 w-full ">
              <ArtistStoreNav
                storeName={artistId ? `${artistName} Store` : "Shelter House Music Store"}
                cartCount={cart.length}
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
           <div className="relative z-10 w-full max-w-6xl px-[6%] py-[2.5rem] flex flex-col items-center gap-10">
              <ArtistStoreHeader
            title={
              artistId
                ? `${artistName} Official Store`
                : "Official Music & Merchandise"
            }
            description={
              artistId
                ? `Support ${artistName} through music and merchandise. Your contribution helps fund future recordings, creative projects, and ministry work.`
                : "Support the mission of Shelter House Music through music and merchandise. Your contribution helps fund worship recordings, outreach, and creative projects that serve local churches and communities"
            }
          />

          {/* Search Bar */}
          <SearchBar onSearchResults={setSearchResults} viewMode="all" />
            </div>
          </div>
        <div className="storeBody-content relative sm:pt-[100%] z-[50] w-full max-w-6xl px-[6%] py-[2.5rem] flex flex-col items-center gap-10 md:pt-[70%] lg:pt-[50%] xl:pt-[25%] ">
          {/* View Mode Toggle - Only show when Music tab is active */}
          {activeTab === "Music" && (
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-lg bg-shelter-charcoal p-1 border-2 border-shelter-honey">
                <button
                  onClick={() => setViewMode("all")}
                  className={`px-6 py-2 rounded-md font-bold text-base transition-all duration-200 focus:ring-2 focus:ring-shelter-honey ${
                    viewMode === "all"
                      ? "bg-shelter-honey text-shelter-charcoal shadow-lg"
                      : "text-shelter-honey hover:text-shelter-white"
                  }`}
                >
                  All Music
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
              </div>
            </div>
          )}
          {/* Cart display - only show when Stripe is enabled */}
          {isStripeEnabled && <CartSummary />}
          
          <div className={`${getMerchCardGridClass()}`}>
            {filteredProducts.map((item, idx) => {
              // Check if this is an album and we should show tracks
              const isAlbum = item.album_type && (activeTab === "Music") && (viewMode === "all" || viewMode === "albums");
              
              if (isAlbum && item.albumId) {
                // Get tracks for this album from promotional_tracks table
                const albumTracks = (dbSnapshot?.promotional_tracks?.records || [])
                  .filter(track => track.album_id === item.albumId)
                  .map(track => ({
                    ...track,
                    artist_name: getArtistDataById(track.artist_id, dbSnapshot)?.name || 'Unknown Artist'
                  }));
                
                const isHighlighted = highlightedAlbumId && item.albumId === parseInt(highlightedAlbumId);
                
                return (
                  <AlbumWithTracks
                    key={idx}
                    album={item}
                    tracks={albumTracks}
                    dbSnapshot={dbSnapshot}
                    isStripeEnabled={isStripeEnabled}
                    onAddToCart={() => handleAddToCart(item)}
                    isHighlighted={isHighlighted}
                    albumRef={isHighlighted ? (el) => albumRefs.current[item.albumId] = el : null}
                  />
                );
              }
              
              // Regular product card
              return (
                <ArtistMerchCard
                  key={idx}
                  {...item}
                  onAddToCart={() => handleAddToCart(item)}
                  isStripeEnabled={isStripeEnabled}
                  purchaseLink={item.purchaseLink}
                />
              );
            })}
          </div>
        </div>
      </div>
      </ZoomFit>
    </>
  );
};

export default ArtistStore;
