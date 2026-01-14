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
      <div className="min-h-screen bg-shelter-charcoal flex items-center justify-center">
        <div className="text-shelter-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-shelter-charcoal flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <ZoomFit>
    <div className="min-h-screen bg-shelter-charcoal py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-shelter-slate rounded-lg p-8 shadow-lg text-shelter-white">
          {/* Terms Content */}
          <div 
            className="space-y-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-shelter-honey [&_h1]:mb-4
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-shelter-honey [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-shelter-white [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:text-shelter-white [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:text-shelter-white [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
              [&_ol]:text-shelter-white [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
              [&_li]:mb-2 [&_li]:text-shelter-white
              [&_a]:text-shelter-honey [&_a]:underline hover:[&_a]:text-shelter-amber
              [&_strong]:text-shelter-white [&_strong]:font-semibold
              [&_em]:text-shelter-white [&_em]:italic"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        </div>
      </div>
    </div>
    </ZoomFit>
  );
};

export default Terms;
