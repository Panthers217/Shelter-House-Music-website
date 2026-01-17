import React from "react";
import { Link } from "react-router-dom";
import { useApiData } from "../context/ApiDataContext.jsx";
import { buildArtistData } from "../utils/artistDataHelper.js";

export const ArtistGallery = () => {
  const { dbSnapshot } = useApiData();

  let artists = [];
  if (dbSnapshot) {
    // console.log("🎭 ArtistGallery - Full dbSnapshot keys:", Object.keys(dbSnapshot));
    artists = dbSnapshot.artists?.records || [];
  }

  // Transform Cloudinary URL to resize image to 259x194
  const getResizedImageUrl = (url) => {
    if (!url) return url;
    // Check if it's a Cloudinary URL
    if (url.includes('cloudinary.com') && url.includes('/upload/')) {
      return url.replace('/upload/', '/upload/w_259,h_194,c_fill/');
    }
    return url;
  };

  

  return (
    <div
      data-layer="Artist Gallery"
      className="ArtistGallery w-full max-w-[100rem] mx-auto rounded-[1.4vw] flex flex-col items-center py-6 animate-fadeIn"
    >
      <div
        data-layer="Frame 19"
        className="Frame19 w-full bg-shelter-charcoal px-5 flex flex-col items-center"
      >
        <h2 className="text-shelter-white text-3xl md:text-5xl font-extrabold font-['Roboto'] mb-8 drop-shadow-lg tracking-wide animate-fadeIn">
          Recording Artists & Church Partners
        </h2>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {artists.map((artist, idx) => {
            // Use helper function to build artist data
            const artistData = buildArtistData(artist, dbSnapshot);
            const artistName = artist.name || artist.artist_name;
            const artistImage = artist.image_url || artist.profile_url;

            return (
              <Link
                key={artistName}
                to={`/artist/${encodeURIComponent(artistName)}/${encodeURIComponent(artist.id)}`}
                state={{ art: artistData }}
                onClick={() => {
                  // console.log("Navigating to artist:", artistName);
                  // console.log("Artist object:", artist);
                  // console.log("Featured tracks being passed:", artistData.featured_tracks);
                  sessionStorage.setItem(`album:${artist.id}`, JSON.stringify(artistData));
                }}
                className="relative group overflow-hidden rounded-[1vw] shadow-lg aspect-[3/2] bg-shelter-slate animate-fadeIn cursor-pointer border-2 border-shelter-slate hover:border-shelter-honey transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <img
                  src={getResizedImageUrl(artistImage)}
                  alt={artistName}
                  width="259"
                  height="194"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-t from-shelter-charcoal/90 via-shelter-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full px-3 py-2 text-center">
                    <h3 className="text-shelter-honey text-lg font-bold font-['Roboto'] drop-shadow mb-1 animate-fadeInUp">
                      {artistName}
                    </h3>
                    <p className="text-shelter-white text-sm font-medium animate-fadeInUp">
                      {artist.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="w-full text-center mt-8 animate-fadeInUp">
          <p className="text-shelter-white text-lg font-semibold font-['Roboto']">
            Discover more artists and exclusive content by joining our
            community!
          </p>
        </div>
      </div>
    </div>
  );
};
// Tailwind custom animations (add to tailwind.config.js if needed):
// .animate-fadeIn { animation: fadeIn 1s ease; }
// .animate-fadeInUp { animation: fadeInUp 1s ease; }
