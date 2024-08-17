import { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugMessage, setDebugMessage] = useState<string>("Initializing App...");

  useEffect(() => {
    setDebugMessage('App is initializing...');
    console.log('App is initializing...'); // Initial debug message

    async function loadUser() {
      setDebugMessage('Inside loadUser function...');
      console.log('Inside loadUser function...');

      try {
        setDebugMessage('Loading user data...');
        console.log('Loading user data...');

        // Mock the API call for testing
        const data = { username: "testUser", points: 1000 }; // Mock data
        
        // Uncomment the actual API call
        // const { data } = await loadUserData();

        if (!data) {
          throw new Error("No data received from the API");
        }

        setDebugMessage('User data loaded successfully.');
        console.log('User data loaded:', data);
        setUserData(data);
      } catch (error: any) {
        const errorMsg = error.message || "Unknown error occurred";
        setDebugMessage(`Error: ${errorMsg}`);
        console.error("Error loading user data:", errorMsg);
        setError(errorMsg);
      } finally {
        setDebugMessage('Finished loading.');
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
        <p>{debugMessage}</p> {/* Display debug message */}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{debugMessage}</p> {/* Display debug message */}
        <p>{error}</p> {/* Display actual error message */}
      </div>
    );
  }

  return (
    <div>
      <h1>User Data Loaded Successfully</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <p>{debugMessage}</p> {/* Display final debug message */}
    </div>
  );
}