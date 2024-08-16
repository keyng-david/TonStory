// Moving debugMessage to global context or StateProvider for consistency
import React, { Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { SDKProvider } from '@tma.js/sdk-react';
import { StateProvider } from "./utils/store";
import App from "./App/"


const container = document.getElementById("root");
const root = createRoot(container!);

function DebugMessageDisplay() {
  const { debugMessage } = useGlobalState();
  return <div style={{ color: 'red', fontWeight: 'bold', position: 'fixed', top: 0, left: 0 }}>{debugMessage}</div>;
}

root.render(
  <div>
    <DebugMessageDisplay />
    <SDKProvider>
      <StateProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </BrowserRouter>
      </StateProvider>
    </SDKProvider>
  </div>
);