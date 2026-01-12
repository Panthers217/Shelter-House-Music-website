import './firebase.js'; // Ensure Firebase initializes on app start

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ApiDataProvider } from './context/ApiDataContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { FeaturesProvider } from './context/FeaturesContext.jsx';
import { HelmetProvider } from 'react-helmet-async';

const rootElement = document.getElementById('root');

const appContent = (
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <FeaturesProvider>
          <ApiDataProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ApiDataProvider>
        </FeaturesProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

// Use hydrate if the page was pre-rendered, otherwise use render
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appContent);
} else {
  createRoot(rootElement).render(appContent);
}
