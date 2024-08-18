import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { SDKProvider } from '@tma.js/sdk-react';
import eruda from 'eruda';
import { StateProvider } from "./utils/store";
import './sentryConfig'; // Import Sentry configuration to initialize it

eruda.init();

const container = document.getElementById("root");

if (container) {
  try {
    const root = createRoot(container);

    root.render(
      <SDKProvider>
        <StateProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StateProvider>
      </SDKProvider>
    );
  } catch (error) {
    console.error("Error during app rendering:", error);
    container.innerHTML = `<div style="padding: 20px; color: black; background-color: white;">
                             <h2>Rendering Error</h2>
                             <p>${error instanceof Error ? error.message : JSON.stringify(error)}</p>
                           </div>`;
  }
} else {
  console.error("Root container not found");
}