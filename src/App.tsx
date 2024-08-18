import { useContext, useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Game from "./pages.tsx/Game";
import Shop from "./pages.tsx/Shop";
import Share from "./pages.tsx/Share";
import { useMiniApp } from '@tma.js/sdk-react';
// import { loadUserData } from "./api"; // Temporarily commenting out this line
import Scoreboard from "./pages.tsx/Scoreboard";
import { store } from "./utils/store";

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default function App() {
  const [localDebugMessage, setLocalDebugMessage] = useState("App initializing...");
  const miniApp = useMiniApp();
  const { dispatch, setGlobalDebugMessage } = useContext(store);

  useEffect(() => {
    console.log('App is rendering...');
    setLocalDebugMessage("App is rendering...");
    setGlobalDebugMessage("App is rendering...");
    // Commenting out loadUser() to bypass user loading for debugging
    // loadUser();
    miniApp.ready();
    console.log('MiniApp is ready');
    setLocalDebugMessage("MiniApp is ready");
    setGlobalDebugMessage("MiniApp is ready");
  }, []);

  // Temporarily comment out the loadUser function for debugging
  /*
  async function loadUser() {
    try {
      console.log('Loading user data...');
      setLocalDebugMessage("Loading user data...");
      setGlobalDebugMessage("Loading user data...");
      const { data } = await loadUserData();
      console.log('User data loaded:', data);
      setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      setGlobalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      dispatch({ type: 'SET_USER', payload: data });
      miniApp.ready();
      console.log('MiniApp is ready');
      setLocalDebugMessage("MiniApp is ready");
      setGlobalDebugMessage("MiniApp is ready");
    } catch (error) {
      console.error("Error loading user data", error);
      const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
      setGlobalDebugMessage(errorMessage);
    }
  }
  */

  return (
    <ErrorBoundary>
      <div>
        <p style={{ color: 'red' }}>{localDebugMessage}</p> {/* Display debug message on the screen */}
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/share" element={<Share />} />
        </Routes>
        <Navbar />
      </div>
    </ErrorBoundary>
  );
}