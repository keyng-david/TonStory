import React, { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { SDKProvider } from '@tma.js/sdk-react';
import eruda from 'eruda';
import { StateProvider } from "./utils/store";

eruda.init();

interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError({ error }: SDKProviderErrorProps): ReactNode {
  return (
    <div style={{ padding: "20px", color: "black", backgroundColor: "white" }}>
      <h2>Oops. Something went wrong.</h2>
      <blockquote>
        <code>
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

function SDKProviderLoading(): ReactNode {
  return <div>SDK is loading...</div>;
}

function SDKInitialState(): ReactNode {
  return <div>Waiting for initialization to start...</div>;
}

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <SDKProvider
    errorComponent={SDKProviderError}
    loadingComponent={SDKProviderLoading}
    initialStateComponent={SDKInitialState}
  >
    <StateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>
  </SDKProvider>
);