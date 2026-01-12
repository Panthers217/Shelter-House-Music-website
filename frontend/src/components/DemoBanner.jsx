import React, { useState } from 'react';
import { X, Info, Lock, Settings, ShoppingBag, Music, User, Image } from 'lucide-react';

const DemoBanner = ({ 
  variant = 'default', // 'default', 'compact', 'detailed'
  showAdminInfo = false,
  onClose 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onClose) onClose();
  };

  if (isDismissed) return null;

  // Compact banner for frequent use throughout the app
  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 ">
          <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span className="text-blue-900 sm:pl-[25%]">
            <strong>Demo Mode:</strong> All content is for demonstration purposes only
          </span>
        </div>
        {onClose && (
          <button
            onClick={handleDismiss}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  // Detailed banner with expandable information
  if (variant === 'detailed') {
    return (
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-lg shadow-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Portfolio Demonstration</h3>
                <p className="text-sm text-gray-600">Full-Stack Music Streaming Platform</p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Main Message */}
          <div className="mb-4">
            <p className="text-gray-700 leading-relaxed">
              Welcome! This is a <strong>fully functional music streaming platform</strong> built to showcase 
              full-stack development capabilities. Feel free to explore all features including music playback, 
              user authentication, e-commerce functionality, and content management.
            </p>
          </div>

          {/* Demo Content Notice */}
          <div className="bg-white rounded-lg p-4 mb-4 border border-blue-100">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Music className="w-4 h-4 text-blue-600" />
              Demo Content Includes:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-700"><strong>Artists & Albums:</strong> Sample music catalog with metadata</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-700"><strong>Tracks:</strong> Audio streaming with playback controls</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-700"><strong>Merchandise:</strong> E-commerce features with Stripe integration</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-700"><strong>User Accounts:</strong> Firebase authentication system</span>
              </div>
            </div>
          </div>

          {/* Expandable Technical Details */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between text-sm text-blue-700 hover:text-blue-800 transition-colors">
              <span className="font-medium">
                {isExpanded ? '▼' : '▶'} Technical Implementation Details
              </span>
            </div>
          </button>

          {isExpanded && (
            <div className="mt-4 bg-white rounded-lg p-4 border border-blue-100 space-y-3 text-sm">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Technology Stack:</h5>
                <div className="text-gray-700 space-y-1">
                  <p><strong>Frontend:</strong> React 19, Vite, Tailwind CSS, React Router, React Helmet (SEO)</p>
                  <p><strong>Backend:</strong> Node.js, Express, MySQL (Aiven), RESTful API</p>
                  <p><strong>Authentication:</strong> Firebase Auth with custom claims & role-based access</p>
                  <p><strong>Payments:</strong> Stripe integration for secure transactions</p>
                  <p><strong>Storage:</strong> Cloudinary for media management</p>
                  <p><strong>Deployment:</strong> Netlify (frontend), Render (backend)</p>
                </div>
              </div>

              {showAdminInfo && (
                <div className="border-t border-gray-200 pt-3">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-600" />
                    Admin Features (Not Accessible in Demo):
                  </h5>
                  <div className="text-gray-700 space-y-1">
                    <p>• Content management system for artists, albums, and tracks</p>
                    <p>• Merchandise inventory and pricing management</p>
                    <p>• User role and permission management</p>
                    <p>• Analytics dashboard with engagement metrics</p>
                    <p>• Newsletter campaign management</p>
                    <p>• Site settings and theme customization</p>
                    <p>• Automated stats scheduling with cron jobs</p>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-3">
                <h5 className="font-semibold text-gray-900 mb-2">Key Features Demonstrated:</h5>
                <div className="text-gray-700 space-y-1">
                  <p>• Full CRUD operations with MySQL database</p>
                  <p>• Real-time audio streaming and playback</p>
                  <p>• Responsive design for all device sizes</p>
                  <p>• Secure payment processing workflow</p>
                  <p>• Image optimization and lazy loading</p>
                  <p>• SEO optimization with pre-rendering</p>
                  <p>• Email integration for contact forms</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Note */}
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-gray-600 italic">
              💼 This project demonstrates proficiency in modern web development practices, 
              API design, database management, authentication systems, and deployment strategies.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default banner - balanced information
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-white/20 p-2 rounded-lg flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Portfolio Demonstration Site</h3>
              <p className="text-blue-50 text-sm mb-3">
                This is a fully functional music streaming platform showcasing full-stack development skills. 
                All artists, albums, tracks, and merchandise are sample content for demonstration purposes.
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs text-blue-100">
                <div className="flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>Sample Music Catalog</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Demo Merchandise</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Test Accounts Available</span>
                </div>
                {showAdminInfo && (
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Admin Panel (Protected)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {onClose && (
            <button
              onClick={handleDismiss}
              className="text-white/80 hover:text-white transition-colors flex-shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoBanner;
