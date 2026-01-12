import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApiData } from '../../context/ApiDataContext';

const PurchaseStats = () => {
  const { dbSnapshot } = useApiData();
  const [stats, setStats] = useState(null);
  const [artistRevenue, setArtistRevenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'artist-revenue'
  const [lastRefreshed, setLastRefreshed] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    artistId: '',
    itemType: '',
    paymentStatus: 'succeeded'
  });

  // Revenue split states
  const [customSplit, setCustomSplit] = useState({
    artistPercentage: 70,
    platformPercentage: 30
  });

  // Date range presets
  const datePresets = [
    { label: 'All Time', days: null },
    { label: 'Today', days: 0 },
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 90 Days', days: 90 },
    { label: 'Last Year', days: 365 }
  ];

  useEffect(() => {
    fetchStats();
    if (activeTab === 'artist-revenue') {
      fetchArtistRevenue();
    }
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchStats();
      if (activeTab === 'artist-revenue') {
        fetchArtistRevenue();
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [filters, activeTab]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.artistId) params.append('artistId', filters.artistId);
      if (filters.itemType) params.append('itemType', filters.itemType);
      if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/purchase-history/stats?${params.toString()}`);
      setStats(response.data);
      setError(null);
      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Error fetching purchase stats:', err);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const fetchArtistRevenue = async () => {
    try {
      const params = new URLSearchParams();
      
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.artistId) params.append('artistId', filters.artistId);

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/purchase-history/artist-revenue?${params.toString()}`);
      setArtistRevenue(response.data);
    } catch (err) {
      console.error('Error fetching artist revenue:', err);
    }
  };

  const handleDatePreset = (days) => {
    if (days === null) {
      setFilters(prev => ({ ...prev, startDate: '', endDate: '' }));
    } else {
      const endDate = new Date();
      const startDate = new Date();
      if (days === 0) {
        startDate.setHours(0, 0, 0, 0);
      } else {
        startDate.setDate(startDate.getDate() - days);
      }
      
      setFilters(prev => ({
        ...prev,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }));
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      artistId: '',
      itemType: '',
      paymentStatus: 'succeeded'
    });
  };

  const exportToCSV = () => {
    if (activeTab === 'overview' && stats) {
      const csvData = [
        ['Item Type', 'Title', 'Artist', 'Orders', 'Quantity Sold', 'Revenue'],
        ...stats.top_items.map(item => [
          item.item_type,
          item.item_title,
          item.artist_name,
          item.order_count,
          item.total_quantity,
          (item.total_revenue / 100).toFixed(2)
        ])
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `purchase-stats-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } else if (activeTab === 'artist-revenue' && artistRevenue) {
      const csvData = [
        ['Artist ID', 'Artist Name', 'Total Orders', 'Items Sold', 'Gross Revenue', 'Stripe Fees', 'Platform Fee', 'Artist Payout'],
        ...artistRevenue.artists.map(artist => [
          artist.artist_id,
          artist.artist_name,
          artist.total_orders,
          artist.total_items_sold,
          (artist.gross_revenue / 100).toFixed(2),
          (artist.stripe_fees / 100).toFixed(2),
          (artist.platform_fee / 100).toFixed(2),
          (artist.artist_payout / 100).toFixed(2)
        ])
      ];
      
      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `artist-revenue-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#aa2a46]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 m-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100); // Convert cents to dollars
  };

  // Get unique artists from dbSnapshot
  const artists = dbSnapshot?.artists?.records || [];

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-[#aa2a46] text-white shadow-lg'
                : 'bg-[#1d1e26] text-[#fffced] border border-[#aa2a46]/30 hover:bg-[#2a2b35]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('artist-revenue')}
            className={`px-6 py-3 rounded-lg font-bold transition-all ${
              activeTab === 'artist-revenue'
                ? 'bg-[#aa2a46] text-white shadow-lg'
                : 'bg-[#1d1e26] text-[#fffced] border border-[#aa2a46]/30 hover:bg-[#2a2b35]'
            }`}
          >
            Artist Revenue
          </button>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
            <button
              onClick={() => {
                fetchStats();
                if (activeTab === 'artist-revenue') fetchArtistRevenue();
              }}
              className="px-4 py-2 bg-[#aa2a46] text-white rounded-lg hover:bg-[#d94a6a] transition-colors duration-200"
            >
              Refresh
            </button>
          </div>
          {lastRefreshed && (
            <span className="text-xs text-[#fffced]/60">
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-[#1d1e26] rounded-lg p-6 border border-[#aa2a46]/30 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#fffced]">Filters</h3>
          <button
            onClick={clearFilters}
            className="text-sm text-[#aa2a46] hover:text-[#d94a6a] font-semibold"
          >
            Clear All
          </button>
        </div>

        {/* Date Presets */}
        <div className="flex flex-wrap gap-2">
          {datePresets.map(preset => (
            <button
              key={preset.label}
              onClick={() => handleDatePreset(preset.days)}
              className="px-3 py-1 text-sm rounded-full bg-[#2a2b35] text-[#fffced] hover:bg-[#aa2a46] hover:text-white transition border border-[#aa2a46]/20"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-[#fffced]/80 mb-2">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 bg-[#2a2b35] border border-[#aa2a46]/30 rounded-lg text-[#fffced] focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-[#fffced]/80 mb-2">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-2 bg-[#2a2b35] border border-[#aa2a46]/30 rounded-lg text-[#fffced] focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
            />
          </div>

          {/* Artist Filter */}
          <div>
            <label className="block text-sm font-medium text-[#fffced]/80 mb-2">Artist</label>
            <select
              value={filters.artistId}
              onChange={(e) => handleFilterChange('artistId', e.target.value)}
              className="w-full px-3 py-2 bg-[#2a2b35] border border-[#aa2a46]/30 rounded-lg text-[#fffced] focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
            >
              <option value="">All Artists</option>
              {artists.map(artist => (
                <option key={artist.id} value={artist.id}>
                  {artist.artist_name || artist.name}
                </option>
              ))}
            </select>
          </div>

          {/* Item Type Filter */}
          {activeTab === 'overview' && (
            <div>
              <label className="block text-sm font-medium text-[#fffced]/80 mb-2">Item Type</label>
              <select
                value={filters.itemType}
                onChange={(e) => handleFilterChange('itemType', e.target.value)}
                className="w-full px-3 py-2 bg-[#2a2b35] border border-[#aa2a46]/30 rounded-lg text-[#fffced] focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
              >
                <option value="">All Types</option>
                <option value="Digital Album">Albums</option>
                <option value="Track">Tracks</option>
                <option value="Merchandise">Merchandise</option>
              </select>
            </div>
          )}

          {/* Payment Status Filter */}
          {activeTab === 'overview' && (
            <div>
              <label className="block text-sm font-medium text-[#fffced]/80 mb-2">Status</label>
              <select
                value={filters.paymentStatus}
                onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                className="w-full px-3 py-2 bg-[#2a2b35] border border-[#aa2a46]/30 rounded-lg text-[#fffced] focus:outline-none focus:ring-2 focus:ring-[#aa2a46]"
              >
                <option value="">All Statuses</option>
                <option value="succeeded">Succeeded</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-[#aa2a46] to-[#d94a6a] rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wide">Total Revenue</p>
              <p className="text-white text-3xl font-bold mt-2">
                {formatCurrency(stats.overview.total_revenue)}
              </p>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-gradient-to-br from-[#1d1e26] to-[#2a2b35] rounded-lg p-6 shadow-lg border border-[#aa2a46]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#fffced]/80 text-sm font-medium uppercase tracking-wide">Total Orders</p>
              <p className="text-[#fffced] text-3xl font-bold mt-2">
                {stats.overview.total_orders.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#aa2a46]/20 rounded-full p-3">
              <svg className="w-8 h-8 text-[#aa2a46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-gradient-to-br from-[#1d1e26] to-[#2a2b35] rounded-lg p-6 shadow-lg border border-[#aa2a46]/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#fffced]/80 text-sm font-medium uppercase tracking-wide">Avg Order Value</p>
              <p className="text-[#fffced] text-3xl font-bold mt-2">
                {formatCurrency(stats.overview.average_order_value)}
              </p>
            </div>
            <div className="bg-[#aa2a46]/20 rounded-full p-3">
              <svg className="w-8 h-8 text-[#aa2a46]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Last 7 Days */}
      {stats.last_7_days && (
        <div className="bg-[#1d1e26] rounded-lg p-6 border border-[#aa2a46]/30">
          <h3 className="text-xl font-bold text-[#fffced] mb-4">Last 7 Days</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#fffced]/60 text-sm">Orders</p>
              <p className="text-[#fffced] text-2xl font-bold">{stats.last_7_days.count || 0}</p>
            </div>
            <div>
              <p className="text-[#fffced]/60 text-sm">Revenue</p>
              <p className="text-[#aa2a46] text-2xl font-bold">
                {formatCurrency(stats.last_7_days.revenue || 0)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Orders by Status */}
      <div className="bg-[#1d1e26] rounded-lg p-6 border border-[#aa2a46]/30">
        <h3 className="text-xl font-bold text-[#fffced] mb-4">Orders by Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#aa2a46]/30">
                <th className="text-left py-3 px-4 text-[#fffced]/80 font-semibold">Status</th>
                <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Count</th>
                <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {stats.by_status.map((status, idx) => (
                <tr key={idx} className="border-b border-[#aa2a46]/10 hover:bg-[#2a2b35] transition">
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      status.payment_status === 'succeeded' 
                        ? 'bg-green-500/20 text-green-400'
                        : status.payment_status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {status.payment_status}
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 text-[#fffced]">{status.count}</td>
                  <td className="text-right py-3 px-4 text-[#aa2a46] font-semibold">
                    {formatCurrency(status.total_amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="bg-[#1d1e26] rounded-lg p-6 border border-[#aa2a46]/30">
        <h3 className="text-xl font-bold text-[#fffced] mb-4">Top 10 Selling Items</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#aa2a46]/30">
                <th className="text-left py-3 px-4 text-[#fffced]/80 font-semibold">Type</th>
                <th className="text-left py-3 px-4 text-[#fffced]/80 font-semibold">Title</th>
                <th className="text-left py-3 px-4 text-[#fffced]/80 font-semibold">Artist</th>
                <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Orders</th>
                <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Qty Sold</th>
                <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {stats.top_items.map((item, idx) => (
                <tr key={idx} className="border-b border-[#aa2a46]/10 hover:bg-[#2a2b35] transition">
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      item.item_type === 'Album'
                        ? 'bg-purple-500/20 text-purple-400'
                        : item.item_type === 'Track'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {item.item_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#fffced]">{item.item_title}</td>
                  <td className="py-3 px-4 text-[#fffced]/80">{item.artist_name}</td>
                  <td className="text-right py-3 px-4 text-[#fffced]">{item.order_count}</td>
                  <td className="text-right py-3 px-4 text-[#fffced] font-semibold">{item.total_quantity}</td>
                  <td className="text-right py-3 px-4 text-[#aa2a46] font-bold">
                    {formatCurrency(item.total_revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </>
      )}

      {/* Artist Revenue Tab Content */}
      {activeTab === 'artist-revenue' && artistRevenue && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#1d1e26] rounded-lg p-4 border border-[#aa2a46]/30">
              <p className="text-[#fffced]/60 text-sm">Total Artists</p>
              <p className="text-[#fffced] text-2xl font-bold">{artistRevenue.summary.total_artists}</p>
            </div>
            <div className="bg-[#1d1e26] rounded-lg p-4 border border-[#aa2a46]/30">
              <p className="text-[#fffced]/60 text-sm">Gross Revenue</p>
              <p className="text-[#fffced] text-2xl font-bold">{formatCurrency(artistRevenue.summary.total_gross_revenue)}</p>
            </div>
            <div className="bg-[#1d1e26] rounded-lg p-4 border border-[#aa2a46]/30">
              <p className="text-[#fffced]/60 text-sm">Total Artist Payout</p>
              <p className="text-green-400 text-2xl font-bold">{formatCurrency(artistRevenue.summary.total_artist_payout)}</p>
            </div>
            <div className="bg-[#1d1e26] rounded-lg p-4 border border-[#aa2a46]/30">
              <p className="text-[#fffced]/60 text-sm">Platform Fees</p>
              <p className="text-[#aa2a46] text-2xl font-bold">{formatCurrency(artistRevenue.summary.total_platform_fees)}</p>
            </div>
          </div>

          {/* Revenue Split Calculator */}
          <div className="bg-[#1d1e26] rounded-lg p-6 border border-[#aa2a46]/30">
            <h3 className="text-xl font-bold text-[#fffced] mb-4">Revenue Split Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#fffced]/80 mb-2">
                  Artist Percentage: {customSplit.artistPercentage}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={customSplit.artistPercentage}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setCustomSplit({
                      artistPercentage: value,
                      platformPercentage: 100 - value
                    });
                  }}
                  className="w-full h-2 bg-[#2a2b35] rounded-lg appearance-none cursor-pointer accent-[#aa2a46]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#fffced]/80 mb-2">
                  Platform Percentage: {customSplit.platformPercentage}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={customSplit.platformPercentage}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setCustomSplit({
                      platformPercentage: value,
                      artistPercentage: 100 - value
                    });
                  }}
                  className="w-full h-2 bg-[#2a2b35] rounded-lg appearance-none cursor-pointer accent-[#aa2a46]"
                />
              </div>
            </div>
            <div className="mt-4 p-4 bg-[#2a2b35] rounded-lg">
              <p className="text-[#fffced]/60 text-sm mb-2">With custom split ({customSplit.artistPercentage}/{customSplit.platformPercentage}):</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#fffced]/80 text-xs">Artist Would Receive</p>
                  <p className="text-green-400 text-xl font-bold">
                    {formatCurrency(artistRevenue.summary.total_gross_revenue * (customSplit.artistPercentage / 100))}
                  </p>
                </div>
                <div>
                  <p className="text-[#fffced]/80 text-xs">Platform Would Receive</p>
                  <p className="text-[#aa2a46] text-xl font-bold">
                    {formatCurrency(artistRevenue.summary.total_gross_revenue * (customSplit.platformPercentage / 100))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Artist Revenue Table */}
          <div className="bg-[#1d1e26] rounded-lg p-6 border border-[#aa2a46]/30">
            <h3 className="text-xl font-bold text-[#fffced] mb-4">Artist Revenue Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#aa2a46]/30">
                    <th className="text-left py-3 px-4 text-[#fffced]/80 font-semibold">Artist</th>
                    <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Orders</th>
                    <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Items Sold</th>
                    <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Gross Revenue</th>
                    <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Stripe Fees</th>
                    <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Platform Fee</th>
                    <th className="text-right py-3 px-4 text-[#fffced]/80 font-semibold">Artist Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {artistRevenue.artists.map((artist, idx) => (
                    <tr key={idx} className="border-b border-[#aa2a46]/10 hover:bg-[#2a2b35] transition">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-[#fffced] font-semibold">{artist.artist_name}</p>
                          <p className="text-[#fffced]/60 text-xs">ID: {artist.artist_id}</p>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 text-[#fffced]">{artist.total_orders}</td>
                      <td className="text-right py-3 px-4 text-[#fffced]">
                        <div className="text-xs text-[#fffced]/60">
                          Albums: {artist.albums_sold} | Tracks: {artist.tracks_sold} | Merch: {artist.merch_sold}
                        </div>
                        <div className="font-semibold">{artist.total_items_sold}</div>
                      </td>
                      <td className="text-right py-3 px-4 text-[#fffced] font-bold">
                        {formatCurrency(artist.gross_revenue)}
                      </td>
                      <td className="text-right py-3 px-4 text-orange-400">
                        {formatCurrency(artist.stripe_fees)}
                      </td>
                      <td className="text-right py-3 px-4 text-[#aa2a46]">
                        {formatCurrency(artist.platform_fee)}
                        <div className="text-xs text-[#fffced]/60">{artist.platform_percentage}%</div>
                      </td>
                      <td className="text-right py-3 px-4 text-green-400 font-bold">
                        {formatCurrency(artist.artist_payout)}
                        <div className="text-xs text-[#fffced]/60">{artist.artist_percentage}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseStats;
