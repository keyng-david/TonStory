import React, { Suspense } from "react";
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