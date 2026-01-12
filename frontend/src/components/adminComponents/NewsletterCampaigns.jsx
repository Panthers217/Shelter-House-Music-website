import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';

const NewsletterCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: '',
    message: '',
    audio_url: '',
    video_url: '',
    external_links: [],
    artist_ids: [],
    featured_image: '',
    status: 'draft',
    scheduled_at: ''
  });
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  useEffect(() => {
    fetchCampaigns();
    fetchArtists();
  }, []);

  const getAuthToken = async () => {
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const fetchCampaigns = async () => {
    try {
      const token = await getAuthToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/newsletter/campaigns`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCampaigns(response.data.campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/artists`);
      setArtists(response.data);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArtistToggle = (artistId) => {
    setFormData(prev => ({
      ...prev,
      artist_ids: prev.artist_ids.includes(artistId)
        ? prev.artist_ids.filter(id => id !== artistId)
        : [...prev.artist_ids, artistId]
    }));
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      setFormData(prev => ({
        ...prev,
        external_links: [...prev.external_links, { ...newLink }]
      }));
      setNewLink({ title: '', url: '' });
    }
  };

  const handleRemoveLink = (index) => {
    setFormData(prev => ({
      ...prev,
      external_links: prev.external_links.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAuthToken();
      
      if (editingCampaign) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/newsletter/campaigns/${editingCampaign.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/newsletter/campaigns`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
      setShowModal(false);
      setEditingCampaign(null);
      resetForm();
      fetchCampaigns();
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Failed to save campaign');
    }
  };

  const handleSendCampaign = async (campaignId, isResend = false) => {
    const confirmMessage = isResend 
      ? 'Are you sure you want to resend this campaign to all current subscribers? This will send the email again to everyone who is currently subscribed.'
      : 'Are you sure you want to send this campaign to all subscribers?';
    
    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      const token = await getAuthToken();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/newsletter/campaigns/${campaignId}/send`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const successMessage = isResend
        ? `Campaign resent to ${response.data.successCount} subscribers!`
        : `Campaign sent to ${response.data.successCount} subscribers!`;
      
      if (response.data.failedCount > 0) {
        alert(`${successMessage}\n\nNote: ${response.data.failedCount} email(s) failed to send.`);
      } else {
        alert(successMessage);
      }
      
      fetchCampaigns();
    } catch (error) {
      console.error('Error sending campaign:', error);
      console.error('Error response:', error.response?.data);
      alert(`Failed to send campaign: ${error.response?.data?.error || error.message}\n${error.response?.data?.details || ''}\n${error.response?.data?.sqlMessage || ''}`);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!confirm('Are you sure you want to delete this campaign?')) {
      return;
    }

    try {
      const token = await getAuthToken();
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/newsletter/campaigns/${campaignId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting campaign:', error);
      alert('Failed to delete campaign');
    }
  };

  const openEditModal = (campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      title: campaign.title,
      subject: campaign.subject,
      content: campaign.content,
      message: campaign.message || '',
      audio_url: campaign.audio_url || '',
      video_url: campaign.video_url || '',
      external_links: campaign.external_links || [],
      artist_ids: campaign.artist_ids || [],
      featured_image: campaign.featured_image || '',
      status: campaign.status,
      scheduled_at: campaign.scheduled_at || ''
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subject: '',
      content: '',
      message: '',
      audio_url: '',
      video_url: '',
      external_links: [],
      artist_ids: [],
      featured_image: '',
      status: 'draft',
      scheduled_at: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return <div className="p-8 text-[#fffced]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0908] p-8">
      <div className="max-w-7xl mx-auto pt-[10rem]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#fffced] mb-2">Newsletter Campaigns</h1>
            <p className="text-[#fffced]/60">Create and manage email campaigns for your subscribers</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setEditingCampaign(null);
              setShowModal(true);
            }}
            className="px-6 py-3 bg-[#aa2a46] text-white rounded-lg hover:bg-[#8a1f36] transition"
          >
            Create New Campaign
          </button>
        </div>

        {/* Campaigns List */}
        <div className="grid gap-6">
          {campaigns.length === 0 ? (
            <div className="bg-[#1d1e26] rounded-lg p-12 text-center">
              <p className="text-[#fffced]/60 mb-4">No campaigns yet</p>
              <button
                onClick={() => {
                  resetForm();
                  setEditingCampaign(null);
                  setShowModal(true);
                }}
                className="text-[#aa2a46] hover:underline"
              >
                Create your first campaign
              </button>
            </div>
          ) : (
            campaigns.map(campaign => (
              <div key={campaign.id} className="bg-[#1d1e26] rounded-lg p-6 border border-[#2a2b35]">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#fffced]">{campaign.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(campaign.status)}`}>
                        {campaign.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[#fffced]/80 mb-2"><strong>Subject:</strong> {campaign.subject}</p>
                    <p className="text-[#fffced]/60 text-sm mb-3">{campaign.message}</p>
                    
                    {/* Stats */}
                    {campaign.status === 'sent' && (
                      <div className="flex gap-6 text-sm text-[#fffced]/60 mb-3">
                        <span>Recipients: {campaign.recipient_count}</span>
                        <span>Opens: {campaign.total_opened || 0}</span>
                        <span>Clicks: {campaign.total_clicked || 0}</span>
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex gap-4 text-xs text-[#fffced]/40">
                      <span>Created: {new Date(campaign.created_at).toLocaleDateString()}</span>
                      {campaign.sent_at && (
                        <span>Sent: {new Date(campaign.sent_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {campaign.status === 'draft' && (
                      <button
                        onClick={() => handleSendCampaign(campaign.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                      >
                        Send Now
                      </button>
                    )}
                    {campaign.status === 'sent' && (
                      <button
                        onClick={() => handleSendCampaign(campaign.id, true)}
                        className="px-4 py-2 bg-[#aa2a46] text-white rounded hover:bg-[#8a1f36] transition text-sm"
                        title="Resend this campaign to all current subscribers"
                      >
                        Resend
                      </button>
                    )}
                    <button
                      onClick={() => openEditModal(campaign)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Preview Content */}
                {(campaign.audio_url || campaign.video_url || (campaign.external_links && campaign.external_links.length > 0)) && (
                  <div className="mt-4 pt-4 border-t border-[#2a2b35]">
                    <div className="flex gap-4 flex-wrap text-sm">
                      {campaign.audio_url && (
                        <span className="text-[#fffced]/60">🎵 Audio Attached</span>
                      )}
                      {campaign.video_url && (
                        <span className="text-[#fffced]/60">🎬 Video Attached</span>
                      )}
                      {campaign.external_links && campaign.external_links.length > 0 && (
                        <span className="text-[#fffced]/60">🔗 {campaign.external_links.length} Link(s)</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-[#1d1e26] rounded-lg max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#1d1e26] p-6 border-b border-[#2a2b35] flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#fffced]">
                  {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#fffced]/60 hover:text-[#fffced] text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Info */}
                <div>
                  <label className="block text-[#fffced] mb-2">Campaign Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                    placeholder="e.g., Monthly Music Update - January 2025"
                  />
                </div>

                <div>
                  <label className="block text-[#fffced] mb-2">Email Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                    placeholder="What subscribers will see in their inbox"
                  />
                </div>

                <div>
                  <label className="block text-[#fffced] mb-2">Main Message *</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                    placeholder="Main content of your newsletter..."
                  />
                </div>

                <div>
                  <label className="block text-[#fffced] mb-2">Additional Notes</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                    placeholder="Any additional information or announcements..."
                  />
                </div>

                {/* Media */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#fffced] mb-2">Audio URL</label>
                    <input
                      type="url"
                      name="audio_url"
                      value={formData.audio_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-[#fffced] mb-2">Video URL</label>
                    <input
                      type="url"
                      name="video_url"
                      value={formData.video_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#fffced] mb-2">Featured Image URL</label>
                  <input
                    type="url"
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                {/* External Links */}
                <div>
                  <label className="block text-[#fffced] mb-2">External Links</label>
                  <div className="space-y-2 mb-3">
                    {formData.external_links.map((link, index) => (
                      <div key={index} className="flex gap-2 items-center bg-[#0a0908] p-3 rounded border border-[#2a2b35]">
                        <span className="flex-1 text-[#fffced]">{link.title}: {link.url}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLink.title}
                      onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Link title"
                      className="flex-1 px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                    />
                    <input
                      type="url"
                      value={newLink.url}
                      onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://..."
                      className="flex-1 px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="px-4 py-2 bg-[#aa2a46] text-white rounded hover:bg-[#8a1f36]"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Featured Artists */}
                <div>
                  <label className="block text-[#fffced] mb-2">Featured Artists</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-[#0a0908] rounded border border-[#2a2b35]">
                    {artists.map(artist => (
                      <label key={artist.id} className="flex items-center gap-2 cursor-pointer hover:bg-[#1d1e26] p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.artist_ids.includes(artist.id)}
                          onChange={() => handleArtistToggle(artist.id)}
                          className="form-checkbox text-[#aa2a46]"
                        />
                        <span className="text-[#fffced] text-sm">{artist.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#fffced] mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                    >
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  {formData.status === 'scheduled' && (
                    <div>
                      <label className="block text-[#fffced] mb-2">Schedule For</label>
                      <input
                        type="datetime-local"
                        name="scheduled_at"
                        value={formData.scheduled_at}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-[#0a0908] text-[#fffced] rounded border border-[#2a2b35] focus:border-[#aa2a46] focus:outline-none"
                      />
                    </div>
                  )}
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
                    {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterCampaigns;
