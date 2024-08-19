import { useEffect, useState } from "react";

export default function App() {
  const [debugMessage, setDebugMessage] = useState("App initializing...");

  useEffect(() => {
    setDebugMessage("App useEffect triggered...");
    console.log("Debug: useEffect executed");  // Console log for server-side debugging

    // Simulate user data loading
    try {
      setDebugMessage("Simulating user data loading...");
      console.log("Debug: Simulating user data loading...");
      
      // Simulate success
      setDebugMessage("User data loaded successfully.");
      console.log("Debug: User data loaded successfully.");
    } catch (err) {
      const errorMessage = `Error in simulation: ${err instanceof Error ? err.message : JSON.stringify(err)}`;
      setDebugMessage(errorMessage);
      console.error(errorMessage);
    }
  }, []);

  return (
    <div>
      <h2>{debugMessage}</h2>
    </div>
  );
}