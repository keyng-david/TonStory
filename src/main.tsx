import React, { Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { StateProvider } from "./utils/store";

// Conditionally import and initialize Eruda for non-production environments
if (process.env.NODE_ENV !== 'production') {
  const eruda = require('eruda');
  eruda.init();
}

// Lazy load the App component to optimize initial load time
const App = React.lazy(() => import("./App"));

// Debugging: Log SDK options and lifecycle events
useEffect(() => {
  console.log('App is loading...');
}, []);

interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError({ error }: SDKProviderErrorProps) {
  console.error('SDK Error:', error);
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
  console.log('SDK is loading...');
  return <div>SDK is loading...</div>;
}

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <SDKProvider>
    <StateProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </StateProvider>
  </SDKProvider>
);