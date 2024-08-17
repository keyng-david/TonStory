import axios from 'axios';
import { retrieveLaunchParams } from '@tma.js/sdk';
const { initDataRaw } = retrieveLaunchParams();

// Update for production
const API_BASE_URL = process.env.base;

// Debugging: Log the API base URL to ensure it's set correctly
console.log("API_BASE_URL:", API_BASE_URL);

const headers = {
  Authorization: `tma ${initDataRaw}`
}

export const loadUserData = async () => {
  try {
    console.log("Attempting to fetch user data...");
    const response = await axios.get(`${API_BASE_URL}/user-data`, {headers});
    console.log("User data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error(`Error fetching user data: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
  }
}

export const getScoreboard = async () => {
  try {
    console.log("Attempting to fetch scoreboard...");
    const response = await axios.get(`${API_BASE_URL}/scoreboard`, {headers});
    console.log("Scoreboard fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching scoreboard:", error);
    throw new Error(`Error fetching scoreboard: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
  }
};

export const updatePoints = async () => {
  try {
    console.log("Attempting to update points...");
    const response = await axios.post(`${API_BASE_URL}/update-points`, {}, {headers});
    console.log("Points updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating points:", error);
    throw new Error(`Error updating points: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
  }
};