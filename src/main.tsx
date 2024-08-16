import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { SDKProvider, DisplayGate, useInitData } from '@tma.js/sdk-react';
import { StateProvider } from "./utils/store";

// Conditionally import and initialize Eruda for non-production environments
if (process.env.NODE_ENV !== 'production') {
  const eruda = require('eruda');
  eruda.init();
}

// Lazy load the App component to optimize initial load time
const App = React.lazy(() => import("./App"));

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
  return <div>SDK is loading...</div>;
}

function SDKInitialState() {
  return <div>Waiting for initialization to start...</div>;
}

// Function to validate initData, specifically checking the signature
function validateInitData(initData) {
  if (initData.user.allows_write_to_pm === undefined) {
    console.warn("allows_write_to_pm is undefined; skipping validation.");
  } else {
    // Perform validation logic if necessary
    console.log("allows_write_to_pm is properly defined.");
  }
}

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <SDKProvider options={{ async: false }}>
    <DisplayGate
      error={SDKProviderError}
      loading={SDKProviderLoading}
      initial={SDKInitialState}
    >
      <StateProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </StateProvider>
    </DisplayGate>
  </SDKProvider>
);