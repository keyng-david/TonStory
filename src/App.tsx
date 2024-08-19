import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
// import Game from "./pages.tsx/Game"; 
// import Shop from "./pages.tsx/Shop"; // Uncomment this line to test Shop route
import Share from "./pages.tsx/Share"; // Uncomment this line to test Share route
// import Scoreboard from "./pages.tsx/Scoreboard"; // Uncomment this line to test Scoreboard route

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  );
}

export default function App() {
  const [debugMessage, setDebugMessage] = useState("App initializing...");

  useEffect(() => {
    console.log('App is rendering...');
    setDebugMessage("App is rendering...");
  }, []);

  return (
    <ErrorBoundary>
      <div>
        <h2>{debugMessage}</h2>
        <Routes>
          {/* Test Game Route */}
          <Route path="/" element={<Share />} />

          {/* Test Shop Route */}
          {/* <Route path="/" element={<Shop />} /> */}

          {/* Test Share Route */}
          {/* <Route path="/" element={<Share />} /> */}

          {/* Test Scoreboard Route */}
          {/* <Route path="/" element={<Scoreboard />} /> */}
        </Routes>
        <Navbar />
      </div>
    </ErrorBoundary>
  );
}