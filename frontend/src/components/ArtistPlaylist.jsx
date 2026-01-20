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

  const allArtists = dbSnapshot?.artists?.records || [];
  const videos = dbSnapshot?.videos?.records || [];
  const artistImages = dbSnapshot?.artist_images?.records || [];

  // Filter to only show artists that have active videos
  const artists = allArtists.filter((artist) => {
    return videos.some((v) => v.artist_id === artist.id && v.activate);
  });

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
    <div className="w-full bg-gradient-to-br from-shelter-slate to-shelter-charcoal rounded-xl shadow-2xl border border-shelter-honey/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-shelter-honey to-shelter-amber px-6 py-4">
        <h3 className="text-shelter-charcoal text-2xl font-bold flex items-center gap-3">
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
          <div className="flex-wrap inline-block w-[50%] sm:inline-block sm:w-[100%] md:w-[100%] lg:w-[100%] bg-shelter-slate rounded-xl overflow-hidden shadow-lg border-2 border-shelter-honey/30 hover:border-shelter-honey transition-all duration-300">
            {/* Artist Image */}
            <div className="w-[16.1875rem] h-[16.1875rem] relative aspect-square overflow-hidden bg-gradient-to-br from-shelter-honey/20 to-shelter-amber/20">
              {getArtistImage(currentArtist.id) ? (
                <img
                  src={getArtistImage(currentArtist.id)}
                  alt={currentArtist.name || currentArtist.artist_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="i-lucide-user text-shelter-honey text-8xl opacity-30"></span>
                </div>
              )}
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-shelter-slate via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Artist Info */}
            <div className="p-6">
              <h4 className="text-shelter-white text-2xl font-bold mb-2 line-clamp-2">
                {currentArtist.name || currentArtist.artist_name}
              </h4>

              {currentArtist.bio && (
                <p className="text-shelter-gray text-lg mb-4 line-clamp-3 overflow-auto max-h-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {currentArtist.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-shelter-honey text-sm font-semibold">
                <div className="flex items-center gap-1">
                  <span className="i-lucide-film"></span>
                  <span>{currentVideoUrls.length} Videos</span>
                </div>
                <div className="flex text-lg text-shelter-olive items-center gap-1">
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
                  className="px-4 py-2 bg-shelter-honey text-shelter-charcoal rounded-lg font-bold hover:bg-shelter-amber transition-all duration-300 flex items-center gap-2 focus:ring-2 focus:ring-shelter-honey disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={artists.length <= 1}
                >
                  <span className="i-lucide-chevron-left"></span>
                  Prev
                </button>

                <div className="text-shelter-gray text-sm font-semibold">
                  {currentArtistIndex + 1} / {artists.length}
                </div>

                <button
                  onClick={() =>
                    setCurrentArtistIndex((prev) => (prev + 1) % artists.length)
                  }
                  className="px-4 py-2 bg-shelter-honey text-shelter-charcoal rounded-lg font-bold hover:bg-shelter-amber transition-all duration-300 flex items-center gap-2 focus:ring-2 focus:ring-shelter-honey disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={artists.length <= 1}
                >
                  Next
                  <span className="i-lucide-chevron-right"></span>
                </button>
              </div>

              {/* Auto-play Indicator */}
              <div className="mt-4 px-3 py-2 bg-shelter-honey/20 rounded-lg text-center">
                <p className="text-shelter-white text-lg font-semibold flex items-center justify-center gap-2">
                  <span className="i-lucide-shuffle animate-pulse text-shelter-honey"></span>
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
      <div className="bg-shelter-slate px-6 py-4 border-t border-shelter-honey/20">
        <div className="flex items-center justify-between text-shelter-gray text-sm">
          <div className="flex items-center gap-2">
            <span className="i-lucide-play-circle text-shelter-honey"></span>
            <span>
              Now Playing:{" "}
              <span className="text-shelter-white font-semibold">
                {currentArtist.name || currentArtist.artist_name}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="i-lucide-list text-shelter-honey"></span>
            <span>{currentVideoUrls.length} videos in queue</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPlaylist;
