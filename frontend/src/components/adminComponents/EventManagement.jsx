import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    event_date: '',
    description: '',
    image_url: '',
    link: '',
    is_active: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/events`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvents(response.data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      event_date: '',
      description: '',
      image_url: '',
      link: '',
      is_active: true
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.event_date || !formData.description.trim()) {
      setError('Title, date, and description are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

  try {
    const token = await auth.currentUser?.getIdToken();
    
    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('event_date', formData.event_date);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('link', formData.link || '');
    formDataToSend.append('is_active', formData.is_active);
    
    // Add image file if selected
    if (imageFile) {
      formDataToSend.append('event_image', imageFile);
    } else if (formData.image_url) {
      // If no new file but has existing URL, keep it
      formDataToSend.append('image_url', formData.image_url);
    }

    if (editingEvent) {
      // Update existing event
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/events/${editingEvent.id}`,
        formDataToSend,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      setSuccess('Event updated successfully');
    } else {
      // Create new event
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/events`,
        formDataToSend,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      setSuccess('Event created successfully');
    }
    
    await fetchEvents();
    resetForm();
    setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving event:', err);
      setError(err.response?.data?.error || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      event_date: event.event_date.split('T')[0], // Format date for input
      description: event.description,
      image_url: event.image_url || '',
      link: event.link || '',
      is_active: Boolean(event.is_active)
    });
    setImagePreview(event.image_url || null);
    setImageFile(null);
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = await auth.currentUser?.getIdToken();
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/events/${eventId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('Event deleted successfully');
      await fetchEvents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(err.response?.data?.error || 'Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (eventId) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = await auth.currentUser?.getIdToken();
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/events/${eventId}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('Event status updated');
      await fetchEvents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error toggling status:', err);
      setError(err.response?.data?.error || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Community Events Management</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#aa2a46] text-white rounded hover:bg-[#8a2136] transition-colors"
          >
            {showForm ? 'Cancel' : '+ New Event'}
          </button>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Event Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-md border border-gray-300"
                    />
                  </div>
                )}
                <span className="text-xs text-gray-500 mt-1 block">
                  Upload an image file or enter a URL below
                </span>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#aa2a46] mt-2"
                  placeholder="Or paste image URL here"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Link (Optional)
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
                  placeholder="Describe the event..."
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#aa2a46] border-gray-300 rounded focus:ring-[#aa2a46]"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Active (visible on community page)
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#aa2a46] text-white rounded hover:bg-[#8a2136] transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Events List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            All Events ({events.length})
          </h3>
          
          {loading && !showForm ? (
            <div className="text-center py-8 text-gray-500">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No events yet. Create your first event!
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className={`p-4 border rounded-lg ${
                  event.is_active ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 flex-1">
                    {event.image_url && (
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{event.title}</h4>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            event.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {event.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        📅 {formatDate(event.event_date)}
                      </p>
                      <p className="text-gray-700 mb-2">{event.description}</p>
                      {event.link && event.link !== '#' && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#aa2a46] hover:underline text-sm"
                        >
                          🔗 Event Link
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(event.id)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        event.is_active
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {event.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default EventManagement;
