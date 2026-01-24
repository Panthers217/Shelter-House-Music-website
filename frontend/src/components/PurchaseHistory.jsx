import { useEffect, useState } from 'react';
import { useApiData } from '../context/ApiDataContext';
import { useNavigate } from 'react-router-dom';

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { websiteUser } = useApiData();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!websiteUser) {
      navigate('/login');
      return;
    }

    async function fetchPurchases() {
      try {
        setLoading(true);
        // Use email to fetch purchases since backend stores user.id, not Firebase UID
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/purchase-history/user-email/${encodeURIComponent(websiteUser.email)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch purchase history');
        }

        const data = await response.json();
        setPurchases(data.purchases || []);
        setSubscriptions(data.subscriptions || []);
      } catch (err) {
        console.error('Error fetching purchases:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPurchases();
  }, [websiteUser, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleDownload = async (item) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      // Show loading state
      const button = document.activeElement;
      const originalText = button.textContent;
      button.textContent = 'Generating...';
      button.disabled = true;

      const response = await fetch(`${apiUrl}/api/downloads/generate-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemType: item.item_type,
          itemId: item.item_id,
          userEmail: websiteUser.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate download link');
      }

      const data = await response.json();

      // Handle single or multiple downloads
      if (data.downloads.length === 1) {
        // Single track - direct download
        window.open(data.downloads[0].downloadUrl, '_blank');
      } else {
        // Multiple tracks (album) - open all in new tabs with slight delay
        alert(`Opening ${data.downloads.length} tracks for download. Please allow pop-ups if prompted.`);
        data.downloads.forEach((download, index) => {
          setTimeout(() => {
            window.open(download.downloadUrl, '_blank');
          }, index * 500); // 500ms delay between each
        });
      }

      // Restore button
      button.textContent = originalText;
      button.disabled = false;

    } catch (error) {
      console.error('Download error:', error);
      alert(`Download failed: ${error.message}`);
      
      // Restore button on error
      const button = document.activeElement;
      if (button) {
        button.textContent = 'Download';
        button.disabled = false;
      }
    }
  };

  const handleDownloadAsZip = async (item) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      // Show loading state
      const button = document.activeElement;
      const originalText = button.textContent;
      button.textContent = 'Creating ZIP...';
      button.disabled = true;

      const response = await fetch(`${apiUrl}/api/downloads/generate-album-zip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          albumId: item.item_id,
          userEmail: websiteUser.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate ZIP file');
      }

      const data = await response.json();

      // Open ZIP download
      alert(`ZIP file ready! Contains ${data.trackCount} tracks. File will download shortly.`);
      window.open(data.downloadUrl, '_blank');

      // Restore button
      button.textContent = originalText;
      button.disabled = false;

    } catch (error) {
      console.error('ZIP download error:', error);
      alert(`ZIP creation failed: ${error.message}`);
      
      // Restore button on error
      const button = document.activeElement;
      if (button) {
        button.textContent = 'Download as ZIP';
        button.disabled = false;
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#aa2a46] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading purchase history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase History</h1>
          <p className="text-gray-600">
            View all your orders and download purchased items
          </p>
        </div>

        {/* Empty State */}
        {purchases.length === 0 && subscriptions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No purchases yet</h3>
            <p className="mt-2 text-gray-500">
              Start exploring our music collection to make your first purchase!
            </p>
            <button
              onClick={() => navigate('/artists')}
              className="mt-6 bg-[#aa2a46] text-white px-6 py-3 rounded-lg hover:bg-[#8a1f36] transition-colors"
            >
              Browse Artists
            </button>
          </div>
        ) : (
          /* Purchase List */
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <div
                key={purchase.purchase_id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{purchase.order_id}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(purchase.purchased_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          purchase.payment_status
                        )}`}
                      >
                        {purchase.payment_status.toUpperCase()}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ${parseFloat(purchase.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Items Purchased:</h4>
                  <div className="space-y-3">
                    {purchase.items.map((item) => (
                      <div
                        key={item.order_item_id}
                        className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex gap-3 flex-1">
                          {/* Item Image */}
                          {item.item_image_url && (
                            <img
                              src={item.item_image_url}
                              alt={item.item_title}
                              className="w-16 h-16 object-cover rounded"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                {item.item_title}
                              </span>
                              <span className="px-2 py-0.5 bg-[#aa2a46] text-white text-xs rounded">
                                {item.item_type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              by {item.artist_name || 'Unknown Artist'}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-500 mt-1">
                                Quantity: {item.quantity}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm font-semibold text-gray-900">
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                          {item.item_type === 'Digital Album' || item.item_type === 'Track' ? (
                            <div className="mt-2 flex flex-col gap-1">
                              <button
                                onClick={() => handleDownload(item)}
                                className="text-xs text-[#aa2a46] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Download Tracks
                              </button>
                              {/* {item.item_type === 'Digital Album' && (
                                <button
                                  onClick={() => handleDownloadAsZip(item)}
                                  className="text-xs text-[#aa2a46] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Download as ZIP
                                </button>
                              )} */}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>Payment ID: {purchase.stripe_payment_intent_id}</p>
                    {purchase.customer_email && (
                      <p className="mt-1">Email: {purchase.customer_email}</p>
                    )}
                  </div>
                  {/* <button
                    onClick={() => {
                      // TODO: Implement order details view
                      navigate(`/order/${purchase.order_id}`);
                    }}
                    className="text-sm text-[#aa2a46] hover:text-[#8a1f36] font-medium"
                  >
                    View Details →
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recurring Subscriptions Section */}
        {subscriptions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Monthly Ministry Support</h2>
            <div className="space-y-4">
              {subscriptions.map((subscription) => {
                const isActive = subscription.status === 'active';
                const isCancelled = subscription.status === 'canceled' || subscription.cancelled_at;
                
                return (
                  <div
                    key={subscription.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="px-6 py-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#aa2a46]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            Monthly Donation
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Started {formatDate(subscription.created_at)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                isActive
                                  ? 'text-green-600 bg-green-100'
                                  : isCancelled
                                  ? 'text-gray-600 bg-gray-100'
                                  : 'text-yellow-600 bg-yellow-100'
                              }`}
                            >
                              {subscription.status.toUpperCase()}
                            </span>
                            <span className="text-xl font-bold text-gray-900">
                              ${parseFloat(subscription.amount).toFixed(2)}/mo
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Subscription Details */}
                      <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Subscription ID:</p>
                          <p className="font-mono text-xs text-gray-900 mt-1">
                            {subscription.stripe_subscription_id}
                          </p>
                        </div>
                        {isActive && subscription.next_billing_date && (
                          <div>
                            <p className="text-gray-600">Next Billing Date:</p>
                            <p className="font-medium text-gray-900 mt-1">
                              {formatDate(subscription.next_billing_date)}
                            </p>
                          </div>
                        )}
                        {isCancelled && subscription.cancelled_at && (
                          <div>
                            <p className="text-gray-600">Cancelled On:</p>
                            <p className="font-medium text-gray-900 mt-1">
                              {formatDate(subscription.cancelled_at)}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Manage Subscription Link */}
                      {isActive && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <button
                            onClick={() => navigate('/manage-subscriptions')}
                            className="text-sm text-[#aa2a46] hover:text-[#8a1f36] font-medium flex items-center gap-1"
                          >
                            Manage Subscription
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {(purchases.length > 0 || subscriptions.length > 0) && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-[#aa2a46]">{purchases.length}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-[#aa2a46]">
                  {purchases.reduce((sum, p) => sum + p.items.length, 0)}
                </p>
                <p className="text-sm text-gray-600">Items Purchased</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-[#aa2a46]">
                  $
                  {purchases
                    .reduce((sum, p) => sum + parseFloat(p.amount), 0)
                    .toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-[#aa2a46]">
                  {subscriptions.filter(s => s.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
