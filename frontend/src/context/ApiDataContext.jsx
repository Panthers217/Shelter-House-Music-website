import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
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

  const isDemoRecord = (record) => {
    if (!record || typeof record !== "object") {
      return false;
    }
    const demoValue = record.demos;
    return demoValue === true || demoValue === 1 || demoValue === "1";
  };

  const filterDemoRecords = (data) => {
    if (Array.isArray(data)) {
      return data.filter((record) => !isDemoRecord(record));
    }
    if (isDemoRecord(data)) {
      return null;
    }
    return data;
  };

  const filterDemoSnapshot = (snapshot) => {
    if (!snapshot || typeof snapshot !== "object") {
      return snapshot;
    }
    return Object.fromEntries(
      Object.entries(snapshot).map(([tableName, tableData]) => {
        if (!tableData || typeof tableData !== "object") {
          return [tableName, tableData];
        }
        const fields = Array.isArray(tableData.fields)
          ? tableData.fields
          : [];
        const records = Array.isArray(tableData.records)
          ? tableData.records
          : null;
        const hasDemosField = fields.includes("demos");
        const filteredRecords =
          records && hasDemosField
            ? records.filter((record) => !isDemoRecord(record))
            : records;
        return [
          tableName,
          {
            ...tableData,
            records: filteredRecords,
          },
        ];
      })
    );
  };
  
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
      .then((res) => setArtists(filterDemoRecords(res.data) || []))
      .catch((err) => {
        setError(err);
        console.error("Error fetching artists:", err);
      });
    axios
      .get(`${API_URL}/api/albums`)
      .then((res) => setAlbums(filterDemoRecords(res.data) || []))
      .catch((err) => {
        setError(err);
        console.error("Error fetching albums:", err);
      });
    axios
      .get(`${API_URL}/api/tracks`)
      .then((res) => setTracks(filterDemoRecords(res.data) || []))
      .catch((err) => {
        setError(err);
        console.error("Error fetching tracks:", err);
      });
    axios
      .get(`${API_URL}/api/settings/public`)
      .then((res) => setWebsiteSettings(filterDemoRecords(res.data)))
      .catch((err) => {
        setError(err);
        console.error("Error fetching settings:", err);
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
        setDbSnapshot(filterDemoSnapshot(res.data));
        // console.log("DB Snapshot:", res.data);
      } catch (err) {
        console.error("Error fetching DB snapshot:", err);
      }
    }
    fetchAdminData();
  }, [refreshSqlViewerTable, user]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
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
    }),
    [
      artists,
      albums,
      tracks,
      users,
      error,
      dbSnapshot,
      mode,
      refreshSqlViewerTable,
      websiteUser,
      websiteSettings,
      showDemos,
    ]
  );

  return (
    <ApiDataContext.Provider value={contextValue}>
      {children}
    </ApiDataContext.Provider>
  );
};
