import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApiData } from '../context/ApiDataContext';
import { auth } from '../firebase';
import DeleteAccountModal from '../components/modal/DeleteAccountModal';
import ZoomFit from '../components/ZoomFit';
import toast from 'react-hot-toast';

/**
 * UserSettings Component
 * 
 * User account settings and profile management
 * Features:
 * - View account information
 * - Update email/password redirect
 * - Newsletter preferences
 * - Account deletion (with safeguards)
 */
export default function UserSettings() {
  const navigate = useNavigate();
  const { websiteUser } = useApiData();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!websiteUser) {
      navigate('/login');
      return;
    }

    fetchUserDetails();
  }, [websiteUser, navigate]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const token = await auth.currentUser.getIdToken();
      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/user/profile`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        toast.error('Failed to load user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Error loading user details');
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterToggle = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const newValue = !userDetails.newsletter_subscribed;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/user/newsletter-preference`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            subscribe_to_newsletter: newValue
          })
        }
      );

      if (response.ok) {
        setUserDetails(prev => ({
          ...prev,
          newsletter_subscribed: newValue
        }));
        toast.success(newValue ? 'Subscribed to newsletter' : 'Unsubscribed from newsletter');
      } else {
        toast.error('Failed to update newsletter preference');
      }
    } catch (error) {
      console.error('Error updating newsletter preference:', error);
      toast.error('Error updating preference');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-shelter-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-shelter-honey mx-auto mb-4"></div>
          <p className="text-shelter-gray">Loading your settings...</p>
        </div>
      </div>
    );
  }

  return (
    <ZoomFit>
      <div className="min-h-screen bg-shelter-charcoal py-12 px-4 pt-[10%]">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-shelter-white mb-2">
              Account Settings
            </h1>
            <p className="text-shelter-gray">
              Manage your account preferences and security settings
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-shelter-slate pb-4 overflow-x-auto">
            {[
              { id: 'account', label: 'Account Info', icon: 'i-lucide-user' },
              { id: 'security', label: 'Security', icon: 'i-lucide-shield' },
              { id: 'preferences', label: 'Preferences', icon: 'i-lucide-settings' },
              { id: 'danger', label: 'Danger Zone', icon: 'i-lucide-alert-triangle' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-shelter-honey text-shelter-charcoal'
                    : 'bg-shelter-slate text-shelter-gray hover:bg-shelter-slate/80 hover:text-shelter-white'
                }`}
              >
                <span className={tab.icon}></span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-shelter-slate rounded-xl p-8 shadow-lg border border-shelter-slate">
            
            {/* Account Info Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-shelter-white mb-4 flex items-center gap-2">
                  <span className="i-lucide-user text-shelter-honey"></span>
                  Your Account Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-shelter-charcoal rounded-lg border border-shelter-honey/20">
                    <label className="text-shelter-gray text-sm block mb-1">Username</label>
                    <p className="text-shelter-white font-semibold">{userDetails?.username || 'N/A'}</p>
                  </div>

                  <div className="p-4 bg-shelter-charcoal rounded-lg border border-shelter-honey/20">
                    <label className="text-shelter-gray text-sm block mb-1">Email</label>
                    <p className="text-shelter-white font-semibold">{websiteUser?.email || 'N/A'}</p>
                  </div>

                  <div className="p-4 bg-shelter-charcoal rounded-lg border border-shelter-honey/20">
                    <label className="text-shelter-gray text-sm block mb-1">First Name</label>
                    <p className="text-shelter-white font-semibold">{userDetails?.first_name || 'N/A'}</p>
                  </div>

                  <div className="p-4 bg-shelter-charcoal rounded-lg border border-shelter-honey/20">
                    <label className="text-shelter-gray text-sm block mb-1">Last Name</label>
                    <p className="text-shelter-white font-semibold">{userDetails?.last_name || 'N/A'}</p>
                  </div>

                  <div className="p-4 bg-shelter-charcoal rounded-lg border border-shelter-honey/20">
                    <label className="text-shelter-gray text-sm block mb-1">Member Since</label>
                    <p className="text-shelter-white font-semibold">
                      {userDetails?.created_at ? new Date(userDetails.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>

                  <div className="p-4 bg-shelter-charcoal rounded-lg border border-shelter-honey/20">
                    <label className="text-shelter-gray text-sm block mb-1">Last Login</label>
                    <p className="text-shelter-white font-semibold">
                      {userDetails?.last_login ? new Date(userDetails.last_login).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => navigate('/purchase-history')}
                    className="px-6 py-3 bg-shelter-honey text-shelter-charcoal rounded-lg font-semibold hover:bg-shelter-amber transition flex items-center gap-2"
                  >
                    <span className="i-lucide-receipt"></span>
                    View Purchase History
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-shelter-white mb-4 flex items-center gap-2">
                  <span className="i-lucide-shield text-shelter-honey"></span>
                  Security Settings
                </h2>

                <div className="bg-shelter-charcoal rounded-lg p-6 border border-shelter-honey/20">
                  <h3 className="text-shelter-white font-semibold mb-2 flex items-center gap-2">
                    <span className="i-lucide-key"></span>
                    Password
                  </h3>
                  <p className="text-shelter-gray text-sm mb-4">
                    Your password is managed through Firebase Authentication for enhanced security.
                  </p>
                  <a
                    href="https://accounts.google.com/signin/v2/identifier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-shelter-honey text-shelter-charcoal rounded-lg font-semibold hover:bg-shelter-amber transition"
                  >
                    Update Password via Firebase
                  </a>
                </div>

                <div className="bg-shelter-charcoal rounded-lg p-6 border border-shelter-honey/20">
                  <h3 className="text-shelter-white font-semibold mb-2 flex items-center gap-2">
                    <span className="i-lucide-mail"></span>
                    Email Verification
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`i-lucide-${websiteUser?.emailVerified ? 'check-circle' : 'x-circle'} ${websiteUser?.emailVerified ? 'text-shelter-olive' : 'text-red-500'}`}></span>
                    <p className="text-shelter-gray text-sm">
                      {websiteUser?.emailVerified ? 'Email verified' : 'Email not verified'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-shelter-white mb-4 flex items-center gap-2">
                  <span className="i-lucide-settings text-shelter-honey"></span>
                  Your Preferences
                </h2>

                <div className="bg-shelter-charcoal rounded-lg p-6 border border-shelter-honey/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-shelter-white font-semibold mb-1 flex items-center gap-2">
                        <span className="i-lucide-mail"></span>
                        Newsletter Subscription
                      </h3>
                      <p className="text-shelter-gray text-sm">
                        Receive updates about new music, artists, and special offers
                      </p>
                    </div>
                    <button
                      onClick={handleNewsletterToggle}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                        userDetails?.newsletter_subscribed ? 'bg-shelter-honey' : 'bg-shelter-gray'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition ${
                          userDetails?.newsletter_subscribed ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="bg-shelter-charcoal rounded-lg p-6 border border-shelter-honey/20">
                  <h3 className="text-shelter-white font-semibold mb-2 flex items-center gap-2">
                    <span className="i-lucide-info"></span>
                    Account Status
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-shelter-gray">Email Verified:</span>
                      <span className={websiteUser?.emailVerified ? 'text-shelter-olive' : 'text-red-500'}>
                        {websiteUser?.emailVerified ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-shelter-gray">Account Active:</span>
                      <span className="text-shelter-olive">Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-shelter-white mb-4 flex items-center gap-2">
                  <span className="i-lucide-alert-triangle text-red-500"></span>
                  Danger Zone
                </h2>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                  <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                    <span className="i-lucide-trash-2"></span>
                    Delete Account
                  </h3>
                  <p className="text-shelter-gray text-sm mb-4">
                    Once you delete your account, there is no going back (after 30 days). 
                    Please be certain before proceeding.
                  </p>

                  <div className="bg-shelter-charcoal rounded-lg p-4 mb-4 border border-red-500/20">
                    <h4 className="text-shelter-white font-semibold mb-2 text-sm">What happens when you delete your account:</h4>
                    <ul className="space-y-2 text-sm text-shelter-gray">
                      <li className="flex items-start gap-2">
                        <span className="i-lucide-clock text-shelter-honey mt-1"></span>
                        <span><strong>30-day grace period:</strong> Your account will be scheduled for deletion. You can cancel by logging in during this time.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="i-lucide-x text-red-500 mt-1"></span>
                        <span><strong>Profile data removed:</strong> Your name, email, and personal information will be deleted.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="i-lucide-check text-shelter-olive mt-1"></span>
                        <span><strong>Purchase records retained:</strong> Transaction history kept for legal/tax compliance (anonymized).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="i-lucide-mail text-shelter-honey mt-1"></span>
                        <span><strong>Email confirmation:</strong> You'll receive an email with instructions to cancel if needed.</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
                  >
                    <span className="i-lucide-alert-triangle"></span>
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-shelter-slate text-shelter-white rounded-lg font-semibold hover:bg-shelter-slate/80 transition flex items-center gap-2"
            >
              <span className="i-lucide-arrow-left"></span>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        user={websiteUser}
      />
    </ZoomFit>
  );
}
