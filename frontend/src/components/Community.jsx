
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
    <section className="w-full min-h-screen bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal  flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-3xl bg-shelter-slate rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-8 ring-1 ring-shelter-honey/20">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-4xl md:text-5xl font-extrabold font-['Roboto'] mb-2 drop-shadow-lg">Community News & Events</h2>
        <p className="text-shelter-white text-lg md:text-xl lg:text-2xl xl:text-xl font-semibold font-['Roboto'] mb-6 drop-shadow">Stay up to date with the latest news and events Shelter House Music is involved in. Join us and be part of our vibrant community!</p>
        
        {loading && (
          <div className="text-center text-shelter-white text-lg py-8">
            Loading events...
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-md p-4 text-red-200 text-center">
            {error}
          </div>
        )}
        
        {!loading && !error && newsEvents.length === 0 && (
          <div className="text-center text-shelter-gray text-lg py-8">
            No events scheduled at this time. Check back soon!
          </div>
        )}
        
        {!loading && !error && newsEvents.length > 0 && (
          <div className="flex flex-col gap-6">
            {newsEvents.map((event, idx) => (
              <div key={event.id || idx} className="bg-shelter-charcoal rounded-md shadow-md p-5 flex gap-4 hover:shadow-xl transition-shadow ring-1 ring-shelter-honey/20 hover:ring-shelter-honey/40">
                {event.image_url && (
                  <img 
                    src={event.image_url} 
                    alt={event.title}
                    onClick={() => handleLearnMore(event)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-md object-cover flex-shrink-0 cursor-pointer hover:scale-110 transition-transform duration-300 ring-1 ring-shelter-honey/30"
                  />
                )}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 cursor-pointer" onClick={() => handleExpand(idx)}>
                    <h3 className="text-shelter-honey text-2xl md:text-3xl font-bold font-['Public_Sans'] drop-shadow">{event.title}</h3>
                    <span className="text-shelter-white text-base md:text-lg font-semibold font-['Public_Sans'] drop-shadow-sm">
                      {formatDate(event.event_date)}
                    </span>
                  </div>
                  <p className="text-shelter-gray text-base md:text-lg font-medium font-['Public_Sans'] drop-shadow-sm">{event.description}</p>
                  {event.link && event.link !== '#' && (
                    <button
                      onClick={e => {e.stopPropagation(); handleLearnMore(event);}}
                      className="text-shelter-honey text-base font-bold font-['Public_Sans'] underline hover:text-shelter-amber transition-colors mt-2 self-start focus:outline-none focus:ring-2 focus:ring-shelter-honey rounded"
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
          <div className="bg-shelter-slate rounded-lg shadow-2xl p-8 max-w-md w-full flex flex-col gap-4 ring-2 ring-shelter-honey/30">
            {modalEvent.image_url && (
              <img 
                src={modalEvent.image_url} 
                alt={modalEvent.title}
                className="w-full h-64 rounded-md object-contain bg-shelter-charcoal ring-1 ring-shelter-honey/20"
              />
            )}
            <h3 className="text-shelter-honey text-2xl font-bold font-['Public_Sans'] drop-shadow">{modalEvent.title}</h3>
            <span className="text-shelter-white text-base font-semibold font-['Public_Sans'] drop-shadow-sm">
              {formatDate(modalEvent.event_date)}
            </span>
            <p className="text-shelter-gray text-lg font-medium font-['Public_Sans'] drop-shadow-sm">{modalEvent.description}</p>
            {modalEvent.link && modalEvent.link !== '#' && (
              <a 
                href={modalEvent.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 py-2 px-4 bg-shelter-honey text-shelter-charcoal rounded font-bold hover:bg-shelter-amber transition-colors text-center focus:outline-none focus:ring-2 focus:ring-shelter-honey"
              >
                Visit Event Page
              </a>
            )}
            <button onClick={closeModal} className="mt-2 py-2 px-4 bg-shelter-charcoal text-shelter-white rounded font-bold hover:bg-shelter-slate transition-colors focus:outline-none focus:ring-2 focus:ring-shelter-honey">Close</button>
          </div>
        </div>
      )}
    </section>
    </ZoomFit>
  );
};

export default Community;
