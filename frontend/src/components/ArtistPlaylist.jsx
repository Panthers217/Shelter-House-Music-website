import React, { useState, useEffect } from "react";
import { useApiData } from "../context/ApiDataContext";
import VideoPlayerComponent from "./VideoPlayerComponent";

const ArtistPlaylist = () => {
  const { dbSnapshot } = useApiData();
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [currentVideoUrls, setCurrentVideoUrls] = useState([]);
  const [playlistEnded, setPlaylistEnded] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  const artists = dbSnapshot?.artists?.records || [];
  const videos = dbSnapshot?.videos?.records || [];
  const artistImages = dbSnapshot?.artist_images?.records || [];

  // Get current artist
  const currentArtist = artists[currentArtistIndex];

  // Get artist image
  const getArtistImage = (artistId) => {
    const artist = artists.find((a) => a.id === artistId);
    if (artist?.primary_image_id) {
      const image = artistImages.find(
        (img) => img.id === artist.primary_image_id
      );
      return image?.image_url;
    }
    // Fallback to first image for this artist
    const firstImage = artistImages.find((img) => img.artist_id === artistId);
    return firstImage?.image_url;
  };

  // Get videos for current artist
  useEffect(() => {
    if (currentArtist) {
      const artistVideos = videos.filter(
        (v) => v.artist_id === currentArtist.id && v.activate
      );
      const videoUrls = artistVideos
        .map((v) => v.video_url)
        .filter((url) => url);
      setCurrentVideoUrls(videoUrls);
      setPlaylistEnded(false);
    }
  }, [currentArtist, videos]);

  // Handle when playlist ends - move to next artist
  useEffect(() => {
    if (playlistEnded && artists.length > 0) {
      const nextIndex = (currentArtistIndex + 1) % artists.length;
      setCurrentArtistIndex(nextIndex);
    }
  }, [playlistEnded, currentArtistIndex, artists.length]);

  // Listen for when VideoPlayer reaches the end
  const handlePlaylistEnd = () => {
    setPlaylistEnded(true);
  };

  // Touch handlers for swipe gestures
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

    if (isLeftSwipe && artists.length > 1) {
      // Swipe left = Next artist
      setCurrentArtistIndex((prev) => (prev + 1) % artists.length);
    } else if (isRightSwipe && artists.length > 1) {
      // Swipe right = Previous artist
      setCurrentArtistIndex((prev) => (prev === 0 ? artists.length - 1 : prev - 1));
    }
  };

  if (!currentArtist || currentVideoUrls.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#21212b] to-[#1a1b22] rounded-xl shadow-2xl  border border-[#aa2a46]/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#aa2a46] to-[#d63c65] px-6 py-4">
        <h3 className="text-[#fffced] text-2xl font-bold flex items-center gap-3">
          <span className="i-lucide-list-video text-3xl"></span>
          Artist Playlist
        </h3>
      </div>

      {/* Artist Info & Video Player */}
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Artist Card */}
        <div 
          className="lg:w-80 flex-shrink-0 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex-wrap inline-block w-[50%] sm:inline-block sm:w-[100%] md:w-[100%] lg:w-[100%] bg-[#1d1e26] rounded-xl overflow-hidden shadow-lg border-2 border-[#aa2a46]/30 hover:border-[#aa2a46] transition-all duration-300">
            {/* Artist Image */}
            <div className="w-[16.1875rem] h-[16.1875rem] relative aspect-square overflow-hidden bg-gradient-to-br from-[#aa2a46]/20 to-[#d63c65]/20">
              {getArtistImage(currentArtist.id) ? (
                <img
                  src={getArtistImage(currentArtist.id)}
                  alt={currentArtist.name || currentArtist.artist_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="i-lucide-user text-[#aa2a46] text-8xl opacity-30"></span>
                </div>
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d1e26] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Artist Info */}
            <div className="p-6">
              <h4 className="text-[#fffced] text-2xl font-bold mb-2 line-clamp-2">
                {currentArtist.name || currentArtist.artist_name}
              </h4>

              {currentArtist.bio && (
                <p className="text-[#fffced]/70 text-lg mb-4 line-clamp-3 overflow-auto max-h-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {currentArtist.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-[#aa2a46] text-sm font-semibold">
                <div className="flex items-center gap-1">
                  <span className="i-lucide-film"></span>
                  <span>{currentVideoUrls.length} Videos</span>
                </div>
                <div className="flex text-lg text-[green] items-center gap-1">
                  <span className="i-lucide-music"></span>
                  <span>{currentArtist.genre || "Various"}</span>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() =>
                    setCurrentArtistIndex((prev) =>
                      prev === 0 ? artists.length - 1 : prev - 1
                    )
                  }
                  className="px-4 py-2 bg-[#aa2a46] text-[#fffced] rounded-lg font-bold hover:bg-[#d63c65] transition-all duration-300 flex items-center gap-2"
                  disabled={artists.length <= 1}
                >
                  <span className="i-lucide-chevron-left"></span>
                  Prev
                </button>

                <div className="text-[#fffced]/60 text-sm font-semibold">
                  {currentArtistIndex + 1} / {artists.length}
                </div>

                <button
                  onClick={() =>
                    setCurrentArtistIndex((prev) => (prev + 1) % artists.length)
                  }
                  className="px-4 py-2 bg-[#aa2a46] text-[#fffced] rounded-lg font-bold hover:bg-[#d63c65] transition-all duration-300 flex items-center gap-2"
                  disabled={artists.length <= 1}
                >
                  Next
                  <span className="i-lucide-chevron-right"></span>
                </button>
              </div>

              {/* Auto-play Indicator */}
              <div className="mt-4 px-3 py-2 bg-[#aa2a46]/20 rounded-lg text-center">
                <p className="text-[white] text-lg font-semibold flex items-center justify-center gap-2">
                  <span className="i-lucide-shuffle animate-pulse"></span>
                  Auto-playing next artist when playlist ends
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 min-w-0">
          <VideoPlayerComponent
            videoUrls={currentVideoUrls}
            onPlaylistEnd={handlePlaylistEnd}
          />
        </div>
      </div>

      {/* Playlist Info Bar */}
      <div className="bg-[#1d1e26] px-6 py-4 border-t border-[#aa2a46]/20">
        <div className="flex items-center justify-between text-[#fffced]/70 text-sm">
          <div className="flex items-center gap-2">
            <span className="i-lucide-play-circle text-[#aa2a46]"></span>
            <span>
              Now Playing:{" "}
              <span className="text-[#fffced] font-semibold">
                {currentArtist.name || currentArtist.artist_name}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="i-lucide-list text-[#aa2a46]"></span>
            <span>{currentVideoUrls.length} videos in queue</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPlaylist;
