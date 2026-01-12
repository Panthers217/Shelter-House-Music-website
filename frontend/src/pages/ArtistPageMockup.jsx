// import React from "react";
// import {trackcardImage,topTrackcardImage,trackHeaderPic} from '/workspaces/Soul-Felt-Music-site/frontend/src/assets/artist_mockup_pics /artistImages.js';
// import bannerImage from "/workspaces/Soul-Felt-Music-site/frontend/src/assets/artist_mockup_pics /artist_banner_pic/Image+Overlay.png";
// const artistNames = [
//   "Panic! At The Disco", "Lukas Graham", "Marshmello & Bastille", "XXXTENTACION & Lil",
//   "Gucci Mane, Bruno", "Loud Luxury Feat.", "Lil Wayne", "Silk City & Dua Lipa",
//   "Khalid", "Bad Bunny Feat.", "Dynoro & Gigi", "Benny Blanco, Halsey",
//   "Rita Ora", "Ariana Grande", "Clean Bandit Feat.", "DJ Snake Feat.",
//   "Don Diablo Feat.", "The Prince Karma"
// ];

// const artists = artistNames.map((name, idx) => ({
//   name,
//   img: trackcardImage[idx] // assign image by index
// }));

// // Dummy data
// const countries = [
//   "All countries", "Australia", "Canada", "France", "Germany", "Ireland",
//   "Netherlands", "New Zealand", "United Kingdom", "USA"
// ];

// // const artists = [
// //   { name: "Panic! At The Disco", img: "https://placehold.co/152x152" },
// //   { name: "Lukas Graham", img: "https://placehold.co/152x152" },
// //   { name: "Marshmello & Bastille", img: "https://placehold.co/152x152" },
// //   { name: "XXXTENTACION & Lil", img: "https://placehold.co/152x152" },
// //   { name: "Gucci Mane, Bruno", img: "https://placehold.co/152x152" },
// //   { name: "Loud Luxury Feat.", img: "https://placehold.co/152x152" },
// //   { name: "Lil Wayne", img: "https://placehold.co/152x152" },
// //   { name: "Silk City & Dua Lipa", img: "https://placehold.co/152x152" },
// //   { name: "Khalid", img: "https://placehold.co/152x152" },
// //   { name: "Bad Bunny Feat.", img: "https://placehold.co/152x152" },
// //   { name: "Dynoro & Gigi", img: "https://placehold.co/152x152" },
// //   { name: "Benny Blanco, Halsey", img: "https://placehold.co/152x152" },
// //   { name: "Rita Ora", img: "https://placehold.co/152x152" },
// //   { name: "Ariana Grande", img: "https://placehold.co/152x152" },
// //   { name: "Clean Bandit Feat.", img: "https://placehold.co/152x152" },
// //   { name: "DJ Snake Feat.", img: "https://placehold.co/152x152" },
// //   { name: "Don Diablo Feat.", img: "https://placehold.co/152x152" },
// //   { name: "The Prince Karma", img: "https://placehold.co/152x152" },
// // ];


// const topTracks = [
//   {
//     title: "Woman Like Me",
//     artist: "Little Mix Feat. Nicki Minaj",
//     img: topTrackcardImage[0]
//   },
//   {
//     title: "Later Bitches",
//     artist: "The Prince Karma",
//     img: topTrackcardImage[1]
//   },
//   {
//     title: "Happier",
//     artist: "Marshmello & Bastille",
//     img: topTrackcardImage[2]
//   },
//   {
//     title: "ZEZE",
//     artist: "Kodak Black Feat. Offset &",
//     img: topTrackcardImage[3]
//   },
//   {
//     title: "Electricity",
//     artist: "Silk City & Dua Lipa Feat.",
//     img: topTrackcardImage[4]
//   },
//   {
//     title: "In My Mind",
//     artist: "Dynoro & Gigi D’Agostino",
//     img: topTrackcardImage[5]
//   },
// ];

// // Components
// function CountryFilter({ countries, textColor = "text-white/60", bgColor = "bg-neutral-800" }) {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {countries.map((country) => (
//         <span
//           key={country}
//           className={`px-3 py-1 rounded-sm text-sm font-medium cursor-pointer hover:bg-fuchsia-700 hover:text-white transition ${bgColor} ${textColor}`}
//         >
//           {country}
//         </span>
//       ))}
//     </div>
//   );
// }

// function ArtistCard({ artist, textColor = "text-white", bgColor = "bg-zinc-800" }) {
//   return (
//     <div className={`rounded-lg shadow flex flex-col items-center p-4 hover:scale-105 transition-transform ${bgColor}`}>
//       <img
//         src={artist.img}
//         alt={artist.name}
//         className="w-32 h-32 rounded-full object-cover mb-3"
//       />
//       <div className={`text-base font-semibold text-center ${textColor}`}>{artist.name}</div>
//     </div>
//   );
// }

// function ArtistGrid({ artists, textColor, bgColor }) {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//       {artists.map((artist, idx) => (
//         <ArtistCard key={idx} artist={artist} textColor={textColor} bgColor={bgColor} />
//       ))}
//     </div>
//   );
// }

// function TopTrackCard({ track, textColor = "text-white", bgColor = "bg-neutral-800" }) {
//   return (
//     <div className={`flex items-center rounded-md p-3 mb-3 ${bgColor}`}>
//       <img src={track.img} alt={track.title} className="w-16 h-16 rounded-md" />
//       <div className="ml-4">
//         <div className={`font-medium ${textColor}`}>{track.title}</div>
//         <div className="text-white/60 text-sm">{track.artist}</div>
//       </div>
//     </div>
//   );
// }



// function TopTracks({ tracks, textColor = "text-white", bgColor = "bg-zinc-900" }) {
//   return (
//     <div className={`rounded-lg p-6 shadow ${bgColor}`}>
//       {/* <div className="mb-4">
//         <div className={`text-2xl font-bold mb-1 ${textColor}`}>Hip-Hop Chart 100</div>
//         <div className="text-white/50 text-base">The hottest rap right now.</div>
//       </div> */}
//      <div className="relative w-full max-w-md aspect-[16/9] rounded-[3px] mx-auto mb-4">
//   {/* Image and overlay */}
//   <img
//     className="absolute inset-0 w-full h-full object-cover rounded-[3px]"
//     src={trackHeaderPic}
//     alt="Top Tracks Header"
//   />
//   <div className="absolute inset-0 bg-black/25 rounded-[3px]" />
//   {/* Text absolutely positioned above */}
//   <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
//     <div className="text-center text-white text-2xl font-bold font-['Roboto'] leading-10">
//       Hip-Hop Chart<br />100
//     </div>
//     <div className="text-center text-white/50 text-base font-normal font-['Roboto'] leading-normal">
//       The hottest rap right now.
//     </div>
//   </div>
// </div>
//       <div>
//         <div className="text-white/60 text-base font-medium mb-2">Top tracks</div>
//         {tracks.map((track, idx) => (
//           <TopTrackCard key={idx} track={track} textColor={textColor} bgColor="none" />
//         ))}
//       </div>
//     </div>
//   );
// }
// // Banner Component
// // This component displays a banner with an image and title
// const Banner = ({ image, title = "Artists" }) => (
//   <div className="abolute w-full h-full sm:h-64 md:h-72 lg:h-80 flex items-center justify-center mb-8 overflow-hidden rounded-b-lg">
//     <img
//       src={image}
//       alt={title}
//       className="absolute inset-0 w-full h-full object-cover"
//     />
//     <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-black/40 to-black/0" />
//     <h1 className="relative z-10 text-white text-4xl sm:text-5xl md:text-6xl font-bold font-['Roboto'] text-center drop-shadow-lg">
//       {title}
//     </h1>
//   </div>
// );

// const ArtistPage = () => {
//   return (
//     <div className="bg-page-color-1 min-h-screen flex flex-col items-center">
//       {/* Banner */}
//       {/*<div className="relative w-full h-72 mb-8">
//         <img
//           src="https://placehold.co/1440x720"
//           alt="Banner"
//           className="w-full h-full object-cover absolute inset-0 opacity-40"
//         />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <h1 className="text-white text-5xl font-bold z-10">Artists</h1>
//         </div>
//       </div>*}
//       {/* Main Content */}
//       <div className="absolute object-cover w-full h-full sm:h-80 md:h-96 lg:h-112 xl:h-128">
//         <Banner image={bannerImage} title="Artists" />
// </div>
//       <div className="w-full max-w-7xl px-4 flex flex-col lg:flex-row gap-8">
//         {/* Left: Filters & Artists */}
//         <div className="flex-1">
//           <div className="mb-6">
//             <div className="text-white text-lg font-bold mb-2">Countries</div>
//             <CountryFilter countries={countries} textColor="text-brand-text-gray" bgColor="bg-neutral-800" />
//           </div>
//           <ArtistGrid artists={artists} textColor="text-brand-text-gray" bgColor="none" />
//         </div>
//         {/* Right: Top Tracks */}
//         <div className="w-full lg:w-96">
//           <TopTracks tracks={topTracks} textColor="text-brand-text-white" bgColor="none" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtistPage;