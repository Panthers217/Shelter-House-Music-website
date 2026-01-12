import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMusic, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { themeColors } = useTheme();

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ 
        background: `linear-gradient(135deg, ${themeColors?.background || '#0c0504'} 0%, ${themeColors?.primary || '#1a0b0d'} 100%)`
      }}
    >
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number with animated gradient */}
        <div className="relative mb-8">
          <h1 
            className="text-[12rem] md:text-[16rem] font-black leading-none select-none"
            style={{
              background: `linear-gradient(135deg, ${themeColors?.accent || '#aa2a46'} 0%, ${themeColors?.secondary || '#f7c900'} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 80px rgba(170, 42, 70, 0.3)'
            }}
          >
            404
          </h1>
          {/* Floating music notes decoration */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <FaMusic className="text-6xl animate-bounce" style={{ color: themeColors?.accent || '#aa2a46', animationDelay: '0s' }} />
            <FaMusic className="text-4xl animate-bounce ml-8 -mt-12" style={{ color: themeColors?.secondary || '#f7c900', animationDelay: '0.2s' }} />
            <FaMusic className="text-5xl animate-bounce -ml-16 mt-12" style={{ color: themeColors?.accent || '#aa2a46', animationDelay: '0.4s' }} />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 
            className="text-3xl md:text-4xl font-bold"
            style={{ color: themeColors?.text || '#e6cfa7' }}
          >
            Oops! Page Not Found
          </h2>
          <p 
            className="text-lg md:text-xl max-w-md mx-auto"
            style={{ color: themeColors?.textSecondary || '#fffced', opacity: 0.8 }}
          >
            Looks like this track got lost in the mix. The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <Link
            to="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: themeColors?.accent || '#aa2a46',
              color: themeColors?.textSecondary || '#fffced'
            }}
          >
            <FaHome className="text-xl group-hover:animate-pulse" />
            <span>Back to Home</span>
            <div 
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: 'white' }}
            ></div>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 border-2"
            style={{
              borderColor: themeColors?.accent || '#aa2a46',
              color: themeColors?.text || '#e6cfa7',
              backgroundColor: 'transparent'
            }}
          >
            <FaArrowLeft className="text-xl group-hover:animate-pulse" />
            <span>Go Back</span>
          </button>

          <Link
            to="/music"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: themeColors?.secondary || '#f7c900',
              color: themeColors?.background || '#0c0504'
            }}
          >
            <FaMusic className="text-xl group-hover:animate-pulse" />
            <span>Explore Music</span>
            <div 
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ background: 'white' }}
            ></div>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: `${themeColors?.accent || '#aa2a46'}33` }}>
          <p 
            className="text-sm mb-4"
            style={{ color: themeColors?.textSecondary || '#fffced', opacity: 0.7 }}
          >
            Quick Links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            {[
              { to: '/store', label: 'Store' },
              { to: '/artists', label: 'Artists' },
              { to: '/videos', label: 'Videos' },
              { to: '/community', label: 'Community' },
              { to: '/contact', label: 'Contact' }
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:underline transition-all duration-200"
                style={{ 
                  color: themeColors?.accent || '#aa2a46',
                  textDecorationColor: themeColors?.accent || '#aa2a46'
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
