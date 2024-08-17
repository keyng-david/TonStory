import * as Sentry from "@sentry/react";
import { useContext, useEffect, useState } from "react";
import { useMiniApp } from '@tma.js/sdk-react';
import { loadUserData } from "./api";
import { store } from "./utils/store";

Sentry.init({
  dsn: "https://a970ec9feab9fbda4127e454d574e89b@o4507794807717888.ingest.us.sentry.io/4507794814009344", // Replace with your actual DSN from Sentry project settings
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
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

      const data = await loadUserData();

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