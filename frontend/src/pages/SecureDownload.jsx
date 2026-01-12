import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function SecureDownload() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, ready, error
  const [downloadData, setDownloadData] = useState(null);
  const [error, setError] = useState(null);

  const itemType = searchParams.get('type');
  const itemId = searchParams.get('id');
  const userEmail = searchParams.get('email');

  useEffect(() => {
    if (!itemType || !itemId || !userEmail) {
      setStatus('error');
      setError('Invalid download link. Missing required parameters.');
      return;
    }

    // Verify purchase and generate download tokens
    const generateDownloadUrl = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/downloads/generate-url`, {
          itemType,
          itemId,
          userEmail
        });

        setDownloadData(response.data);
        setStatus('ready');
      } catch (err) {
        setStatus('error');
        setError(
          err.response?.data?.error || 
          'Failed to verify purchase. Please check your email link or contact support.'
        );
      }
    };

    generateDownloadUrl();
  }, [itemType, itemId, userEmail]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#aa2a46] mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Verifying Purchase</h2>
          <p className="text-gray-400">Please wait while we verify your purchase...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Download Failed</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="space-y-3">
            <a
              href="/purchase-history"
              className="block w-full bg-[#aa2a46] hover:bg-[#8a1f36] text-white font-semibold py-3 px-6 rounded-full transition-colors"
            >
              View Purchase History
            </a>
            <a
              href="/contact"
              className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'ready') {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
          <div className="text-green-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">✅ Purchase Verified</h2>
          <p className="text-gray-400 mb-4">
            {downloadData.itemTitle}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            {downloadData.downloads.length} {downloadData.downloads.length === 1 ? 'track' : 'tracks'} ready to download
          </p>

          <div className="space-y-3 mb-6">
            <p className="text-white font-semibold">Click to Download:</p>
            {downloadData.downloads.map((download, idx) => (
              <a
                key={idx}
                href={`${apiUrl}${download.downloadUrl}`}
                className="block bg-[#aa2a46] hover:bg-[#8a1f36] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                📥 {download.title}
              </a>
            ))}
          </div>

          <div className="space-y-2 text-sm text-gray-400 mb-6">
            <p>⏱️ Links expire in {Math.floor(downloadData.expiresIn / 3600)} hours</p>
            <p>🔐 Files stream directly to your device</p>
            <p>🎵 High-quality audio files</p>
          </div>

          <a
            href="/purchase-history"
            className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
          >
            View All Purchases
          </a>
        </div>
      </div>
    );
  }

  return null;
}
