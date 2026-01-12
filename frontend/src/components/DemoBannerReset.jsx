/**
 * Utility to help test the DemoBanner
 * 
 * To clear the dismissed banner state and see it again:
 * 1. Open browser DevTools (F12)
 * 2. Go to Console tab
 * 3. Run: localStorage.removeItem('demoBannerDismissed')
 * 4. Refresh the page
 * 
 * OR use this component to add a reset button during development
 */

import React from 'react';

export const DemoBannerReset = () => {
  const resetBanner = () => {
    localStorage.removeItem('demoBannerDismissed');
    window.location.reload();
  };

  return (
    <button
      onClick={resetBanner}
      className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors text-sm"
      title="Reset Demo Banner (Development Only)"
    >
      🔄 Reset Demo Banner
    </button>
  );
};

export default DemoBannerReset;
