import React, { useState, useRef } from 'react';
import NotAvailableModal from './modal/NotAvailableModal';
import { useFeatures } from '../context/FeaturesContext';
import { useCart } from '../context/CartContext';

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

function TrackCard({ track, albumCoverUrl, purchaseLink, artistName }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isEnabled } = useFeatures();
  const { addToCart } = useCart();
  
  const isStripeEnabled = isEnabled('enable_stripe');
  const isMerchandiseEnabled = isEnabled('enable_merchandise');
  
  // Debug log
  // console.log('TrackCard - Stripe enabled:', isStripeEnabled);

  const handlePlay = () => {
    audioRef.current.play();
    setPlaying(true);
  };
  const handlePause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  // Format price from cents to dollars
  const formatPrice = (cents) => {
    const price = Number(cents);
    return isNaN(price) ? '$0.00' : `$${(price / 100).toFixed(2)}`;
  };

  const handleBuyClick = (e) => {
    if (isStripeEnabled) {
      // Add to cart when Stripe is enabled
      e.preventDefault();
      const cartItem = {
        id: track.id,
        trackId: track.id,
        albumId: track.album_id || null,
        artistId: track.artist_id || null,
        artist_name: artistName || track.artist_name || track.artist || 'Unknown Artist',
        type: 'Track',
        title: track.title,
        price: formatPrice(track.track_pricing),
        img: albumCoverUrl,
        isTrack: true,
        album_type: undefined,
        merch_type: undefined,
        purchaseLink: purchaseLink || '',
        audioUrl: track.promo_audio_url || '',
      };
      addToCart(cartItem);
    } else {
      // Use purchaseLink when Stripe is disabled
      if (!purchaseLink) {
        e.preventDefault();
        setShowModal(true);
      }
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-[#1d1e26] to-[#16171d] rounded-2xl shadow-2xl p-6 flex flex-col items-center w-full max-w-xs min-w-[240px] hover:scale-105 transition-all duration-300 border border-[#2a2b35] hover:border-[#aa2a46]/50 overflow-hidden">
      <NotAvailableModal isOpen={showModal} onClose={() => setShowModal(false)} />
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#aa2a46]/0 to-[#aa2a46]/0 group-hover:from-[#aa2a46]/5 group-hover:to-[#aa2a46]/10 transition-all duration-500 rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Album Cover with play overlay */}
        <div className="relative mb-4">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-4 ring-[#aa2a46]/20 group-hover:ring-[#aa2a46]/40 transition-all duration-300">
            <img src={albumCoverUrl} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            {/* Play overlay */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <div className="w-12 h-12 rounded-full bg-[#aa2a46] flex items-center justify-center shadow-lg">
                {playing ? (
                  <div className="w-4 h-4 flex gap-1">
                    <div className="w-1 h-4 bg-[#fffced] rounded-sm"></div>
                    <div className="w-1 h-4 bg-[#fffced] rounded-sm"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#fffced] border-b-[6px] border-b-transparent ml-1"></div>
                )}
              </div>
            </div>
          </div>
          {/* Pulsing indicator when playing */}
          {playing && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#aa2a46] rounded-full animate-ping"></div>
          )}
        </div>

        {/* Track Info */}
        <div className="w-full text-center mb-3">
          <h4 className="text-[#fffced] text-xl font-bold mb-1 font-['Public_Sans'] line-clamp-2 group-hover:text-[#aa2a46] transition-colors duration-300">{track.title}</h4>
          <span className="text-[#aa2a46] text-base font-semibold">{track.artist_name}</span>
          <p className="text-white/50 text-sm mt-1">Album: {track.album_title}</p>
        </div>

        <audio ref={audioRef} src={track.promo_audio_url} onEnded={handlePause} />
        
        {/* Play/Pause Button */}
        <button 
          onClick={playing ? handlePause : handlePlay}
          className="w-full py-2.5 px-6 bg-gradient-to-r from-[#aa2a46] to-[#8a1f36] text-[#fffced] rounded-xl font-bold hover:from-[#fffced] hover:to-[#fffced] hover:text-[#aa2a46] transition-all duration-300 shadow-lg hover:shadow-[#aa2a46]/30 mb-3 flex items-center justify-center gap-2"
        >
          {playing ? (
            <>
              <div className="w-3 h-3 flex gap-0.5">
                <div className="w-1 h-3 bg-current rounded-sm"></div>
                <div className="w-1 h-3 bg-current rounded-sm"></div>
              </div>
              Pause
            </>
          ) : (
            <>
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-current border-b-[5px] border-b-transparent"></div>
              Play
            </>
          )}
        </button>

        {/* Wavelength Visualizer */}
        <Wavelength playing={playing} />

        {/* Price and Buy Section */}
        {isMerchandiseEnabled && (
        <div className="mt-4 w-full flex flex-col items-center gap-3 pt-4 border-t border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="text-[#aa2a46] text-2xl font-bold">{formatPrice(track.track_pricing)}</span>
            <span className="text-white/40 text-sm">USD</span>
          </div>
          {isStripeEnabled ? (
            <button
              onClick={handleBuyClick}
              className="w-full px-6 py-2.5 bg-[#fffced] text-[#aa2a46] rounded-xl font-bold hover:bg-[#aa2a46] hover:text-[#fffced] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#aa2a46]/20 border-2 border-transparent hover:border-[#fffced] text-center flex items-center justify-center gap-2"
            >
              <span className="i-lucide-shopping-cart text-sm" />
              Add to Cart
            </button>
          ) : (
            <a 
              href={purchaseLink || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleBuyClick}
              className="w-full px-6 py-2.5 bg-[#fffced] text-[#aa2a46] rounded-xl font-bold hover:bg-[#aa2a46] hover:text-[#fffced] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#aa2a46]/20 border-2 border-transparent hover:border-[#fffced] text-center block"
            >
              Buy Track
            </a>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export default TrackCard;
