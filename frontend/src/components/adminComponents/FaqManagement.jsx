import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';

const FaqManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General',
    display_order: 0,
    is_published: true
  });

  const categories = [
    'General',
    'Music & Artists',
    'Store & Purchases',
    'Events & Community',
    'Account & Newsletter',
    'Technical Support'
  ];

  useEffect(() => {
    fetchFaqs();
  }, []);

  const getAuthToken = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');
    return await user.getIdToken();
  };

  const fetchFaqs = async () => {
    try {
      const token = await getAuthToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/faq/admin/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFaqs(response.data.faqs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'General',
      display_order: 0,
      is_published: true
    });
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      display_order: faq.display_order,
      is_published: faq.is_published
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAuthToken();

      if (editingFaq) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/faq/admin/${editingFaq.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/faq/admin`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setShowModal(false);
      setEditingFaq(null);
      resetForm();
      fetchFaqs();
      alert(editingFaq ? 'FAQ updated successfully!' : 'FAQ created successfully!');
    } catch (error) {
      console.error('Error saving FAQ:', error);
      alert(`Failed to save FAQ: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleDelete = async (faqId) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const token = await getAuthToken();
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/faq/admin/${faqId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFaqs();
      alert('FAQ deleted successfully!');
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      alert('Failed to delete FAQ');
    }
  };

  const handleTogglePublished = async (faqId) => {
    try {
      const token = await getAuthToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/faq/admin/${faqId}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFaqs();
    } catch (error) {
      console.error('Error toggling FAQ:', error);
      alert('Failed to toggle FAQ status');
    }
  };

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  if (loading) {
    return <div className="p-8 text-[#fffced]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0908] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#fffced] mb-2">FAQ Management</h1>
            <p className="text-[#fffced]/60">Manage frequently asked questions</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setEditingFaq(null);
              setShowModal(true);
            }}
            className="px-6 py-3 bg-[#aa2a46] text-white rounded-lg hover:bg-[#8a1f36] transition"
          >
            Add New FAQ
          </button>
        </div>

        {/* FAQ List by Category */}
        <div className="space-y-8">
          {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category} className="bg-[#1d1e26] rounded-lg p-6 border border-[#2a2b35]">
              <h2 className="text-2xl font-bold text-[#aa2a46] mb-4">{category}</h2>
              
              <div className="space-y-4">
                {categoryFaqs.map(faq => (
                  <div
                    key={faq.id}
                    className="bg-[#0a0908] rounded-lg p-4 border border-[#2a2b35]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[#fffced]">
                            {faq.question}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              faq.is_published
                                ? 'bg-green-600/20 text-green-400'
                                : 'bg-gray-600/20 text-gray-400'
                            }`}
                          >
                            {faq.is_published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-[#fffced]/70 text-sm mb-2">{faq.answer}</p>
                        <p className="text-[#fffced]/40 text-xs">
                          Order: {faq.display_order} | Created: {new Date(faq.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleTogglePublished(faq.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                          title={faq.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {faq.is_published ? 'Hide' : 'Show'}
                        </button>
                        <button
                          onClick={() => openEditModal(faq)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1d1e26] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#fffced] mb-6">
                  {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Question */}
                  <div>
                    <label className="block text-[#fffced] mb-2">Question *</label>
                    <input
                      type="text"
                      value={formData.question}
                      onChange={(e) => handleInputChange('question', e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                      placeholder="What is your question?"
                    />
                  </div>

                  {/* Answer */}
                  <div>
                    <label className="block text-[#fffced] mb-2">Answer *</label>
                    <textarea
                      value={formData.answer}
                      onChange={(e) => handleInputChange('answer', e.target.value)}
                      required
                      rows={6}
                      className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                      placeholder="Provide a detailed answer..."
                    />
                  </div>

                  {/* Category and Display Order */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#fffced] mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#fffced] mb-2">Display Order</label>
                      <input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => handleInputChange('display_order', parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Published */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.is_published}
                        onChange={(e) => handleInputChange('is_published', e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-[#fffced]">Published (visible to users)</span>
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end pt-4 border-t border-[#2a2b35]">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#aa2a46] text-white rounded hover:bg-[#8a1f36] transition"
                    >
                      {editingFaq ? 'Update FAQ' : 'Create FAQ'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqManagement;
