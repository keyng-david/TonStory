import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk';

const { initDataRaw } = retrieveLaunchParams();

const headers = {
  Authorization: `tma ${initDataRaw}`
};

// Load user data from the user function
export const loadUserData = async () => {
  try {
    const response = await axios.get(`/api/user-data`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Fetch scoreboard data from the scoreboard function
export const getScoreboard = async () => {
  try {
    const response = await axios.get(`/api/scoreboard`, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching scoreboard:", error);
    throw error;
  }
};

// Update points using the update-points function
export const updatePoints = async () => {
  try {
    const response = await axios.post(`/api/update-points`, {}, { headers });
    return response.data;
  } catch (error) {
    console.error("Error updating points:", error);
    throw error;
  }
};