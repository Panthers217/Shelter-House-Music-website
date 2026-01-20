import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useFeatures } from '../context/FeaturesContext';
import ZoomFit from './ZoomFit.jsx';

const ThemeDemo = () => {
  const { theme, loading: themeLoading } = useTheme();
  const { features, isEnabled, loading: featuresLoading } = useFeatures();

  if (themeLoading || featuresLoading) {
    return <div className="p-4">Loading settings...</div>;
  }

  return (
    <ZoomFit>
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-accent mb-8">
          {theme.business_name}
        </h1>

        {/* Theme Colors Demo */}
        <div className="bg-card-bg p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Theme Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-20 bg-primary rounded mb-2"></div>
              <p className="text-text-secondary text-sm">Primary</p>
              <code className="text-xs text-accent">{theme.primary_color}</code>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-secondary rounded mb-2"></div>
              <p className="text-text-secondary text-sm">Secondary</p>
              <code className="text-xs text-accent">{theme.secondary_color}</code>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-accent rounded mb-2"></div>
              <p className="text-text-secondary text-sm">Accent</p>
              <code className="text-xs text-primary">{theme.accent_color}</code>
            </div>
            <div className="text-center">
              <div className="w-full h-20 bg-card-bg border border-accent rounded mb-2"></div>
              <p className="text-text-secondary text-sm">Card BG</p>
              <code className="text-xs text-accent">{theme.card_background}</code>
            </div>
          </div>
        </div>

        {/* Feature Toggles Demo */}
        <div className="bg-card-bg p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-secondary mb-4">Feature Toggles</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-background rounded">
                <span className="text-text-primary capitalize">
                  {key.replace('enable_', '').replace(/_/g, ' ')}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-semibold ${
                  value ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {value ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-8 bg-card-bg p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-accent mb-4">Usage Examples</h2>
          
          <div className="space-y-4">
            <button className="bg-primary hover:bg-secondary text-accent px-6 py-3 rounded-lg font-semibold transition">
              Primary Button
            </button>
            
            <button className="bg-secondary hover:bg-primary text-accent px-6 py-3 rounded-lg font-semibold transition ml-4">
              Secondary Button
            </button>

            {isEnabled('enable_cart') && (
              <div className="mt-4 p-4 bg-primary text-accent rounded">
                🛒 Cart feature is enabled!
              </div>
            )}

            {isEnabled('enable_merchandise') && (
              <div className="mt-2 p-4 bg-secondary text-accent rounded">
                🛍️ Ministry Resources feature is enabled!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </ZoomFit>
  );
};

export default ThemeDemo;
