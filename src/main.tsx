import React, { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { SDKProvider } from '@tma.js/sdk-react';
import eruda from 'eruda';
import { StateProvider } from "./utils/store";

eruda.init();

// Adjust the error and loading components to ensure correct typing
interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError({ error }: SDKProviderErrorProps): ReactNode {
  return (
    <div>
      Oops. Something went wrong.
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

// Create the root element for React
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <SDKProvider>
    <StateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>
  </SDKProvider>
);