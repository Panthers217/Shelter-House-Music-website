import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';

function GenreManagement() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch genres on component mount
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/genres`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGenres(response.data.genres || []);
    } catch (err) {
      console.error('Error fetching genres:', err);
      setError('Failed to load genres');
    }
  };

  const handleAddGenre = async (e) => {
    e.preventDefault();
    if (!newGenre.trim()) {
      setError('Genre name cannot be empty');
      return;
    }

    // Check for duplicates (case-insensitive)
    if (genres.some(g => g.name.toLowerCase() === newGenre.trim().toLowerCase())) {
      setError('Genre already exists');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/genres`,
        { name: newGenre.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGenres(response.data.genres);
      setNewGenre('');
      setSuccess('Genre added successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error adding genre:', err);
      setError(err.response?.data?.error || 'Failed to add genre');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (genreId) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/genres/${genreId}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGenres(response.data.genres);
      setSuccess('Genre status updated');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error toggling genre:', err);
      setError(err.response?.data?.error || 'Failed to update genre status');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGenre = async (genreId) => {
    if (!confirm('Are you sure you want to delete this genre? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/genres/${genreId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setGenres(response.data.genres);
      setSuccess('Genre deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting genre:', err);
      setError(err.response?.data?.error || 'Failed to delete genre');
    } finally {
      setLoading(false);
    }
  };

  const activeGenres = genres.filter(g => g.is_active);
  const disabledGenres = genres.filter(g => !g.is_active);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Genre Management</h2>
      
      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-md text-green-300">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-300">
          {error}
        </div>
      )}

      {/* Add New Genre Form */}
      <form onSubmit={handleAddGenre} className="mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            placeholder="Enter new genre name"
            className="flex-1 px-4 py-2 bg-[#21212b] text-white rounded-md border border-white/10 focus:border-[#d63c65] focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !newGenre.trim()}
            className="px-6 py-2 bg-[#d63c65] text-white font-semibold rounded-md hover:bg-[#aa2a46] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Genre
          </button>
        </div>
      </form>

      {/* Active Genres */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Active Genres ({activeGenres.length})</h3>
        <div className="space-y-2">
          {activeGenres.length === 0 ? (
            <p className="text-white/60 italic">No active genres</p>
          ) : (
            activeGenres.map((genre) => (
              <div
                key={genre.id}
                className="flex items-center justify-between p-4 bg-[#21212b] rounded-md border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-white font-medium">{genre.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(genre.id)}
                    disabled={loading}
                    className="px-3 py-1 bg-yellow-600/20 text-yellow-300 border border-yellow-600 rounded-md hover:bg-yellow-600/30 disabled:opacity-50 text-sm transition-colors"
                  >
                    Disable
                  </button>
                  <button
                    onClick={() => handleDeleteGenre(genre.id)}
                    disabled={loading}
                    className="px-3 py-1 bg-red-600/20 text-red-300 border border-red-600 rounded-md hover:bg-red-600/30 disabled:opacity-50 text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Disabled Genres */}
      {disabledGenres.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white/60 mb-4">Disabled Genres ({disabledGenres.length})</h3>
          <div className="space-y-2">
            {disabledGenres.map((genre) => (
              <div
                key={genre.id}
                className="flex items-center justify-between p-4 bg-[#21212b]/50 rounded-md border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  <span className="text-white/60 font-medium line-through">{genre.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(genre.id)}
                    disabled={loading}
                    className="px-3 py-1 bg-green-600/20 text-green-300 border border-green-600 rounded-md hover:bg-green-600/30 disabled:opacity-50 text-sm transition-colors"
                  >
                    Enable
                  </button>
                  <button
                    onClick={() => handleDeleteGenre(genre.id)}
                    disabled={loading}
                    className="px-3 py-1 bg-red-600/20 text-red-300 border border-red-600 rounded-md hover:bg-red-600/30 disabled:opacity-50 text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-md">
        <p className="text-blue-300 text-sm">
          <span className="font-semibold">Note:</span> Active genres will appear in artist/album forms as selectable options. 
          Disabled genres are hidden from forms but remain in the database. Deleting a genre is permanent.
        </p>
      </div>
    </div>
  );
}

export default GenreManagement;
