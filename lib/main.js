import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { SDKProvider } from '@tma.js/sdk-react';
import eruda from 'eruda';
import { StateProvider } from "./utils/store";
import LogRocket from 'logrocket';
eruda.init();
LogRocket.init('q029lf/tonstory');
const container = document.getElementById("root");
if (container) {
    try {
        const root = createRoot(container);
        root.render(_jsx(SDKProvider, { children: _jsx(StateProvider, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }) }));
    }
    catch (error) {
        console.error("Error during app rendering:", error);
        container.innerHTML = `<div style="padding: 20px; color: black; background-color: white;">
                             <h2>Rendering Error</h2>
                             <p>${error instanceof Error ? error.message : JSON.stringify(error)}</p>
                           </div>`;
    }
}
else {
    console.error("Root container not found");
}
// Intentional Error Test Code
const TestButton = () => {
    const methodDoesNotExist = () => {
        throw new Error("This is a test error");
    };
    return (_jsx("button", { onClick: () => {
            try {
                methodDoesNotExist(); // This triggers the error
            }
            catch (error) {
                LogRocket.captureException(error); // Manually capture the exception with LogRocket
                throw error; // Re-throw the error to ensure it propagates correctly
            }
        }, children: "Break the world" }));
};
export default TestButton;
//# sourceMappingURL=main.js.map