import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk';

const { initDataRaw } = retrieveLaunchParams();

const headers = {
  Authorization: `tma ${initDataRaw}`
};

// Load user data from the user function
export const loadUserData = async () => {
  console.log("Starting API call to load user data...");
  console.log("API endpoint: /api/user-data");
  console.log("Headers:", headers);

  try {
    const response = await axios.get(`/api/user-data`, { headers });
    
    // Check response status and data
    console.log("API response status:", response.status);
    console.log("API response data:", response.data);

    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error("Error fetching user data:", error);
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }
    throw error;
  }
};

// Fetch scoreboard data from the scoreboard function
export const getScoreboard = async () => {
  console.log("Starting API call to fetch scoreboard data...");
  console.log("API endpoint: /api/scoreboard");
  console.log("Headers:", headers);

  try {
    const response = await axios.get(`/api/scoreboard`, { headers });

    // Check response status and data
    console.log("API response status:", response.status);
    console.log("API response data:", response.data);

    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error("Error fetching scoreboard:", error);
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }
    throw error;
  }
};

// Update points using the update-points function
export const updatePoints = async () => {
  console.log("Starting API call to update points...");
  console.log("API endpoint: /api/update-points");
  console.log("Headers:", headers);

  try {
    const response = await axios.post(`/api/update-points`, {}, { headers });

    // Check response status and data
    console.log("API response status:", response.status);
    console.log("API response data:", response.data);

    return response.data;
  } catch (error) {
    // Log detailed error information
    console.error("Error updating points:", error);
    if (error.response) {
      console.error("Error response status:", error.response.status);
      console.error("Error response data:", error.response.data);
    }
    throw error;
  }
};