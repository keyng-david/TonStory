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
    loadUser();
  }, []);

  async function loadUser() {
    try {
      console.log('Loading user data...');
      setLocalDebugMessage("Loading user data...");
      setGlobalDebugMessage("Loading user data...");

      // Call the API to load user data
      const { data } = await loadUserData();

      // Check if the data is received as expected
      if (!data) {
        throw new Error("No data received from the API");
      }

      console.log('User data loaded:', data);
      setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      setGlobalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);

      // Dispatch the data to the store
      dispatch({ type: 'SET_USER', payload: data });

      // Mark the mini app as ready
      miniApp.ready();
      console.log('MiniApp is ready');
      setLocalDebugMessage("MiniApp is ready");
      setGlobalDebugMessage("MiniApp is ready");
    } catch (error) {
      // Log the error with additional details
      console.error("Error loading user data:", error);

      // Generate a detailed error message
      const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
      setGlobalDebugMessage(errorMessage);
    }
  }

  return (
    <ErrorBoundary>
      <div>
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