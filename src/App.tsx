import React, { useEffect, useReducer, useState } from 'react';
import { loadUserData } from './api'; // Adjust the import path as necessary
import miniApp from '@tma.js/sdk'; // Adjust the import path as necessary

// Define initial state and reducer
const initialState = {
  user: null,
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [localDebugMessage, setLocalDebugMessage] = useState('');
  const [globalDebugMessage, setGlobalDebugMessage] = useState('');

  useEffect(() => {
    console.log('App is rendering...');
    setLocalDebugMessage("App is rendering...");
    setGlobalDebugMessage("App is rendering...");
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      console.log('Loading user data...');
      setLocalDebugMessage("Loading user data...");
      setGlobalDebugMessage("Loading user data...");
      const data = await loadUserData();
      console.log('User data loaded:', data);
      setLocalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      setGlobalDebugMessage(`User data loaded: ${JSON.stringify(data)}`);
      dispatch({ type: 'SET_USER', payload: data });
      miniApp.ready();
      console.log('MiniApp is ready');
      setLocalDebugMessage("MiniApp is ready");
      setGlobalDebugMessage("MiniApp is ready");
    } 
    catch (error) {
      console.error("Error loading user data", error);
      const errorMessage = `Error loading user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`;
      setLocalDebugMessage(errorMessage);
      setGlobalDebugMessage(errorMessage);
      dispatch({ type: 'SET_ERROR', payload: error });
    }
  };

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>Error: {state.error.message || state.error.toString()}</div>;
  }

  return (
    <div>
      <h1>Welcome, {state.user.name}!</h1>
      <p>Debug Messages:</p>
      <p>{localDebugMessage}</p>
      <p>{globalDebugMessage}</p>
      {/* Rest of your app components go here */}
    </div>
  );
};

export default App;