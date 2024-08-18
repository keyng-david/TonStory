import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Game from "./pages.tsx/Game";
import Shop from "./pages.tsx/Shop";
import Share from "./pages.tsx/Share";
import Scoreboard from "./pages.tsx/Scoreboard";

function App() {
  const [localDebugMessage, setLocalDebugMessage] = useState("App initializing...");

  useEffect(() => {
    console.log('App is rendering...');
    setLocalDebugMessage("App is rendering...");
    loadUser();
  }, []);

  async function loadUser() {
    try {
      console.log('loadUser function called');
      setLocalDebugMessage("loadUser function called");
      // Skipping the API call
      const data = { user: 'Test User' }; // Mock data
      console.log('User data loaded:', data);
      setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error("Error in loadUser function", error);
      const errorMessage = `Error in loadUser function: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
    }
  }

  return (
    <div>
      <h1>Debug Info: {localDebugMessage}</h1>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/share" element={<Share />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;