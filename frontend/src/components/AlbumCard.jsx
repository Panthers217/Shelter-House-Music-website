import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeatures } from '../context/FeaturesContext';
import { useCart } from '../context/CartContext';
import NotAvailableModal from './modal/NotAvailableModal';

function AlbumCard({ album, purchaseLink }) {
  const navigate = useNavigate();
  const { isEnabled } = useFeatures();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  
  const isStripeEnabled = isEnabled('enable_stripe');
  const isMerchandiseEnabled = isEnabled('enable_merchandise');
  
  // Debug log
  // console.log('AlbumCard - Stripe enabled:', isStripeEnabled);

  // Format price from cents to dollars
  const formatPrice = (cents) => {
    const price = Number(cents);
    return isNaN(price) ? '$0.00' : `$${(price / 100).toFixed(2)}`;
  };

  const handleAlbumClick = (e) => {
    // Only navigate if clicking on the card, not the button
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('button')) {
      if (album.artist_id) {
        navigate(`/store/${album.artist_id}`);
      }
    }
  };
  
  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (isStripeEnabled) {
      // Add to cart when Stripe is enabled
      const cartItem = {
        id: album.id,
        trackId: null,
        albumId: album.id,
        artistId: album.artist_id || null,
        artist_name: album.artist_name || 'Unknown Artist',
        type: album.album_type === 'digital' ? 'Digital Album' : album.album_type === 'vinyl' ? 'Vinyl Record' : 'Album',
        title: album.title || 'Untitled Album',
        price: formatPrice(album.album_pricing),
        img: album.cover_url || 'https://placehold.co/265x265',
        album_type: album.album_type || 'digital',
        merch_type: undefined,
        purchaseLink: album.purchase_link || '',
        audioUrl: '',
      };
      addToCart(cartItem);
    }  else {
      // Use purchaseLink when Stripe is disabled
      if (!purchaseLink) {
        e.preventDefault();
        setShowModal(true);
      }
    }
  };

  return (
    <div 
      onClick={handleAlbumClick}
      className="group relative bg-gradient-to-br from-shelter-slate to-shelter-charcoal rounded-2xl shadow-2xl p-6 flex flex-col items-center w-full max-w-xs min-w-[240px] hover:scale-105 transition-all duration-300 border border-shelter-gray/20 hover:border-shelter-honey/50 overflow-hidden cursor-pointer"
    >
      <NotAvailableModal isOpen={showModal} onClose={() => setShowModal(false)} />
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-shelter-honey/0 to-shelter-honey/0 group-hover:from-shelter-honey/5 group-hover:to-shelter-honey/10 transition-all duration-500 rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Album Cover */}
        <div className="relative mb-4">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-xl ring-4 ring-shelter-honey/20 group-hover:ring-shelter-honey/40 transition-all duration-300">
            <img 
              src={album.cover_url || 'https://placehold.co/300x300?text=No+Cover'} 
              alt={album.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-shelter-honey flex items-center justify-center shadow-lg">
                <span className="i-lucide-shopping-cart text-shelter-charcoal text-xl" />
              </div>
            </div>
          </div>
          
          {/* Album type badge */}
          {album.album_type && (
            <div className="absolute -top-2 -right-2 bg-shelter-honey text-shelter-charcoal text-xs font-bold px-2 py-1 rounded-full shadow-lg uppercase">
              {album.album_type}
            </div>
          )}
        </div>

        {/* Album Info */}
        <div className="w-full text-center space-y-2">
          <h3 className="text-shelter-white text-lg font-bold line-clamp-2 group-hover:text-shelter-honey transition-colors duration-300">
            {album.title || 'Untitled Album'}
          </h3>
          
          {/* Genre tags */}
          {album.genre && (
            <div className="flex flex-wrap gap-1 justify-center">
              {album.genre.split(',').slice(0, 2).map((genre, idx) => (
                <span 
                  key={idx}
                  className="text-shelter-honey text-xs bg-shelter-honey/10 px-2 py-0.5 rounded-full border border-shelter-honey/30"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Description (if available) */}
          {album.album_description && (
            <p className="text-shelter-gray text-xs line-clamp-2 mt-2">
              {album.album_description}
            </p>
          )}

          {/* Price and Buy Button */}
          {isMerchandiseEnabled && (
          <div className="mt-4 pt-4 border-t border-shelter-gray/20 flex flex-col gap-2">
            <div className="text-shelter-honey text-2xl font-bold">
              {formatPrice(album.album_pricing)}
            </div>
            {isStripeEnabled ? (
              <button 
                onClick={handleButtonClick}
                className="w-full bg-shelter-honey hover:bg-shelter-amber text-shelter-charcoal font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:ring-2 focus:ring-shelter-honey"
              >
                <span className="i-lucide-shopping-cart text-sm" />
                Add to Cart
              </button>
            ) : (
              <a 
                href={purchaseLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleButtonClick}
                className="w-full bg-shelter-honey hover:bg-shelter-amber text-shelter-charcoal font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:ring-2 focus:ring-shelter-honey"
              >
                <span className="i-lucide-shopping-bag text-sm" />
                Purchase Album
              </a>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-shelter-honey to-shelter-amber rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
    </div>
  );
}

export default AlbumCard;
