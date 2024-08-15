import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { SDKProvider, useMiniApp } from '@tma.js/sdk-react';
import eruda from 'eruda';
import { StateProvider } from "./utils/store";

eruda.init();

interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError({ error }: SDKProviderErrorProps) {
  return (
    <div>
      Oops. Something went wrong.
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

function SDKProviderLoading() {
  return <div>SDK is loading.</div>;
}

function SDKInitialState() {
  return <div>Waiting for initialization to start.</div>;
}

function AppWrapper() {
  const miniApp = useMiniApp();

  // Log launch parameters for debugging
  console.log("Launch parameters: ", miniApp);

  if (!miniApp) {
    return <SDKProviderError error={new Error("Launch parameters missing")} />;
  }

  return (
    <StateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <SDKProvider>
    <AppWrapper />
  </SDKProvider>
);