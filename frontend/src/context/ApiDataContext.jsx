import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUserLogin } from "../hooks/useUserLogin.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

const ApiDataContext = createContext();

export const useApiData = () => useContext(ApiDataContext);

export const ApiDataProvider = ({ children }) => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]);
  const [websiteSettings, setWebsiteSettings] = useState(null);
  const [error, setError] = useState(null);
  const [refreshSqlViewerTable, setRefreshSqlViewerTable] = useState(false);
  const [websiteUser, setWebsiteUser] = useState(null);
  
  const triggerRefreshSqlViewerTable = () =>
    setRefreshSqlViewerTable((prev) => !prev);

  // Mode state for admin dashboard
  const [mode, setMode] = useState("live");

  // website mode state
  const [websiteMode, setWebsiteMode] = useState();

  // Demo filter state - when true, show only demo records
  const [showDemos, setShowDemos] = useState(false);

  // Persist mode changes to localStorage
  useEffect(() => {
    localStorage.setItem("soulFeltMode", mode);
    // console.log("Mode set to:", mode);
   
  }, [mode]);

  // Check if user is signed in with Firebase and persist throughout the app
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user has admin claims
        try {
          const tokenResult = await firebaseUser.getIdTokenResult();
          const isAdmin = tokenResult.claims.admin === true;
          
          // User is signed in
          setWebsiteUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isAdmin: isAdmin,
          });
          // console.log("User is signed in:", firebaseUser.email, "Admin:", isAdmin);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setWebsiteUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isAdmin: false,
          });
        }
      } else {
        // User is signed out
        setWebsiteUser(null);
        // console.log("User is signed out");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    axios
      .get(`${API_URL}/api/artists`)
      .then((res) => setArtists(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching artists:", err);
      });
    axios
      .get(`${API_URL}/api/albums`)
      .then((res) => setAlbums(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching albums:", err);
      });
    axios
      .get(`${API_URL}/api/tracks`)
      .then((res) => setTracks(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching tracks:", err);
      });
    axios
      .get(`${API_URL}/api/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching users:", err);
      });
    axios
      .get(`${API_URL}/api/settings/public`)
      .then((res) => setWebsiteSettings(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching users:", err);
      });
  }, []);

  //admin data fetch
  // Admin related state
  const [dbSnapshot, setDbSnapshot] = useState(null);
  const { user } = useUserLogin();

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        let config = {};
        if (user && user.getIdToken) {
          const token = await user.getIdToken();
          config.headers = { Authorization: `Bearer ${token}` };
        }
        const res = await axios.get(
          `${API_URL}/api/admin/tables-with-fields-records`,
          config
        );
        setDbSnapshot(res.data);
        // console.log("DB Snapshot:", res.data);
      } catch (err) {
        console.error("Error fetching DB snapshot:", err);
      }
    }
    fetchAdminData();
  }, [refreshSqlViewerTable, user]);

  return (
     <ApiDataContext.Provider
      value={{
        artists,
        albums,
        tracks,
        users,
        error,
        dbSnapshot,
        setDbSnapshot,
        mode,
        setMode,
        refreshSqlViewerTable,
        triggerRefreshSqlViewerTable,
        websiteUser,
        setWebsiteUser,
        websiteSettings,
        showDemos,
        setShowDemos,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
