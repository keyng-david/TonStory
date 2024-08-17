import { useContext, useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Game from "./pages.tsx/Game";
import Shop from "./pages.tsx/Shop";
import Share from "./pages.tsx/Share";
import { useMiniApp } from '@tma.js/sdk-react';
import { loadUserData } from "./api";
import Scoreboard from "./pages.tsx/Scoreboard";
import { store } from "./utils/store";

export default function App() {
  const [localDebugMessage, setLocalDebugMessage] = useState("App initializing...");
  const [error, setError] = useState<string | null>(null);
  const miniApp = useMiniApp();
  const { dispatch, setGlobalDebugMessage } = useContext(store);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      setLocalDebugMessage("Loading user data...");
      setGlobalDebugMessage("Loading user data...");
      const { data } = await loadUserData();
      setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      setGlobalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      dispatch({ type: 'SET_USER', payload: data });
      miniApp.ready();
      setLocalDebugMessage("MiniApp is ready");
      setGlobalDebugMessage("MiniApp is ready");
    } 
    catch (error) {
      console.error("Error loading user data", error);
      const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
      setGlobalDebugMessage(errorMessage);
      setError(errorMessage);
    } 
  }

  if (error) {
    return (
      <div style={{ color: 'black', backgroundColor: 'white', padding: '20px' }}>
        <h2>An error occurred</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/share" element={<Share />} />
      </Routes>
      <Navbar />
      {localDebugMessage && (
        <div style={{ color: 'black', backgroundColor: 'white', padding: '10px', position: 'fixed', bottom: '0', left: '0', width: '100%' }}>
          <small>{localDebugMessage}</small>
        </div>
      )}
    </div>
  );
}