import { useContext, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Game from "./pages.tsx/Game";
import Shop from "./pages.tsx/Shop";
import Share from "./pages.tsx/Share";
import { useMiniApp } from '@tma.js/sdk-react';
import { loadUserData } from "./api";
import Scoreboard from "./pages.tsx/Scoreboard";
import { store } from "./utils/store";

export default function App() {
  const miniApp = useMiniApp();
  const { dispatch } = useContext(store);

  useEffect(() => {
    console.log('App is rendering...');
    loadUser();
  }, []);

  async function loadUser() {
    try {
      console.log('Loading user data...');
      const { data } = await loadUserData();
      console.log('User data loaded:', data);
      dispatch({ type: 'SET_USER', payload: data });
      miniApp.ready();
      console.log('MiniApp is ready');
    } 
    catch (error) {
      console.error("Error loading user data", error);
    } 
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/share" element={<Share />} />
      </Routes>
      <Navbar />
    </div>
  );
}