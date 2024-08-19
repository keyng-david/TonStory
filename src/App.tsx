import { useContext, useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
// import Game from "./pages.tsx/Game";
// import Shop from "./pages.tsx/Shop";
// import Share from "./pages.tsx/Share";
import { useMiniApp } from '@tma.js/sdk-react';
import { loadUserDataDebug, getScoreboardDebug, updatePointsDebug } from "./api";
// import Scoreboard from "./pages.tsx/Scoreboard";
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
    setLocalDebugMessage("App is rendering...");
    setGlobalDebugMessage("App is rendering...");
    loadUser();
  }, []);

  async function loadUser() {
    try {
      setLocalDebugMessage("Loading user data...");
      setGlobalDebugMessage("Loading user data...");
      const data = await loadUserDataDebug(setLocalDebugMessage);
      setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      setGlobalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      dispatch({ type: 'SET_USER', payload: data });
      miniApp.ready();
      setLocalDebugMessage("MiniApp is ready");
      setGlobalDebugMessage("MiniApp is ready");
    } catch (error) {
      const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
      setGlobalDebugMessage(errorMessage);
    }
  }

  return (
    <ErrorBoundary>
      <div>
        <Routes>
          {/* Test Game Route */}
          {/* <Route path="/" element={<Game />} /> */}

          {/* Test Shop Route */}
          {/* <Route path="/" element={<Shop />} /> */}

          {/* Test Share Route */}
          {/* <Route path="/" element={<Share />} /> */}

          {/* Test Scoreboard Route */}
          {/* <Route path="/" element={<Scoreboard />} /> */}
        </Routes>
        <Navbar />
        <div>{localDebugMessage}</div> {/* Display the debug message on the screen */}
      </div>
    </ErrorBoundary>
  );
}