
import React, { useState, useEffect } from 'react';
import { useUserLogin } from '../hooks/useUserLogin.js';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebase";
import ZoomFit from './ZoomFit.jsx';

// Admin login component with password reset functionality

export default function AdminLogin({ onLogin }) {
  const { user } = useUserLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);
  const [username, setUsername] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState(null);
  const backgroundImage = '/carlosBackgroundPic.JPG';
  
  // Handle form submission for login
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      
      // Check if user has admin claims
      const tokenResult = await userCredential.user.getIdTokenResult();
      if (tokenResult.claims.admin !== true) {
        // This is not an admin user
        await auth.signOut(); // Sign them out immediately
        setError('Access denied. This login is for administrators only. Please use /login for regular access.');
        setLoading(false);
        return;
      }
      
      onLogin && onLogin(userCredential.user);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle password reset form submission
  function handlePasswordReset(e) {
    e.preventDefault();
    setResetStatus(null);
    if (!resetEmail) {
      setResetStatus({ type: 'error', message: 'Please enter your email for password reset.' });
      return;
    }
    const auth = getAuth(app);
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setResetStatus({ type: 'success', message: 'Password reset email sent!' });
      })
      .catch(err => {
        setResetStatus({ type: 'error', message: err.message });
      });
  }

  return (
    <ZoomFit>
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(20,20,40,0.22), rgba(40,20,20,0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-md w-full p-8 bg-gray-900 bg-opacity-90 rounded-2xl shadow-lg">
        <h2 className="text-center text-white mb-6 text-2xl font-bold">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-gray-200">Username
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </label>
          <label className="text-gray-200">Password
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </label>
          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-2 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="text-red-500 mt-3 text-center font-semibold">{error}</div>}
        </form>
        <div className="text-center mt-6">
          <form onSubmit={handlePasswordReset} className="inline-block w-full">
            <input
              type="email"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              placeholder="Enter email for password reset"
              className="w-full mb-2 px-3 py-2 rounded border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button type="submit" className="w-full py-2 rounded-lg bg-sky-400 hover:bg-sky-500 text-gray-900 font-semibold mt-1 transition-colors duration-150">
              Send Password Reset Email
            </button>
          </form>
          {resetStatus && <div className={`mt-3 text-center font-semibold ${resetStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{resetStatus.message}</div>}
        </div>
      </div>
    </div>
   </ZoomFit>
  );
}
