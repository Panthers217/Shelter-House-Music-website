import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primary_color: '#aa2a46',
    secondary_color: '#d63c65',
    accent_color: '#fffced',
    background_color: '#1a1b22',
    card_background: '#21212b',
    text_primary: '#fffced',
    text_secondary: '#ffffff',
    business_name: 'Soul Felt Music',
    logo_url: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings/theme`);
      if (response.ok) {
        const data = await response.json();
        setTheme(data);
        applyTheme(data);
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
      // Use default theme
      applyTheme(theme);
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (themeData) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', themeData.primary_color);
    root.style.setProperty('--color-secondary', themeData.secondary_color);
    root.style.setProperty('--color-accent', themeData.accent_color);
    root.style.setProperty('--color-background', themeData.background_color);
    root.style.setProperty('--color-card-background', themeData.card_background);
    root.style.setProperty('--color-text-primary', themeData.text_primary);
    root.style.setProperty('--color-text-secondary', themeData.text_secondary);
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};
