import React, { useEffect, useState } from 'react';
import { loadUserData } from "./api";

export default function App() {
  const [localDebugMessage, setLocalDebugMessage] = useState("App initializing...");
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    console.log('App is rendering...');
    setLocalDebugMessage("App is rendering...");
    loadUser();
  }, []);

  async function loadUser() {
    try {
      console.log('Loading user data...');
      setLocalDebugMessage("Loading user data...");
      const { data } = await loadUserData();
      console.log('User data loaded:', data);
      setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      if (data && data.username) {
        setUsername(data.username);  // Assuming the user data includes a 'username' field
      }
    } catch (error) {
      console.error("Error loading user data", error);
      const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Ton Story</h1>
      <p>If you see this message, React is working correctly.</p>
      <p>{localDebugMessage}</p>
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}