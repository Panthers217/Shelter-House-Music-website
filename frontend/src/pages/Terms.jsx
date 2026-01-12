import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZoomFit from '../components/ZoomFit.jsx';

const Terms = () => {
  const [terms, setTerms] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/settings/terms`);
      setTerms(response.data.terms_of_service);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching terms:', error);
      setError('Failed to load Terms of Service');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0908] flex items-center justify-center">
        <div className="text-[#fffced] text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0908] flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <ZoomFit>
    <div className="min-h-screen bg-[#0a0908] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1d1e26] rounded-lg p-8 shadow-lg text-[#fffced]">
          {/* Terms Content */}
          <div 
            className="space-y-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-[#f7c900] [&_h1]:mb-4
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#f7c900] [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#fffced] [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:text-[#fffced] [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:text-[#fffced] [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
              [&_ol]:text-[#fffced] [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
              [&_li]:mb-2 [&_li]:text-[#fffced]
              [&_a]:text-[#f7c900] [&_a]:underline hover:[&_a]:text-[#aa2a46]
              [&_strong]:text-[#fffced] [&_strong]:font-semibold
              [&_em]:text-[#fffced] [&_em]:italic"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        </div>
      </div>
    </div>
    </ZoomFit>
  );
};

export default Terms;
