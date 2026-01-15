import React, { useEffect, useState } from "react";
import { useApiData } from "../context/ApiDataContext.jsx";
import ReactPlayer from "react-player";

const VideoPlayerComponent = ({ videoUrls = null, onPlaylistEnd = null }) => {
  const { dbSnapshot } = useApiData();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerError, setPlayerError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const autoAdvanceTimerRef = React.useRef(null);
  const inactivityTimerRef = React.useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  // Get thumbnail URL for a video
  const getThumbnailUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Handle user interaction - stops auto-advance
  const handleUserInteraction = () => {
    setUserInteracted(true);
    setLastInteractionTime(Date.now());
    
    // Clear existing timers
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Start 2-minute inactivity timer
    inactivityTimerRef.current = setTimeout(() => {
      // Resume auto-advance if video is not playing
      if (!isPlaying) {
        setUserInteracted(false);
      }
    }, 120000); // 2 minutes
  };

  // Navigate to next video with fade transition
  const advanceToNextVideo = () => {
    setFadeOut(true);
    
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % videos.length;
      
      // If we're at the last video and going to loop back, call onPlaylistEnd
      if (currentIndex === videos.length - 1 && onPlaylistEnd) {
        onPlaylistEnd();
      }
      
      setCurrentIndex(nextIndex);
      setPlayerError(false);
      setFadeOut(false);
    }, 500); // Fade duration
  };

  // Handle clicking on the thumbnail/play button
  const handlePlayClick = () => {
    handleUserInteraction();
    if (videos[currentIndex]) {
      window.open(videos[currentIndex], "_blank");
    }
  };

  // Navigate to previous video
  const handlePrevious = () => {
    handleUserInteraction();
    setFadeOut(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
      setPlayerError(false);
      setFadeOut(false);
    }, 500);
  };

  // Navigate to next video
  const handleNext = () => {
    handleUserInteraction();
    advanceToNextVideo();
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

    if (isLeftSwipe && videos.length > 1) {
      handleNext();
    } else if (isRightSwipe && videos.length > 1) {
      handlePrevious();
    }
  };

  useEffect(() => {
    // If videoUrls prop is provided, use it (for filtered videos)
    if (videoUrls !== null) {
      setVideos(videoUrls);
      setLoading(false);
      setCurrentIndex(0);
    } else if (dbSnapshot && dbSnapshot.videos && dbSnapshot.videos.records) {
      // Otherwise, use videos from dbSnapshot (default behavior)
      const videoUrlsFromDb = dbSnapshot.videos.records.map((v) => v.video_url);
      setVideos(videoUrlsFromDb);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [dbSnapshot, videoUrls]);

  // Auto-advance logic - runs by default unless user has interacted
  useEffect(() => {
    // Clear any existing timer
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
    }

    // Only auto-advance if:
    // 1. Not loading
    // 2. Videos are available
    // 3. User hasn't interacted (or 2 minutes passed since interaction and video not playing)
    // 4. Video is not currently playing
    if (!loading && videos.length > 0 && !userInteracted && !isPlaying) {
      autoAdvanceTimerRef.current = setTimeout(() => {
        advanceToNextVideo();
      }, 8000); // 8 seconds per video
    }

    // Cleanup
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [currentIndex, loading, videos.length, userInteracted, isPlaying]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  const currentVideo = videos[currentIndex];
  const currentThumbnail = currentVideo ? getThumbnailUrl(currentVideo) : null;

  return (
    <div className="w-full max-w-[75rem] mx-auto bg-shelter-charcoal rounded-[1.4vw] shadow-lg p-4 flex flex-col items-center ">
      {/* Video Counter */}
      {!loading && videos.length > 0 && (
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-shelter-white text-sm font-['Roboto']">
            Video {currentIndex + 1} of {videos.length}
          </div>
        </div>
      )}

      <div 
        className="relative w-full aspect-video bg-shelter-slate rounded-[1vw] overflow-hidden touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {loading ? (
          <div className="flex items-center justify-center w-full h-full text-shelter-white text-xl font-bold font-['Roboto']">
            Loading videos...
          </div>
        ) : videos.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-shelter-white text-xl font-bold font-['Roboto']">
            No videos available
          </div>
        ) : playerError && currentThumbnail ? (
          // Show thumbnail as fallback if ReactPlayer fails to load
          <div
            className={`relative w-full h-full cursor-pointer transition-opacity duration-500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
            onClick={handlePlayClick}
          >
            <img
              src={currentThumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to lower quality thumbnail if maxres doesn't exist
                e.target.src = currentThumbnail.replace(
                  "maxresdefault",
                  "hqdefault"
                );
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-shelter-honey hover:bg-shelter-amber transition-all duration-300 rounded-full p-6 shadow-2xl">
                <svg
                  className="w-16 h-16 text-shelter-charcoal"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`w-full h-full transition-opacity duration-500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
            onClick={handleUserInteraction}
          >
            <ReactPlayer
              src={currentVideo}
              controls
              width="100%"
              height="100%"
              className="react-player"
              playing={false}
              onPlay={() => {
                setIsPlaying(true);
                handleUserInteraction();
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={() => {
                console.error("ReactPlayer failed to load video");
                setPlayerError(true);
              }}
            />
          </div>
        )}

        {/* Navigation Arrows */}
        {!loading && videos.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-shelter-charcoal bg-opacity-70 hover:bg-shelter-honey hover:bg-opacity-90 text-shelter-white hover:text-shelter-charcoal rounded-full p-3 transition-all duration-300 z-10"
              aria-label="Previous video"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-shelter-charcoal bg-opacity-70 hover:bg-shelter-honey hover:bg-opacity-90 text-shelter-white hover:text-shelter-charcoal rounded-full p-3 transition-all duration-300 z-10"
              aria-label="Next video"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {!loading && videos.length > 1 && (
        <div className="flex gap-2 sm:gap-0 mt-4">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                handleUserInteraction();
                setFadeOut(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setPlayerError(false);
                  setFadeOut(false);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-shelter-honey w-8"
                  : "bg-shelter-slate hover:bg-shelter-honey/50"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-advance indicator */}
      {!loading && videos.length > 0 && !userInteracted && !isPlaying && (
        <div className="mt-2 text-xs text-shelter-white/60 flex items-center gap-2 font-['Roboto']">
          <span className="animate-pulse text-shelter-honey">●</span>
          Auto-advancing through videos
        </div>
      )}
    </div>
  );
};

export default VideoPlayerComponent;
