import { useEffect, useState } from "react";
import { loadUserData } from "./api";

export default function App() {
  const [localDebugMessage, setLocalDebugMessage] = useState("App initializing...");
  const [userData, setUserData] = useState(null);

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
      setUserData(data);
    } catch (error) {
      console.error("Error loading user data", error);
      const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
    }
  }

  return (
    <div>
      <h1>{localDebugMessage}</h1>
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  );
}