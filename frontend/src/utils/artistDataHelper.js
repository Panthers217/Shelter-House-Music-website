/**
 * Artist Data Helper Utilities
 * 
 * This module provides reusable functions to build artist data for navigation
 * and display across different components (ArtistGallery, ArtistPageLayoutComponents, etc.)
 * 
 * @example
 * // Build data for a single artist
 * import { buildArtistData } from '../utils/artistDataHelper';
 * const artistData = buildArtistData(artist, dbSnapshot);
 * 
 * @example
 * // Build data for multiple artists
 * import { buildMultipleArtistsData } from '../utils/artistDataHelper';
 * const artistsData = buildMultipleArtistsData(dbArtists, dbSnapshot);
 * 
 * @example
 * // Get artist by ID
 * import { getArtistDataById } from '../utils/artistDataHelper';
 * const artistData = getArtistDataById(5, dbSnapshot);
 * 
 * @example
 * // Get artist by name
 * import { getArtistDataByName } from '../utils/artistDataHelper';
 * const artistData = getArtistDataByName('Luna Starlight', dbSnapshot);
 */

/**
 * Get image URL for a promotional track
 * @param {Object} track - The promotional track object
 * @param {Array} artistImages - Array of artist image records
 * @param {Array} albums - Array of album records
 * @returns {string|null} - Image URL or null
 */
export const getPromotionalTrackImage = (track, artistImages, albums) => {
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
  
  // Final fallback
  return null;
};

/**
 * Build featured tracks array for an artist
 * @param {number} artistId - The artist's ID
 * @param {string} artistName - The artist's name (for display)
 * @param {Object} dbSnapshot - Complete database snapshot
 * @returns {Array} - Array of featured track objects with full details
 */
export const buildFeaturedTracks = (artistId, artistName, dbSnapshot) => {
  const promotionalTracks = dbSnapshot?.promotional_tracks?.records || [];
  const artistImages = dbSnapshot?.artist_images?.records || [];
  const albums = dbSnapshot?.albums?.records || [];
  
  // console.log("🔍 buildFeaturedTracks called with:", {
  //   artistId,
  //   artistName,
  //   totalPromotionalTracks: promotionalTracks.length,
  //   totalArtistImages: artistImages.length,
  //   totalAlbums: albums.length
  // });

  // console.log("📋 Promotional Tracks Sample:", promotionalTracks.slice(0, 3));

  // Filter promotional tracks for this artist where artist_id matches
  const artistPromotionalTracks = promotionalTracks.filter(
    (track) => track.artist_id === artistId
  );
  
  // console.log(`📊 Found ${artistPromotionalTracks.length} promotional tracks for artist ${artistId}`);
  if (artistPromotionalTracks.length > 0) {
    // console.log("Sample track:", artistPromotionalTracks[0]);
  }
  
  // Filter for only featured tracks (featured = 1)
  const artistFeaturedTracks = artistPromotionalTracks.filter(
    (track) => track.artist_id === artistId || track.featured === true
  );
  
  // console.log(`⭐ Found ${artistFeaturedTracks.length} featured tracks (featured = 1)`);
  
  // Map featured tracks with full details including images
  const mapped = artistFeaturedTracks.map((track) => ({
    ...track,
    img: getPromotionalTrackImage(track, artistImages, albums),
    promo_audio_url: track.promo_audio_url,
    artist_name: artistName,
    purchaseLink: track.purchase_link  // Map snake_case to camelCase
  }));
  
  // console.log("✅ Returning mapped featured tracks:", mapped);
  return mapped;
};

/**
 * Build complete artist data object for navigation and display
 * @param {Object} artist - Raw artist record from artists table
 * @param {Object} dbSnapshot - Complete database snapshot containing all related data
 * @returns {Object} - Formatted artist data object ready for ArtistOverview component
 */
export const buildArtistData = (artist, dbSnapshot) => {
  // console.log("🎨 buildArtistData called for artist:", artist?.name || artist?.artist_name);
  // console.log("🎨 Raw artist object:", artist);
  // console.log("🆔 Artist ID from params:", artist?.id);
  
  const promotionalTracks = dbSnapshot?.promotional_tracks?.records || [];
  const albums = dbSnapshot?.albums?.records || [];
  const artistImages = dbSnapshot?.artist_images?.records || [];
  
  // console.log("📦 dbSnapshot data:", {
  //   hasPromotionalTracks: !!dbSnapshot?.promotional_tracks,
  //   promotionalTracksCount: promotionalTracks.length,
  //   hasAlbums: !!dbSnapshot?.albums,
  //   albumsCount: albums.length,
  //   hasArtistImages: !!dbSnapshot?.artist_images,
  //   artistImagesCount: artistImages.length
  // });
  
  // Find artist image from artist_images table
  const artistImage = artistImages.find(img => img.artist_id === artist.id);
  // console.log("🖼️ Found artist image:", artistImage);
  
  const mappedFeaturedTracks = buildFeaturedTracks(
    artist.id,
    artist.artist_name || artist.name,
    dbSnapshot
  );
  // console.log("🎵 Mapped featured tracks:", mappedFeaturedTracks);

  const artistData = {
    id: artist.id,
    genre: artist.genre,
    name: artist.artist_name || artist.name,
    img: artist.image_url || artist.profile_url,
    country: artist.artist_country || artist.country,
    bio: artist.bio,
    career_highlights: artist.Career_Highlights,
    influences: artist.Influences,
    featured_tracks: mappedFeaturedTracks,
    rating: artist.rating,
    monthly_listeners: artist.monthly_listeners,
    albums_released: artist.albums_released,
    // Social media URLs
    spotify_url: artist.spotify_url,
    instagram_url: artist.instagram_url,
    twitter_url: artist.twitter_url,
    youtube_url: artist.youtube_url,
    apple_music_url: artist.apple_music_url,
    tiktok_url: artist.tiktok_url,
    facebook_url: artist.facebook_url,
  };
  
  // console.log("✨ Final artistData:", artistData);
  return artistData;
};

/**
 * Build artist data for multiple artists
 * @param {Array} artists - Array of raw artist records
 * @param {Object} dbSnapshot - Complete database snapshot
 * @returns {Array} - Array of formatted artist data objects
 */
export const buildMultipleArtistsData = (artists, dbSnapshot) => {
  return artists.map(artist => buildArtistData(artist, dbSnapshot));
};

/**
 * Find and build artist data by artist ID
 * @param {number} artistId - The artist's ID to find
 * @param {Object} dbSnapshot - Complete database snapshot
 * @returns {Object|null} - Formatted artist data object or null if not found
 */
export const getArtistDataById = (artistId, dbSnapshot) => {
  const artists = dbSnapshot?.artists?.records || [];
  const artist = artists.find(a => a.id === parseInt(artistId));
  
  if (!artist) return null;
  
  return buildArtistData(artist, dbSnapshot);
};

/**
 * Find and build artist data by artist name
 * @param {string} artistName - The artist's name to find
 * @param {Object} dbSnapshot - Complete database snapshot
 * @returns {Object|null} - Formatted artist data object or null if not found
 */
export const getArtistDataByName = (artistName, dbSnapshot) => {
  const artists = dbSnapshot?.artists?.records || [];
  const artist = artists.find(a => 
    (a.artist_name || a.name)?.toLowerCase() === artistName.toLowerCase()
  );
  
  if (!artist) return null;
  
  return buildArtistData(artist, dbSnapshot);
};
