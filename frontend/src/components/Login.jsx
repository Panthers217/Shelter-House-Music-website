import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import ZoomFit from './ZoomFit.jsx';

const Login = () => {
	const [form, setForm] = useState({ email: '', password: '' });
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [showResetPassword, setShowResetPassword] = useState(false);
	const [resetEmail, setResetEmail] = useState('');
	const [resetSuccess, setResetSuccess] = useState(false);
	const [resetError, setResetError] = useState('');
	const [resetLoading, setResetLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError(''); // Clear error when user types
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			// Sign in with Firebase
			const userCredential = await signInWithEmailAndPassword(
				auth,
				form.email,
				form.password
			);
			
			const user = userCredential.user;
			
			// Check if user is an admin
			const tokenResult = await user.getIdTokenResult();
			if (tokenResult.claims.admin === true) {
				// This is an admin user - they should use /admin/login
				await auth.signOut(); // Sign them out immediately
				setError('Admin users should login via the admin portal.');
				setLoading(false);
				return;
			}
			
			// console.log('User logged in successfully:', user.uid);
			setSubmitted(true);
			
			// Redirect to home after 1 second
			setTimeout(() => {
				navigate('/');
			}, 1000);

		} catch (err) {
			console.error('Login error:', err);
			
			// Handle Firebase Auth errors
			if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
				setError('Invalid email or password.');
			} else if (err.code === 'auth/user-not-found') {
				setError('No account found with this email.');
			} else if (err.code === 'auth/invalid-email') {
				setError('Invalid email address.');
			} else if (err.code === 'auth/too-many-requests') {
				setError('Too many failed attempts. Please try again later.');
			} else {
				setError('Failed to login. Please try again.');
			}
		} finally {
			setLoading(false);
		}
	};

	const handlePasswordReset = async (e) => {
		e.preventDefault();
		setResetLoading(true);
		setResetError('');
		setResetSuccess(false);

		try {
			await sendPasswordResetEmail(auth, resetEmail);
			setResetSuccess(true);
			setResetEmail('');
			
			// Auto-close after 5 seconds
			setTimeout(() => {
				setShowResetPassword(false);
				setResetSuccess(false);
			}, 5000);
		} catch (err) {
			console.error('Password reset error:', err);
			
			if (err.code === 'auth/user-not-found') {
				setResetError('No account found with this email address.');
			} else if (err.code === 'auth/invalid-email') {
				setResetError('Invalid email address.');
			} else if (err.code === 'auth/too-many-requests') {
				setResetError('Too many requests. Please try again later.');
			} else {
				setResetError('Failed to send reset email. Please try again.');
			}
		} finally {
			setResetLoading(false);
		}
	};

	const handleShowResetPassword = () => {
		setShowResetPassword(true);
		setError('');
		setResetError('');
		setResetSuccess(false);
	};

	const handleBackToLogin = () => {
		setShowResetPassword(false);
		setResetEmail('');
		setResetError('');
		setResetSuccess(false);
	};

	return (
		<ZoomFit>
		<section className="w-full min-h-screen bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal  flex flex-col items-center justify-center py-10 px-4">
			<div className="w-full max-w-md bg-shelter-slate rounded-lg shadow-lg p-8 flex flex-col gap-6 ring-1 ring-shelter-honey/20">
				<h2 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-3xl md:text-4xl font-bold font-['Roboto'] mb-2 text-center">
					{showResetPassword ? 'Reset Password' : 'Login'}
				</h2>
				
				{/* Login Form */}
				{!showResetPassword ? (
					<>
						{error && (
							<div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
								{error}
							</div>
						)}

						<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								placeholder="Email Address"
								className="w-full px-4 py-3 rounded-md bg-shelter-charcoal text-shelter-white border border-shelter-honey/20 focus:outline-none focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 placeholder:text-shelter-gray font-medium"
								required
								disabled={loading}
							/>
							<input
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								placeholder="Password"
								className="w-full px-4 py-3 rounded-md bg-shelter-charcoal text-shelter-white border border-shelter-honey/20 focus:outline-none focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 placeholder:text-shelter-gray font-medium"
								required
								disabled={loading}
							/>
							
							{/* Forgot Password Link */}
							<div className="text-right -mt-2">
								<button
									type="button"
									onClick={handleShowResetPassword}
									className="text-shelter-honey hover:text-shelter-amber text-sm font-semibold transition-colors"
								>
									Forgot Password?
								</button>
							</div>

							<button
								type="submit"
								disabled={loading}
								className="w-full py-3 bg-shelter-honey text-shelter-charcoal rounded-md font-bold text-lg hover:bg-shelter-amber focus:ring-2 focus:ring-shelter-honey transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{loading ? 'Logging in...' : 'Login'}
							</button>
						</form>
						
						{submitted && (
							<div className="text-green-500 text-center mt-4 font-semibold">
								Login successful! Redirecting...
							</div>
						)}
						
						<div className="text-center text-shelter-gray text-sm">
							Don't have an account?{' '}
							<Link to="/sign-up" className="text-shelter-honey hover:text-shelter-amber font-semibold">
								Sign up here
							</Link>
						</div>
					</>
				) : (
					<>
						{/* Password Reset Form */}
						{resetSuccess ? (
							<div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-md text-sm">
								<p className="font-semibold mb-1">Password reset email sent!</p>
								<p className="text-xs">Check your inbox for instructions to reset your password.</p>
							</div>
						) : (
							<p className="text-shelter-gray text-sm text-center">
								Enter your email address and we'll send you a link to reset your password.
							</p>
						)}

						{resetError && (
							<div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
								{resetError}
							</div>
						)}

						<form className="flex flex-col gap-5" onSubmit={handlePasswordReset}>
							<input
								type="email"
								value={resetEmail}
								onChange={(e) => setResetEmail(e.target.value)}
								placeholder="Email Address"
								className="w-full px-4 py-3 rounded-md bg-shelter-charcoal text-shelter-white border border-shelter-honey/20 focus:outline-none focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 placeholder:text-shelter-gray font-medium"
								required
								disabled={resetLoading || resetSuccess}
							/>
							
							<div className="flex gap-3">
								<button
									type="button"
									onClick={handleBackToLogin}
									className="flex-1 py-3 bg-shelter-charcoal text-shelter-white border border-shelter-honey/20 rounded-md font-semibold hover:bg-shelter-charcoal/80 focus:ring-2 focus:ring-shelter-honey transition-colors"
								>
									Back to Login
								</button>
								<button
									type="submit"
									disabled={resetLoading || resetSuccess}
									className="flex-1 py-3 bg-shelter-honey text-shelter-charcoal rounded-md font-bold hover:bg-shelter-amber focus:ring-2 focus:ring-shelter-honey transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{resetLoading ? 'Sending...' : 'Send Reset Link'}
								</button>
							</div>
						</form>
					</>
				)}
			</div>
		</section>
		</ZoomFit>
	);
};

export default Login;
