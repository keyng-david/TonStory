import React, { useState, useEffect, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { SDKProvider, useMiniApp } from '@tma.js/sdk-react';
import eruda from 'eruda';
import { StateProvider } from "./utils/store";

eruda.init();

interface CustomDisplayGateProps {
  children: ReactNode;
  loading: ReactNode;
  error: (error: unknown) => ReactNode;
  initial: ReactNode;
}

function CustomDisplayGate({ children, loading, error, initial }: CustomDisplayGateProps) {
  const [status, setStatus] = useState<"initial" | "loading" | "ready" | "error">("initial");
  const [errorMessage, setErrorMessage] = useState<unknown>(null);
  const miniApp = useMiniApp();

  useEffect(() => {
    setStatus("loading");
    try {
      miniApp.ready();
      setStatus("ready");
    } catch (err) {
      setErrorMessage(err);
      setStatus("error");
    }
  }, [miniApp]);

  if (status === "initial") return <>{initial}</>;
  if (status === "loading") return <>{loading}</>;
  if (status === "error") return <>{error(errorMessage)}</>;
  return <>{children}</>;
}

function SDKProviderError({ error }: { error: unknown }): ReactNode {
  return (
    <div>
      Oops. Something went wrong.
      <blockquote>
        <code>{error instanceof Error ? error.message : JSON.stringify(error)}</code>
      </blockquote>
    </div>
  );
}

function SDKProviderLoading(): ReactNode {
  return <div>SDK is loading.</div>;
}

function SDKInitialState(): ReactNode {
  return <div>Waiting for initialization to start.</div>;
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <SDKProvider>
    <CustomDisplayGate
      error={SDKProviderError}
      loading={SDKProviderLoading}
      initial={SDKInitialState}
    >
      <StateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </CustomDisplayGate>
  </SDKProvider>
);