import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import ZoomFit from './ZoomFit.jsx';

const Login = () => {
	const [form, setForm] = useState({ email: '', password: '' });
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
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

	return (
		<ZoomFit>
		<section className="w-full min-h-screen bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal  flex flex-col items-center justify-center py-10 px-4">
			<div className="w-full max-w-md bg-shelter-slate rounded-lg shadow-lg p-8 flex flex-col gap-6 ring-1 ring-shelter-honey/20">
				<h2 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-3xl md:text-4xl font-bold font-['Roboto'] mb-2 text-center">Login</h2>
				
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
			</div>
		</section>
		</ZoomFit>
	);
};

export default Login;
