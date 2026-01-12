import React, { useState, useRef } from 'react';

const sections = [
  { key: 'featured', label: 'Featured Tracks' },
  { key: 'new', label: 'New Releases' },
  { key: 'popular', label: 'Popular' },
  { key: 'recommended', label: 'Recommended For You' },
];

const tracks = [
  {
    id: 't1',
    title: 'Soul Felt Anthem',
    artist: 'Soul Felt Collective',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&h=400&facepad=2',
    section: 'featured',
    price: '$1.29',
    album: 'Soulful Beginnings',
    new: false,
    popular: true,
    recommended: true,
  },
  {
    id: 't2',
    title: 'Heartstrings',
    artist: 'Soul Felt Collective',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&h=400&facepad=2',
    section: 'new',
    price: '$1.29',
    album: 'Soulful Beginnings',
    new: true,
    popular: false,
    recommended: false,
  },
  {
    id: 't3',
    title: 'Pop Vibes',
    artist: 'Pop Star',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400&facepad=2',
    section: 'popular',
    price: '$1.29',
    album: 'Pop Explosion',
    new: false,
    popular: true,
    recommended: true,
  },
  {
    id: 't4',
    title: 'Smooth Jazz Night',
    artist: 'Jazz Ensemble',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&facepad=2',
    section: 'new',
    price: '$1.29',
    album: 'Jazz Lounge',
    new: true,
    popular: false,
    recommended: false,
  },
  {
    id: 't5',
    title: 'RnB Groove',
    artist: 'RnB Sensation',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=400&facepad=2',
    section: 'popular',
    price: '$1.29',
    album: 'RnB Magic',
    new: false,
    popular: true,
    recommended: false,
  },
  {
    id: 't6',
    title: 'Easy Listening Escape',
    artist: 'Chill Artist',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    cover: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&facepad=2',
    section: 'recommended',
    price: '$1.29',
    album: 'Chill Zone',
    new: false,
    popular: false,
    recommended: true,
  },
];

function Wavelength({ playing }) {
  const heights = ['h-2', 'h-3', 'h-4', 'h-5'];
  return (
    <div className="flex gap-1 items-end h-6 mt-2">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded bg-[#aa2a46] transition-all duration-300 ${playing ? heights[i % heights.length] : 'h-2'} animate-pulse`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

function TrackCard({ track }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    setPlaying(true);
  };
  const handlePause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };
  return (
    <div className="bg-[#1d1e26] rounded-xl shadow-lg p-6 flex flex-col items-center w-full max-w-xs min-w-[220px]">
      <img src={track.cover} alt={track.title} className="w-24 h-24 rounded-full object-cover mb-2" />
      <h4 className="text-[#aa2a46] text-xl font-bold mb-1 font-['Public_Sans'] text-center">{track.title}</h4>
      <span className="text-[#fffced] text-base font-semibold mb-1">{track.artist}</span>
      <span className="text-white/70 text-sm mb-2">Album: {track.album}</span>
      <audio ref={audioRef} src={track.url} onEnded={handlePause} />
      <div className="flex gap-4 mt-2">
        {!playing ? (
          <button onClick={handlePlay} className="px-4 py-1 bg-[#aa2a46] text-[#fffced] rounded-full font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Play</button>
        ) : (
          <button onClick={handlePause} className="px-4 py-1 bg-[#fffced] text-[#aa2a46] rounded-full font-bold hover:bg-[#aa2a46] hover:text-[#fffced] transition-colors">Stop</button>
        )}
      </div>
      <Wavelength playing={playing} />
      <div className="mt-4 w-full flex flex-col items-center">
        <span className="text-[#aa2a46] text-lg font-bold">{track.price}</span>
        <button className="mt-2 px-4 py-2 bg-[#aa2a46] text-[#fffced] rounded font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Buy Track</button>
      </div>
    </div>
  );
}

const MusicLanding = () => {
  return (
    <section className="w-full min-h-screen bg-[#1a1b22] flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-7xl bg-[#21212b] rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-12">
        <h1 className="text-[#fffced] text-5xl md:text-6xl font-extrabold font-['Roboto'] mb-4 text-center drop-shadow-lg">Stream & Discover Soul Felt Music</h1>
        <p className="text-[#fffced] text-lg md:text-xl font-semibold text-center mb-8">Play samples, discover new artists, and purchase your favorite tracks and albums.</p>
        {sections.map(section => (
          <div key={section.key} className="mb-8">
            <h2 className="text-[#aa2a46] text-3xl font-bold mb-6 font-['Public_Sans'] text-center">{section.label}</h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {tracks.filter(track => track[section.key] || track.section === section.key).map(track => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          </div>
        ))}
        <div className="w-full flex flex-col items-center mt-8">
          <h2 className="text-[#aa2a46] text-2xl font-bold mb-2 font-['Public_Sans'] text-center">Why Buy Soul Felt Music?</h2>
          <ul className="text-[#fffced] text-base md:text-lg font-medium text-center list-disc list-inside">
            <li>Support your favorite artists directly</li>
            <li>Get high-quality audio downloads</li>
            <li>Exclusive access to bonus tracks and content</li>
            <li>Join a passionate music community</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MusicLanding;
