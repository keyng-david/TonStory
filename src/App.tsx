import { useEffect, useState } from "react";
import { loadUserData } from "./api";

export default function App() {
  const [userData, setUserData] = useState<any>(null);  // Allow any data type here
  const [error, setError] = useState<string | null>(null);  // Allow string or null
  const [debugMessage, setDebugMessage] = useState("App initializing...");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setDebugMessage("Loading user data...");
        const { data } = await loadUserData();
        setUserData(data);  // Assign data here
        setDebugMessage("User data loaded successfully.");
      } catch (err) {
        const errorMessage = `Error loading user data: ${err instanceof Error ? err.message : JSON.stringify(err)}`;
        setError(errorMessage);  // Handle error string here
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