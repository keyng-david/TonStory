import { useEffect, useState } from "react";
import { loadUserData } from "./api";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [debugMessage, setDebugMessage] = useState("App initializing...");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setDebugMessage("Loading user data...");
        const { data } = await loadUserData();
        setUserData(data);
        setDebugMessage("User data loaded successfully.");
      } catch (err) {
        const errorMessage = `Error loading user data: ${err instanceof Error ? err.message : JSON.stringify(err)}`;
        setError(errorMessage);
        setDebugMessage(errorMessage);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>{debugMessage}</h2>
      {error ? (
        <div style={{ color: 'red' }}>Error: {error}</div>
      ) : (
        <div>User Data: {userData ? JSON.stringify(userData) : "Loading..."}</div>
      )}
    </div>
  );
}