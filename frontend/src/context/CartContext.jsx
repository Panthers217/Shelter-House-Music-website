import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApiData } from './ApiDataContext';
import { getArtistDataById } from '../utils/artistDataHelper';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { dbSnapshot } = useApiData();

  // Helper function to get artist name from artist_id using artistDataHelper
  const getArtistName = (artistId) => {
    if (!artistId || !dbSnapshot) return 'Unknown Artist';
    const artistData = getArtistDataById(artistId, dbSnapshot);
    return artistData?.name || 'Unknown Artist';
  };

  // Helper function to normalize cart item with consistent structure
  const normalizeCartItem = (rawItem) => {
    // console.log('🔍 Normalizing raw item:', rawItem);
    
    // Determine item type and extract IDs
    const isTrack = rawItem.isTrack || rawItem.type === 'Track';
    const isAlbum = rawItem.type?.includes('Album') || rawItem.type?.includes('Vinyl') || rawItem.type?.includes('Record');
    
    // Extract IDs with fallbacks
    let trackId = isTrack ? (rawItem.id || rawItem.trackId) : null;
    let albumId = isAlbum ? (rawItem.id || rawItem.albumId) : null;
    let artistId = rawItem.artistId || rawItem.artist_id;
    
    // If we have a track ID but missing other data, look it up from dbSnapshot
    if (trackId && dbSnapshot?.promotional_tracks?.records) {
      const trackData = dbSnapshot.promotional_tracks.records.find(t => t.id === trackId);
      if (trackData) {
        artistId = artistId || trackData.artist_id;
        albumId = albumId || trackData.album_id;
        // console.log('📀 Found track data:', { artistId, albumId });
      }
    }
    
    // If we have an album ID but missing artist, look it up from dbSnapshot
    if (albumId && !artistId && dbSnapshot?.albums?.records) {
      const albumData = dbSnapshot.albums.records.find(a => a.id === albumId);
      if (albumData) {
        artistId = albumData.artist_id;
        // console.log('💿 Found album data, artistId:', artistId);
      }
    }
    
    // Get complete artist data using artistDataHelper
    let artistName = rawItem.artist_name || rawItem.artistName;
    let purchaseLink = rawItem.purchaseLink;
    let audioUrl = rawItem.audioUrl;
    let albumType = rawItem.album_type;
    
    if (artistId) {
      const artistData = getArtistDataById(artistId, dbSnapshot);
      if (artistData) {
        artistName = artistName || artistData.name;
        // console.log('🎤 Artist data:', artistData.name);
      }
    }
    
    // Get album data if we have albumId
    if (albumId && dbSnapshot?.albums?.records) {
      const albumData = dbSnapshot.albums.records.find(a => a.id === albumId);
      if (albumData) {
        albumType = albumType || albumData.album_type;
        purchaseLink = purchaseLink || albumData.purchase_link;
        // console.log('💿 Album data enriched');
      }
    }
    
    // Get track data if we have trackId
    if (trackId && dbSnapshot?.promotional_tracks?.records) {
      const trackData = dbSnapshot.promotional_tracks.records.find(t => t.id === trackId);
      if (trackData) {
        purchaseLink = purchaseLink || trackData.purchase_link;
        audioUrl = audioUrl || trackData.promo_audio_url;
        console.log('🎵 Track data enriched');
      }
    }
    
    // Normalize the type field to match backend expectations
    let itemType = rawItem.type;
    if (!itemType) {
      if (trackId) itemType = 'Track';
      else if (albumId) itemType = 'Album';
      else if (rawItem.merch_type) itemType = rawItem.merch_type;
      else itemType = 'Unknown';
    }
    
    // Return normalized cart item with consistent structure
    const normalized = {
      id: rawItem.id || trackId || albumId, // Main ID for the item
      trackId: trackId || null, // Specific track ID
      albumId: albumId || null, // Specific album ID
      artistId: artistId || null,
      artist_name: artistName || 'Unknown Artist',
      type: itemType, // Normalized type
      title: rawItem.title || 'Untitled',
      price: rawItem.price || '$0.00',
      img: rawItem.img || '',
      quantity: rawItem.quantity || 1,
      album_type: albumType || undefined,
      merch_type: rawItem.merch_type || undefined,
      purchaseLink: purchaseLink || '',
      audioUrl: audioUrl || '',
      cartId: Date.now() + Math.random()
    };
    
    // console.log('✅ Normalized item:', normalized);
    return normalized;
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('soulFeltCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('soulFeltCart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart with normalization
  const addToCart = (item) => {
    console.log('🛒 Raw item received:', item);
    const normalizedItem = normalizeCartItem(item);
    // console.log('🛒 Normalized item:', normalizedItem);
    // console.log('🛒 Artist name:', normalizedItem.artist_name);
    // console.log('🛒 Track ID:', normalizedItem.trackId);
    // console.log('🛒 Album ID:', normalizedItem.albumId);
    
    setCart((prev) => {
      const newCart = [...prev, normalizedItem];
      // console.log('🛒 Updated cart:', newCart);
      return newCart;
    });
  };

  // Remove item from cart by cartId
  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Update item quantity (if needed in the future)
  const updateQuantity = (cartId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart total
  const getCartTotal = () => {
    return cart.reduce((sum, item) => {
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace('$', '')) 
        : item.price;
      const quantity = item.quantity || 1;
      return sum + ((price || 0) * quantity);
    }, 0);
  };

  // Get cart count
  const getCartCount = () => cart.length;

  // Toggle cart drawer
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isCartOpen,
    toggleCart,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
