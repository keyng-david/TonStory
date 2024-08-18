import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Game from "./pages.tsx/Game";
import Shop from "./pages.tsx/Shop";
import Share from "./pages.tsx/Share";
import Scoreboard from "./pages.tsx/Scoreboard";

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default function App() {
  const [localDebugMessage, setLocalDebugMessage] = useState("App initializing...");

  useEffect(() => {
    console.log('App is rendering...');
    setLocalDebugMessage("App is rendering...");
  }, []);

  return (
    <ErrorBoundary>
      <div>
        <div>
          <h1>Debug Info: {localDebugMessage}</h1>
        </div>
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