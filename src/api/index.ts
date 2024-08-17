import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk';

const { initDataRaw } = retrieveLaunchParams();

const headers = {
  Authorization: `tma ${initDataRaw}`
};

// Load user data from the user function
export const loadUserData = async () => {
  console.log("Starting API call to load user data...");
  console.log("API endpoint: /api/users");
  console.log("Headers:", headers);

  try {
    const response = await axios.get(`/api/users`, { headers });

    // Check response status and data
    console.log("API response status:", response.status);
    console.log("API response data:", response.data);

    return response.data;
  } catch (error: unknown) {
    // Log detailed error information
    if (axios.isAxiosError(error)) {
      console.error("Error fetching user data:", error.message);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
    } else {
      console.error("Unexpected error:", error);
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
  } catch (error: unknown) {
    // Log detailed error information
    if (axios.isAxiosError(error)) {
      console.error("Error fetching scoreboard:", error.message);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

// Update points using the update-points function
export const updatePoints = async () => {
  console.log("Starting API call to update points...");
  console.log("API endpoint: /api/players");
  console.log("Headers:", headers);

  try {
    const response = await axios.post(`/api/players`, {}, { headers });

    // Check response status and data
    console.log("API response status:", response.status);
    console.log("API response data:", response.data);

    return response.data;
  } catch (error: unknown) {
    // Log detailed error information
    if (axios.isAxiosError(error)) {
      console.error("Error updating points:", error.message);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};