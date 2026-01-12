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

  // const artists = [
  //   {
  //     name: 'Soul Felt Collective',
  //     img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&h=300&facepad=2',
  //     desc: 'Soul, Jazz, RnB',
  //   },
  //   {
  //     name: 'Pop Star',
  //     img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=300&facepad=2',
  //     desc: 'Pop',
  //   },
  //   {
  //     name: 'Jazz Ensemble',
  //     img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=300&facepad=2',
  //     desc: 'Jazz',
  //   },
  //   {
  //     name: 'RnB Sensation',
  //     img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=300&facepad=2',
  //     desc: 'RnB',
  //   },
  //   {
  //     name: 'Chill Artist',
  //     img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=300&facepad=2',
  //     desc: 'Easy Listening',
  //   },
  //   {
  //     name: 'Luna Starlight',
  //     img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=300&facepad=2',
  //     desc: 'Synthwave',
  //   },
  //   {
  //     name: 'Retro Wave',
  //     img: 'https://images.unsplash.com/photo-1465101178521-c1a6f3b37b39?auto=format&fit=facearea&w=400&h=300&facepad=2',
  //     desc: 'Electronic',
  //   },
  //   {
  //     name: 'Cosmic Journey',
  //     img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=300&facepad=2',
  //     desc: 'Limited Edition',
  //   },
  // ];

  return (
    <div
      data-layer="Artist Gallery"
      className="ArtistGallery w-full max-w-[100rem] mx-auto rounded-[50px] flex flex-col items-center py-6 animate-fadeIn"
    >
      <div
        data-layer="Frame 19"
        className="Frame19 w-full bg-black px-5 flex flex-col items-center"
      >
        <h2 className="text-[#fffced] text-3xl md:text-4xl font-extrabold font-['Roboto'] mb-8 drop-shadow-lg tracking-wide animate-fadeIn">
          Recording Artists
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
                className="relative group overflow-hidden rounded-xl shadow-lg aspect-[3/2] bg-[#21212b] animate-fadeIn cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <img
                  src={getResizedImageUrl(artistImage)}
                  alt={artistName}
                  width="259"
                  height="194"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex flex-col justify-end items-center bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full px-3 py-2 text-center">
                    <h3 className="text-[#ff6b81] text-lg font-bold font-['Roboto'] drop-shadow mb-1 animate-fadeInUp">
                      {artistName}
                    </h3>
                    <p className="text-[#fffced] text-sm font-medium animate-fadeInUp">
                      {artist.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="w-full text-center mt-8 animate-fadeInUp">
          <p className="text-[#fffced] text-lg font-semibold font-['Roboto']">
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
