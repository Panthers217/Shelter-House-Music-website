import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";

// Custom hook to manage user login state and inactivity logout
export function useUserLogin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

  // Axios interceptor for refreshing token globally
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (config) => {
      if (user && user.getIdToken && config.url && config.url.startsWith("/api")) {
        const token = await user.getIdToken(true);
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, [user]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        startInactivityTimer();
      } else {
        clearInactivityTimer();
      }
    });

    // Log out user when window/tab is closed
    const handleWindowClose = () => {
      if (auth.currentUser) {
        signOut(auth);
      }
    };
    // window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleWindowClose);
      clearInactivityTimer();
    };
    // eslint-disable-next-line
  }, []);

  // Start inactivity timer
  function startInactivityTimer() {
    clearInactivityTimer();
    timerRef.current = setTimeout(() => {
      const auth = getAuth(app);
      signOut(auth);
      alert('You have been logged out due to inactivity.');
    }, INACTIVITY_LIMIT);
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('scroll', resetInactivityTimer);
    window.addEventListener('touchstart', resetInactivityTimer);
  }

  // Reset inactivity timer on activity
  function resetInactivityTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      const auth = getAuth(app);
      signOut(auth);
      alert('You have been logged out due to inactivity.');
    }, INACTIVITY_LIMIT);
  }

  // Clear timer and listeners
  function clearInactivityTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    window.removeEventListener('mousemove', resetInactivityTimer);
    window.removeEventListener('keydown', resetInactivityTimer);
    window.removeEventListener('click', resetInactivityTimer);
    window.removeEventListener('scroll', resetInactivityTimer);
    window.removeEventListener('touchstart', resetInactivityTimer);
  }

  // Return user and loading state
  return { user, loading };
}


 