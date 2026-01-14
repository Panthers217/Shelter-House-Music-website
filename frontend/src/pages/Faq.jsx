import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import ZoomFit from '../components/ZoomFit.jsx';

const Faq = () => {
  const [faqs, setFaqs] = useState({});
  const [filteredFaqs, setFilteredFaqs] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    fetchFaqs();
  }, []);

  useEffect(() => {
    filterFaqs();
  }, [searchQuery, selectedCategory, faqs]);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/faq`);
      setFaqs(response.data.faqs);
      setFilteredFaqs(response.data.faqs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setLoading(false);
    }
  };

  const filterFaqs = () => {
    let result = { ...faqs };

    // Filter by category
    if (selectedCategory !== 'all') {
      result = { [selectedCategory]: faqs[selectedCategory] || [] };
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = {};
      
      Object.keys(result).forEach(category => {
        const matchingFaqs = result[category].filter(faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        );
        
        if (matchingFaqs.length > 0) {
          filtered[category] = matchingFaqs;
        }
      });
      
      result = filtered;
    }

    setFilteredFaqs(result);
  };

  const toggleItem = (faqId) => {
    setOpenItems(prev => ({
      ...prev,
      [faqId]: !prev[faqId]
    }));
  };

  const categories = Object.keys(faqs);
  const totalQuestions = Object.values(filteredFaqs).reduce((sum, cat) => sum + cat.length, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-shelter-charcoal flex items-center justify-center">
        <div className="text-shelter-white text-xl">Loading FAQs...</div>
      </div>
    );
  }

  return (
    <ZoomFit>
    <div className="min-h-screen bg-shelter-charcoal py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-shelter-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-shelter-gray text-lg">
            Find answers to common questions about Soul Felt Music
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-shelter-gray" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-shelter-slate text-shelter-white rounded-lg border border-shelter-slate focus:border-shelter-honey focus:outline-none focus:ring-2 focus:ring-shelter-honey/20"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === 'all'
                  ? 'bg-shelter-honey text-shelter-charcoal font-semibold'
                  : 'bg-shelter-slate text-shelter-gray hover:bg-shelter-slate/80'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === category
                    ? 'bg-shelter-honey text-shelter-charcoal font-semibold'
                    : 'bg-shelter-slate text-shelter-gray hover:bg-shelter-slate/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          {searchQuery && (
            <p className="text-shelter-gray text-sm">
              Found {totalQuestions} {totalQuestions === 1 ? 'question' : 'questions'}
            </p>
          )}
        </div>

        {/* FAQ List */}
        {Object.keys(filteredFaqs).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-shelter-gray text-lg">
              No questions found matching your search.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(filteredFaqs).map(([category, categoryFaqs]) => (
              <div key={category} className="space-y-4">
                {/* Category Header */}
                <h2 className="text-2xl font-bold text-shelter-honey mb-4 pb-2 border-b border-shelter-slate">
                  {category}
                </h2>

                {/* FAQs in Category */}
                <div className="space-y-3">
                  {categoryFaqs.map(faq => (
                    <div
                      key={faq.id}
                      className="bg-shelter-slate rounded-lg border border-shelter-slate overflow-hidden transition hover:border-shelter-honey/50"
                    >
                      {/* Question */}
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-shelter-charcoal/30 transition"
                      >
                        <span className="text-shelter-white font-medium pr-4">
                          {faq.question}
                        </span>
                        {openItems[faq.id] ? (
                          <FaChevronUp className="text-shelter-honey flex-shrink-0" />
                        ) : (
                          <FaChevronDown className="text-shelter-gray flex-shrink-0" />
                        )}
                      </button>

                      {/* Answer */}
                      {openItems[faq.id] && (
                        <div className="px-6 py-4 border-t border-shelter-slate bg-shelter-charcoal/50">
                          <p className="text-shelter-gray whitespace-pre-wrap leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Footer */}
        <div className="mt-16 text-center bg-shelter-slate rounded-lg border border-shelter-slate p-8">
          <h3 className="text-xl font-bold text-shelter-white mb-2">
            Still have questions?
          </h3>
          <p className="text-shelter-gray mb-4">
            Can't find the answer you're looking for? Contact our support team.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-shelter-honey text-shelter-charcoal font-semibold rounded-lg hover:bg-shelter-amber transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
    </ZoomFit>
  );
};

export default Faq;
