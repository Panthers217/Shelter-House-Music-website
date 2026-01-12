import React, { createContext, useContext, useState, useEffect } from 'react';

const FeaturesContext = createContext();

export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
};

export const FeaturesProvider = ({ children }) => {
  const [features, setFeatures] = useState({
    enable_merchandise: true,
    enable_videos: true,
    enable_artist_profiles: true,
    enable_newsletter: true,
    enable_cart: true,
    enable_user_accounts: true,
    enable_promotional_tracks: true,
    enable_promotional_videos: true,
    enable_stripe: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatures();
  }, []);
  
  // Debug: Log when features state changes
  useEffect(() => {
    // console.log('Features state updated:', features);
  }, [features]);

  const fetchFeatures = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings/features`);
      if (response.ok) {
        const data = await response.json();
        // console.log('Features fetched:', data);
        setFeatures(data);
      }
    } catch (error) {
      console.error('Error fetching features:', error);
      // Use default features (all enabled)
    } finally {
      setLoading(false);
    }
  };

  const isEnabled = (featureName) => {
    const enabled = features[featureName] ?? true; // Default to true if not found
    // console.log(`isEnabled(${featureName}):`, enabled, 'from features:', features);
    return enabled;
  };
  
  const refreshFeatures = () => {
    fetchFeatures();
  };

  return (
    <FeaturesContext.Provider value={{ features, isEnabled, loading, refreshFeatures }}>
      {children}
    </FeaturesContext.Provider>
  );
};
