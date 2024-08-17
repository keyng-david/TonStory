import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { useContext, useEffect, useState } from "react";
import { useMiniApp } from '@tma.js/sdk-react';
import { loadUserData } from "./api";
import { store } from "./utils/store";

Sentry.init({
  dsn: "https://a970ec9feab9fbda4127e454d574e89b@o4507794807717888.ingest.us.sentry.io/4507794814009344", // Replace with your actual DSN from Sentry project settings
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <Sentry.ErrorBoundary>{children}</Sentry.ErrorBoundary>;
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

      const data = await loadUserData(); // Adjusted to directly use 'data' from the API call.

      if (data) {
        console.log('User data loaded:', data);
        setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
        setGlobalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
        dispatch({ type: 'SET_USER', payload: data });
        miniApp.ready();
        console.log('MiniApp is ready');
        setLocalDebugMessage("MiniApp is ready");
        setGlobalDebugMessage("MiniApp is ready");
      } else {
        throw new Error("User data is undefined or null");
      }
    } catch (error) {
      console.error("Error loading user data", error);
      const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
      setGlobalDebugMessage(errorMessage);
    }
  }

  return (
    <ErrorBoundary>
      <div>
        <p>{localDebugMessage}</p> {/* Display local debug messages */}
      </div>
    </ErrorBoundary>
  );
}