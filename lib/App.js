import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { useMiniApp } from '@tma.js/sdk-react';
import { loadUserData } from "./api";
import { store } from "./utils/store";
import LogRocket from 'logrocket';
export default function App() {
    const [localDebugMessage, setLocalDebugMessage] = useState("App initializing...");
    const miniApp = useMiniApp();
    const { dispatch, setGlobalDebugMessage } = useContext(store);
    useEffect(() => {
        console.log('App is rendering...');
        setLocalDebugMessage("App is rendering...");
        setGlobalDebugMessage("App is rendering...");
        loadUser();
    }, []);
    async function loadUser() {
        try {
            console.log('Loading user data...');
            setLocalDebugMessage("Loading user data...");
            setGlobalDebugMessage("Loading user data...");
            const data = await loadUserData();
            if (data) {
                console.log('User data loaded:', data);
                setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
                setGlobalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
                dispatch({ type: 'SET_USER', payload: data });
                miniApp.ready();
                console.log('MiniApp is ready');
                setLocalDebugMessage("MiniApp is ready");
                setGlobalDebugMessage("MiniApp is ready");
            }
            else {
                throw new Error("User data is undefined or null");
            }
        }
        catch (error) {
            console.error("Error loading user data", error);
            const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
            LogRocket.captureException(error); // Send error to LogRocket
            setLocalDebugMessage(errorMessage);
            setGlobalDebugMessage(errorMessage);
        }
    }
    return (_jsxs("div", { children: [_jsx("p", { children: localDebugMessage }), " "] }));
}
//# sourceMappingURL=App.js.map