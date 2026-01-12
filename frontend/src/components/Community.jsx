
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ZoomFit from './ZoomFit.jsx';

const Community = () => {
  const [newsEvents, setNewsEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);

  // Fetch events from API
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
        setNewsEvents(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleExpand = idx => {
    setExpanded(expanded === idx ? null : idx);
  };

  const handleLearnMore = event => {
    setModalEvent(event);
  };

  const closeModal = () => setModalEvent(null);

  return (
    <ZoomFit>
    <section className="w-full min-h-screen bg-[#1a1b22] flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-3xl bg-[#21212b] rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-8">
        <h2 className="text-[#fffced] text-4xl md:text-5xl font-extrabold font-['Roboto'] mb-2 drop-shadow-lg">Community News & Events</h2>
        <p className="text-[#fffced] text-lg md:text-xl lg:text-2xl xl:text-xl font-semibold font-['Roboto'] mb-6 drop-shadow">Stay up to date with the latest news and events Soul Felt Music is involved in. Join us and be part of our vibrant community!</p>
        
        {loading && (
          <div className="text-center text-[#fffced] text-lg py-8">
            Loading events...
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-md p-4 text-red-200 text-center">
            {error}
          </div>
        )}
        
        {!loading && !error && newsEvents.length === 0 && (
          <div className="text-center text-[#fffced]/60 text-lg py-8">
            No events scheduled at this time. Check back soon!
          </div>
        )}
        
        {!loading && !error && newsEvents.length > 0 && (
          <div className="flex flex-col gap-6">
            {newsEvents.map((event, idx) => (
              <div key={event.id || idx} className="bg-[#1d1e26] rounded-md shadow-md p-5 flex gap-4 hover:shadow-xl transition-shadow">
                {event.image_url && (
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    onClick={() => handleLearnMore(event)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover flex-shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 cursor-pointer" onClick={() => handleExpand(idx)}>
                    <h3 className="text-[#aa2a46] text-2xl md:text-3xl font-bold font-['Public_Sans'] drop-shadow">{event.title}</h3>
                    <span className="text-[#fffced] text-base md:text-lg font-semibold font-['Public_Sans'] drop-shadow-sm">
                      {formatDate(event.event_date)}
                    </span>
                  </div>
                  <p className="text-[#fffced] text-base md:text-lg font-medium font-['Public_Sans'] drop-shadow-sm">{event.description}</p>
                  {event.link && event.link !== '#' && (
                    <button
                      onClick={e => {e.stopPropagation(); handleLearnMore(event);}}
                      className="text-[#aa2a46] text-base font-bold font-['Public_Sans'] underline hover:text-[#fffced] transition-colors mt-2 self-start"
                    >Learn more</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Modal */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#21212b] rounded-lg shadow-2xl p-8 max-w-md w-full flex flex-col gap-4">
            {modalEvent.image_url && (
              <img 
                src={modalEvent.image_url} 
                alt={modalEvent.title}
                className="w-full h-64 rounded-md object-contain bg-[#1d1e26]"
              />
            )}
            <h3 className="text-[#aa2a46] text-2xl font-bold font-['Public_Sans'] drop-shadow">{modalEvent.title}</h3>
            <span className="text-[#fffced] text-base font-semibold font-['Public_Sans'] drop-shadow-sm">
              {formatDate(modalEvent.event_date)}
            </span>
            <p className="text-[#fffced] text-lg font-medium font-['Public_Sans'] drop-shadow-sm">{modalEvent.description}</p>
            {modalEvent.link && modalEvent.link !== '#' && (
              <a 
                href={modalEvent.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 py-2 px-4 bg-[#aa2a46] text-[#fffced] rounded font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors text-center"
              >
                Visit Event Page
              </a>
            )}
            <button onClick={closeModal} className="mt-2 py-2 px-4 bg-gray-700 text-[#fffced] rounded font-bold hover:bg-gray-600 transition-colors">Close</button>
          </div>
        </div>
      )}
    </section>
    </ZoomFit>
  );
};

export default Community;
