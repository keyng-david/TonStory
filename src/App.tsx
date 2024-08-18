import { useEffect, useState } from "react";

function App() {
  const [localDebugMessage, setLocalDebugMessage] = useState("App initializing...");

  useEffect(() => {
    console.log('App is rendering...');
    setLocalDebugMessage("App is rendering...");
  }, []);

  return (
    <div>
      <h1>Debug Info: {localDebugMessage}</h1>
      <h2>Game Component Placeholder</h2>
    </div>
  );
}

export default App;