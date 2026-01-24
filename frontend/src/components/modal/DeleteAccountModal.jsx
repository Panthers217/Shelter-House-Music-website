import React, { useState } from 'react';
import { signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '../../firebase';

/**
 * DeleteAccountModal Component
 * 
 * Multi-step confirmation modal for account deletion
 * Includes:
 * - Warning about consequences
 * - Password re-authentication
 * - Grace period notification
 * - Final confirmation
 */
export default function DeleteAccountModal({ show, onClose, user }) {
  const [step, setStep] = useState(1); // 1: Warning,  2: Password, 3: Final Confirm
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!show) return null;

  const resetModal = () => {
    setStep(1);
    setPassword('');
    setConfirmText('');
    setError('');
    setAcceptedTerms(false);
    setLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handlePasswordVerification = async () => {
    setError('');
    setLoading(true);

    try {
      // Re-authenticate user with password
      await signInWithEmailAndPassword(auth, user.email, password);
      setStep(3); // Move to final confirmation
    } catch (err) {
      console.error('Password verification error:', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFinalDeletion = async () => {
    if (confirmText.toLowerCase() !== 'delete my account') {
      setError('Please type "DELETE MY ACCOUNT" exactly to confirm.');
      return;
    }

    if (!acceptedTerms) {
      setError('Please acknowledge the 30-day grace period.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Get Firebase token from current authenticated user
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('Not authenticated');
      }
      
      const token = await currentUser.getIdToken();

      // Call backend API to mark account for deletion
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/delete-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: user.email,
          uid: currentUser.uid
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to request account deletion');
      }

      const data = await response.json();

      // Sign out the user
      await auth.signOut();

      // Show success message
      alert(data.message || 'Account deletion requested successfully. You have 30 days to cancel by logging back in.');

      handleClose();
      
      // Redirect to home page
      window.location.href = '/';

    } catch (err) {
      console.error('Account deletion error:', err);
      setError(err.message || 'Failed to request account deletion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-shelter-slate rounded-xl shadow-2xl max-w-lg w-full relative border border-red-600/30">
        
        {/* Step 1: Initial Warning */}
        {step === 1 && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="i-lucide-alert-triangle text-red-500 text-3xl"></span>
              <h2 className="text-2xl font-bold text-shelter-white">
                Delete Your Account?
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <span className="i-lucide-alert-circle"></span>
                  Warning: This Action Has Serious Consequences
                </h3>
                <p className="text-shelter-gray text-sm">
                  Once your account is deleted, the following will happen:
                </p>
              </div>

              <div className="space-y-3 text-shelter-white">
                <div className="flex items-start gap-3">
                  <span className="i-lucide-x text-red-500 mt-1"></span>
                  <div>
                    <p className="font-semibold">Your account will be permanently deleted</p>
                    <p className="text-sm text-shelter-gray">You will lose access to all account features</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="i-lucide-x text-red-500 mt-1"></span>
                  <div>
                    <p className="font-semibold">Personal profile data will be removed</p>
                    <p className="text-sm text-shelter-gray">Name, preferences, and saved settings will be deleted</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="i-lucide-check text-shelter-olive mt-1"></span>
                  <div>
                    <p className="font-semibold">Purchase history will be retained (anonymized)</p>
                    <p className="text-sm text-shelter-gray">Required for legal and financial compliance</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="i-lucide-clock text-shelter-honey mt-1"></span>
                  <div>
                    <p className="font-semibold">30-day grace period</p>
                    <p className="text-sm text-shelter-gray">Log back in within 30 days to cancel deletion</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-shelter-charcoal text-shelter-white rounded-lg font-semibold hover:bg-shelter-slate transition border border-shelter-gray/30"
              >
                Keep My Account
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Continue to Delete
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Password Verification */}
        {step === 2 && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="i-lucide-key text-shelter-honey text-3xl"></span>
              <h2 className="text-2xl font-bold text-shelter-white">
                Verify Your Identity
              </h2>
            </div>

            <p className="text-shelter-gray mb-6">
              Please enter your password to confirm it's really you.
            </p>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordVerification()}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-shelter-charcoal border border-shelter-honey/30 rounded-lg text-shelter-white placeholder-shelter-gray focus:outline-none focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 mb-6"
              autoFocus
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStep(1)}
                disabled={loading}
                className="px-6 py-3 bg-shelter-charcoal text-shelter-white rounded-lg font-semibold hover:bg-shelter-slate transition border border-shelter-gray/30 disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handlePasswordVerification}
                disabled={loading || !password}
                className="px-6 py-3 bg-shelter-honey text-shelter-charcoal rounded-lg font-semibold hover:bg-shelter-amber transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Password'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Final Confirmation */}
        {step === 3 && (
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="i-lucide-shield-alert text-red-500 text-3xl"></span>
              <h2 className="text-2xl font-bold text-shelter-white">
                Final Confirmation
              </h2>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-shelter-white font-semibold mb-2">
                This is your last chance to cancel!
              </p>
              <p className="text-shelter-gray text-sm">
                Type <span className="text-shelter-white font-mono font-bold">DELETE MY ACCOUNT</span> below to confirm.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type: DELETE MY ACCOUNT"
              className="w-full px-4 py-3 bg-shelter-charcoal border border-red-500/50 rounded-lg text-shelter-white placeholder-shelter-gray focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 mb-4"
            />

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-5 h-5 accent-shelter-honey"
              />
              <span className="text-shelter-gray text-sm">
                I understand that my account will be scheduled for deletion after 30 days. 
                I can cancel by logging in anytime within this period.
              </span>
            </label>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setStep(2)}
                disabled={loading}
                className="px-6 py-3 bg-shelter-charcoal text-shelter-white rounded-lg font-semibold hover:bg-shelter-slate transition border border-shelter-gray/30 disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleFinalDeletion}
                disabled={loading || confirmText.toLowerCase() !== 'delete my account' || !acceptedTerms}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="i-lucide-loader-2 animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="i-lucide-trash-2"></span>
                    Delete My Account
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 text-shelter-gray hover:text-shelter-white transition"
        >
          <span className="i-lucide-x text-2xl"></span>
        </button>
      </div>
    </div>
  );
}
