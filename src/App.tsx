import { useEffect, useState } from "react";
import { loadUserData } from "./api";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('App is initializing...');

    async function loadUser() {
      try {
        console.log('Loading user data...');
        const { data } = await loadUserData();

        if (!data) {
          throw new Error("No data received from the API");
        }

        console.log('User data loaded:', data);
        setUserData(data);
      } catch (error: any) {
        console.error("Error loading user data:", error.message || error);
        setError(error.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Data Loaded Successfully</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}