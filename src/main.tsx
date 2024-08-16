import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { SDKProvider } from '@tma.js/sdk-react';
import eruda from 'eruda';
import { StateProvider } from "./utils/store";
import { ErrorBoundary } from './components/ErrorBoundary';
import { lazyInitSDK } from './utils/sdkUtils'; // Lazy load or modularized SDK init

// Initialize eruda only in development mode
if (process.env.NODE_ENV === 'development') {
  eruda.init();
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ErrorBoundary fallback={<div>Oops! Something went wrong.</div>}>
    <Suspense fallback={<div>Loading...</div>}>
      <SDKProvider>
        <StateProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StateProvider>
      </SDKProvider>
    </Suspense>
  </ErrorBoundary>
);