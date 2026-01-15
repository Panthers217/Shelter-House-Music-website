import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import ZoomFit from "./ZoomFit.jsx";

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const firebaseUser = userCredential.user;

      // 2. Get Firebase ID token
      const idToken = await firebaseUser.getIdToken();

      // 3. Send user data to backend to insert into database
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          uid: firebaseUser.uid,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          username: form.email, // Generate username from email
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("User created successfully:", response.data);
      setSubmitted(true);

      // Optional: Redirect to login or home page after 2 seconds
      setTimeout(() => {
        window.location.href = "/login"; // or use React Router navigate
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      console.error("Error response:", err.response?.data);

      // Handle Firebase Auth errors
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please login instead.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.response?.data?.error) {
        // Show specific backend error
        setError(err.response.data.error);
        // console.log("Backend error:", err.response.data.error);
      } else if (err.response) {
        // Backend responded with error
        setError(
          `Server error: ${err.response.status}. ${
            err.response.data?.details || "Please try again."
          }`
        );
      } else if (err.request) {
        // Request made but no response
        setError(
          "Cannot reach server. Please check if the backend is running."
        );
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ZoomFit>
    <section className="w-full min-h-screen bg-gradient-to-br from-transparent via-shelter-slate to-shelter-charcoal  flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-md bg-shelter-slate rounded-lg shadow-lg p-8 flex flex-col gap-6 ring-1 ring-shelter-honey/20">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-shelter-honey via-shelter-amber to-shelter-white text-3xl md:text-4xl font-bold font-['Roboto'] mb-2 text-center">
          Sign Up
        </h2>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-md bg-shelter-charcoal text-shelter-white border border-shelter-honey/20 focus:outline-none focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 placeholder:text-shelter-gray font-medium"
            required
            disabled={loading}
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-md bg-shelter-charcoal text-shelter-white border border-shelter-honey/20 focus:outline-none focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 placeholder:text-shelter-gray font-medium"
            required
            disabled={loading}
          />
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
            placeholder="Password (min. 6 characters)"
            className="w-full px-4 py-3 rounded-md bg-shelter-charcoal text-shelter-white border border-shelter-honey/20 focus:outline-none focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/30 placeholder:text-shelter-gray font-medium"
            required
            minLength={6}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-shelter-honey text-shelter-charcoal rounded-md font-bold text-lg hover:bg-shelter-amber focus:ring-2 focus:ring-shelter-honey transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {submitted && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-md text-center">
            Account created successfully! Redirecting to login...
          </div>
        )}
      </div>
    </section>
    </ZoomFit>
  );
};

export default SignUp;
